<template>
  <div>
    <div class="move-left">
      <ul>
        <li>
          <h3>{{$t('m.alarm.filter')}}</h3>
        </li>
        <li>
          <p>{{$t('m.customerinfo.label1')}}</p>
          <Input clearable v-model.trim="name" :placeholder="$t('m.customerinfo.label1')" style="width: 200px"></Input>
        </li>
        <li>
          <p>{{$t('m.customerinfo.label3')}}</p>
          <Input clearable  v-model.trim="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 200px"></Input>
        </li>
        <li>
          <p>{{$t('m.customerinfo.label7')}}</p>
          <Input clearable  v-model.trim="meterno" :placeholder="$t('m.open.metercolumnstitle1')" style="width: 200px"></Input>
        </li>
        <li>
          <p>{{$t('m.deal.daterange')}}</p>
          <DatePicker type="month" placeholder="Start Time" style="width:99px" @on-change="startdate"></DatePicker>
          -
          <DatePicker type="month" placeholder="End Time" style="width: 99px" @on-change="enddate"></DatePicker>
        </li>
        <li>
          <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        </li>
      </ul>
    </div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/index">
          <Icon type="ios-home-outline"></Icon> Home
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="social-buffer-outline"></Icon> Month Free Data
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="fiterRighta">
        <div style="margin:10px 0;">
          <Table class="default" :loading="loading" ref="selection" :columns="monthcolumns" :data="monthdatas"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="monthdatatotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<style>
  .fiterRighta .ivu-table th{
    background-color: #2d8cf0;
    color:#fff;
  }
</style>
<style scoped>
  .ivu-table-wrapper.default {
    border-radius: 4px;
    overflow: hidden;
  }
  .move-left{
    width: 240px;
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow: auto;
    background: #EEEEEE;
    padding-top: 8px;
    border-right: 1px solid #d7dde4;
  }
  .move-left > ul{
    width:88%;
    margin:0 auto;
  }
  .move-left > ul > li p{
    color:#666;
    line-height:35px;
  }
  .move-left > ul > li:first-child{
    height:60px;
    border-bottom: 1px solid #ccc;
  }
  .move-left > ul > li:first-child h3{
    line-height: 62px;
    color:#666;
  }
  .move-left > ul > li:last-child{
    border-top:1px solid #ccc;
    line-height: 50px;
    margin-top:15px;
  }
  .fiterRighta{
    position: relative;
    top: 84px;
    margin-left: 260px;
    margin-right: 20px;
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
<script>
  export default {
    nane:'monthdata',
    data() {
      return {
        loading:false,
        name:'',
        tel:'',
        meterno:'',
        starttime:'',
        endtime:'',
        monthcolumns:[
          {
            title: this.$t('m.customerinfo.label1'),
            key: 'customerName',
          },
          {
            title: this.$t('m.customerinfo.label3'),
            key: 'telephone',
          },
          {
            title: this.$t('m.customerinfo.label7'),
            key: 'meterNumber',
          },
          {
            title: this.$t('m.walkby.ftime'),
            key: 'freezeDate',
          },
          {
            title: this.$t('m.walkby.fdata'),
            key: 'freezeVolume',
          },
        ],
        monthdatas:[],
        monthdatatotal:0,
        region:[],
      }
    },
    methods: {
      startdate(date){
        this.starttime=date;
      },
      enddate(date){
        this.endtime=date;
      },
      query(){
        this.loading=true;
        this.$http({
          url:'walkby/findFreeDataByPage.do',
          body: {
            conditions: {
              regionCode:'',
              customerName:this.name,
              telephone:this.tel,
              startTime:this.starttime,
              endTime:this.endtime,
              meterNo:this.meterno,
            },
            "limit": 10, "page": 1},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.monthdatatotal=parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach(function (val,index) {
            let end=val.freezeDate.lastIndexOf("-");
            val.freezeDate=val.freezeDate.substring(0,end)
          });
          this.monthdatas=response.body.pageInfo.list;
          this.loading=false;
        })
      },
      changePage(page){
        this.loading=true;
        this.$http({
          url:'walkby/findFreeDataByPage.do',
          body: {conditions: {
              regionCode:'',
              customerName:this.name,
              telephone:this.tel,
              startTime:this.starttime,
              endTime:this.endtime,
              meterNo:this.meterno,
            },"limit": 10, "page": page},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          console.log(response.body);
          response.body.pageInfo.list.forEach(function (val,index) {
            let end=val.freezeDate.lastIndexOf("-");
            val.freezeDate=val.freezeDate.substring(0,end)
          });
          this.monthdatas=response.body.pageInfo.list;
          this.loading=false;
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
      getregion(){
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
      },
    },
    created(){
      this.query();
      this.getregion();
    }
  }
</script>


