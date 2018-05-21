<template>
  <div>
    <div class="h-content">
      <Card style="overflow: hidden;margin:10px 60px;">
        <p class="addtasktitle">选择表计</p>
        <div class="task-left">
          <div style="padding: 5px 15px;">
            <p>选择行政区域</p>
            <Tree :data="region" show-checkbox @on-check-change="selregion"></Tree>
          </div>
        </div>
        <div class="taskRight">
          <Table height="250" size="small" :columns="metercolumns" :data="lacations" :highlight-row="true" @on-selection-change="metersel"></Table>
          <div style="width:100%;height:600px;">
            <div id="map" style="width:100%;height:100%"></div>
          </div>
        </div>
      </Card>
      <Card style="margin:10px 60px;">
        <p class="addtasktitle">选择抄表员</p>
        <Select v-model="technician" clearable style="width:200px">
          <Option v-for="item in technicianList" :value="item.id" :key="item.id">{{ item.loginName }}</Option>
        </Select>
      </Card>
      <div style="margin:10px 60px;">
        <Button type="primary" @click="submit()">确定</Button>
      </div>
    </div>
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
        lacations: [],
        region:[],
        selectedregion:[],
        map:'',
        selectedrow:[],
        markers:'',
        walkbycurrent:0,
        meterIDs:'',
        technician:'',
        technicianList:[],
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
        ],
      }
    },
    methods: {
      walkbynext(){
        if (this.walkbycurrent == 1) {
          this.walkbycurrent = 1;
        } else {
          this.walkbycurrent += 1;
        }
      },
      walkbyprev(){
        if (this.walkbycurrent == 0) {
          this.walkbycurrent = 0;
        } else {
          this.walkbycurrent -= 1;
        }
      },
      submit(){
        this.$http({
          url:'walkby/addTask.do',
          body: {
            regionIDs:this.selectedregion,
            meterIDs:this.meterIDs,
            technicianID:this.technician,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          console.log(response.body);
          if(response.body.errors){
            this.$Message.error(response.body.errors);
          }else{
            this.$router.push('/index/walkby');
          }
        })
      },
      getTree(tree = []) {
        let arr = [];
        if (!!tree && tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
            obj.title = item.regionName;
            obj.regionCode = item.regionCode;
            obj.expand = false;
            obj.selected = false;
            obj.children = this.getTree(item.childRegions); // 递归调用
            arr.push(obj);
          });
        }
        return arr;
      },
      metersel(data){
        let meterarr=[];
        data.forEach(function (val,index) {
            meterarr.push(val.meterId)
        });
        this.meterIDs=meterarr;
        this.selectedrow=data;
        // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        // this.marker.setIcon(image)
      },
      selregion(selected){
        let arr=[];
        selected.forEach( (val,index)=> {
          arr.push(val.regionCode);
        });
        this.selectedregion=arr;
        this.$http({
          url:'walkby/getMeter.do',
          credentials:true,
          body:this.selectedregion,
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }).then((response) => {
          this.lacations=response.body.meterList;
          var point;
          this.lacations.forEach(function (val,index) {
             point = new google.maps.LatLng(val.latitude, val.longitude)
             val.location=point;
          });
          this.markers = this.lacations.forEach((val, i)=> {
            var marker= new google.maps.Marker({
              position: val.location,
              animation: google.maps.Animation.DROP,
              map: this.map,
            });
            this.selectedrow.forEach((value,index)=> {
                if(value.meterNumber==val.meterNumber){
                  marker.setIcon('../assets/img/marker.png')
                }
            });
            var infowindow = new google.maps.InfoWindow({content: val.meterNumber}); //创建一个InfoWindow
            // 使用谷歌地图定义的事件，给这个marker添加点击事件
            google.maps.event.addListener(marker, "click", function(){
              infowindow.open(this.map,marker);
            });
            return marker;
          });
        });
      },
      MapInitialize() {
        var vm=this;
        //构建经纬度点
        var latlng = new google.maps.LatLng(30.2635975183, 120.1073916361);
        var myOptions =
          {
            zoom: 15,
            center: latlng,
            // mapTypeId: google.maps.MapTypeId.HYBRID,
            //关闭 API 的默认用户界面设置
            // disableDefaultUI: true,
            mapTypeControl: false,
            //标尺
            scaleControl: true,
            scaleControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
          };
        this.map = new google.maps.Map(document.getElementById("map"), myOptions); //实例化地图

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

        clickEvent = google.maps.event.addListener(vm.map, 'click', function (event) {
          if (dian1 == null) {
            dian1 = event.latLng;
            dian1lat = event.latLng.lat();
            dian1lng = event.latLng.lng();
            tuodong = google.maps.event.addListener(vm.map, 'mousemove', function (event) {
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
                  //editable: true,
                  map: vm.map,
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
                map: vm.map,
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
      },
    },
    mounted(){
        this.MapInitialize()
      },
    created(){
      //获取行政区
      this.$http({
        url:'sys/region/findRegion.do',
        body:{
          id:0,
        },
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type':'application/json; charset=UTF-8'
        },
      }).then((response) => {
        this.region.push(response.body.Region);
        this.region=this.getTree(this.region);
      });
      //获取抄表员
      this.$http({
        url:'walkby/listTechnician.do',
        body:{

        },
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type':'application/json; charset=UTF-8'
        },
      }).then((response) => {
        this.technicianList=response.body.technicians;

      });
    },
  }
</script>
<style>
  .taskRight{
    position: relative;
    top: 0;
    /*float:left;*/
    /*width:500px;*/
    margin-left: 260px;
    margin-right: 30px;
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
  .task-left{
    width: 240px;
    height:850px;
    overflow-y: auto;
    float:left;
    background: #eeeeee;
    padding-top: 8px;
  }
  .addtasktitle{
      line-height: 45px;
  }
</style>

