<template>
  <div>
    <Button @click="flag=!flag">点我</Button>

    <transition>
      <h3 v-if="flag">我是一个有动画的标签</h3>
    </transition>

    <my-customer></my-customer>
  </div>

</template>
<style>
  .v-enter,.v-leave-to{ opacity:0;transform: translateX(80px)}
  .v-enter-active , .v-leave-active{ transition:all 0.8s ease}
</style>
<script>
  // Vue.component('mycom',{
  //   template:'<h1>组件</h1>'
  // });
  export default{
    data() {
      return {
        flag:false,
      }
    }
  }
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
  // RectangularBoundsProcessing(coordinate1, coordinate2) {
  //   if (coordinate1 != null && coordinate2 != null) {
  //     var myNorthEast = null;
  //     var mySouthWest = null;
  //     var maxRectangularLat = coordinate1.lat();
  //     var maxRectangularLng = coordinate1.lng();
  //     var minRectangularLat = coordinate1.lat();
  //     var minRectangularLng = coordinate1.lng();
  //     if (coordinate2.lat() > maxRectangularLat) {
  //       maxRectangularLat = coordinate2.lat();
  //     }
  //     if (coordinate2.lng() > maxRectangularLng) {
  //       maxRectangularLng = coordinate2.lng();
  //     }
  //     if (coordinate2.lat() < minRectangularLat) {
  //       minRectangularLat = coordinate2.lat();
  //     }
  //     if (coordinate2.lng() < minRectangularLng) {
  //       minRectangularLng = coordinate2.lng();
  //     }
  //     myNorthEast = new google.maps.LatLng(maxRectangularLat, minRectangularLng);
  //     mySouthWest = new google.maps.LatLng(minRectangularLat, maxRectangularLng);
  //     var myBounds = new google.maps.LatLngBounds(myNorthEast, mySouthWest);
  //   }
  //   return myBounds;
  // },


  // var dian1 = null;
  // var dian1lat = null;
  // var dian1lng = null;
  // var dian2 = null;
  // var dian2lat = null;
  // var dian2lng = null;
  // var bounds = null;
  // var juxing = null;
  // var tuodong = null;
  // var tuodong1 = null;
  // var clickEvent = null;
  //
  // var huawanyidongdian1 = null;
  // var huawanyidongdian2 = null;
  // var huawanyidongchazhilat = null;
  // var huawanyidongchazhilng = null;
  // var huawanshubiaodianjishijian = null;
  // var huawanshubiaoyidongshijian = null;
  //
  // clickEvent = google.maps.event.addListener(vm.map, 'click', function (event) {
  //   if (dian1 == null) {
  //     dian1 = event.latLng;
  //     dian1lat = event.latLng.lat();
  //     dian1lng = event.latLng.lng();
  //     tuodong = google.maps.event.addListener(vm.map, 'mousemove', function (event) {
  //       dian2lat = event.latLng.lat();
  //       dian2lng = event.latLng.lng();
  //       if (dian1lat > dian2lat) {
  //         dian2lat = dian2lat + 0.0005;
  //       } else {
  //         dian2lat = dian2lat - 0.0005;
  //       }
  //       if (dian1lng > dian2lng) {
  //         dian2lng = dian2lng + 0.0005;
  //       } else {
  //         dian2lng = dian2lng - 0.0005;
  //       }
  //       if (juxing == null) {
  //
  //         dian2 = new google.maps.LatLng(dian2lat, dian2lng);
  //         bounds = vm.RectangularBoundsProcessing(dian1, dian2);
  //         var newRectangularAttribute = {
  //           strokeColor: "#6f77ff",
  //           strokeOpacity: 0.5,
  //           strokeWeight: 2,
  //           fillColor: "#4a85ff",
  //           fillOpacity: 0.3,
  //           draggable:true,
  //           //editable: true,
  //           map: vm.map,
  //           bounds: bounds
  //         };
  //         juxing = new google.maps.Rectangle(newRectangularAttribute);
  //       } else {
  //         if (dian2 != new google.maps.LatLng(dian2lat, dian2lng)) {
  //           dian2 = new google.maps.LatLng(dian2lat, dian2lng);
  //           bounds = vm.RectangularBoundsProcessing(dian1, dian2);
  //           juxing.setBounds(bounds);
  //           tuodong1 = google.maps.event.addDomListener(juxing, 'mousemove', function (event) {
  //             dian2lat = event.latLng.lat();
  //             dian2lng = event.latLng.lng();
  //             if (dian1lat > dian2lat) {
  //               dian2lat = dian2lat + 0.0005;
  //             } else {
  //               dian2lat = dian2lat - 0.0005;
  //             }
  //             if (dian1lng > dian2lng) {
  //               dian2lng = dian2lng + 0.0005;
  //             } else {
  //               dian2lng = dian2lng - 0.0005;
  //             }
  //             if (dian2 != new google.maps.LatLng(dian2lat, dian2lng)) {
  //               dian2 = new google.maps.LatLng(dian2lat, dian2lng);
  //               bounds = vm.RectangularBoundsProcessing(dian1, dian2);
  //               juxing.setBounds(bounds);
  //             }
  //           });
  //         }
  //       }
  //     });
  //   } else {
  //     try {
  //       juxing.setMap(null);
  //       bounds = vm.RectangularBoundsProcessing(dian1, dian2);
  //       var newRectangularAttribute = {
  //         strokeColor: "#6f77ff",
  //         strokeOpacity: 0.5,
  //         strokeWeight: 2,
  //         fillColor: "#4a85ff",
  //         fillOpacity: 0.3,
  //         editable: true,
  //         draggable:true,
  //         map: vm.map,
  //         bounds: bounds
  //       };
  //       juxing = new google.maps.Rectangle(newRectangularAttribute);
  //       dian1 = null;
  //       dian1lat = null;
  //       dian1lng = null;
  //       dian2 = null;
  //       dian2lat = null;
  //       dian2lng = null;
  //       bounds = null;
  //       google.maps.event.removeListener(clickEvent);
  //       clickEvent = null;
  //       google.maps.event.removeListener(tuodong);
  //       tuodong = null;
  //       google.maps.event.removeListener(tuodong1);
  //       tuodong1 = null;
  //     } catch (e) { }
  //     huawanshubiaodianjishijian = google.maps.event.addDomListener(juxing, 'click', function (event) {
  //       if (huawanyidongdian1 == null) {
  //         huawanyidongdian1 = event.latLng;
  //         huawanshubiaoyidongshijian = google.maps.event.addDomListener(juxing, 'mousemove', function (event) {
  //           if ((huawanyidongdian1 != null)) {
  //             huawanyidongdian2 = event.latLng;
  //             huawanyidongchazhilat = huawanyidongdian2.lat() - huawanyidongdian1.lat();
  //             huawanyidongchazhilng = huawanyidongdian2.lng() - huawanyidongdian1.lng();
  //             juxing.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(juxing.getBounds().getSouthWest().lat() + huawanyidongchazhilat, juxing.getBounds().getSouthWest().lng() + huawanyidongchazhilng), new google.maps.LatLng(juxing.getBounds().getNorthEast().lat() + huawanyidongchazhilat, juxing.getBounds().getNorthEast().lng() + huawanyidongchazhilng)));
  //             huawanyidongdian1 = huawanyidongdian2;
  //           }
  //         });
  //         tuodong = google.maps.event.addListener(map, 'mousemove', function (event) {
  //           if (huawanshubiaoyidongshijian != null && huawanyidongdian1 != null) {
  //             huawanyidongdian2 = event.latLng;
  //             huawanyidongchazhilat = huawanyidongdian2.lat() - huawanyidongdian1.lat();
  //             huawanyidongchazhilng = huawanyidongdian2.lng() - huawanyidongdian1.lng();
  //             juxing.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(juxing.getBounds().getSouthWest().lat() + huawanyidongchazhilat, juxing.getBounds().getSouthWest().lng() + huawanyidongchazhilng), new google.maps.LatLng(juxing.getBounds().getNorthEast().lat() + huawanyidongchazhilat, juxing.getBounds().getNorthEast().lng() + huawanyidongchazhilng)));
  //             huawanyidongdian1 = huawanyidongdian2;
  //           }
  //         });
  //       } else {
  //         google.maps.event.removeListener(huawanshubiaoyidongshijian);
  //         huawanshubiaoyidongshijian = null;
  //         google.maps.event.removeListener(tuodong);
  //         tuodong = null;
  //         huawanyidongdian1 = null;
  //         huawanyidongdian2 = null;
  //         huawanyidongchazhilat = null;
  //         huawanyidongchazhilng = null;
  //       }
  //     });
  //   }
  // });
</script>

