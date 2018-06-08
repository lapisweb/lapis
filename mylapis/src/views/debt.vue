<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <Input v-model="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
        <Input v-model="idcard" :placeholder="$t('m.customerinfo.label2')" style="width: 180px"></Input>
        <Input v-model="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
        <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        <div style="margin:10px 0">
          <Button type="primary" @click="exportdebtData" icon="ios-download-outline">{{$t('m.common.import')}}</Button>
          <Button type="success" @click="printData" icon="ios-printer-outline">{{$t('m.common.print')}}</Button>
          <Table :data="customerdata" :columns="custominfo" :loading="loading" ref="debtinfo" stripe style="margin-top: 10px;"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="customertotal" :current="1" @on-change="changePage"></Page>
            </div>
          </div>
        </div>
      </div>
      <Modal
        v-model="modaladd"
        title="Custom width"
        @on-ok="adddebt"
        width="300">
        <p style="line-height: 25px;">{{$t('m.debt.addamount')}}($)</p><InputNumber style="width: 200px;" v-model="addamount"></InputNumber>
      </Modal>
      <Modal
        v-model="modalreduce"
        title="Custom width"
        @on-ok="reducedebt"
        width="300">
        <p style="line-height: 25px;">{{$t('m.debt.reducemethod')}}</p>
        <Select v-model="reducemethod" style="width:200px" @on-change="selectmethod">
          <Option v-for="item in methoddata" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <p style="line-height: 25px;">{{$t('m.debt.reduceamount')}}($)</p><InputNumber :disabled="adisable" :min="0" style="width: 200px;" v-model="reduceamount"></InputNumber>
        <p style="line-height: 25px;">{{$t('m.debt.reducepur')}}(100%)</p><InputNumber :disabled="pdisable" :min="0" :max="100" style="width: 200px;" v-model="reducepur"></InputNumber>
        <p style="line-height: 25px;">{{$t('m.debt.description')}}</p>
        <Input v-model="description" type="textarea" placeholder="Enter something..."></Input>
      </Modal>
      <Modal
        v-model="modalrepay"
        title="Custom width"
        @on-ok="repaydebt"
        width="300">
        <p style="line-height: 25px;">{{$t('m.debt.repayamount')}}($)</p><InputNumber style="width: 200px;" v-model="repayamount"></InputNumber>
      </Modal>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>
<style>

</style>
<script>
  export default {
    name:'debt',
    data() {
      return {
        addindex:'',
        reduceindex:'',
        repayindex:'',
        modaladd:false,
        modalreduce:false,
        modalrepay:false,
        name: "",
        idcard: "",
        tel: "",
        loading:false,
        customertotal:0,
        addamount:0,
        reduceamount:0,
        reducepur:0,
        repayamount:0,
        reducemethod:'',
        adisable:true,
        pdisable:true,
        description:'',
        discountnum:0,
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
            title: this.$t('m.customerinfo.label8'),
            key: 'debt',
          },
          {
            title: this.$t('m.customerinfo.label6'),
            key: 'customertype'
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
          {
            title: this.$t('m.meter.operate'),
            key: 'action',
            align: 'center',

            width:160,
            render: (h, params) => {
              return h('div', [
                h('Poptip',{
                  props: {
                    trigger:"hover",
                    content:this.$t('m.debt.repay')
                  },
                },[h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '4px'
                      },
                      on: {
                        click: () => {
                          this.repay(params.index)
                        }
                      }
                    },[h('Icon',{
                      props:{
                        color:'#fff',
                        type: 'reply',
                      }
                    }),
                    ]
                  ),
                ]),
                h('Poptip',
                  {
                    props: {
                      trigger:"hover",
                      content:this.$t('m.debt.add')
                    },
                  },[h('Button', {
                      props: {
                        type: 'info',
                        size: 'small',
                      },
                      style: {
                        marginRight: '4px'
                      },
                      on: {
                        click: () => {
                          this.increase(params.index)
                        }
                      }
                    },[h('Icon',{
                      props:{
                        color:'#fff',
                        type: 'plus-round',
                      }
                    }),
                    ]
                  ),
                ]),
                h('Poptip',
                  {
                    props: {
                      trigger:"hover",
                      content:this.$t('m.debt.reduce')
                    },
                  },[h('Button', {
                        props: {
                          type: 'success',
                          size: 'small',
                        },
                        on: {
                          click: () => {
                            this.reduce(params.index)
                          }
                        }
                      },[h('Icon',{
                        props:{
                          color:'#fff',
                          type: 'minus-round',
                        }
                      }),
                      ]
                    ),
                  ])
              ]);
            }
          }
        ],
        //表中信息
        customerdata: [],
        //还债方式
        methoddata: [
          {
            value: 0,
            label:this.$t('m.debt.label1')
          },
          {
            value: 1,
            label: this.$t('m.debt.label2')
          },
      ]
      }
    },
    methods: {
      query:function () {
        this.message=false;
        this.loading=true;
        this.show=true,
          this.customerdata=[];
        this.showmanagement=true;
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
      increase(index){
        this.addamount=0;
        this.addindex=index;
        this.modaladd=true;
      },
      adddebt(){
        var customerid=this.customerdata[this.addindex].customerid;
        this.$http({
          url:'biz/debt/increaseDebt.do',
          body:{
            customerId:customerid,
            increaseNumber: this.addamount,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.customerDebt) {
            this.customerdata[this.addindex].debt = response.body.customerDebt.currentDebt;
          }
          if(response.body.code==0){
            this.$Message.success(this.$t('m.debt.message1'));
          }else{
            this.$Message.error(response.body.errors);
          }
        })
      },
      reduce(index){
        this.reducemethod='';
        this.adisable=true;
        this.pdisable=true;
        this.reduceamount=0;
        this.reducepur=0;
        this.reduceindex=index;
        this.modalreduce=true;
      },
      reducedebt(){
        if(this.reducemethod==0){
          this.discountnum=this.reduceamount
        }
        if(this.reducemethod==1){
          this.discountnum=this.reducepur
        }
        var customerid=this.customerdata[this.reduceindex].customerid;
        this.$http({
          url:'biz/debt/discountDebt.do',
          body:{
            customerId: customerid,
            discountNumber: this.discountnum,
            discountType: this.reducemethod,
            description: this.description,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.customerDebt){
            this.customerdata[this.reduceindex].debt=response.body.customerDebt.currentDebt;
          }
          if(response.body.code==0){
            this.$Message.success(this.$t('m.debt.message3'));
          }else{
            this.$Message.error(this.$t('m.debt.message4'));
          }
        })
      },
      repay(index){
        this.repayamount=0;
        this.addamount=0;
        this.repayindex=index;
        this.modalrepay=true;
      },
      repaydebt(){
        var customerid=this.customerdata[this.repayindex].customerid;
        this.$http({
          url:'biz/debt/repayDebt.do',
          body:{
            customerId:customerid,
            repayNumber: this.repayamount,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.customerDebt) {
            this.customerdata[this.repayindex].debt = response.body.customerDebt.currentDebt;
          }
          if(response.body.code==0){
            this.$Message.success(this.$t('m.debt.message5'))
          }else{
            this.$Message.error(this.$t('m.debt.message6'))
          }
        })
      },
      selectmethod(value){
        if(value===0){
          this.adisable=false;
          this.pdisable=true;
        } else if(value===1){
          this.pdisable=false;
          this.adisable=true;
        }
      },
      exportdebtData(){
        this.$refs.debtinfo.exportCsv({
          filename: 'Debt data',
          columns: this.custominfo.filter((col, index) => index<5),
          data: this.customerdata.filter((data, index) => index!=-1)
        });
      },
      printData(){

      },
    }
  }
</script>

