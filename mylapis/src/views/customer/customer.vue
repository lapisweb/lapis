<template>
  <div class="h-content">
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/index">
          <Icon type="ios-home-outline"></Icon> Home
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="social-buffer-outline"></Icon>Customer Management
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="margin:10px 100px;">
      <div style="margin-top: 10px;">
        <Input v-model.trim="customername" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
        <Input v-model.trim="idcard" :placeholder="$t('m.customerinfo.label2')" style="width: 180px"></Input>
        <Input v-model.trim="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
        <Button type="primary" icon="ios-search" @click="querymanage">{{$t('m.common.query')}}</Button>
      </div>
      <div style="margin-top: 10px;">
        <Table  stripe :loading="loading" border :columns="custominfo" :data="customerdata"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="customertotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'customer',
    data(){
      return{
        //数据定义
        loading:false,
        customertotal:0,
        customerno:'',
        customername:'',
        idcard:'',
        tel:'',
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
            width:190,
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
            render: (h, params) => {
              return h('div', [
                h('Poptip',{
                  props: {
                    confirm:true,
                    title:this.$t('m.common.sure'),
                  },
                  on: {
                    'on-ok': () => {
                      this.remove(params.index,params.row)
                    },
                  }
                },[h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                  },[h('Icon',{
                    props:{
                      color:'#fff',
                      type: 'android-delete',
                    }
                  }),
                  ]
                ),
                ]),
              ]);
            }
          }
        ],
        //表中信息
        customerdata: [

        ],
      }
    },
    methods:{
      //查找客户
      querymanage:function () {
        this.loading=true;
        this.customerdata=[];
        this.$http({
          url:'biz/customer/findByPage.do',
          body:{
            "conditions": {
              customerNum:this.customerno,
              name:this.customername,
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
          this.loading=false;
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
      //分页查找
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
            "page": page,
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
          this.loading=false;
        })
      },
      remove(index,row){
        this.$http({
          url:'biz/customer/del.do',
          body:{
            id:row.customerid
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;'
          },
        }).then((response) => {
          if(response.body.msg){
            this.customerdata.splice(index, 1);
            this.customertotal=this.customertotal-1;
            this.$Message.success(response.body.msg);
          }else{
            this.$Message.error(response.body.errors);
          }
        });
      }
    },
    created(){
      this.querymanage()
    }
  }
</script>
<style scoped>
  .breadcrumb{
    height:40px;
    box-shadow: 0 2px 3px 0px rgba(100, 100, 100, 0.1);
    margin-bottom: 4px;
    line-height: 40px;
    box-sizing: border-box;
    padding:0 27px;
  }
</style>

