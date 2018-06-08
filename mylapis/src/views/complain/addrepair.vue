<template>
  <div class="h-content" style="margin:0 100px;">
    <h3 class="title">{{$t('m.maintain.selcus')}}</h3>
    <div>
      <Input clearable v-model="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
      <Input clearable v-model="idcard" :placeholder="$t('m.customerinfo.label2')" style="width: 180px"></Input>
      <Input clearable v-model="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
      <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
    </div>
    <ul v-show="message" class="purmessage" style="margin-top: 10px;">
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
    </ul>
    <div style="margin:10px 0;" v-if="show">
      <Table  highlight-row stripe :loading="loading"  :columns="custominfo" :data="customerdata" @on-row-click="selected"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="customertotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
        </div>
      </div>
    </div>
    <h3 class="title">{{$t('m.maintain.faultinfo')}}</h3>
    <p style="line-height: 24px;">{{$t('m.maintain.faultcode')}}</p>
    <Select clearable v-model="breakdownid" style="width:200px">
      <Option v-for="item in breakdown" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <p style="line-height: 24px;">{{$t('m.maintain.faultinfo')}}</p>
    <Input clearable v-model="value6" type="textarea" :rows="3" placeholder="Enter something..."></Input>
    <h3 class="title">{{$t('m.maintain.shift')}}</h3>
    <RadioGroup v-model="state">
      <Radio :label="$t('m.maintain.yes')"></Radio>
      <Radio :label="$t('m.maintain.no')"></Radio>
    </RadioGroup>
    <div class="h-submit">
      <Button type="primary" @click="queding">{{$t('m.common.submit')}}</Button>
      <Button type="ghost" style="margin-left: 8px">{{$t('m.common.cancel')}}</Button>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>
<style>
  .title{
    line-height: 40px;
  }
  .h-submit{
    margin:15px 0;
  }
</style>
<script>
  export default {
    nane:'addtask',
    data() {
      return {
        value6:'',
        name: "",
        idcard: "",
        tel: "",
        show: false,
        message:false,
        customertotal:0,
        currentcustomer:{},
        state:this.$t('m.maintain.yes'),
        breakdownid:'',
        loading:false,
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
        animal: this.$t('m.maintain.yes'),
        breakdown: [
          {
            value: '0',
            label: this.$t('m.maintain.fault1')
          },
          {
            value: '1',
            label: this.$t('m.maintain.fault2')
          },
          {
            value: '2',
            label: this.$t('m.maintain.fault3')
          },
          {
            value: '3',
            label: this.$t('m.maintain.fault4')
          },
          {
            value: '4',
            label: this.$t('m.maintain.fault5')
          },
          {
            value: '5',
            label: this.$t('m.maintain.fault6')
          },
          {
            value: '6',
            label: this.$t('m.maintain.fault7')
          }
        ],
      }
    },
    methods: {
      query:function () {
        this.message=false;
        this.loading=true;
        this.show=true;
        this.customerdata=[];
        this.$http({
          url:'biz/customer/findByPage.do',
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
                  customertype:val.customerType.customerTypeName,
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
                  customertype:val.customerType.customerTypeName,
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
                  customertype:val.customerType.customerTypeName,
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
                  customertype:val.customerType.customerTypeName,
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
          url:'biz/customer/findByPage.do',
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
                  customertype:val.customerType.customerTypeName,
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
                  customertype:val.customerType.customerTypeName,
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
                  customertype:val.customerType.customerTypeName,
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
                  customertype:val.customerType.customerTypeName,
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
      selected(e){
        this.message=true;
        this.show=false,
          this.currentcustomer=e;
        this.$http({
          url:'biz/trade/findCusLastPur.do',
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
      queding(){
        let state;
        if(this.state==$t('m.maintain.yes')){
          state=0
        } else if(this.state==$t('m.maintain.no')){
          state=3
        }
        this.$http({
          url:'biz/complaint/add.do',
          body:{
            complainContent:this.value6,
            complaintType:this.breakdownid,
            customerId: this.currentcustomer.customerid,
            state:state
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          console.log(response.body)
          if(response.body.errors){
            this.$Message.success(response.body.errors);
          }else{
            this.$Message.success(response.body.msg);
            this.$router.push('/index/repair');
          }
        });

      }
    },
  }
</script>

