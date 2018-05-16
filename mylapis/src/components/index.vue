<template>
  <div>
      <div class="layout-ceiling">
        <div class="layout-logo">
          <a href="/#/">
            <img src="../assets/img/logo.png" alt="">
            <img src="../assets/img/logo1.png" alt="">
          </a>
        </div>
        <div class="layout-ceiling-main">
          <div style="float:left">
            <Menu mode="horizontal" :theme="theme1" active-name="1">
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
              <a href="javascript:;">
                <Badge dot>
                  <Icon type="android-notifications" size="16"></Icon>
                </Badge>
              </a>
              <Dropdown  placement="bottom-end">
                <a href="javascript:void(0)">
                  <Icon type="android-person" color="white" size="16"></Icon>
                  <Icon type="chevron-down" color="white" size="10"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>
                    <!--<a href="/#/index/print">-->
                    <a href="javascript:;" @click="modal1=true">
                    <Icon type="person-add" size="14"></Icon>&nbsp;&nbsp;
                    <span>{{$t('m.header.print')}}</span>
                    </a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href="/#/index/password">
                    <Icon type="android-unlock" size="14"></Icon>&nbsp;&nbsp;
                    <span>{{$t('m.header.changepassword')}}</span>
                    </a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href="javascript:;" @click="logout">
                    <Icon type="log-out" size="14"></Icon>&nbsp;&nbsp;
                    <span>{{$t('m.header.logout')}}</span>
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown  placement="bottom-end">
                <a href="javascript:void(0)">
                  <Icon type="android-globe" color="white" size="16"></Icon>
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
        <Modal
          v-model="modal1"
          title="打印机设置"
          @on-ok="selectedprinter"
          >
          <p style="line-height: 26px;">选择发票打印机</p>
          <Select v-model="invoice" style="width:300px">
            <Option v-for="item in invoicelist" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
          <p style="line-height: 26px;margin-top: 10px;">选择小票打印机</p>
          <Select v-model="receipt" style="width:300px">
            <Option v-for="item in invoicelist" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
          <RadioGroup v-model="size" type="button">
            <Radio label="58mm"></Radio>
            <Radio label="80mm"></Radio>
          </RadioGroup>
        </Modal>
      </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'app',
    data () {
      return {
        modal1:false,
        index:"/index",
        nav:[],
        isShow:false,
        islanShow:false,
        ispreShow:false,
        theme1:'primary',
        enableDebt:1,
        invoice:'',
        receipt:'',
        invoicelist:[],
        size:'',
      }
    },
    methods:{
      logout(e){
        e.preventDefault();
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
            location.href='/#/login'
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
      }
    },
    created(){
      //读取电脑上的打印机设备
      LODOP.Printers.list.forEach(function (val,index) {
        val.value=index;
      });
      this.invoicelist=LODOP.Printers.list;
      //获取系统配置
      this.$http({
        url:'sysConfig/findAll.do',
        body: {conditions: {}},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        response.body.list.forEach((val,index)=> {
          if(val.name=='enableDebt'){
            if(val.state===0){
              this.enableDebt=0;
            }
          };
        })
      });
      this.$http({
        url:'getMyBusinessMenu.do',
        credentials:true,
        method: 'POST',
      }).then((response) => {
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
        }
      });
    }
  }
</script>
<style>
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
    z-index: 5;
    width:100%;
    background: #2d8cf0;
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
  .layout-ceiling-main .ivu-menu-primary {
    height:70px;
    line-height: 70px;
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
  @media (max-width:1100px) {
    .ivu-menu-submenu-title span{
      display: none;
    }
  }
</style>




