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
                  <Icon type="ios-bell-outline" size="20"></Icon>
                </Badge>
              </a>
              <a href="javascript:;" style="position: relative;" @mouseenter="enterpre()" @mouseleave="leavepre()">
                <Badge>
                  <Icon type="android-person" size="20"></Icon>
                </Badge>
                <Icon type="ios-arrow-down"></Icon>
                <ul class="xinxi" v-show="ispreShow">
                  <li>
                    <a href="/#/index/upload">
                      <Icon type="person-add"></Icon>
                      <span>{{$t('m.header.uploadphoto')}}</span>
                    </a>
                  </li>
                  <li>
                    <a href="/#/index/password">
                      <Icon type="android-unlock"></Icon>
                      <span>{{$t('m.header.changepassword')}}</span>
                    </a>
                  </li>
                  <li>
                    <a href="http://api.laison.com:8080/logout.do" @click="logout">
                      <Icon type="log-out" color="red"></Icon>
                      <span>{{$t('m.header.logout')}}</span>
                    </a>
                  </li>
                </ul>
              </a>
              <a href="javascript:;" style="position: relative;" @mouseenter="enterlang()" @mouseleave="leavelang()">
                <Badge>
                  <Icon type="android-globe" size="20"></Icon>
                </Badge>
                <ul class="xinxi1" v-show="islanShow">
                  <li @click="language('zh_CN')">
                      <span class="iconfont icon-fuhao-zhongwen"></span>
                      <span>中文</span>
                  </li>
                  <li @click="language('en_US')">
                    <span class="iconfont icon-fuhao-yingwen"></span>
                      <span>English</span>
                  </li>
                </ul>
              </a>
            </div>
            <div class="smallscreen">
              <a href="javascript:;" style="position: relative;" @mouseenter="enterpre()" @mouseleave="leavepre()">
                <Badge>
                  <Icon type="android-person" size="20"></Icon>
                </Badge>
                <Icon type="ios-arrow-down"></Icon>
                <ul class="xinxi" v-show="ispreShow">
                  <li>
                    <a href="/#/index/upload">
                      <Icon type="person-add"></Icon>
                      <span>{{$t('m.header.uploadphoto')}}</span>
                    </a>
                  </li>
                  <li>
                    <a href="/#/index/password">
                      <Icon type="android-unlock"></Icon>
                      <span>{{$t('m.header.changepassword')}}</span>
                    </a>
                  </li>
                  <li>
                    <a  href="javascript:;" @click="logout">
                      <Icon type="log-out" color="red"></Icon>
                      <span>{{$t('m.header.logout')}}</span>
                    </a>
                  </li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import common from '../kits/common.js';
  import Vue from 'vue'
  export default {
    name: 'app',
    data () {
      return {
        index:"/index",
        nav:[],
        isShow:false,
        islanShow:false,
        ispreShow:false,
        theme1:'primary',
      }
    },
    created: function () {
      this.$http({
        url:common.apiLink+'/getMyBusinessMenu.do',
        credentials:true,
        method: 'POST',
      }).then((response) => {
        if(response.body.menu.childMenus){
          this.nav=response.body.menu.childMenus;
        }
      });
    },
    methods:{
      logout(e){
        e.preventDefault();
        this.$http({
          url:common.apiLink+'/logout.do',
          credentials:true,
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }).then((response) => {
          if(response.body.logout=='ok'){
            sessionStorage.removeItem('userdata');
            location.href='/#/login'
          }
        })
      },
      enter:function () {
        this.isShow = !this.isShow;
      },
      leave:function () {
        this.isShow = !this.isShow;
      },
      enterpre:function () {
        this.ispreShow = !this.ispreShow;
      },
      leavepre:function () {
        this.ispreShow = !this.ispreShow;
      },
      enterlang:function () {
        this.islanShow = !this.islanShow;
      },
      leavelang:function () {
        this.islanShow = !this.islanShow;
      },
      language(lang){
        this.$http({
          url:common.apiLink+'/changeLanguage.do',
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
  }
</script>
<style scoped>
  .disview{
    width:200px;
    background: #fff;
    border-radius: 10px 0 0 10px;
    position: fixed;
    right:0;
    top:46px;
    z-index: 200;
    padding: 12px;
    box-shadow: 0 0 1px 1px #ccc;
  }
  .layout-logo{
    width: 200px;
    height: 70px;
    float: left;
  }
  .layout-logo a{
    display: block;
    height:50px;
    margin-top: 10px;
  }
  .layout-logo img:first-child{
    margin-left: 40px;
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
    margin-left: 220px;
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
    padding:0 15px;
    height:100%;
  }
  .layout-right .bigscreen > a span{
    font-size: 12px;
  }
  .ivu-menu-primary {
    height:70px;
    line-height: 70px;
  }
  .layout-right .smallscreen > a{
    color: #fff;
    display: inline-block;
    width:auto;
    padding:0 15px;
    height:100%;
  }
  .layout-right .bigscreen > a span{
    font-size: 12px;
  }
  .ivu-menu-primary {
    height:70px;
    line-height: 70px;
  }
  ul.xinxi {
    height: 122px;
    min-width: 140px;
    background: #fff;
    position: absolute;
    top: 100%;
    right:-8px;
    border:1px solid #2d8cf0;
  }
  ul.xinxi > li {
    position: relative;
    font-size: 13px;
    width: 85%;
    height: 40px;
    margin:0 auto;
    border-bottom: 1px solid #777778;
  }
  ul.xinxi1 {
    height: 80px;
    min-width: 100px;
    background: #fff;
    position: absolute;
    top: 100%;
    right:-8px;
    border:1px solid #2d8cf0;
  }
  ul.xinxi1 > li {
    position: relative;
    font-size: 13px;
    width: 85%;
    height: 40px;
    margin:0 auto;
    border-bottom: 1px solid #777778;
    color: #666;
    line-height: 40px;
    text-align: left;
    text-decoration: none;
  }
  ul.xinxi > li:hover a{
    color: red;
  }
  ul.xinxi > li a {
    color: #666;
    line-height: 40px;
    text-align: left;
    text-decoration: none;
    display: block;
    height: 100%;
  }

  ul.xinxi > li:last-child {
    border: none;
  }
  .ivu-menu-horizontal .ivu-menu-submenu{
    padding:0 10px;
  }
  @media (max-width:1160px) {
    .ivu-menu-submenu-title span{
      display: none;
    }
    .ivu-menu-submenu-title i{
    }
  }
  .smallscreen{
    display:none;
  }
</style>




