<template>
  <div>
    <div class="h-content">
      <div class="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/index">
            <Icon type="ios-home-outline"></Icon> Home
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="social-buffer-outline"></Icon> Refund Task Verify
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div style="margin: 10px 100px;">
        <p class="datas">{{$t('m.check.unaudited')}}</p>
        <Table highlight-row :columns="customercol" :data="customerdata" @on-selection-change="selectedcol"></Table>
        <div style="margin-top: 10px;">
          <Select style="width:200px;" @on-change="selected">
            <Option v-for="item in checking" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button @click="ok">{{$t('m.common.submit')}}</Button>
        </div>
      </div>

    <my-footer1></my-footer1>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        model1:'',
        currselected:0,
        taskid:[],
        restask:[],
        selectrow:[],
        checking: [
          {
            value: 1,
            label: this.$t('m.check.allow')
          },
          {
            value: 0,
            label: this.$t('m.check.refuse')
          },
        ],
        customercol:[
          {
            type: 'selection'
          },
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
          }
        ],
        customerdata:[],
      }
    },
    methods: {
      selectedcol(selectrow){
        this.selectrow=selectrow

      },
      selected(aa){
        this.currselected=aa;
        if(this.currselected==1){
          this.currselected=true;
        }else if(this.currselected==0){
          this.currselected=false;
        }
        this.selectrow.forEach((val,index)=> {
          this.taskid[index]=val.taskId;
          this.restask.push({
            enableRefund: this.currselected,
            taskId:this.taskid[index],
            taskType:"0",})
        })
      },
      ok(){
        this.$http({
          url:'biz/trade/batchAuditRefundApply.do',
          body:this.restask,
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          console.log(response.body)
          if(response.body.msg){
            this.$Message.success(response.body.msg);
            this.restask=[];
          }else{
            this.$Message.error(response.body.errors);
            this.restask=[];
          }
        })
      }
    },
    created(){
      this.$http({
        url:'biz/trade/findUnauditRefundApply.do',
        body:{
          "conditions": {
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
        response.body.pageInfo.list.forEach((val,index)=> {
          this.customerdata.push(
            {
              customerNumber:val.customerInfo.customerNumber,
              customerName:val.customerInfo.customerName,
              identityCode:val.customerInfo.identityCode,
              telephone:val.customerInfo.telephone,
              taskId:val.taskId,
            }
          )
        });
      })
    },
  }
</script>
<style>
  .datas{
    font-size: 14px;
    line-height: 40px;
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



