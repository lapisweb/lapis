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
    <div class="fiterRight">
      <router-view></router-view>
      <my-footer1></my-footer1>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user:'',
        timec:'',
        currentitem:'1-1',
        open:[1],
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
      let url=this.$route.path;
      if(url=='/index/statistic/opemonth'){
        this.open=[1];
        this.currentitem='1-1';
      }else if(url=='/index/statistic/departday'){
        this.open=[2];
        this.currentitem='2-1';
      }else if(url=='/index/statistic/departhistory'){
        this.open=[2];
        this.currentitem='2-2';
      }else if(url=='/index/statistic/departmonth'){
        this.open=[2];
        this.currentitem='2-3';
      }else if(url=='/index/statistic/departoper'){
        this.open=[2];
        this.currentitem='2-4';
      }
    },

  }
</script>
<style>
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
    color:#888;
  }
  .h-title-report p{
    line-height: 30px;
    color:#888;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    color:#333
  }
</style>
