<style>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    height: 100%;
  }
  .ivu-row-flex{
    height: 100%;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    /*min-height: 200px;*/
    padding-bottom: 30px;
    height: 860px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #5d5d5d;
    /*min-width: 190px;*/
  }
  .ivu-menu-dark {
    background: #5d5d5d;
  }
  .layout-header{
    height: 60px;
    background: #000;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 100%;
    height: 60px;
    background: #000;
    font-size: 20px;
    line-height: 60px;
    text-indent: 20px;
    color: #fff;
  }
  a{
    display: block;
  }


  a  .ivu-menu-submenu-title-icon {
    float: right;
    position: relative;
    top: -16px;
  }
  a span{
    color:rgba(255,255,255,.7);
  }
  .ivu-icon {
    color: rgba(255,255,255,.7);
  }
  .ivu-icon-ios-arrow-down:after {
    content: "";
  }
</style>
<template>
  <div class="layout">
    <Row type="flex">
      <i-col span="3" class="layout-menu-left">
        <div class="layout-logo-left">商家平台</div>
        <Menu active-key="1-2" theme="dark" width="auto" :open-keys="['1']">
          <div  v-for="item in navList">
            <router-link v-if="item.navPath"  :to=item.navPath :key="item.id">
              <MenuItem :name=item.id>
                <Icon type="ios-navigate"></Icon>
                {{item.navName}}
              </MenuItem>
            </router-link>
            <Submenu v-else :name=item.id  :key="item.id" >
              <template  slot="title">
                <Icon type="ios-navigate"></Icon>
                {{item.navName}}
              </template>
              <router-link :to=nav2.navPath v-for="nav2 in item.second" :key="nav2.id">
                <MenuItem :name=nav2.id>{{nav2.navName}}</MenuItem>
              </router-link>
            </Submenu>
          </div>

        </Menu>
      </i-col>
      <i-col span="21">
        <div class="layout-header"></div>
        <!--<div class="layout-breadcrumb">-->
        <!--<Breadcrumb>-->
        <!--<Breadcrumb-item href="#">首页</Breadcrumb-item>-->
        <!--<Breadcrumb-item href="#">应用中心</Breadcrumb-item>-->
        <!--<Breadcrumb-item>某应用</Breadcrumb-item>-->
        <!--</Breadcrumb>-->
        <!--</div>-->
        <div class="layout-content">
          <div class="layout-content-main"><router-view></router-view></div>
        </div>
        <!--<div class="layout-copy">-->
        <!--2011-2016 &copy; TalkingData-->
        <!--</div>-->
      </i-col>
    </Row>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        navList:[
          {id:"1",navName:"总览",navPath:"/home"},
          {id:"2",navName:"商品",second:[{id:"2-1",navName:"商品管理",navPath:"/goods"},{id:"2-2",navName:"分类管理",navPath:"/goodsfenlei"},]},
          {id:"3",navName:"客户",second:[{id:"3-1",navName:"客户管理",navPath:"/user"},{id:"3-2",navName:"会员管理",navPath:"/uservip"},]},
          {id:"4",navName:"订单管理",navPath:"/order"},
          {id:"5",navName:"banner管理",navPath:"/banner"},
          {id:"6",navName:"资金管理",navPath:"/money"},
        ],
      }
    },
    methods:{
      // jump:function (path) {
      //   console.log(path)
      //   if(path){
      //     this.$router.push(path);
      //   }
      //
      // }
    }
  }
</script>
