<template>
  <div>
    <div class="h-middle">
      <div class="h-inmid">
        <h2>{{$t('m.header.changepassword')}}</h2>
        <Form ref="passValidate" :model="passValidate" :rules="passValidates">
          <FormItem  prop="oldpass">
            <Input type="password" style="width:340px;margin-top: 20px;" :placeholder="$t('m.password.oldpass')" size="large" v-model.trim="passValidate.oldpass"></Input>
          </FormItem>
          <FormItem  prop="newpass">
            <Input type="password" style="width:340px;margin-top: 20px;" :placeholder="$t('m.password.newpass')" size="large" v-model.trim="passValidate.newpass"></Input>
          </FormItem>
          <FormItem  prop="conpass">
            <Input type="password" style="width:340px;margin-top: 20px;" :placeholder="$t('m.password.confirmpass')" size="large" v-model.trim="passValidate.conpass"></Input>
          </FormItem>
          <Button type="primary" long shape="circle" style="margin-top: 25px;" size="large" @click="editpsw('passValidate')">{{$t('m.common.confirm')}}</Button>
          <Button type="error" long shape="circle" style="margin-top: 10px;" size="large" @click="cancelpsw">{{$t('m.common.cancel')}}</Button>
        </Form>
      </div>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>
<script>
  export default {
    name:'password',
    data(){
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('m.validation.confirmpsw')));
        } else if (value !== this.passValidate.newpass) {
          callback(new Error(this.$t('m.validation.two')));
        } else {
          callback();
        }
      };
      return{
        passValidate:{
          oldpass:'',
          newpass:'',
          conpass:'',
        },
        passValidates:{
          oldpass:[ { required: true, message: this.$t('m.validation.oldpsw'), trigger: 'blur,change' }],
          newpass:[{ required: true, message:this.$t('m.validation.newpsw'), trigger: 'blur,change' }],
          conpass:[
            {  validator: validatePass2,  trigger: 'blur,change' },
//            { field: newpass, message: '两次密码必须一致', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      editpsw(Validate){
        console.log(this.oldpass,this.newpass)
        this.$refs[Validate].validate((valid) => {
          if (valid) {
            this.$http({
              url: 'changePass.do',
              body: {
                oldpass: this.passValidate.oldpass,
                newpass: this.passValidate.newpass,
              },
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
            }).then((response) => {
              if (response.body.msg) {
                this.$Message.success(response.body.msg,);
                setTimeout(this.logout(),2000);
              } else {
                this.$Message.error(response.body.errors,);
              }
            })
          }
        })
      },
      cancelpsw(){
        this.oldpass='';
        this.newpass='';
        this.conpass='';
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
            sessionStorage.removeItem('userdata');
            location.href='/#/login'
          }
        })
      },
    }
  }
</script>
<style>
  .h-middle{
    width: 100%;
    position:absolute;
    top:106px;
    left:0;
    bottom:0;
    background-image:url(/static/img/bg_big.png);
    background-position: center;
  }
  .h-inmid{
    width:340px;
    margin:100px auto;
    text-align: center;
  }
  .h-inmid h2{
    line-height: 50px;
    color:#2D8CF0;
  }
</style>
