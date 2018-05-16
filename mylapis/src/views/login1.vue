<template>
  <div>
    <div class="body">

      <div class="loginbox">
        <div class="loginimg" style="float: left">
          <div class="logo">
            <img src="../assets/img/logos.png" alt="">
          </div>
        </div>
        <p class="systitle">LAPIS Prepavment Meter System</p>
        <div style="width:530px;float: left">
          <Form label-position="left" :label-width="45">
          <div class="heng">
            <div class="img">
              <img src="../assets/img/icon1.png" alt="">
            </div>
            <FormItem>
              <Input v-model="account" :placeholder="$t('m.login.username')" @keydown.native="show($event)"></Input>
            </FormItem>
            <!--<input type="text" id='username' name="username" v-model="account" :placeholder="$t('m.login.username')" @keydown="show($event)">-->
          </div>
          <div class="heng">
            <div class="img">
              <img src="../assets/img/icon2.png" alt="">
            </div>
            <FormItem>
              <Input type="password" v-model="password" :placeholder="$t('m.login.password')" @keydown.native="show($event)"></Input>
            </FormItem>
            <!--<input type="password" id='password' name="password" v-model="password" :placeholder="$t('m.login.password')" @keydown="show($event)">-->
          </div>
          <div class="heng">
            <div class="img">
              <img src="../assets/img/icon3.png" alt="">
            </div>
            <FormItem>
              <Input v-model="pin" :placeholder="$t('m.login.pin')" @keydown.native="show($event)"></Input>
            </FormItem>
            <!--<input type="text" name="validate" size="10" v-model="pin" :placeholder="$t('m.login.pin')" @keydown="show($event)">-->
            <div class="pin">
              <img alt="" :src=imgsrc id="authImg" align="absmiddle" @click="qiehuan()">
            </div>
          </div>
          <div class="login" :class="{actives:active}" @click="send()">
            <p>{{logining}}</p>
          </div>
        </Form>
        </div>

      </div>
      <!--<div class="loginfoo">-->
        <!--<p>ADD: ZHEJIANG UNIVERSITY SCIENCE PARK,NO.525 XIXI ROAD,HANGZHOU,CHINA</p>-->
        <!--<p>COPYRIGHT 2013 LAISON All RIGHTTS RESERVED. ZHE ICP1202424-1 POWERED BY:DS</p>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default{
    name: 'login',
    data: function () {
      return {
        logining:this.$t('m.login.login'),
        active:false,
        imgsrc:'validateCodeServlet?aa='+ Math.random(),
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
          url:'login.do',
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
              this.$router.push('/');
            }
          }
        })
        .catch(function (response) {
          console.log(response)
        })
      },
      qiehuan() {
        this.imgsrc='validateCodeServlet?aa='+ Math.random();
      },
      show: function (ev) {
        if(ev.keyCode==13){
          this.active=true;
          this.logining=this.$t('m.login.loging');
          let vm=this;
          vm.$http({
            url:'login.do',
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
                this.$router.push('/');
              }
            }
          })
            .catch(function (response) {
              console.log(response)
            })
        }
      }
    },
  }
</script>
<style>
  .body {
    height:100vh;
    width:100%;
    position: absolute;
    background-color: #000;
    filter: progid: DXImageTransform.Microsoft.gradient(gradientType=1, startColorstr='#003073', endColorstr='#029797');
    /*background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0, #003073), color-stop(100%, #029797));*/
    /*background-image: -webkit-linear-gradient(135deg, #003073, #029797);*/
    /*background-image: -moz-linear-gradient(45deg, #003073, #029797);*/
    /*background-image: -ms-linear-gradient(45deg, #003073 0, #029797 100%);*/
    /*background-image: -o-linear-gradient(45deg, #003073, #029797);*/
    background-image: linear-gradient(180deg, #3B83CB, #57A6E8);
    /*background-image:url("../assets/img/1.jpg") ;*/
    /*background-position: center;*/
    /*background-size: 100%;*/
    /*background-repeat: no-repeat;*/
    text-align: center;
    margin: 0px;
    overflow: hidden;
  }
  .loginbox{
    height:300px;
    width:100%;
    position:absolute;
    left:0;
    right:0;
    top:-10%;
    bottom:0;
    margin:auto;
    background:rgba(111,111,111,0.6);
    box-shadow: 0 0 8px 2px #888;
  }
  .systitle{
    color:#fff;
    font-size: 14px;
  }
  .loginimg{
    height:80px;
    width:50%;
    /*background-image: url("/static/img/login2.png");*/
    /*background-position: center -140px;*/
  }
  .logo{
    /*width:190px;*/
    height:90px;
    margin:10px auto;
  }
  .logo img{
    /*width:100%;*/
    height: 100%;
  }
  .heng{
    height:45px;
    width:65%;
    margin:15px auto;
    position: relative;
  }
  .heng:first-child{
    margin-top:30px;
  }
  .heng .img{
    height:100%;
    width:10%;
    float:left;
    margin-top: -3px;
  }
  .heng .img img{
    margin-top: 20%;
    width:100%;
  }
  .heng input{
    height:36px;
    width:95%;
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
    width:26%;
    height:50px;
    position: absolute;
    top:7px;
    right:16px;
  }
  .heng .pin img{
    width:100%;
  }
  .login{
    height:35px;
    width:60%;
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
