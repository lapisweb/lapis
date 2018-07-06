<template>
  <div class="h-content">
    <div style="margin:10px 60px;">
      <div class="h-title">
        <Button icon="chevron-left" @click="$router.push('/index/walkby')" size="small" style="float: left;margin-top: 6px;margin-left: 5px;">返回</Button>
        <p style="text-align: center">查看任务分布</p>
      </div>
      <div>
        <div class="task-left1">
          <RadioGroup v-model="text" vertical @on-change="radiochange">
            <Radio :label="item.id" v-for="(item,index) in technicianList" :key="item.id">
              <span class="iconfont icon-dibiao1" style="font-size: 14px;" v-color="colors[index%10]"></span>
              <span>{{item.loginName}}</span>
            </Radio>
          </RadioGroup>
        </div>
        <div class="taskRight1">
          <div style="width:100%;height:850px;">
            <div id="map" style="width:100%;height:100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    nane:'addtask',
    data() {
      return {
        text:"",
        map:'',
        markers:[],
        icons:['../../static/icon1.png',
          '../../static/icon2.png',
          '../../static/icon3.png',
          '../../static/icon4.png',
          '../../static/icon5.png',
          '../../static/icon6.png',
          '../../static/icon7.png',
          '../../static/icon8.png',
          '../../static/icon9.png',
          '../../static/icon10.png',
          ],
        technician:'',
        technicianList:[],
        lacations: [],
        colors : ['#d14a61','#5793f3','#ff9900','#19be6b','#9A7563',
          '#024F9A','#99CF3D','#E54B8B','#14DBF8','#A402D9',
        ],
        selected:'',
        tasks:'',
        marker:'',
      }
    },
    computed: {
      // 计算属性的 getter
      meterIDs:function () {
        let arr=[];
        this.lacations.forEach((val,index)=> {
          if(val._checked){
            arr.push(val.meterId);
          }
        });
        return arr;
      },
    },
    directives:{"color":{
      bind:function(el,binding){
         el.style.color=binding.value
      }
      //简写   等同于把代码写在bind  和updated里面
      //     "名字"：function(el,binding){}
      }
    },
    methods: {
      radiochange(data){
        this.selected=data;
        this.tasks.forEach((val,index)=> {
          if(val.technicianID==data){
            val.walkByTaskJson.meterlist.forEach((val2,index2)=>{
              val2.location=new google.maps.LatLng(val2.latitude, val2.longitude);
              this.marker= new google.maps.Marker({
                position: val2.location,
                animation: google.maps.Animation.DROP,
                map: this.map,
                title:val2.meterNumber,
                meter:val2,
                icon:this.icons[index]
              });
            });
          }
        })
      },
      MapInitialize() {
        // if (navigator.geolocation) {
          //获取当前地理位置信息
          let latitude,longitude;
          navigator.geolocation.getCurrentPosition((pos,error)=>{
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
            console.log("当前位置：经度：" + latitude + " 纬度：" + longitude);
          });
            var vm=this;
            //构建经纬度点
            var uluru = {lat: 30.26, lng:120.19};
            var myOptions =
              {
                zoom: 12,
                center: uluru,
                // mapTypeId: google.maps.MapTypeId.HYBRID,
                //关闭 API 的默认用户界面设置
                // disableDefaultUI: true,
                mapTypeControl: false,
                gestureHandling: 'greedy',
                //标尺
                scaleControl: true,
                scaleControlOptions: {
                  position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
              };
            this.map = new google.maps.Map(document.getElementById("map"), myOptions); //实例化地图
        // } else {
        //   alert("你的浏览器不支持HTML5来获取地理位置信息。");
        // }
      },
      //获取抄表员
      gettechnicianList(){
        this.$http({
          url:'walkby/listTechnician.do',
          body:{
            isAll:true,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          },
        }).then((response) => {
          this.technicianList=response.body.technicians;
          this.gettask();
        });
      },
      //获取正在执行的任务
      gettask(){
        this.$http({
          url:'walkby/getDoingTasks.do',
          body:{},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          },
        }).then((response) => {
          this.tasks=response.body.tasks;
          this.technicianList.forEach((val1,index1)=>{
            response.body.tasks.forEach((val,index)=> {
              if(val1.id==val.technicianID){
                val.walkByTaskJson.meterlist.forEach((val2,index2)=>{
                  val2.location=new google.maps.LatLng(val2.latitude, val2.longitude);
                  this.marker= new google.maps.Marker({
                    position: val2.location,
                    animation: google.maps.Animation.DROP,
                    map: this.map,
                    title:val2.meterNumber,
                    meter:val2,
                    icon:this.icons[index1]
                  });
                });
              }
            })
          });
        });
      },
    },
    mounted(){
      this.MapInitialize()
    },
    created(){
      this.gettechnicianList();
    },
  }
</script>
<style scoped>
  .taskRight1{
    margin-left: 200px;
  }
  .task-top{
    width: 80%;
    top:70px;
    left: 0;
    position: fixed;
    padding: 24px 8%;
    background: #fff;
    height:80px;
    z-index: 5;
    border-bottom: 1px solid #ccc;
  }
  .task-left1{
    width: 200px;
    height:850px;
    overflow: auto;
    float:left;
    background: #eeeeee;
    padding:10px 10px;
  }
  .h-title{
    height:38px;
    width:100%;
    background:#5cadff;
    margin-top:10px;
    border:1px solid #5cadff;
  }
  .h-title p{
    color:#fff;
    line-height: 35px;
    padding:0 10px;
  }
  .ivu-checkbox-group-item {
    display: block;
    height:24px;
  }
</style>

