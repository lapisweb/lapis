<template>
<div>
   <div class="mobileFooter-box">
      <div @click.stop="listshow('one')">软性资源搜索</div>
      <div>|</div>
      <div @click.stop="listshow('two')">影视综艺推荐</div>
      <div>|</div>
      <div @click="skip('/home')">艺人商业合作
      </div>
  </div>
    <ul v-show="listone" class="navlists">
    <li> <a href="http://d.cocreatestudio.com/#Main" style="color:#333;text-decoration: none;">软性广告搜索</a> </li>
    <li @click="skip('/movie')">影视综艺搜索</li>
    <li></li>
  </ul>
   <ul v-show="listtwo" class="navlists navliststwo">
    <li @click="skip('/noopsyche')">影视综艺推荐</li>
    <li @click="skip('/advertiser')">广告主推荐</li>
    <li></li>
  </ul>
</div> 

</template>
<script>
export default {
  data(){
    return{
      listone:false,
      listtwo:false,
        flag:'',
    }
  },
  methods:{
    listshow:function(data){
        this.flag=data;
        if(data=='one'){
            this.listone=!this.listone;
        }else if(data=='two'){
            this.listtwo=!this.listtwo;
        }
      setTimeout(()=>{
        document.addEventListener("click",this.remmoveEvt)
      },0);
    },
    remmoveEvt(){
        if(this.flag=='one'){
            this.listone=false;
        }else if(this.flag=='two'){
            this.listtwo=false;
        }
    },
    skip:function(path){
      this.$router.push(path);
      this.listtwo=false;
      this.listone=false;
    }
  }
}
</script>
<style>
  .mobileFooter-box{
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    background:#fff;
    height: 50px;
    line-height: 50px;
    color:#606266;
    font-size: 14px;
    z-index: 100;
  }
  .navlists{
    width: 95px;
    height: 80px;
    position: fixed;
    bottom:60px;
    left: 5%;
    background:#fff;
    font-size: 14px;
    text-align: center;
    box-shadow: 4px 4px 14px #ccc;
    border-radius:3px;
  }
  .navliststwo{
    position: fixed;
    bottom: 60px;
    left: 50%;
    margin-left: -47px;
    
  }
  .navlists li{
    width: 90%;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    color:#666;
  }
  .navlists li:first-child{
    border-bottom:1px solid #f5f5f5;
    box-sizing: border-box;
  }
  .navlists li:nth-child(3){
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #fff;
  }

</style>


