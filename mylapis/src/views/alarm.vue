<template>
  <div>
    <div class="move-left">
      <ul>
        <li>
          <h3>{{$t('m.alarm.filter')}}</h3>
        </li>
        <li>
          <p>{{$t('m.alarm.alarmcol4')}}</p>
          <Select v-model="type" clearable style="width:200px">
            <Option v-for="item in alarmtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <p>{{$t('m.deal.daterange')}}</p>
          <DatePicker  type="daterange" placement="bottom-start" :placeholder="$t('m.deal.daterange')" split-panels style="width: 200px" @on-change="rangedate"></DatePicker>
        </li>
        <li>
          <p>{{$t('m.alarm.alarmcol3')}}</p>
          <Select v-model="source" clearable style="width:200px">
            <Option v-for="item in alarmsource" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <p>{{$t('m.walkby.col6')}}</p>
          <Select v-model="state" clearable style="width:200px">
            <Option v-for="item in alarmstate" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        </li>
      </ul>
    </div>
    <div class="fiterRighta">
      <!--<Button type="success" size="large" @click="exportData(2)"><Icon type="ios-printer-outline"></Icon> 打印</Button>-->
      <!--<Table :loading="loading" :data="alarmData" :columns="alarmColumns" stripe></Table>-->
      <!--<div style="margin: 10px;overflow: hidden">-->
        <!--<div style="float: right;">-->
          <!--<Page :total="alarmtotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>-->
        <!--</div>-->
      <!--</div>-->
      <div style="padding:5px 20px;">
        <Tabs value="name1">
          <TabPane label="全部警告" name="name1">
            <ul v-for="row in alarmData">
              <li style="padding:5px 0 0;border-bottom: 1px solid #DDDEE1;position:relative;">
                <p style="line-height: 40px;font-size: 14px;">{{row.alarmContent1}}</p>
                <p style="color:#999;line-height: 30px;">
                  <span>状态:<Tag color="yellow" style="height:20px;line-height: 20px;">{{row.state | shiftnum}}</Tag></span>
                  <span>告警来源：{{row.alarmSource | shiftnum1}}</span>
                  <span>告警类型：{{row.alarmType | shiftnum2}}</span>
                  <span>时间：{{row.alarmDate}}</span></p>
                <Button v-if="row.state!=1" type="primary" style="position:absolute;top:16px;right:20px;" @click="dispose(row.alarmId)"><Icon type="wrench"></Icon></Button>
              </li>
              <li style="margin: 10px 0;overflow: hidden;">
                <div style="float: right;">
                  <Page :total="alarmtotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
                </div>
              </li>
            </ul>
          </TabPane>
          <TabPane label="未处理警告" name="name2">标签二的内容</TabPane>
        </Tabs>
      </div>
    </div>
    <Modal
      v-model="modal1"
      :title="$t('m.alarm.title')"
      @on-ok="deal"
      >
      <p style="line-height: 24px;">{{$t('m.walkby.col6')}}</p>
      <Select v-model="state1" clearable style="width:200px">
        <Option v-for="item in alarmstate" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <p style="margin-top: 10px;line-height: 24px;">{{$t('m.alarm.way')}}</p>
      <Input v-model="dealmethod" type="textarea" :rows="3" placeholder="Enter something..."></Input>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'alarm',
    data() {
      return {
        loading:false,
        alarmId:'',
        modal1:false,
        dealmethod:'',
        type:'',
        source:'',
        alarmTime:[],
        alarmtype:[
          {
            value:1,
            label:this.$t('m.alarm.type1'),
          }
        ],
        alarmsource:[
          {
            value:1,
            label:this.$t('m.alarm.source1'),
          },
          {
            value:2,
            label:this.$t('m.alarm.source2'),
          },
        ],
        state:'',
        state1:'',
        alarmstate:[
          {
            value:0,
            label:this.$t('m.alarm.state1'),
          },
          {
            value:1,
            label:this.$t('m.alarm.state4'),
          },
          {
            value:2,
            label:this.$t('m.alarm.state2'),
          },
          {
            value:3,
            label:this.$t('m.alarm.state3'),
          },
        ],
        alarmtotal:0,

        alarmColumns: [
          {
            title: this.$t('m.alarm.alarmcol1'),
            key: 'alarmContent1'
          },
          {
            title: this.$t('m.walkby.col6'),
            key: 'state',
            render: (h, params) => {
              const row = params.row;
              let color = row.state;
              let text = row.state;
              if(row.state == 2 ){
                color= 'orange';
                text=this.$t('m.alarm.state2');
              }else if(row.state == 0){
                color='red';
                text=this.$t('m.alarm.state1');
              }else if(row.state == 3){
                color='blue';
                text=this.$t('m.alarm.state3');
              }else if(row.state == 1){
                color='green';
                text=this.$t('m.alarm.state4');
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
            title: this.$t('m.alarm.alarmcol3'),
            key: 'alarmSource',
            render: (h, params) => {
              const row = params.row;
              let text = row.alarmSource;
              if (row.alarmSource == 1) {
                text = this.$t('m.alarm.source1');
              } else if (row.status == 2) {
                text = this.$t('m.alarm.source2');
              }
              return h('p', text);
            }
          },
          {
            title: this.$t('m.alarm.alarmcol4'),
            key: 'alarmType',
            render: (h, params) => {
              const row = params.row;
              let text = row.alarmType;
              if (row.alarmType == 1) {
                text = this.$t('m.alarm.type1');
              }
              return h('p', text);
            }
          },
          {
            title: this.$t('m.alarm.alarmcol5'),
            key: 'alarmDate',
          },
          {
            title:this.$t('m.meter.operate'),
            align:'center',
            render: (h, params) => {
                return h('Tooltip',
                  {
                    props:{
                      content:this.$t('m.alarm.deal') ,
                      placement:"top"
                    },
                  }, [h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.dispose(params.row)
                      }
                    }
                  },[h('Icon',{
                    props:{
                      color:'#fff',
                      type: 'wrench',
                      size:12
                    }
                  })])
                ],);
              }
          },
        ],
        alarmData:[],
      }
    },
    filters:{
      shiftnum:(data)=> {
        if(data==1){
          return "完成";
        }else if(data==0){
          return "未分配";
        }
      },
      shiftnum1:(data)=> {
        if(data==1){
          return "系统";
        }else if(data==2){
          return "表计";
        }
      },
      shiftnum2:function (data) {
        if(data==1){
          return "Walkby";
        }
      },
    },
    methods: {
      rangedate(date){
        this.alarmTime=date;
      },
      query(){
        this.loading=true;
        this.$http({
          url:'getMyAlarm.do',
          credentials:true,
          body:{
            conditions: {
              alarmtype:this.type,
              alarmsource:this.source,
              alarmState:this.state,
              startTime:this.alarmTime[0],
              endTime:this.alarmTime[1],
            },
            limit: 10,
            page: 1
          },
          method: 'POST',
        }).then((response) => {
          this.alarmtotal=parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach(function (val,index) {
            val.alarmContent=JSON.parse(val.alarmContent);
            val.alarmContent.forEach(function (val1,index1) {
              val.alarmContent1='walkby抄表任务\n'+val1.taskName+'还未执行';
            });
          });
          this.alarmData=response.body.pageInfo.list;
          this.loading=false;
        });
      },
      changePage(page) {
        this.loading=true;
        this.$http({
          url:'getMyAlarm.do',
          credentials:true,
          body:{
            conditions: {
            },
            limit: 10,
            page: page
          },
          method: 'POST',
        }).then((response) => {
          response.body.pageInfo.list.forEach(function (val,index) {
            val.alarmContent=JSON.parse(val.alarmContent);
            val.alarmContent.forEach(function (val1,index1) {
              val.alarmContent1='walkby抄表任务\n'+val1.taskName+'还未执行';
            });

          });
          this.alarmData=response.body.pageInfo.list;
          this.loading=false;
        });
      },
      dispose(row){
        this.alarmId=row;
        this.modal1=true;
      },
      deal(){
        this.$http({
          url:'alarm/process.do',
          credentials:true,
          body:{
            alarmId:this.alarmId,
            state:this.state1,
            processMethod:this.dealmethod,
          },
          method: 'POST',
        }).then((response) => {
            if(response.body.msg){
              this.$Message.success(response.body.msg);
            }else{
              this.$Message.error(response.body.errors);
            }
        });
      }
    },
    created(){
      this.query()
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
    /*overflow-y: auto;*/
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
    line-height:35px;
  }
  .move-left > ul > li:first-child{
    height:60px;
    border-bottom: 1px solid #ccc;
  }
  .move-left > ul > li:first-child h3{
    line-height: 62px;
    color:#888;
  }
  .move-left > ul > li:last-child{
    border-top:1px solid #ccc;
    line-height: 50px;
    margin-top:15px;
  }
  .fiterRighta{
    position: relative;
    top: 84px;
    margin-left: 260px;
    margin-right: 20px;
    background: #fff;
  }
</style>

