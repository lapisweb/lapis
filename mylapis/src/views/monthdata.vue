<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <Input clearable v-model.trim="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
        <Input clearable  v-model.trim="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
        <Input clearable  v-model.trim="meterno" :placeholder="$t('m.open.metercolumnstitle1')" style="width: 180px"></Input>
        <div style="margin:8px 0"></div>
        <DatePicker split-panels type="daterange" placement="bottom-start" :placeholder="$t('m.form.selectdate')" style="width: 180px" @on-change="changedate"></DatePicker>
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
        selecttime:[],
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
      selregion(selected){
        console.log(selected)
      },
      changedate(date){
        this.selecttime=date;
      },
      query(){
        this.loading=true;
        let startTime=this.selecttime[0];
        let endTime=this.selecttime[1];
        this.$http({
          url:'walkby/findFreeDataByPage.do',
          body: {
            conditions: {
              regionCode:'',
              customerName:this.name,
              telephone:this.tel,
              startTime:startTime,
              endTime:endTime,
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
          this.monthdatas=response.body.pageInfo.list;
          this.loading=false;
        })
      },
      changePage(page){
        this.loading=true;
        let startTime=this.selecttime[0];
        let endTime=this.selecttime[1];
        this.$http({
          url:'walkby/findFreeDataByPage.do',
          body: {conditions: {
              regionCode:'',
              customerName:this.name,
              telephone:this.tel,
              startTime:startTime,
              endTime:endTime,
              meterNo:this.meterno,
            },"limit": 10, "page": page},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
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


