<template>
  <div>
    <div class="move-left-report">
      <div class="h-title-report">
        <h3>{{$t('m.form.formtype')}}</h3>
        <p>{{$t('m.deal.operator')}}：<span>{{user}}</span></p>
        <p>{{$t('m.form.time')}}：<span>{{timec}}</span></p>
      </div>
      <div class="statisticnav">
        <Menu accordion  :active-name="currentitem" :open-names="open">
          <Submenu :name=item.id v-for="item in navstas" :key="item.id">
            <template slot="title">
              <Icon :type=item.icon></Icon>
              {{item.name}}
            </template>
            <router-link :to=nav2.url v-for="nav2 in item.second" :key="nav2.id">
              <MenuItem :name=nav2.id>{{nav2.name}}</MenuItem>
            </router-link>
          </Submenu>
        </Menu>
      </div>
    </div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/index">
          <Icon type="ios-home-outline"></Icon> Home
        </BreadcrumbItem>
        <BreadcrumbItem to="/index/statistic">
          <Icon type="social-buffer-outline"></Icon> Statistics
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="social-buffer-outline"></Icon> {{route}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="stafiterRight">
      <router-view></router-view>
      <my-footer1></my-footer1>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url:'',
        route:'',
        user:'',
        timec:'',
        currentitem:'',
        open:[],
        theme2: 'light',
        navstas: [
            {
              id:1,
              icon:'person',
              name:this.$t('m.form.operatormonthsale'),
              second:[
                {
                  id:'1-1',
                  name:this.$t('m.form.operatormonthsale'),
                  url:'/index/statistic/opemonth'
                },
              ]
            },
            {
              id:2,
              icon:'calendar',
              name:this.$t('m.form.servicehallsale'),
              second:[
                {
                  id:'2-1',
                  name:this.$t('m.form.deptdaysale'),
                  url:'/index/statistic/departday'
                },
                {
                  id:'2-2',
                  name:this.$t('m.form.depteverymonthsale'),
                  url:'/index/statistic/departhistory'
                },
                {
                  id:'2-3',
                  name:this.$t('m.form.deptmonthsale'),
                  url:'/index/statistic/departmonth'
                },
                {
                  id:'2-4',
                  name:this.$t('m.form.deptoperatorsale'),
                  url:'/index/statistic/departoper'
                },
              ]
            },
        ],
      }
    },
    methods: {
      //获取操作员
      getoperator(){
        this.$http({
          url:'sys/user/listAllOperator.do',
          body:{

          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.operatorlist=response.body.operators;
        });
      }
    },
    created(){
      this.user=JSON.parse(localStorage.getItem('user'));
      this.timec=new Date().toLocaleString();
      this.getoperator();
      this.url=this.$route.path;

      if(this.url=='/index/statistic/opemonth'){
        this.route="Historical Sales Report";
        this.open=[1];
        this.currentitem='1-1';
      }else if(this.url=='/index/statistic/departday'){
        this.route="Department Daily Sales Record";
        this.open=[2];
        this.currentitem='2-1';
      }else if(this.url=='/index/statistic/departhistory'){
        this.route="Historical Department Monthly Sales Record";
        this.route="Historical Sales Report";
        this.open=[2];
        this.currentitem='2-2';
      }else if(this.url=='/index/statistic/departmonth'){
        this.route="Department Monthly Sales Record";
        this.open=[2];
        this.currentitem='2-3';
      }else if(this.url=='/index/statistic/departoper'){
        this.route="Monthly sales Record per operator";
        this.open=[2];
        this.currentitem='2-4';
      }else if(this.url=='/index/statistic'){
        this.open=[0];
        this.currentitem='';
      }
    },
    watch:{
      '$route.path':function (url) {
        if(url=='/index/statistic/opemonth'){
          this.route="Historical Sales Report";
        }else if(url=='/index/statistic/departday'){
          this.route="Department Daily Sales Record";
        }else if(url=='/index/statistic/departhistory'){
          this.route="Historical Department Monthly Sales Record";
          this.route="Historical Sales Report";
        }else if(url=='/index/statistic/departmonth'){
          this.route="Department Monthly Sales Record";
        }else if(url=='/index/statistic/departoper'){
          this.route="Monthly sales Record per operator";
        }else if(url=='/index/statistic'){
          this.route="";
          this.open=[0];
          this.currentitem='';
        }
      }
      }


  }
</script>
<style scoped>
  .move-left-report{
    width: 241px;
    position: fixed;
    top:70px;
    left: 0;
    bottom: 0;
    z-index: 3;
    overflow-y: auto;
    background: #EEEEEE;
    padding-top: 8px;
    border-right: 1px solid #d7dde4;
  }
  .h-title-report{
    padding:0 24px;
    margin-bottom:15px;
  }
  .h-title-report h3{
    line-height: 50px;
    color:#666;
  }
  .h-title-report p{
    line-height: 30px;
    color:#666;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    color:#333
  }
  .stafiterRight{
    position: relative;
    top: 90px;
    margin-bottom:85px;
    margin-left: 260px;
    margin-right: 30px;
  }
  .breadcrumb{
    position: relative;
    top: 70px;
    margin-left: 240px;
    height:40px;
    box-shadow: 0 2px 3px 0px rgba(100, 100, 100, 0.1);
    line-height: 40px;
    box-sizing: border-box;
    padding:0 27px;
  }
</style>
