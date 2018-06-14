<template>
  <div>
    <div class="body">
      <div class="logo">
        <img src="../assets/img/logos.png" alt="">
      </div>
      <div class="loginbox">
        <div class="loginimg">
          <img src="../assets/img/login2.png" alt="" style="width: 100%;">
        </div>
        <Form ref="loginValidate" :model="loginValidate" :rules="loginrule">
          <div class="heng">
            <FormItem prop="account">
              <Input clearable type="text" id='username' name="username" v-model.trim="loginValidate.account" :placeholder="$t('m.login.username')" @on-keyup.enter="show('loginValidate')">
                <span slot="prepend">
                  &nbsp;<Icon type="android-person" size="14"></Icon>&nbsp;
                </span>
              </Input>
            </FormItem>
          </div>
          <div class="heng">
            <FormItem prop="password">
              <Input clearable type="password" id='password' name="password" v-model.trim="loginValidate.password" :placeholder="$t('m.login.password')" @on-keyup.enter="show('loginValidate')">
              <span slot="prepend">
                  &nbsp;<Icon type="android-lock" size="14"></Icon>&nbsp;
              </span>
              </Input>
            </FormItem>
          </div>
          <div class="heng">
            <FormItem prop="pin">
              <Input type="text" name="validate" v-model.trim="loginValidate.pin" :placeholder="$t('m.login.pin')" @on-keyup.enter="show('loginValidate')">
              <span slot="prepend">
                  &nbsp;<Icon type="pricetag" size="14"></Icon>&nbsp;
              </span>
              </Input>
            </FormItem>
            <div class="pin">
              <img alt="" :src=imgsrc id="authImg" align="absmiddle" @click="qiehuan()">
            </div>
          </div>
          <div class="heng">
            <!--<Button type="primary" :class="{actives:active}" long :loading="loading" @click="send('loginValidate')">-->
              <!--<span v-if="!loading">Click me!</span>-->
              <!--<span v-else>{{logining}}</span>-->
            <!--</Button>-->
            <Button type="primary" :class="{actives:active}" long @click="send('loginValidate')">{{logining}}</Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  let apiLink='http://www.laison.com:8080/';
  // let apiLink='/api/';
  export default{
    name: 'login',
    data: function () {
      return {
        loading:false,
        logining:this.$t('m.login.login'),
        active:false,
        imgsrc:apiLink+'validateCodeServlet?aa='+ Math.random(),
        loginValidate: {
          account: '',
          password: '',
          pin:'',
        },
        loginrule: {
          account: [
            { required: true, message: this.$t('m.validation.name'), trigger: 'blur' }
          ],
          password: [
            { required: true, message:this.$t('m.validation.psw'), trigger: 'blur' }
          ],
          pin: [
            { required: true, message:this.$t('m.validation.pin'), trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      send: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.active=true;
            this.logining=this.$t('m.login.loging');
            let vm=this;
            vm.$http({
              url:'login.do',
              body:"username="+vm.loginValidate.account+"&password="+vm.loginValidate.password+"&validate="+vm.loginValidate.pin,
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
                  this.$router.push('/index');
                }
              }
            })
            .catch(function (response) {
              console.log(response)
            })
          }
        });
      },
      qiehuan() {
        this.imgsrc=apiLink+'validateCodeServlet?aa='+ Math.random();
      },
      show(name) {
        this.send(name)
      },
    },
  }
</script>
<style>
  .body {
    height:100vh;
    width:100%;
    position: absolute;
    background-color: #193c6d;
    /*filter: progid: DXImageTransform.Microsoft.gradient(gradientType=1, startColorstr='#003073', endColorstr='#029797');*/
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
    overflow: hidden;
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
    position: relative;
  }
  .heng:first-child{
    margin-top:30px;
  }
  .heng:nth-child(3){
    position: relative;
  }
  .heng:nth-child(3) input{
    width:70%;
    float: left;
  }
  .heng .pin{
    width:24%;
    height:50px;
    margin-left: 10px;
    position:absolute;
    right:0;
    top:0;
  }
  .heng .pin img{
    width:100%;
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
