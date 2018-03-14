<template>
  <div>
    <div class="body">
      <div class="logo">
        <img src="../assets/img/logos.png" alt="">
      </div>
      <div class="loginbox">
        <div class="chang">
          <p>welcome</p>
          <p>login</p>
        </div>
        <div class="photo"></div>
        <div class="loginimg"></div>
        <Form>
          <div class="heng">
            <div class="img">
              <img src="../assets/img/icon1.png" alt="">
            </div>
            <input type="text" id='username' name="username" v-model="account" :placeholder="$t('m.login.username')">
          </div>
          <div class="heng">
            <div class="img">
              <img src="../assets/img/icon2.png" alt="">
            </div>
            <input type="password" id='password' name="password" v-model="password" :placeholder="$t('m.login.password')">
          </div>
          <div class="heng">
            <div class="img">
              <img src="../assets/img/icon3.png" alt="">
            </div>
            <input type="text" name="validate" size="10" v-model="pin" :placeholder="$t('m.login.pin')">
            <div class="pin">
              <img alt="" :src=imgsrc id="authImg" align="absmiddle" @click="qiehuan()">
            </div>
          </div>
          <div class="login" :class="{actives:active}" @click="send()">
            <p>{{logining}}</p>
          </div>
        </Form>
      </div>
      <div class="loginfoo">
        <p>ADD: ZHEJIANG UNIVERSITY SCIENCE PARK,NO.525 XIXI ROAD,HANGZHOU,CHINA</p>
        <p>COPYRIGHT 2013 LAISON All RIGHTTS RESERVED. ZHE ICP1202424-1 POWERED BY:DS</p>
      </div>
    </div>
  </div>
</template>
<script>
  import router from '@/router';
  import common from '../kits/common.js';
  export default{
    name: 'login',
    data: function () {
      return {
        logining:this.$t('m.login.login'),
        active:false,
        imgsrc:common.apiLink+'/validateCodeServlet',
        account: '',
        password: '',
        pin:'',
      }
    },
    methods: {
      send: function () {
        this.active=true;
        this.logining=this.$t('m.login.loging');
        let vm=this;
        vm.$http({
          url:common.apiLink+'/login.do',
          body:"username="+vm.account+"&password="+vm.password+"&validate="+vm.pin,
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
        }).then((response) => {
          this.active=false;
          this.logining=this.$t('m.login.login');
          if(response.body.errors){
            this.$Message.error(response.body.errors);
          }else{
            this.$Message.success(response.body.msg);
            if(response.body.code==0){
              window.localStorage.setItem('userdata',JSON.stringify(response.body.user.dept));
              window.localStorage.setItem('user',JSON.stringify(response.body.user.loginName));
              location.href="./#/";
            }
          }
        })
        .catch(function (response) {
          console.log(response)
        })
      },
      qiehuan() {
        this.imgsrc=this.imgsrc+'?aa='+Math.random()
      }
    },
  }
</script>
<style>
  .body {
    height:100vh;
    width:100%;
    position: absolute;
    background-color: #193c6d;
    filter: progid: DXImageTransform.Microsoft.gradient(gradientType=1, startColorstr='#003073', endColorstr='#029797');
    background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0, #003073), color-stop(100%, #029797));
    background-image: -webkit-linear-gradient(135deg, #003073, #029797);
    background-image: -moz-linear-gradient(45deg, #003073, #029797);
    background-image: -ms-linear-gradient(45deg, #003073 0, #029797 100%);
    background-image: -o-linear-gradient(45deg, #003073, #029797);
    background-image: linear-gradient(135deg, #003073, #029797);
    text-align: center;
    margin: 0px;
    overflow: hidden;
  }
  .loginbox{
    height:400px;
    width:530px;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    background:rgba(255,255,255,0.9);
    box-shadow: 0 0 8px 1px #888;
  }
  .chang{
    height:24px;
    width:60%;
    border:1px solid #666;
    position:absolute;
    left:50%;
    margin-left:-30%;
    background: rgba(255,255,255,0.9);
    top:-12px;
  }
  .chang p{
    line-height: 24px;
    padding:0 9%;
  }
  .chang p:first-child{
    float:left;
  }
  .chang p:nth-child(2){
    float:right;
    padding-right:10%;
  }
  .photo{
    height:70px;
    width:70px;
    background-image: url("/static/img/4.jpg");
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    position: absolute;
    left:50%;
    margin-left:-35px;
    top:-37px;
  }
  .loginimg{
    height:110px;
    width:100%;
    background-image: url("/static/img/login2.png");
    background-position: center -140px;
  }
  .logo{
    position: absolute;
    width:190px;
    height:40px;
    top:30px;
    left:50px;
  }
  .logo img{
    width:100%;
  }
  .heng{
    height:45px;
    width:65%;
    margin:15px auto;
    /*background: rgba(255,255,255,0);*/
  }
  .heng:first-child{
    margin-top:30px;
  }
  .heng .img{
    height:100%;
    width:10%;
    float:left;
    margin-right: 10px;
  }
  .heng .img img{
    margin-top: 20%;
    width:100%;
  }
  .heng input{
    height:36px;
    width:83%;
    float:left;
    margin-top: 4px;
    border-radius: 4px;
    border:1px solid #ccc;
    padding-left:15px;
  }
  .heng:nth-child(3) input{
    width:55%;
  }
  .heng .pin{
    width:20%;
    height:50px;
    margin-top: 9px;
    margin-left: 10px;
    float: left;
  }
  .heng .pin img{
    width:100%;
  }
  .login{
    height:35px;
    width:65%;
    margin:15px auto;
    border-radius: 4px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    background: linear-gradient(to top,#B6B6B7,#F0F0F0);
  }
  .login:hover{
    background:#2b85e4;
  }
  .login:hover p{
    color: #fff;
  }
  .login p{
    font-size: 14px;
    color: #000;
  }
  .actives{
    background:#B6B6B7;
  }
  .loginfoo {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60px;
    width: 100%;
    text-align: center;
    color:#B6B6B7
  }
  @media (max-width:768px) {
    .heng{
      width:80%;
    }
    .loginbox{
      height:400px;
      width:300px;
    }
    .heng .img img{
      margin-top: 40%;
    }
    .heng p{
      width:25%;
    }
    .heng input{
      width:60%;
      height:30px;
      margin-top: 10px;
    }
    .logo{
      display:none;

    }
    footer p{
      display: none;
    }
  }
</style>
