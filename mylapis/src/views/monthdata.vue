<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <Input clearable v-model="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
        <Input clearable  v-model="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
        <Input clearable  v-model="meterno" placeholder="表号" style="width: 180px"></Input>
        <div style="margin:8px 0"></div>
        <DatePicker split-panels type="daterange" placement="bottom-start" placeholder="日期" style="width: 180px" @on-change="changedate"></DatePicker>
        <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        <div style="margin:10px 0;">
          <Table ref="selection" :columns="monthcolumns" :data="monthdatas"></Table>
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
        name:'',
        tel:'',
        meterno:'',
        selecttime:[],
        monthcolumns:[
          {
            title: '客户名',
            key: 'customerName',
          },
          {
            title: '电话号',
            key: 'telephone',
          },
          {
            title: '表号',
            key: 'meterNumber',
          },
          {
            title: '冻结时间',
            key: 'freezeDate',
          },
          {
            title: '冻结数据',
            key: 'freezeVolume',
          },
        ],
        monthdatas:[],
        monthdatatotal:0,
      }
    },
    methods: {
      changedate(date){
        this.selecttime=date;
      },
      query(){
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
          console.log(response.body.pageInfo.list)
          this.monthdatatotal=parseInt(response.body.pageInfo.total);
          this.monthdatas=response.body.pageInfo.list;
        })
      },
      changePage(page){
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
        })
      },
    },
    created(){
      this.query()
    }
  }
</script>


