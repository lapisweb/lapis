<template>
  <div>
    <div class="h-content">
      <div class="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/index">
            <Icon type="ios-home-outline"></Icon> Home
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="social-buffer-outline"></Icon> Refund at site
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div style="margin:10px 100px;">
        <Input v-model.trim="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
        <Input v-model.trim="idcard" :placeholder="$t('m.customerinfo.label2')" style="width: 180px"></Input>
        <Input v-model.trim="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
        <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        <br>
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
              <h4 slot="title" style="line-height: 20px"><Icon type="bag" color="#2D8CF0"></Icon> {{$t('m.cancel.ablecancel')}}</h4>
              <p v-if="traderecord">
                <span>{{$t('m.customerinfo.lastdate')}}:{{traderecord.tradeDate}}</span>
                <span>{{$t('m.customerinfo.lastmoney')}}:{{traderecord.paymentAmount}}</span>
                <span>{{$t('m.customerinfo.lastaddifee')}}:{{traderecord.totalFee}}</span>
                <span>{{$t('m.customerinfo.lastrealmoney')}}:{{traderecord.purchaseAmount}}</span>
                <span>{{$t('m.customerinfo.lastrealvolum')}}:{{traderecord.purchaseVolume}}</span>
                <span>{{$t('m.customerinfo.state')}}:{{traderecord.billState}}</span>
              </p>
              <div v-if="!traderecord">
                <p><Icon type="close-circled" color="red"></Icon> {{$t('m.cancel.disablecancel')}}</p>
              </div>
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
          <Button :disabled="applyback" type="success" @click="apply()">&nbsp; {{$t('m.cancel.apply')}} &nbsp;</Button>
          <Button :disabled="execute" type="primary" @click="instance()">&nbsp; {{$t('m.cancel.instance')}} &nbsp;</Button>
          <Button v-show="reapplyback" type="success" @click="reapply()">&nbsp; {{$t('m.cancel.reapply')}} &nbsp;</Button>
          <Button v-show="over"  type="warning" @click="overtasks()">&nbsp; {{$t('m.cancel.overtasks')}} &nbsp;</Button>
        </div>
        <Modal
          :title="$t('m.cancel.apply')"
          v-model="modal"
          :styles="{top:'150px'}"
          @on-ok="confirm">
          <p style="line-height: 25px;">{{$t('m.customerinfo.label1')}} <span>{{currentcustomer.name}}</span>
          <p style="line-height: 25px;">{{$t('m.customerinfo.label2')}} <span>{{currentcustomer.idcard}}</span></p>
          <p style="line-height: 25px;">{{$t('m.customerinfo.label3')}} <span>{{currentcustomer.tel}}</span></p>
          <!--<p style="line-height: 25px;">退款金额 <span> </span></p>-->
          <p style="line-height: 25px;">{{$t('m.cancel.remarks')}}</p>
          <textarea name="" id="" cols="70" rows="3"></textarea>
        </Modal>
        <section v-if="checking">
          <Card :bordered="false">
          <h4 slot="title" style="line-height: 20px;">{{$t('m.cancel.applystatus')}}</h4>
          <p style="line-height: 20px;"> <Icon type="checkingstatusicon" color="checkingstatusiconcolor"></Icon> {{checkingstatus}}</p>
          </Card>
        </section>
      </div>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>
<style>
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
  .breadcrumb{
    height:40px;
    box-shadow: 0 2px 3px 0px rgba(100, 100, 100, 0.1);
    margin-bottom: 4px;
    line-height: 40px;
    box-sizing: border-box;
    padding:0 27px;
  }
</style>
<script>
  export default {
    name:'cancel',
    data(){
      return{
        name: "",
        idcard: "",
        tel: "",
        currents:"",
        show:false,
        message:false,
        checking:false,
        loading:false,
        modal:false,
        currentcustomer:{},
        traderecord:null,
        customertotal:0,
        applyback:true,
        execute:true,
        checkingstatus:this.$t('m.cancel.unchecked'),
        checkingstatusicon:"close-circled",
        checkingstatusiconcolor:'#ed3f14',
        taskid:'',
        reapplyback:false,
        over:false,
        zhuangtai:{},
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
        customerdata: [

        ],
      }
    },
    computed: {},
    methods:{
      query:function () {
        let vm=this;
        vm.show=true;
        this.message=false;
        this.loading=true;
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
      apply(){
        this.modal=true;
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
      confirm(){
        this.token=true;
        this.$http({
          url:'biz/trade/applyRefundTrade.do',
          body:{
            customerId:this.currentcustomer.customerid,
            refundTradeId:this.traderecord.tradeId,
            taskType:"0",
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          if(response.body.msg){
            this.$Message.success(response.body.msg);
          }else{
            this.$Message.error(response.body.errors);
          }
        })
      },
      selected(e){
        this.show=false;
        this.message=true;
        this.current=e;
        this.disabled=false;
        this.message=true;
        this.currentcustomer=e;
        this.$http({
          url:'biz/trade/findCanRefundTrade.do',
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
          if(this.traderecord){
            this.$http({
              url:'biz/trade/getRefundTradeTask.do',
              body:{
                refundTradeId:this.traderecord.tradeId,
              },
              credentials:true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
            }).then((response) => {
              if(response.body.refundTask){
                this.zhuangtai=response.body.refundTask;
                this.taskid=response.body.refundTask.taskId;
                if(response.body.refundTask.taskType==0&&response.body.refundTask.auditing==1&&response.body.refundTask.enableRefund==true&&response.body.refundTask.taskState==0){
                  this.execute=false;
                  this.checkingstatus=this.$t('m.cancel.approve');
                  this.checkingstatusicon='checkmark-circled';
                  this.checkingstatusiconcolor='#19be6b'
                  this.checking=true;
                }else if(response.body.refundTask.taskType==0&&response.body.refundTask.auditing==1&&response.body.refundTask.enableRefund==false&&response.body.refundTask.taskState==0){
                  this.checkingstatus=this.$t('m.cancel.refused');
                  this.checking=true;
                }
                if((response.body.refundTask.taskState==0&&response.body.refundTask.auditing==1)||(response.body.refundTask.taskState==-1)){
                  this.reapplyback=true;
                }
                if(response.body.refundTask.taskState==0){
                  this.over=true;
                }
              }else{
                this.applyback=false;
              }
            });
          }else{
            this.applyback=true;
          }
        });
      },
      overtasks(){
        this.$http({
          url:'biz/trade/endTaskUnDoRefund.do',
          body:{
            customerId:this.currentcustomer.customerid,
            refundTradeId:this.traderecord.tradeId,
            taskType:"0",
            taskId: this.taskid,
            opeartorId: "100000001"
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.msg){
            this.$Message.success(response.body.msg);
          }else{
            this.$Message.error(response.body.errors);
          }
        })
      },
      instance(){
        this.$http({
          url:'biz/trade/doRefundLocale.do',
          body:{
            customerId:this.currentcustomer.customerid,
            refundTradeId:this.traderecord.tradeId,
            taskType:"0",
            taskId: this.taskid,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          if(response.body.msg){
            this.$Message.success(response.body.msg);
          }else{
            this.$Message.error(response.body.errors);
          }
          this.execute=true;
          this.checking=false;
        })
      },
      reapply(){
        this.$http({
          url:'biz/trade/reApplyRefundTrade.do',
          body:{
            customerId:this.currentcustomer.customerid,
            taskId: this.taskid,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          if(response.body.msg){
            this.$Message.success(response.body.msg);
          }else{
            this.$Message.error(response.body.errors);
          }
        })
      },
    },
  }
</script>
