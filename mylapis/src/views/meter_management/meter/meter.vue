<template>
  <div>
    <div class="meter-left">
      <ul class="importandquery" v-for="navName in navNames">
        <router-link :to="navName.url" style="color:#333">
          <li :class="{active: activeName == navName.name}"
              @click="selected(navName.name)">
            <Icon :type=navName.icon size=16></Icon>
            {{navName.name}}
          </li>
        </router-link>
      </ul>
    </div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/index">
          <Icon type="ios-home-outline"></Icon> Home
        </BreadcrumbItem>
        <BreadcrumbItem to="/index/meter">
          <Icon type="social-buffer-outline"></Icon> Meter
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="social-buffer-outline"></Icon> {{routername}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="fiterRight">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'meter',
    data () {
      return {
        routername:'Meter Import',
        //左侧导航
        navNames: [
          {
            icon:'ios-speedometer-outline',
            name:this.$t('m.meter.meterimport'),
            url:'/index/meter'
          },
          {
            icon:'android-search',
            name:this.$t('m.meter.meterequery'),
            url:'/index/meter/meterquery'
          }
        ],
        activeName:this.$route.path=="/index/meter"?this.$t('m.meter.meterimport'):this.$t('m.meter.meterequery'),
      }
    },
    methods: {
      //左侧选项卡
      selected: function(gameName) {
        this.activeName = gameName;
      },
    },
    created(){
      let url=this.$route.path
      if(url=="/index/meter"){
        this.routername='Meter Import';
      }else if(url=="/index/meter/meterquery"){
        this.routername='Meter Query';
      }
    },
    watch:{
      '$route.path':function (newurl) {
        if(newurl=="/index/meter"){
          this.routername='Meter Import'
        }else if(newurl=="/index/meter/meterquery"){
          this.routername='Meter Query'
        }

      }
    }
  }
</script>

<style scoped>
  .meter-left{
    width: 240px;
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow-y: auto;
    background: #EEEEEE;
    padding-top: 8px;
  }
  .importandquery{
    height:auto;
    width:100%;
    padding-left:20px;
    padding-top: 10px;
  }
  .importandquery  li{
    height:40px;
    width:100%;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .importandquery  li >span{
    padding-left: 10px;
  }
  .active{
    color: #2D8CF0;
    border-right:2px solid #2D8CF0;
  }
  .fiterRight{
    position: relative;
    top: 84px;
    margin-left: 260px;
    margin-right: 30px;
    margin-bottom:85px;
  }
  .fiterRight .footer{
    left:240px;
    right:0
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
