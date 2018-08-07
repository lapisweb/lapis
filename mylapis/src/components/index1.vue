<template>
  <div>
      <div class="layout-ceiling">
        <div class="layout-logo">
          <a href="/#/index">
            <img src="../assets/img/logo.png" alt="">
            <img src="../assets/img/logo2.png" alt="">
          </a>
        </div>
        <div class="layout-ceiling-main">
          <div style="float:left">
            <Menu mode="horizontal" :theme="theme1" @on-select="currname" ref="contactMenu" :active-name="initialActiveMenu">
              <Submenu :name=item.orderNum v-for="item in nav" :key="item.orderNum">
                <template slot="title">
                  <Icon :type=item.icon></Icon>
                  <span>
                    {{item.name}}
                  </span>
                </template>
                <router-link :to=nav2.url v-for="nav2 in item.childMenus" :key="nav2.orderNum">
                  <MenuItem :name=nav2.orderNum>{{nav2.name}}</MenuItem>
                </router-link>
              </Submenu>
            </Menu>
          </div>
          <div class="layout-right">
            <div class="bigscreen">
              <Dropdown trigger="custom" :visible="visible">
                <a href="javascript:;" @click.stop="handleOpen">
                  <Badge :count="count" class-name="demo-badge-alone">
                    <Icon type="android-notifications" size="18" style="margin-top: -5px;"></Icon>
                  </Badge>
                </a>
                <DropdownMenu slot="list" style="width:240px;">
                  <h3 style="padding:0 10px;border-bottom: 1px solid #ccc; font-size: 12px;line-height: 28px;">共有 <span style="color: #2d8cf0">{{count}}</span> 条未读消息</h3>
                  <div class="alalist">
                    <ul v-if="count==0">
                      <li>
                        <p class="nop">暂无未读信息</p>
                      </li>
                    </ul>
                    <ul v-for="item in alarminfo" v-else>
                      <li>
                        <p>{{item.alarmContent1}}</p>
                        <p class="secondp"><span style="float: left">类型 {{item.alarmType}}</span> <span style="float: right">{{item.alarmDate}}</span></p>
                      </li>
                    </ul>
                  </div>
                  <div style="text-align:center;padding:0 5px;width:100%;line-height: 30px;border-top:1px solid #ccc">
                    <a href="javascript:;" @click="more">查看更多</a>
                  </div>
                </DropdownMenu>
              </Dropdown>
              <Dropdown @on-click="itemclick"  placement="bottom-end">
                <a href="javascript:void(0)">
                  <Icon type="android-person"  size="18"></Icon>
                  <Icon type="chevron-down"  size="10"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="print">
                    <Icon type="person-add" size="14"></Icon>&nbsp;&nbsp;
                    <span>{{$t('m.header.print')}}</span>
                  </DropdownItem>
                  <DropdownItem name="changepsd">
                    <Icon type="android-unlock" size="14"></Icon>&nbsp;&nbsp;
                    <span>{{$t('m.header.changepassword')}}</span>
                  </DropdownItem>
                  <DropdownItem name="logout">
                    <Icon type="log-out" size="14"></Icon>&nbsp;&nbsp;
                    <span>{{$t('m.header.logout')}}</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown  placement="bottom-end">
                <a href="javascript:void(0)">
                  <Icon type="android-globe" size="18"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>
                    <p @click="language('zh_CN')">
                      <span class="iconfont icon-fuhao-zhongwen"></span>
                      <span>中文</span>
                    </p>
                  </DropdownItem>
                  <DropdownItem>
                    <p @click="language('en_US')">
                      <span class="iconfont icon-fuhao-yingwen"></span>
                      <span>English</span>
                    </p>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'app',
    data () {
      return {
        initialActiveMenu:'',
        modal1:false,
        index:"/index",
        nav:[],
        isShow:false,
        islanShow:false,
        ispreShow:false,
        theme1:'light',
        enableDebt:1,
        invoice:'',
        receipt:'',
        invoicelist:[],
        size:'',
        visible:false,
        count:0,
        alarminfo:[],
        install:false,
      }
    },
    methods:{
      currname(name){
          this.initialActiveMenu=name;
      },
      itemclick(el){
        if(el=='print'){
          this.$router.push("/index/print")
        }else if(el=='changepsd'){
          this.$router.push("/index/password")
        }else if(el=='logout'){
          this.logout()
        }
      },
      logout(){
        this.$http({
          url:'logout.do',
          credentials:true,
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }).then((response) => {
          if(response.body.logout=='ok'){
            localStorage.removeItem('userdata');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }
        })
      },
      selectedprinter(){
        window.localStorage.setItem('size',this.size);
        window.localStorage.setItem('receipt',this.receipt);
        window.localStorage.setItem('invoice',this.invoice);
      },
      language(lang){
        this.$http({
          url:'changeLanguage.do',
          credentials:true,
          body:{language:lang},
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }).then((response) => {
          Vue.config.lang = lang;
          window.localStorage.language=lang;
          window.location.reload()
        })
      },
      alarmevent(){
        this.$Modal.warning({
          title: '告警信息',
          content: "ahafhasfhk"
        });
      },
      handleOpen () {
        this.visible = true;
        setTimeout(()=>{
          //展开菜单的时候添加到document的click事件
          document.addEventListener("click",this.removeEvt)
        },0)
      },
      removeEvt(){
        this.visible = false
      },
      more(){
        this.$router.push('/index/alarm');
        // this.count=0;
      },
      //获取系统配置
      getsystem(){
        this.$http({
          url:'sysConfig/findAll.do',
          body: {conditions: {}},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.list){
            response.body.list.forEach((val,index)=> {
              if(val.name=='enableDebt'){
                if(val.state===0){
                  this.enableDebt=0;
                }
              }
            })
          }
        });
      },
      //获取菜单
      getmenu(){
        this.$http({
          url:'getMyBusinessMenu.do',
          credentials:true,

          method: 'POST',
        }).then((response) => {
          if(response.body.menu==null){
            // this.$Message.warning({content:'没有权限，请重新登录',duration: 5});
            // this.logout();
          }else{
            response.body.menu.childMenus.forEach((val,index)=> {
              if(val.childMenus){
                val.childMenus.forEach((val1,index1) => {
                  if(val1.url=='/index/debt'){
                    if(this.enableDebt==0){
                      val.childMenus.splice(index1,1);
                    }
                  }
                })
              }
            });
            if(response.body.menu.childMenus){
              this.nav=response.body.menu.childMenus;
              // this.getactivemenu();
              window.sessionStorage.setItem("resource",JSON.stringify(response.body.menu.childMenus));
              // this.nav = JSON.parse(window.sessionStorage.getItem("resource"));
              this.$nextTick(() => {
                this.$refs.contactMenu.updateOpened();
                this.$refs.contactMenu.updateActiveName()
              })
            }
          }
        });
      },
      //查询告警信息
      getalarm(){
        this.$http({
          url:'getMyAlarm.do',
          credentials:true,
          body:{
            conditions: {
            },
            limit: 10,
            page: 1
          },
          method: 'POST',
        }).then((response) => {
          if(response.body.pageInfo){
            response.body.pageInfo.list.forEach(function (val,index) {
              val.alarmContent=JSON.parse(val.alarmContent);
              val.alarmContent.forEach(function (val1,index1) {
                val.alarmContent1='walkby抄表任务\n'+val1.taskName+'还未执行';
              });
            });
            this.alarminfo=response.body.pageInfo.list;
            this.count=response.body.pageInfo.total;
          }

        });
      },
      //获取打印机
      getprinter(){
        LODOP.Printers.list.forEach(function (val,index) {
          val.value=index;
        });
        this.invoicelist=LODOP.Printers.list;
      },
      //获取选中菜单
      getactivemenu(){
        this.initialActiveMenu=Number(window.sessionStorage.getItem('initialActiveMenu'));
      }
    },
    created(){
      //读取电脑上的打印机设备
      try
      {
        this.getprinter()
      }
      catch(err)
      {
        this.install=true;
      }
      this.getsystem();
      this.getmenu();
      this.getalarm();
      this.getactivemenu()
    },
    watch:{
      '$route.path':function () {
          this.getactivemenu()
      }
    }
  }
</script>
<style>
  .bigscreen .demo-badge-alone{
    height: 15px;
    border-radius: 10px;
    min-width: 15px;
    line-height: 13px;
    padding: 0 2px;
    font-size: 12px;
  }
  .disview{
    width:200px;
    background: #fff;
    border-radius: 10px 0 0 10px;
    position: fixed;
    right:0;
    top:46px;
    z-index: 300;
    padding: 12px;
    /*box-shadow: 0 0 1px 1px #ccc;*/
  }
  .layout-logo{
    width: 160px;
    height: 70px;
    float: left;
  }
  .layout-logo a{
    display: block;
    height:50px;
    margin-top: 10px;
  }
  .layout-logo img:first-child{
      margin-left: 20px;
      margin-top: 7px;
      width: 36px;
      height: 36px;
      float: left;
    }
  .layout-logo img:nth-child(2){
    margin-top: 12px;
    width: 86px;
    margin-left:5px;
    float: left;
  }
  .layout-ceiling{
    height:70px;
    position:fixed;
    top:0;
    z-index: 12;
    width:100%;
    background: #fff;
    box-shadow: 0 2px 3px 0px rgba(100, 100, 100, 0.1);
  }
  .layout-ceiling-main{
    margin-left: 180px;
  }
  .layout-right{
    line-height:70px;
    float:right;
    margin-right: 30px;
  }
  .layout-right .bigscreen > a{
    color: #fff;
    display: inline-block;
    width:auto;
    padding:0 10px;
    height:100%;
  }
  .layout-right .bigscreen > a span{
    font-size: 12px;
  }
  .layout-ceiling-main .ivu-menu-light {
    height:70px;
    line-height: 70px;
  }
  .layout-ceiling-main .ivu-menu-horizontal.ivu-menu-light:after{
    background: #fff;
  }
  .layout-right .bigscreen > a span{
    font-size: 12px;
  }
  .ivu-dropdown-rel {
    padding: 0 10px;
    line-height: 73px;
  }
  .layout-ceiling-main .ivu-menu-horizontal .ivu-menu-submenu{
    padding:0 10px;
  }
  .alalist{
    max-height:180px;
    overflow: auto;
    padding:0 10px;
  }
  .alalist ul li{
    line-height: 20px;
    border-bottom:1px solid #DEDEDE;
    padding: 5px 0 0
  }
  .alalist ul li .nop{
    line-height: 40px;
    text-align: center;
  }
  .alalist ul li .secondp{
    overflow: hidden;
    color: #bbb;
    font-size: 10px;
  }
  .alalist ul li:last-child{
    border-bottom:none;
  }
  @media (max-width:990px) {
    .ivu-menu-submenu-title span{
      display: none;
    }
  }
</style>




