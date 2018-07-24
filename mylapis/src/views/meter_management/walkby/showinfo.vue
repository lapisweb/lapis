<template>
  <div>
    <div class="h-content showinfo" >
      <div class="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/index">
            <Icon type="ios-home-outline"></Icon> Home
          </BreadcrumbItem>
          <BreadcrumbItem to="/index/walkby">
            <Icon type="social-buffer-outline"></Icon> Walkby
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="social-buffer-outline"></Icon> {{$t('m.walkby.info')}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div style="margin: 10px 60px;">
        <div style="margin-bottom: 10px;">
          <Select v-model="technician" clearable style="width:180px" :placeholder="$t('m.walkby.reader')">
            <Option v-for="item in technicianList" :value="item.id" :key="item.id" >{{ item.loginName }}</Option>
          </Select>
          <DatePicker type="month" placeholder="Start Time" style="width:99px" @on-change="startdate"></DatePicker>
          -
          <DatePicker type="month" placeholder="End Time" style="width: 99px" @on-change="enddate"></DatePicker>
          <!--<DatePicker type="daterange" placement="bottom-start" split-panels :placeholder="$t('m.walkby.seltime')" style="width: 200px" @on-change="slectetime"></DatePicker>-->
          <Button type="primary" icon="ios-search" @click="getshowinfo">{{$t('m.common.query')}}</Button>
        </div>
        <Table :loading="loading" highlight-row :columns="customercol" :data="readdata" @on-selection-change="selectedcol"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="infototal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
          </div>
        </div>
      </div>
      </div>
    <my-footer1></my-footer1>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading:false,
        infototal:0,
        selectrow: {},
        technician:'',
        technicianList:[],
        starttime:'',
        endtime:'',
        customercol: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: this.$t("m.walkby.info1"),
            width:180,
            key: 'recordDate',
          },
          {
            title: this.$t("m.walkby.info2"),
            width:180,
            key: 'taskName',
          },
          {
            title: this.$t("m.walkby.info3"),
            width:160,
            key: 'taskState',
            render: (h, params) => {
              const row = params.row;
              let colors = row.taskState;
              let texts = row.taskState;
              if(row.taskState === 1){
                colors='green';
                texts=this.$t("m.walkby.state2")
              }else if(row.taskState === 0){
                colors='blue';
                texts=this.$t("m.walkby.state1")
              }
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: colors
                }
              }, texts);
            }
          },
          {
            title: this.$t("m.walkby.info4"),
            key: 'taskDate',
          },
          {
            title: this.$t("m.walkby.info5"),
            key: 'totalMeterCount',
          },
          {
            title: this.$t("m.walkby.info6"),
            key: 'readingSuccessCount',
          },
          {
            title: this.$t("m.walkby.info7"),
            key: 'readingFailedCount',
          },
        ],
        readdata: [],
      }

    },
    methods: {
      startdate(date){
        this.starttime=date;
      },
      enddate(date){
        this.endtime=date;
      },
      selectedcol(selectrow) {
        this.selectrow = selectrow
      },
      //获取任务详情列表
      getshowinfo(){
        this.loading=true;
        this.$http({
          url:'walkby/findRecordByPage.do',
          body:{
            conditions: {
              technicianID:this.technician,
              startTime:this.starttime,
              endTime:this.endtime,
            },
            limit: 10,
            page: 0
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          },
        }).then((response) => {
          response.body.pageInfo.list.forEach(function (val,index) {
            let end=val.taskDate.lastIndexOf("-");
            val.taskDate=val.taskDate.substring(0,end);
          });
          this.readdata=response.body.pageInfo.list;
          this.loading=false;
        });
      },
      changePage(){},
      //获取抄表员
      gettechnicianList(){
        this.$http({
          url:'walkby/listTechnician.do',
          body:{},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          },
        }).then((response) => {
          this.technicianList=response.body.technicians;
          this.technician=this.technicianID
        });
      }
    },
    created(){
      this.gettechnicianList()
    }
  }

</script>
<style scoped>
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



