<template>
  <div>
      <div class="h-content">
        <div class="demo-tabs-style2" style="margin: 10px 60px;">
          <Tabs type="card">
            <TabPane label="选择表计">
              <div class="list">
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
                  <div style="width:100%;height:600px;">
                    <!--<img src="../assets/img/map.png" alt="" style="width: 100%;height:100%">-->
                    <!--<vue-googlemap :center="center" :zoom="zoom"></vue-googlemap>-->
                    <!--<vue-googlemap-marker :center="center" :zoom="zoom"  :position="position" :icon="icon" ></vue-googlemap-marker>-->
                    <div id="map" style="width:100%;height:100%"></div>
                  </div>
                </Card>
              </div>
            </TabPane>
            <TabPane label="设置抄表员">
              <div class="list">
                <Card>
                  <p>Content of card</p>
                  <p>Content of card</p>
                  <p>Content of card</p>
                </Card>
              </div>
              <div style="margin:15px 0 25px;text-align: center">
                <Button type="primary" size="large"> 确定 </Button>
                <Button type="ghost" size="large"> 取消 </Button>
              </div>

            </TabPane>
          </Tabs>

      </div>
      </div>
      <!--<div class="right">-->
          <!--<div class="inright">-->

          <!--</div>-->
      <!--</div>-->
    <my-footer1></my-footer1>
  </div>
</template>
<style>
  .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
    border-radius: 0;
    background: #fff;
  }
  .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
    border-top: 1px solid #3399ff;
  }
  .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
<script>
  export default {
    nane:'addtask',
    data() {
      return {
        lacations:[
          {lat: 30.2630750000, lng: 120.1084670000},
          {lat: 30.2642950000, lng: 120.1071130000},
          {lat: 30.2638380000, lng: 120.1071660000},
          {lat: 30.2636270000, lng: 120.1071480000},
          {lat: 30.2640850000, lng: 120.1068220000},
          {lat: 30.2639730000, lng: 120.1066920000},
          {lat: 30.2630520000, lng: 120.1085310000},
          {lat: 30.2631260000, lng: 120.1082730000},
          {lat: 30.2631390000, lng: 120.1081730000},
          {lat: 30.2636280000, lng: 120.1069250000},
          {lat: 30.2635210000, lng: 120.1074950000},
          {lat: 30.2631350000, lng: 120.1066160000},
          {lat: 30.2632300000, lng: 120.1078720000},
          {lat: 30.2631180000, lng: 120.1080800000},
          {lat: 30.2636050000, lng: 120.1075910000},
          {lat: 30.2633540000, lng: 120.1078090000},
          {lat: 30.2639410000, lng: 120.1070810000},
          {lat: 30.2630770000, lng: 120.1082220000},
          {lat: 30.2644160000, lng: 120.1066950000},
          {lat: 30.2636390000, lng: 120.1074960000},
          {lat: 30.2631760000, lng: 120.1079390000},
          {lat: 30.2636270000, lng: 120.1073110000},
          {lat: 30.2632220000, lng: 120.1082510000}
        ],
        // zoom: 4,
        // center: {lat: -25.363, lng: 131.044},
        // position:{lat: -25.363, lng: 131.044},
        // icon:'../assets/img/logo.png',
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
        meterpoint:[
          {
            value: '0',
            label: '普通居民区'
          },
          {
            value: '1',
            label: '高档别墅区'
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
            title: '抄表点名称',
            key: 'meterNumber'
          },
          {
            title: '表计数量',
            key: 'importDate'
          },
          {
            title: '操作',
            key: 'caozuo',
            width:100,
            align:'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        // this.remove(params.index)
                      }
                    }
                  },[h('Icon',{
                    props:{
                      color:'#fff',
                      type: 'android-delete',
                    }
                  })]
                )
              ]);
            }
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
      MapInitialize() {
        console.log(this.lacations);
        var vm=this;
        //构建经纬度点
        var latlng = new google.maps.LatLng(30.2635975183, 120.1073916361);
        var myOptions =
          {
            zoom: 15,
            center: latlng,
            // mapTypeId: google.maps.MapTypeId.HYBRID,
            //关闭 API 的默认用户界面设置
            //                disableDefaultUI: true,
            mapTypeControl: false,
            //标尺
            scaleControl: true,
            scaleControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
          };
       var map = new google.maps.Map(document.getElementById("map"), myOptions); //实例化地图
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var markers = vm.lacations.map((location, i)=> {
          console.log('222')
          return new google.maps.Marker({
            position: location,
            map: map,
            label: labels[i % labels.length],
          });
        });
        //================================================================================================================
        var dian1 = null;
        var dian1lat = null;
        var dian1lng = null;
        var dian2 = null;
        var dian2lat = null;
        var dian2lng = null;
        var bounds = null;
        var juxing = null;
        var tuodong = null;
        var tuodong1 = null;
        var clickEvent = null;

        var huawanyidongdian1 = null;
        var huawanyidongdian2 = null;
        var huawanyidongchazhilat = null;
        var huawanyidongchazhilng = null;
        var huawanshubiaodianjishijian = null;
        var huawanshubiaoyidongshijian = null;
//            var huawanshubiaoyidongditushijian = null;
        clickEvent = google.maps.event.addListener(map, 'click', function (event) {
          if (dian1 == null) {
            dian1 = event.latLng;
            dian1lat = event.latLng.lat();
            dian1lng = event.latLng.lng();
            tuodong = google.maps.event.addListener(map, 'mousemove', function (event) {
              dian2lat = event.latLng.lat();
              dian2lng = event.latLng.lng();
              if (dian1lat > dian2lat) {
                dian2lat = dian2lat + 0.0005;
              } else {
                dian2lat = dian2lat - 0.0005;
              }
              if (dian1lng > dian2lng) {
                dian2lng = dian2lng + 0.0005;
              } else {
                dian2lng = dian2lng - 0.0005;
              }
              if (juxing == null) {

                dian2 = new google.maps.LatLng(dian2lat, dian2lng);
                bounds = vm.RectangularBoundsProcessing(dian1, dian2);
                var newRectangularAttribute = {
                  strokeColor: "#6f77ff",
                  strokeOpacity: 0.5,
                  strokeWeight: 2,
                  fillColor: "#4a85ff",
                  fillOpacity: 0.3,
                  draggable:true,
                  //                                editable: true,
                  map: map,
                  bounds: bounds
                };
                juxing = new google.maps.Rectangle(newRectangularAttribute);
              } else {
                if (dian2 != new google.maps.LatLng(dian2lat, dian2lng)) {
                  dian2 = new google.maps.LatLng(dian2lat, dian2lng);
                  bounds = vm.RectangularBoundsProcessing(dian1, dian2);
                  juxing.setBounds(bounds);
                  tuodong1 = google.maps.event.addDomListener(juxing, 'mousemove', function (event) {
                    dian2lat = event.latLng.lat();
                    dian2lng = event.latLng.lng();
                    if (dian1lat > dian2lat) {
                      dian2lat = dian2lat + 0.0005;
                    } else {
                      dian2lat = dian2lat - 0.0005;
                    }
                    if (dian1lng > dian2lng) {
                      dian2lng = dian2lng + 0.0005;
                    } else {
                      dian2lng = dian2lng - 0.0005;
                    }
                    if (dian2 != new google.maps.LatLng(dian2lat, dian2lng)) {
                      dian2 = new google.maps.LatLng(dian2lat, dian2lng);
                      bounds = vm.RectangularBoundsProcessing(dian1, dian2);
                      juxing.setBounds(bounds);
                    }
                  });
                }
              }
            });
          } else {
            try {
              juxing.setMap(null);
              bounds = vm.RectangularBoundsProcessing(dian1, dian2);
              var newRectangularAttribute = {
                strokeColor: "#6f77ff",
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillColor: "#4a85ff",
                fillOpacity: 0.3,
                editable: true,
                draggable:true,
                map: map,
                bounds: bounds
              };
              juxing = new google.maps.Rectangle(newRectangularAttribute);
              dian1 = null;
              dian1lat = null;
              dian1lng = null;
              dian2 = null;
              dian2lat = null;
              dian2lng = null;
              bounds = null;
              google.maps.event.removeListener(clickEvent);
              clickEvent = null;
              google.maps.event.removeListener(tuodong);
              tuodong = null;
              google.maps.event.removeListener(tuodong1);
              tuodong1 = null;

            } catch (e) { }
            huawanshubiaodianjishijian = google.maps.event.addDomListener(juxing, 'click', function (event) {
              if (huawanyidongdian1 == null) {
                huawanyidongdian1 = event.latLng;
                huawanshubiaoyidongshijian = google.maps.event.addDomListener(juxing, 'mousemove', function (event) {
                  if ((huawanyidongdian1 != null)) {
                    huawanyidongdian2 = event.latLng;
                    huawanyidongchazhilat = huawanyidongdian2.lat() - huawanyidongdian1.lat();
                    huawanyidongchazhilng = huawanyidongdian2.lng() - huawanyidongdian1.lng();
                    juxing.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(juxing.getBounds().getSouthWest().lat() + huawanyidongchazhilat, juxing.getBounds().getSouthWest().lng() + huawanyidongchazhilng), new google.maps.LatLng(juxing.getBounds().getNorthEast().lat() + huawanyidongchazhilat, juxing.getBounds().getNorthEast().lng() + huawanyidongchazhilng)));
                    huawanyidongdian1 = huawanyidongdian2;
                  }
                });
                tuodong = google.maps.event.addListener(map, 'mousemove', function (event) {
                  if (huawanshubiaoyidongshijian != null && huawanyidongdian1 != null) {
                    huawanyidongdian2 = event.latLng;
                    huawanyidongchazhilat = huawanyidongdian2.lat() - huawanyidongdian1.lat();
                    huawanyidongchazhilng = huawanyidongdian2.lng() - huawanyidongdian1.lng();
                    juxing.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(juxing.getBounds().getSouthWest().lat() + huawanyidongchazhilat, juxing.getBounds().getSouthWest().lng() + huawanyidongchazhilng), new google.maps.LatLng(juxing.getBounds().getNorthEast().lat() + huawanyidongchazhilat, juxing.getBounds().getNorthEast().lng() + huawanyidongchazhilng)));
                    huawanyidongdian1 = huawanyidongdian2;
                  }
                });
              } else {
                //                            google.maps.event.removeListener(huawanshubiaodianjishijian);
                //                            huawanshubiaodianjishijian = null;
                google.maps.event.removeListener(huawanshubiaoyidongshijian);
                huawanshubiaoyidongshijian = null;
                google.maps.event.removeListener(tuodong);
                tuodong = null;
                huawanyidongdian1 = null;
                huawanyidongdian2 = null;
                huawanyidongchazhilat = null;
                huawanyidongchazhilng = null;
              }
            });
          }
        });
        // google.maps.event.addListener(map, 'rightclick', function (event) {
        //   if(juxing){
        //     juxing.setMap(null)
        //   }
        // });
      },
      RectangularBoundsProcessing(coordinate1, coordinate2) {
        if (coordinate1 != null && coordinate2 != null) {
          var myNorthEast = null;
          var mySouthWest = null;
          var maxRectangularLat = coordinate1.lat();
          var maxRectangularLng = coordinate1.lng();
          var minRectangularLat = coordinate1.lat();
          var minRectangularLng = coordinate1.lng();
          if (coordinate2.lat() > maxRectangularLat) {
            maxRectangularLat = coordinate2.lat();
          }
          if (coordinate2.lng() > maxRectangularLng) {
            maxRectangularLng = coordinate2.lng();
          }
          if (coordinate2.lat() < minRectangularLat) {
            minRectangularLat = coordinate2.lat();
          }
          if (coordinate2.lng() < minRectangularLng) {
            minRectangularLng = coordinate2.lng();
          }

          myNorthEast = new google.maps.LatLng(maxRectangularLat, minRectangularLng);
          mySouthWest = new google.maps.LatLng(minRectangularLat, maxRectangularLng);
          var myBounds = new google.maps.LatLngBounds(myNorthEast, mySouthWest);
        }
        return myBounds;
      }
    },
    mounted(){
      this.MapInitialize()
//       var mapType = google.maps.MapTypeId.ROADMAP;
//       // var lat = 40.714, lng = -74.005,120.2E ,30.3
//       var latitude , longitude,mapOptions, zoom = 15;
//       navigator.geolocation.getCurrentPosition( (pos,error)=> {
//         latitude=pos.coords.latitude;
//         longitude=pos.coords.longitude;
//         var accuracy=pos.coords.accuracy;
//         console.log("当前位置：经度："+latitude+" 纬度："+longitude+" 精度："+accuracy);
//         mapOptions = {
//           center: {lat: 30.2635975183, lng: 120.1073916361},  //地图的中心点
//           zoom: 18,               　　　　　　　　　　//地图缩放比例
//           mapTypeId: mapType,       　　　　　　　　　　//指定地图展示类型：卫星图像、普通道路
//           scrollwheel: true    ,    　　　　　　　　　 //是否允许滚轮滑动进行缩放
//           mapTypeControl: false,
//           //标尺
//           scaleControl: true,
//           scaleControlOptions: {
//             position: google.maps.ControlPosition.RIGHT_BOTTOM
//           }
//         };
//         var map = new google.maps.Map(document.getElementById("map"), mapOptions); //创建谷歌地图
//         // var marker = new google.maps.Marker({
//         //   map: map,
//         //   position: new google.maps.LatLng( 30.2635975183, 120.1073916361)
//         // });
//         var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//         var locations = [
//           {lat: 30.2630750000, lng: 120.1084670000},
//           {lat: 30.2642950000, lng: 120.1071130000},
//           {lat: 30.2638380000, lng: 120.1071660000},
//           {lat: 30.2636270000, lng: 120.1071480000},
//           {lat: 30.2640850000, lng: 120.1068220000},
//           {lat: 30.2639730000, lng: 120.1066920000},
//           {lat: 30.2630520000, lng: 120.1085310000},
//           {lat: 30.2631260000, lng: 120.1082730000},
//           {lat: 30.2631390000, lng: 120.1081730000},
//           {lat: 30.2636280000, lng: 120.1069250000},
//           {lat: 30.2635210000, lng: 120.1074950000},
//           {lat: 30.2631350000, lng: 120.1066160000},
//           {lat: 30.2632300000, lng: 120.1078720000},
//           {lat: 30.2631180000, lng: 120.1080800000},
//           {lat: 30.2636050000, lng: 120.1075910000},
//           {lat: 30.2633540000, lng: 120.1078090000},
//           {lat: 30.2639410000, lng: 120.1070810000},
//           {lat: 30.2630770000, lng: 120.1082220000},
//           {lat: 30.2644160000, lng: 120.1066950000},
//           {lat: 30.2636390000, lng: 120.1074960000},
//           {lat: 30.2631760000, lng: 120.1079390000},
//           {lat: 30.2636270000, lng: 120.1073110000},
//           {lat: 30.2632220000, lng: 120.1082510000}
//         ]
//         var markers = locations.map((location, i)=> {
//           return new google.maps.Marker({
//             position: location,
//             map: map,
//             label: labels[i % labels.length],
//           });
//         });
//         // var rectangle = new google.maps.Rectangle({
//         //   strokeColor: '#FF0000',
//         //   strokeOpacity: 0.8,
//         //   strokeWeight: 2,
//         //   fillColor: '#FF0000',
//         //   fillOpacity: 0.35,
//         //   map: map,
//         //   editable:true,
//         //   draggable:true,
//         //   bounds: {
//         //     north: 30.2630750000,
//         //     south: 30.2636280000,
//         //     east: 120.1082510000,
//         //     west: 120.1074950000
//         //   }
//         // });
//         var dian1 = null;
//         var dian1lat = null;
//         var dian1lng = null;
//         var dian2 = null;
//         var dian2lat = null;
//         var dian2lng = null;
//         var bounds = null;
//         var juxing = null;
//         var tuodong = null;
//         var tuodong1 = null;
//         var clickEvent = null;
//
//         var huawanyidongdian1 = null;
//         var huawanyidongdian2 = null;
//         var huawanyidongchazhilat = null;
//         var huawanyidongchazhilng = null;
//         var huawanshubiaodianjishijian = null;
//         var huawanshubiaoyidongshijian = null;
// //            var huawanshubiaoyidongditushijian = null;
//
//         clickEvent = google.maps.event.addListener(map, 'click', (event) =>{
//           if (dian1 == null) {
//             dian1 = event.latLng;
//             dian1lat = event.latLng.lat();
//             dian1lng = event.latLng.lng();
//             tuodong = google.maps.event.addListener(map, 'mousemove', (event)=> {
//               dian2lat = event.latLng.lat();
//               dian2lng = event.latLng.lng();
//               if (dian1lat > dian2lat) {
//                 dian2lat = dian2lat + 0.05;
//               } else {
//                 dian2lat = dian2lat - 0.05;
//               }
//               if (dian1lng > dian2lng) {
//                 dian2lng = dian2lng + 0.05;
//               } else {
//                 dian2lng = dian2lng - 0.05;
//               }
//               if (juxing == null) {
//
//                 dian2 = new google.maps.LatLng(dian2lat, dian2lng);
//                 bounds = this.RectangularBoundsProcessing(dian1, dian2);
//                 console.log(bounds,333)
//                 var newRectangularAttribute = {
//                   strokeColor: "#6f77ff",
//                   strokeOpacity: 0.5,
//                   strokeWeight: 2,
//                   fillColor: "#4a85ff",
//                   fillOpacity: 0.3,
//                   //                                editable: true,
//                   map: map,
//                   bounds: bounds
//                 };
//                 juxing = new google.maps.Rectangle(newRectangularAttribute);
//               } else {
//                 if (dian2 != new google.maps.LatLng(dian2lat, dian2lng)) {
//                   dian2 = new google.maps.LatLng(dian2lat, dian2lng);
//                   bounds = this.RectangularBoundsProcessing(dian1, dian2);
//                   console.log(bounds,4525)
//                   juxing.setBounds(bounds);
//                   tuodong1 = google.maps.event.addDomListener(juxing, 'mousemove', (event)=> {
//                     dian2lat = event.latLng.lat();
//                     dian2lng = event.latLng.lng();
//                     if (dian1lat > dian2lat) {
//                       dian2lat = dian2lat + 0.05;
//                     } else {
//                       dian2lat = dian2lat - 0.05;
//                     }
//                     if (dian1lng > dian2lng) {
//                       dian2lng = dian2lng + 0.05;
//                     } else {
//                       dian2lng = dian2lng - 0.05;
//                     }
//                     if (dian2 != new google.maps.LatLng(dian2lat, dian2lng)) {
//                       console.log(bounds,456)
//                       dian2 = new google.maps.LatLng(dian2lat, dian2lng);
//                       bounds = this.RectangularBoundsProcessing(dian1, dian2);
//                       juxing.setBounds(bounds);
//                     }
//                   });
//                 }
//               }
//             });
//           } else {
//             try {
//               juxing.setMap(null);
//               bounds = this.RectangularBoundsProcessing(dian1, dian2);
//               var newRectangularAttribute = {
//                 strokeColor: "#6f77ff",
//                 strokeOpacity: 0.5,
//                 strokeWeight: 2,
//                 fillColor: "#4a85ff",
//                 fillOpacity: 0.3,
//                 editable: true,
//                 map: map,
//                 bounds: bounds
//               };
//               juxing = new google.maps.Rectangle(newRectangularAttribute);
//               dian1 = null;
//               dian1lat = null;
//               dian1lng = null;
//               dian2 = null;
//               dian2lat = null;
//               dian2lng = null;
//               bounds = null;
//               google.maps.event.removeListener(clickEvent);
//               clickEvent = null;
//               google.maps.event.removeListener(tuodong);
//               tuodong = null;
//               google.maps.event.removeListener(tuodong1);
//               tuodong1 = null;
//
//             } catch (e) { }
//             huawanshubiaodianjishijian = google.maps.event.addDomListener(juxing, 'click',  (event)=> {
//               if (huawanyidongdian1 == null) {
//                 huawanyidongdian1 = event.latLng;
//                 huawanshubiaoyidongshijian = google.maps.event.addDomListener(juxing, 'mousemove', (event) =>{
//                   if ((huawanyidongdian1 != null)) {
//                     huawanyidongdian2 = event.latLng;
//                     huawanyidongchazhilat = huawanyidongdian2.lat() - huawanyidongdian1.lat();
//                     huawanyidongchazhilng = huawanyidongdian2.lng() - huawanyidongdian1.lng();
//                     juxing.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(juxing.getBounds().getSouthWest().lat() + huawanyidongchazhilat, juxing.getBounds().getSouthWest().lng() + huawanyidongchazhilng), new google.maps.LatLng(juxing.getBounds().getNorthEast().lat() + huawanyidongchazhilat, juxing.getBounds().getNorthEast().lng() + huawanyidongchazhilng)));
//                     huawanyidongdian1 = huawanyidongdian2;
//                   }
//                 });
//                 tuodong = google.maps.event.addListener(map, 'mousemove', function (event) {
//                   if (huawanshubiaoyidongshijian != null && huawanyidongdian1 != null) {
//                     huawanyidongdian2 = event.latLng;
//                     huawanyidongchazhilat = huawanyidongdian2.lat() - huawanyidongdian1.lat();
//                     huawanyidongchazhilng = huawanyidongdian2.lng() - huawanyidongdian1.lng();
//                     juxing.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(juxing.getBounds().getSouthWest().lat() + huawanyidongchazhilat, juxing.getBounds().getSouthWest().lng() + huawanyidongchazhilng), new google.maps.LatLng(juxing.getBounds().getNorthEast().lat() + huawanyidongchazhilat, juxing.getBounds().getNorthEast().lng() + huawanyidongchazhilng)));
//                     huawanyidongdian1 = huawanyidongdian2;
//                   }
//                 });
//               } else {
//                 //                            google.maps.event.removeListener(huawanshubiaodianjishijian);
//                 //                            huawanshubiaodianjishijian = null;
//                 google.maps.event.removeListener(huawanshubiaoyidongshijian);
//                 huawanshubiaoyidongshijian = null;
//                 google.maps.event.removeListener(tuodong);
//                 tuodong = null;
//                 huawanyidongdian1 = null;
//                 huawanyidongdian2 = null;
//                 huawanyidongchazhilat = null;
//                 huawanyidongchazhilng = null;
//               }
//             });
//           }
//         });
//       });

      // var cityCircle;
      // cityCircle = new google.maps.Circle({
      //   strokeColor: '#FF0000',
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: '#FF0000',
      //   fillOpacity: 0.35,
      //   radius: 500
      // });

      // function aa() {
      //   cityCircle.setMap(map);
      // }
      // map.addListener('mousemove', function(e) {
      //   cityCircle.setCenter(e.latLng);
      //   aa()
      // });
      // function placeMarkerAndPanTo(latLng, map) {
      //   var marker = new google.maps.Marker({
      //     position: latLng,
      //     map: map
      //   });
      //   map.panTo(latLng);
      // }
      // var marker = new google.maps.Marker({
      //   map: map,
      //   position: new google.maps.LatLng( latitude, longitude)
      // });
      // marker.setMap(map);
      // var infowindow = new google.maps.InfoWindow({content: "我标记的地方" }); //创建一个InfoWindow
      // infowindow.open(map, marker); //把这个infoWindow绑定在选定的marker上面
//使用谷歌地图定义的事件，给这个marker添加点击事件
//       google.maps.event.addListener(marker, "click", function(){
//         infowindow.open(map,marker);
//       });

//       var markerCluster = new MarkerClusterer(map, markers,
//         {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      },
    created(){
      this.$http({
        url:'walkby/getMeter.do',
        credentials:true,
        body:[7,11],
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      }).then((response) => {
        // console.log(response.body.meterList);
        this.lacations=response.body.meterList;
        console.log(this.lacations);
        // response.body.meterList.forEach((val,index)=> {
        //   this.lacations.push({lat: val.latitude, lng: val.longitude})
        // });
      })
    }
  }
</script>

