<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <Input v-model="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
        <Input v-model="idcard" :placeholder="$t('m.customerinfo.label2')" style="width: 180px"></Input>
        <Input v-model="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
        <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        <ul v-show="message" class="purmessage">
          <li>
            <Card :bordered="false">
              <h4 slot="title" style="line-height: 20px"><Icon type="person" color="#2D8CF0"></Icon> {{$t('m.main.customerinfo')}}</h4>
              <p>
                <span>{{$t('m.customerinfo.label1')}}:{{currentcustomer.name}}</span>
                <span>{{$t('m.customerinfo.label2')}}:{{currentcustomer.idcard}}</span>
                <span>{{$t('m.customerinfo.label3')}}:{{currentcustomer.tel}}</span>
              </p>
              <p>
                <span>{{$t('m.customerinfo.label6')}}:{{currentcustomer.customertype}}</span>
                <span>{{$t('m.customerinfo.label7')}}:{{currentcustomer.meterno}}</span>
                <span>{{$t('m.customerinfo.label5')}}:{{currentcustomer.address}}</span>
              </p>
            </Card>
          </li>
          <li>
            <Card :bordered="false">
            <h4 slot="title" style="line-height: 20px"><Icon type="bag" color="#2D8CF0"></Icon> {{$t('m.customerinfo.lastpurchase')}}</h4>
            <p v-if="traderecord!='{}'">
              <span>{{$t('m.customerinfo.lastdate')}}:{{traderecord.tradeDate}}</span>
              <span>{{$t('m.customerinfo.lastmoney')}}:{{traderecord.paymentAmount}}</span>
              <span>{{$t('m.customerinfo.lastaddifee')}}:{{traderecord.totalFee}}</span>
              <br>
              <span>{{$t('m.customerinfo.lastrealmoney')}}:{{traderecord.purchaseAmount}}</span>
              <span>{{$t('m.customerinfo.lastrealvolum')}}:{{traderecord.purchaseVolume}}</span>
              <span>{{$t('m.customerinfo.state')}}:{{traderecord.billState}}</span>
            </p>
            <p v-if="traderecord=='{}'">
              <span>{{$t('m.customerinfo.lastnone')}}</span>
            </p>
            </Card>
          </li>
        </ul>
        <div style="margin:10px 0" v-if="show">
          <Table highlight-row stripe :loading="loading" border :columns="custominfo" :data="customerdata" @on-row-click="selected"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="customertotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
        </div>
        <div style="margin:10px 0">
          <p style="line-height:30px;color:#888;">{{$t('m.purchase.money')}}($)/购买量(m³)</p>
          <InputNumber v-model="pregoumai" style="width:220px"></InputNumber>
          <RadioGroup v-model="paytype" style="margin-left: 15px;">
            <Radio label="按金额购买" ></Radio>
            <Radio label="按量购买"></Radio>
          </RadioGroup>
        </div>
        <Button :disabled="noclick" type="success" @click="goumai">&nbsp; {{$t('m.purchase.purchase')}} &nbsp;</Button>
        <section v-if="token" style="margin:10px 0">
          <Card :bordered="false">
            <h4 slot="title" style="line-height: 20px;"><Icon type="flag" color="#2D8CF0"></Icon> Token</h4>
            <p style="line-height: 20px;font-size: 16px">{{tokendata}}</p>
          </Card>
        </section>
        <Modal
          :title="$t('m.purchase.purchase')"
          v-model="purchase"
          :styles="{top:'200px'}"
          @on-ok="confirm">
          <p>{{$t('m.customerinfo.lastmoney')}} <span>{{prvepurchase.paymentAmount}}</span></p>
          <p>{{$t('m.customerinfo.lastaddifee')}} <span>$ {{prvepurchase.pureFeeAmount}}</span></p>
          <p>{{$t('m.customerinfo.lastrealmoney')}} <span>$ {{prvepurchase.purchaseAmount}}</span></p>
          <p>{{$t('m.customerinfo.lastrealvolum')}} <span>{{prvepurchase.purchaseVolume}}m³</span></p>
        </Modal>
      </div>
    </div>
    <my-footer1></my-footer1>
    <section class="purinvoice" id="purprint">
      <div class="incontents">
        <h3>购买发票</h3>
        <p>发票编号: <span>2017111501</span></p>
        <p>创建日期: <span>2017/11/15</span> </p>
        <ul class="left-invoice">
          <li class="titles">
            <p>客户信息</p>
          </li>
          <li>
            <span>Name:</span> <span>{{invoicepurdata.customerName}}</span>
          </li>
          <li>
            <span>电话:</span><span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>身份证:</span><span>{{invoicepurdata.identityCode}}</span>
          </li>
          <li>
            <span>Description</span> <span> </span>
          </li>
          <li>
            <span>Charge volume:</span><span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>Original debt:</span><span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>Debt payment:</span><span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>Remaining debt:</span><span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>Additional fee:</span> <span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>Current purchase date:</span><span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>Last purchase date:</span><span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>Days from last purchase date:</span> <span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>All buy:</span><span>{{invoicepurdata.telephone}}</span>
          </li>
          <li>
            <span>All consumption:</span> <span>{{invoicepurdata.telephone}}</span>
          </li>
        </ul>
        <div class="total">
          <p>操作员: <span>{{invoicepurdata.loginName}}</span></p>
        </div>
      </div>
    </section>
    <section class="purinvoice" id="fipagprint">
      <div class="incontents">
        <h3>购买发票</h3>
        <p>发票编号: <span>2017111501</span></p>
        <p>创建日期: <span>2017/11/15</span> </p>
        <ul class="left-invoice">
          <li class="titles">
            <p>客户信息</p>
          </li>
          <li>
            <span>Name:</span> <span>Alisa</span>
          </li>
          <li>
            <span>Telephone</span><span>18536984235</span>
          </li>
          <li>
            <span>Address</span><span>zhejianghangzhou</span>
          </li>
        </ul>
        <p>购买明细</p>
        <Table :columns="columns1" :data="data1" style="width:240px;border:1px solid #ccc;"></Table>
        <ul class="left-invoice">
          <li><span>税前总额</span> <span>371.9</span></li>
          <li><span>增值税</span> <span>47</span></li>
          <li><span>加税总额</span> <span>418.9</span></li>
          <li><span>债务</span> <span>47</span>100</li>
          <li><span>应交总额</span><span>518.9</span></li>
        </ul>
        <div class="token">
          <p>token:</p>
          <p>1548 8887 7454 7862 7631</p>
        </div>
        <div class="total">
          <p>操作员: <span>Admin</span></p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import router from '@/router';
  import common from '../kits/common.js';
  export default {
    name:'purchase',
    data() {
      return {
        //数据定义
        name: "",
        idcard: "",
        tel: "",
        purchase:false,
        pregoumai: 0,
        currentcustomer:{},
        show: false,
        message: false,
        token: "",
        tokendata:"",
        modal:false,
        customertotal:0,
        prvepurchase:{},
        traderecord:{},
        loading:false,
        noclick:true,
        paytype:"按金额购买",

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
            width:'160px',
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
        invoicepurdata:{},
        columns1: [
          {
            title: '名称',
            key: 'name',
            width:70,
            textAlign:'left'
          },
          {
            title: '数量',
            key: 'count'
          },
          {
            title: '单价',
            key: 'price'
          },
          {
            title: '总额',
            key: 'total'
          }
        ],
        data1: [
          {
            name: '最低消费',
            count: 1,
            price: '15.88',
            total: '100'
          },
          {
            name: '最低消费',
            count: 1,
            price: '15.88',
            total: '100'
          },
          {
            name: '最低消费',
            count: 1,
            price: '15.88',
            total: '100'
          },
          {
            name: '最低消费',
            count: 1,
            price: '15.88',
            total: '100'
          },
        ]
      }
    },
    methods:{
      query:function () {
        this.tokendata='';
        this.message=false;
        this.loading=true;
        this.show=true;
        this.customerdata=[];
        this.showmanagement=true;
        this.$http({
          url:common.apiLink+'/biz/customer/findByPage.do',
          body:{
            "conditions": {
              name:this.name,
              identityCode:this.idcard,
              telephone:this.tel,
              orderByClause :"open_date desc",
            },
            "limit": 10,
            "page": 1
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          this.customertotal=parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach((val,index)=>{
            if(val.debt&&val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerTypeCode,
                  debt:val.debt.currentDebt,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  additionalFees:val.additionalFees,
                },
              )
            }else if(!val.debt&&val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerTypeCode,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                },
              )
            }else if(val.debt&&!val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerTypeCode,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  debt:val.debt.currentDebt,
                },
              )
            }else if(!val.debt&&!val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerTypeCode,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                },
              )
            }
          });
          this.loading=false;
        })
      },
      changePage(page){
        this.customerdata=[];
        this.$http({
          url:common.apiLink+'/biz/customer/findByPage.do',
          body:{
            "conditions": {
              name:this.customername,
              identityCode:this.idcard,
              telephone:this.tel,
              orderByClause :"open_date desc",
            },
            "limit": 10,
            "page": page
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          response.body.pageInfo.list.forEach((val,index)=>{
            if(val.debt&&val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerTypeCode,
                  debt:val.debt.currentDebt,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  additionalFees:val.additionalFees,
                },
              )
            }else if(!val.debt&&val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerTypeCode,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  additionalFees:val.additionalFees,
                },
              )
            }else if(val.debt&&!val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerTypeCode,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  debt:val.debt.currentDebt,
                },
              )
            }else if(!val.debt&&!val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerTypeCode,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                },
              )
            }
          });
        })
      },
      confirm(){
        let purchaseType;
        if(this.paytype=="按金额购买"){
          purchaseType='1';
        }else if(this.paytype=="按量购买"){
          purchaseType='0';
        }
        let prepurchase=this.pregoumai.toString();
        this.$http({
          url:common.apiLink+'/biz/trade/purchase.do',
          body:{
            customerId:this.currentcustomer.customerid,
            purchaseType:purchaseType,
            purchaseNumber:prepurchase,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          console.log(response.body,'确认购买');
          this.invoicepurdata=response.body.tradeRecord;
          this.tokendata=response.body.tradeRecord.token.replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'');
          if(response.body.code==0){
            this.token=true;
            this.$Modal.success({
              title: 'Purchase',
              content:'<p>Warm Prompt</p><p>购买成功</p>',
              onOk: () => {
                this.printpur();
              },
            });
            this.pregoumai=0;
          }
        });
      },
      selected(e){
        this.message=true;
        this.show=false,
        this.currentcustomer=e;
        this.$http({
          url:common.apiLink+'/biz/trade/findCusLastPur.do',
          body:{
            uid:this.currentcustomer.customerid,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.traderecord=response.body.tradeRecord;
        });
        this.noclick=false;
      },
      goumai(){
        let purchaseType;
        if(this.paytype=="按金额购买"){
          purchaseType='1';
        }else if(this.paytype=="按量购买"){
          purchaseType='0';
        }
        let prepurchase=this.pregoumai.toString();
        this.$http({
          url:common.apiLink+'/biz/trade/preCalc.do',
          body:{
            customerId:this.currentcustomer.customerid,
            purchaseType:purchaseType,
            purchaseNumber:prepurchase,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
            console.log(response.body,'购买前');
            if(response.body.code==502){
              const content = '<p>充值金额太小</p><p>最低充值金额为 $'+response.body.minAmount+'</p><p>最低充值量为 '+response.body.minVolume+' m³</p>';
              this.$Modal.error({
                title: 'Notice',
                content: content
              });
            }else if(response.body.code==503){
              const content = '<p>充值量太小</p><p>最低充值量为'+response.body.minVolume+' m³</p>';
              this.$Modal.error({
                title: 'Notice',
                content: content
              });
            }else if(response.body.data){
              this.prvepurchase=response.body.data;
              this.purchase=true;
            }else{
              this.$Message.error(response.body.errors);
            }
        });
      },
      printpur() {
        this.$http({
          url:common.apiLink+'/sysConfig/findAll.do',
          body: {conditions: {}},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          console.log(response.body.list);
          if(response.body.list[16].state==4){
            if(response.body.list[21]){
              if(response.body.list[21].state==1){
                this.fipagprint()
              }else if(response.body.list[21].state==0){
                this.fipagprintinvoice()
              }
            }

          }else{
            this.mypurprint()
          }

        });
      },
      fipagprintinvoice(){
        console.log(22222222)
      },
      fipagprint(){
        console.log(1111144444444)
        var strBodyStyle=`
        <style>
            *{
            font-family: "Arial, Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",sans-serif;
            }
            th{
              text-align: left;
            }
            .titles p{
              border-bottom:1px dotted #ccc;
            }
            .invoicetitle{
              height:70px;
              line-height: 80px;
              font-weight: 300;
              font-size: 18px;
              color:#18A2E6;
            }
            .topinvoicehead{
              border-bottom:1px solid #ccc;
            }
            .purinvoice h3{
              text-align: center;
              line-height: 40px;
              height:40px;;
              border-bottom:1px solid #ccc;
            }
            .purinvoice p{
              height:24px;
              line-height: 20px;
            }
            .left-invoice{
              margin-top: 10px;
              list-style: none;
              margin-left: -40px;
            }
            .left-invoice li{
              height:24px;
              list-style: none;
            }
            .left-invoice li span{
              line-height: 24px;
            }
            .left-invoice li span:first-child{
              display: block;
              color:#888;
              width:90px;
              float: left;
            }
        </style>
        `;
        var strFormHtml=strBodyStyle+document.getElementById("fipagprint").innerHTML;
        var height=document.getElementById("fipagprint").offsetHeight;
        var width=document.getElementById("fipagprint").offsetWidth;
        console.log(height,width,"高");
        LODOP.PRINT_INIT("aaaaaaaaa");
        LODOP.SET_PRINT_PAGESIZE(1,'250mm','180mm');

        LODOP.ADD_PRINT_HTM(20, 20, '100%','100%',strFormHtml);
        var patt = /AiBao A-80USH/i;//先由用户设置

        for(let j = 0,len=LODOP.Printers.list.length; j < len; j++) {
          if(patt.test(LODOP.Printers.list[j].name)){
            console.log('预览');
            LODOP.SET_PRINTER_INDEXA(j);
            LODOP.PREVIEW();//预览
          }
        }
      },
      mypurprint() {
        var strBodyStyle=`
        <style>
         .titles{
         border-bottom:1px dotted #ccc;
         height:26px;
         }
         .purinvoice{
            background: #fff;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
          }
          .purinvoice h3{
            text-align: center;
            line-height: 30px;
            font-size: 14px;
          }
          .purinvoice h4{
            text-align: center;
            line-height: 30px;
            border-bottom:1px solid #ccc;
            font-size: 14px;
          }
          .purinvoice p{
            height:20px;
            line-height: 20px;
            font-size: 12px;
            font-size: 12px;
          }
          h4{
            line-height: 20px;
          }
          .left-invoice{
            margin-left: -36px;
            margin-top: 5px;
            list-style: none;
          }
          .left-invoice li{
            line-height: 22px;
            list-style: none;
            font-size: 12px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
          }
          .left-invoice li span:first-child{
            display: block;
            color:#888;
          }
          .left-invoice li span:nth-child(2){
            margin-left: 6px;
          }
        </style>
        `;
        var strFormHtml=strBodyStyle+document.getElementById("purprint").innerHTML;
        var height=document.querySelector("#purprint").offsetHeight;
        var width=document.querySelector("#purprint").offsetWidth;
        LODOP.PRINT_INIT("aaaaaaaaa");
        LODOP.SET_PRINT_PAGESIZE(1,width,2200,"");

        LODOP.ADD_PRINT_HTM(20, 20, width,"100%",strFormHtml);
        var patt = /AiBao A-80USH/i;//先由用户设置

        console.log(LODOP);

        for(let j = 0,len=LODOP.Printers.list.length; j < len; j++) {
          if(patt.test(LODOP.Printers.list[j].name)){
            console.log('预览');
            LODOP.SET_PRINTER_INDEXA(j);
            LODOP.PREVIEW();//预览
          }
        }
//        LODOP.PREVIEW();//预览
//        LODOP.PRINT();// 直接打印
      },
    },
  }
</script>
<style>
  .purinvoice{
    display: none;
  }
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .purmessage{
    margin:10px 0;
  }
  .purmessage > li{
    line-height: 30px;
  }
  .purmessage > li:last-child{
    margin-top: 10px;
  }
  .purmessage > li span{
    padding-right:25px;
    font-size: 13px;
  }
  .move-left{
    width: 260px;
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow-y: hidden;
    background: #EEEEEE;
    padding-top: 8px;
    border-right: 1px solid #d7dde4;
  }
  .move-left-in{
    padding:0 20px;
  }
  .move-left-in h3{
    color:#888;
    line-height:35px;
    border-bottom: 1px solid #ccc;
  }
  .fiterRight{
    position: relative;
    top: 84px;
    margin-left: 280px;
    margin-right: 30px;
  }
</style>
