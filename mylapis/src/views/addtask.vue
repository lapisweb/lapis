<template>
  <div>
      <div class="left">
        <div style="width:80%;margin:30px auto;">
          <Timeline>
            <TimelineItem color="green">选择表计</TimelineItem>
            <TimelineItem color="green">设置抄表点</TimelineItem>
            <TimelineItem color="red">选择抄表员</TimelineItem>
            <TimelineItem color="blue">设置抄表时间</TimelineItem>
          </Timeline>
        </div>

      </div>
      <div class="right">
          <div class="inright">
              <div class="list">
                <p>选择表计</p>
                <Card>
                  <div style="margin:0 0 10px;">
                   <Select v-model="model1" style="width:180px">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model1" style="width:180px">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model1" style="width:180px">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model1" style="width:180px">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
                  <Table height="240" border :columns="metercolumns" :data="meterdata" :highlight-row="true"></Table>
                </Card>
              </div>
              <div class="list">
                <p>设置抄表点</p>
                <Card>
                  <div style="margin:0 0 10px;">
                    <Select v-model="model1" style="width:180px">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
                  <Table style="margin:10px 0;" height="200" border :columns="metercolumnss" :data="meterdatas" :highlight-row="true"></Table>
                  <div style="width:100%;height:400px;">
                    <!--<img src="../assets/img/map.png" alt="" style="width: 100%;height:100%">-->
                    <!--<vue-googlemap :center="center" :zoom="zoom"></vue-googlemap>-->
                    <!--<vue-googlemap-marker :center="center" :zoom="zoom"  :position="position" :icon="icon" ></vue-googlemap-marker>-->
                    <div id="map" style="width:100%;height:100%"></div>
                  </div>
                </Card>
              </div>
              <div class="list">
                <p>选择抄表员</p>
                <Card>
                  <p>Content of card</p>
                  <p>Content of card</p>
                  <p>Content of card</p>
                </Card>
              </div>
              <div class="list">
                <p>设置抄表时间</p>
                <Card style="height: 320px;">
                  <DatePicker type="daterange"  split-panels placeholder="Select date" style="width: 200px"></DatePicker>
                </Card>
              </div>
          </div>
      </div>
    <my-footer1></my-footer1>
  </div>
</template>
<style>
  .left{
    width:240px;
    position: absolute;
    top:70px;
    left:0;
    bottom:83px;
    background: #fefefe;
  }
  .right{
    position: absolute;
    top:70px;
    left:240px;
    right:0;
    bottom:83px;
    overflow: auto;
  }
  .inright{
    width:90%;
    margin:10px auto;
  }
  .inright .list > p{
    text-align: center;
    line-height: 60px;
    font-size: 14px;
    color:#666;
  }
</style>
<script>
  import common from '../kits/common.js';
  export default {
    nane:'addtask',
    data() {
      return {
        zoom: 4,
        center: {lat: -25.363, lng: 131.044},
        position:{lat: -25.363, lng: 131.044},
        icon:'../assets/img/logo.png',
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        model1: '',
        //查询表号的表格
        //列名
        metercolumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: this.$t('m.open.metercolumnstitle1'),
            key: 'meterNumber'
          },
          {
            title: '安装位置',
            key: 'importDate'
          },
        ],
        //查询表的数据
        meterdata: [
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
          },
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
          },
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
          },
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
          },
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
          },
        ],
        //查询表号的表格
        //列名
        metercolumnss: [
          {
            title: this.$t('m.open.metercolumnstitle1'),
            key: 'meterNumber'
          },
          {
            title: '安装位置',
            key: 'importDate'
          },
          {
            title: '操作',
            key: 'caozuo',
            width:100,
            align:'center',
          },
        ],
        //查询表的数据
        meterdatas: [
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
            caozuo:'删除'
          },
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
            caozuo:'删除'
          },
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
            caozuo:'删除'
          },
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
            caozuo:'删除'
          },
          {
            meterNumber:201803230001,
            importDate:'浙江杭州',
            caozuo:'删除'
          },
        ],
      }
    },
    methods: {

    },
    mounted(){
      var mapType = google.maps.MapTypeId.ROADMAP;
      var lat = -25.363, lng = 131.044, zoom = 10;
      var mapOptions = {
        center: {lat, lng},  //地图的中心点
        zoom: zoom,               　　　　　　　　　　//地图缩放比例
        mapTypeId: mapType,       　　　　　　　　　　//指定地图展示类型：卫星图像、普通道路
        scrollwheel: true          　　　　　　　　　 //是否允许滚轮滑动进行缩放
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions); //创建谷歌地图
      var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat, lng)
      });
      marker.setMap(map);
      var infowindow = new google.maps.InfoWindow({content: "我标记的地方" }); //创建一个InfoWindow
      // infowindow.open(map, marker); //把这个infoWindow绑定在选定的marker上面
//使用谷歌地图定义的事件，给这个marker添加点击事件
      google.maps.event.addListener(marker, "click", function(){
        infowindow.open(map,marker);
      });
//       var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//       var locations = [
//         {lat: -31.563910, lng: 147.154312},
//         {lat: -33.718234, lng: 150.363181},
//         {lat: -33.727111, lng: 150.371124},
//         {lat: -33.848588, lng: 151.209834},
//         {lat: -33.851702, lng: 151.216968},
//         {lat: -34.671264, lng: 150.863657},
//         {lat: -35.304724, lng: 148.662905},
//         {lat: -36.817685, lng: 175.699196},
//         {lat: -36.828611, lng: 175.790222},
//         {lat: -37.750000, lng: 145.116667},
//         {lat: -37.759859, lng: 145.128708},
//         {lat: -37.765015, lng: 145.133858},
//         {lat: -37.770104, lng: 145.143299},
//         {lat: -37.773700, lng: 145.145187},
//         {lat: -37.774785, lng: 145.137978},
//         {lat: -37.819616, lng: 144.968119},
//         {lat: -38.330766, lng: 144.695692},
//         {lat: -39.927193, lng: 175.053218},
//         {lat: -41.330162, lng: 174.865694},
//         {lat: -42.734358, lng: 147.439506},
//         {lat: -42.734358, lng: 147.501315},
//         {lat: -42.735258, lng: 147.438000},
//         {lat: -43.999792, lng: 170.463352}
//       ]
//       var markers = locations.map(function(location, i) {
//         return new google.maps.Marker({
//           position: location,
//           label: labels[i % labels.length]
//         });
//       });
//       var markerCluster = new MarkerClusterer(map, markers,
//         {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }
  }
</script>

