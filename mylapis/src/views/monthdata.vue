<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <Input clearable v-model.trim="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
        <Input clearable  v-model.trim="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
        <Input clearable  v-model.trim="meterno" :placeholder="$t('m.open.metercolumnstitle1')" style="width: 180px"></Input>
        <div style="margin:8px 0"></div>
        <!--<DatePicker split-panels type="daterange" placement="bottom-start" :placeholder="$t('m.form.selectdate')" style="width: 180px" @on-change="changedate"></DatePicker>-->
        <DatePicker type="month" placeholder="Start Time" style="width: 176px" @on-change="startdate"></DatePicker> -
        <DatePicker type="month" placeholder="End Time" style="width: 176px" @on-change="enddate"></DatePicker>
        <!--<div style="position: relative">-->
          <!--<Tree :data="region" show-checkbox @on-check-change="selregion"></Tree>-->
        <!--</div>-->
        <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        <div style="margin:10px 0;">
          <Table :loading="loading" stripe ref="selection" :columns="monthcolumns" :data="monthdatas"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="monthdatatotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>
<style>

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


