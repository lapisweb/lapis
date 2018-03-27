<template>
  <div>
    <div class="move-left">
      <ul>
        <li>
          <h3>{{$t('m.deal.filtrate')}}</h3>
        </li>
        <li>
          <p>{{$t('m.deal.tradingtype')}}</p>
          <Select v-model="tradetype" style="width:200px">
            <Option v-for="item in tradetypedata" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <p>{{$t('m.customerinfo.info')}}</p>
          <Input v-model="name"  style="width: 96px" :placeholder="$t('m.customerinfo.label1')"></Input>
          <Input v-model="tel"  style="width: 98px" :placeholder="$t('m.customerinfo.label3')"></Input>
          <div style="height:6px;" ></div>
          <Input v-model="idcard"  style="width: 200px" :placeholder="$t('m.customerinfo.label2')"></Input>
        </li>
        <li>
          <p>{{$t('m.deal.daterange')}}</p>
          <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px" @on-change="startenddate"></DatePicker>
        </li>
        <li>
          <p>{{$t('m.deal.billstate')}}</p>
          <Select v-model="billstate" style="width:200px">
            <Option v-for="item in billstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <p>{{$t('m.deal.operator')}}</p>
          <Select v-model="operator" style="width:200px">
            <Option v-for="item in alloperator" :value="item.id" :key="item.id">{{ item.loginName }}</Option>
          </Select>
        </li>
        <li>
          <Button type="primary" icon="ios-search" @click="searchtrade">{{$t('m.common.query')}}</Button>
        </li>
      </ul>
    </div>
    <div class="fiterRight">
      <Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> {{$t('m.common.import')}}</Button>
      <!--<Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出所有债务信息</Button>-->
      <!--<Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出所有购买记录</Button>-->
      <div style="height:10px"></div>
      <Table :loading="loading" :data="tradingdata" :columns="tradingcol" stripe ref="table"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalpage" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
      <my-footer1></my-footer1>
    </div>
  </div>
</template>
<script>
  import common from '../kits/common.js';
  export default {
    data() {
      return {
        tradetype:'',
        invoiceno:'',
        billstate:'',
        operator:'',
        value1: [],
        totalpage:0,
        name:'',
        idcard:'',
        tel:'',
        rangedate:[],
        loading:false,
        datearray:[],
        billstatus:[
          {
            value:1,
            label:this.$t('m.cancel.text1'),
          },
          {
            value:0,
            label:this.$t('m.deal.label2'),
          },
          {
            value:2,
            label:this.$t('m.deal.label3'),
          },
          {
            value:4,
            label:this.$t('m.deal.label4'),
          },
        ],
        tradetypedata: [
          {
            value: 0,
            label: this.$t('m.main.open')
          },
          {
            value: 1,
            label: this.$t('m.purchase.purchase')
          },
          {
            value: 2,
            label: this.$t('m.deal.label5')
          },
          {
            value: 3,
            label: this.$t('m.deal.label6')
          },
          {
            value: 4,
            label: this.$t('m.deal.label7')
          },
          {
            value: 6,
            label: this.$t('m.deal.label8')
          },
          {
            value: 7,
            label: this.$t('m.deal.label9')
          },
          {
            value: 8,
            label: this.$t('m.deal.label10')
          },
          {
            value: 9,
            label: this.$t('m.deal.label11')
          },
        ],
        alloperator: [

        ],
        models2: '',
        tradingdata:[],
        tradingcol: [
          {
            title: this.$t('m.customerinfo.label1'),
            key: 'customerName'
          },
          {
            title: this.$t('m.customerinfo.label2'),
            key: 'identityCode'
          },
          {
            title: this.$t('m.customerinfo.label3'),
            key: 'telephone'
          },
          {
            title: this.$t('m.customerinfo.lastdate'),
            key: 'tradeDate'
          },
          {
            title: this.$t('m.deal.title1'),
            key: 'tradeType'
          },
          {
            title:this.$t('m.deal.title2'),
            key: 'invoiceNumber'
          },
          {
            title: this.$t('m.customerinfo.lastmoney'),
            key: 'paymentAmount'
          },
          {
            title: this.$t('m.customerinfo.lastrealmoney'),
            key: 'purchaseAmount'
          },
          {
            title: this.$t('m.customerinfo.lastrealvolum'),
            key: 'purchaseVolume'
          },
        ]
      }
    },
    methods: {
      searchtrade(){
        let starttime=this.datearray[0];
        let endtime=this.datearray[1];
        this.loading=true;
        this.$http({
          url:common.apiLink+'/biz/tradeView/findByPage.do',
          body:{
            "conditions": {
              customerIdCode:this.idcard,
              customerName:this.name,
              operatorId:this.operator,
              tradeType:this.tradetype,
              billState:this.billstate,
              startTime:starttime,
              endTime:endtime,
              orderByClause :'trade_date desc'
            },
            "limit":10,
            "page": 1
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.errors){
            this.$Message.error(response.body.errors);
          }else{
            this.totalpage=parseInt(response.body.pageInfo.total);
            this.tradingdata=response.body.pageInfo.list;
            this.loading=false;
          }

        })
      },
      changePage(page) {
        this.loading=true;
        this.$http({
          url:common.apiLink+'/biz/tradeView/findByPage.do',
          body:{
            "conditions": {
              orderByClause :'trade_date desc'
            },
            "limit":10,
            "page": page
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.tradingdata=response.body.pageInfo.list;
          this.loading=false;
        })
      },
      startenddate(date){
        this.datearray=date;
      },
      exportData () {
        this.$refs.table.exportCsv({
          filename: 'The trade data'
        });
      }
    },
    created(){
      //获取操作员
      this.$http({
        url:common.apiLink+'/sys/user/listAllOperator.do',
        body:{

        },
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        if(response.body.errors){

        }else{
          this.alloperator=response.body.operators
        }

      })
    }
  }
</script>
<style>
  .move-left{
    width: 240px;
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow-y: auto;
    background: #EEEEEE;
    padding-top: 8px;
    border-right: 1px solid #d7dde4;
  }
  .move-left > ul{
    width:88%;
    margin:0 auto;
  }
  .move-left > ul > li p{
    color:#888;
    line-height:32px;
  }
  .move-left > ul > li:first-child{
    height:40px;
    border-bottom: 1px solid #ccc;
  }
  .move-left > ul > li:first-child h3{
    line-height: 36px;
    color:#888;
  }
  .move-left > ul > li:last-child{
    border-top:1px solid #ccc;
    line-height: 50px;
    margin-top:15px;
  }
  .fiterRight{
    position: relative;
    top: 84px;
    margin-bottom:85px;
    margin-left: 260px;
    margin-right: 30px;
  }
  .fiterRight .footer{
    left:240px;
    right:0
  }
</style>

