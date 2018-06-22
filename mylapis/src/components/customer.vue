<template>
  <div  class="h-content" style="margin:10px 100px;">
    <div>
      <Input clearable v-model.trim="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
      <Input clearable v-model.trim="idcard" :placeholder="$t('m.customerinfo.label2')" style="width: 180px"></Input>
      <Input clearable  v-model.trim="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
      <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
    </div>
    <div style="margin:10px 0" v-if="show">
      <Table highlight-row stripe :loading="loading" :columns="custominfo" :data="customerdata" @on-row-click="selected"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="customertotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
        </div>
      </div>
    </div>
    <purchase :currentcustomer="currentcustomer" :traderecord="traderecord" :message="message"></purchase>
  </div>
</template>
<script>
  import Realtime from "../views/purchase1"
  export default {
    name:'customer',
    data() {
      return {
        //数据定义
        install:'',
        name: "",
        idcard: "",
        tel: "",
        show: false,
        customertotal:0,
        message:true,
        loading:false,
        currentcustomer:{},
        traderecord:{},
        //用户信息列表
        //表头定义
        custominfo: [
          {
            title: this.$t('m.customerinfo.label1'),
            key: 'name'
          },
          {
            title: this.$t('m.customerinfo.label2'),
            key: 'idcard',
          },
          {
            title: this.$t('m.customerinfo.label3'),
            key: 'tel',
          },
          {
            title: this.$t('m.customerinfo.label4'),
            key: 'opendate'
          },
          {
            title: this.$t('m.customerinfo.label6'),
            key: 'customertype'
          },
          {
            title: this.$t('m.customerinfo.label8'),
            key: 'debt',
          },
          {
            title: this.$t('m.customerinfo.label7'),
            key: 'meterno',
          },
          {
            title: this.$t('m.customerinfo.label5'),
            key: 'address',
          },
          {
            title: this.$t('m.customerinfo.label9'),
            key: 'status',
            width:160,
            render: (h, params) => {
              const row = params.row;
              let color = row.status;
              let text = row.status;
              if(row.status === '1' ){
                color= 'green';
                text=this.$t('m.cancel.text1');
              }else if(row.status === '0'){
                color='red';
                text=this.$t('m.cancel.text2')
              }else if(row.status === '2'){
                color='red';
                text=this.$t('m.cancel.text3')
              }else if(row.status === '3'){
                color='red';
                text=this.$t('m.cancel.text4')
              }else if(row.status === '4'){
                color='blue';
                text=this.$t('m.cancel.text5')
              }

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
        ],
        //表中信息
        customerdata: [],
      }
    },
    components:{
      "purchase": Realtime
    },
    methods: {
      query: function () {
        this.tokendata = '';
        this.message = false;
        this.loading = true;
        this.show = true;
        this.customerdata = [];
        this.showmanagement = true;
        this.$http({
          url: 'biz/customer/findByPage.do',
          body: {
            "conditions": {
              name: this.name,
              identityCode: this.idcard,
              telephone: this.tel,
              orderByClause: "open_date desc",
            },
            "limit": 10,
            "page": 1
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          this.customertotal = parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach((val, index) => {
            if (val.debt && val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  debt: val.debt.currentDebt,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  additionalFees: val.additionalFees,
                },
              )
            } else if (!val.debt && val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                },
              )
            } else if (val.debt && !val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  debt: val.debt.currentDebt,
                },
              )
            } else if (!val.debt && !val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                },
              )
            }
          });
          this.loading = false;
        })
      },
      changePage(page) {
        this.tokendata = '';
        this.message = false;
        this.loading = true;
        this.show = true;
        this.customerdata = [];
        this.showmanagement = true;
        this.$http({
          url: 'biz/customer/findByPage.do',
          body: {
            "conditions": {
              name: this.customername,
              identityCode: this.idcard,
              telephone: this.tel,
              orderByClause: "open_date desc",
            },
            "limit": 10,
            "page": page
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          response.body.pageInfo.list.forEach((val, index) => {
            if (val.debt && val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  debt: val.debt.currentDebt,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  additionalFees: val.additionalFees,
                },
              )
            } else if (!val.debt && val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  additionalFees: val.additionalFees,
                },
              )
            } else if (val.debt && !val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  debt: val.debt.currentDebt,
                },
              )
            } else if (!val.debt && !val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                },
              )
            }
          });
          this.loading = false;
        })
      },
      selected(e) {
        this.message = true;
        this.show = false;
        this.currentcustomer = e;
        this.$http({
          url: 'biz/trade/findCusLastPur.do',
          body: {
            uid: this.currentcustomer.customerid,
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.traderecord = response.body.tradeRecord;
          console.log(response.body);
        });
        this.noclick = false;
      },
    },
  }
</script>
<style>

</style>

