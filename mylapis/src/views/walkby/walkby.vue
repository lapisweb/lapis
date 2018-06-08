<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <div>
          <Select v-model="technician" clearable style="width:180px" :placeholder="$t('m.walkby.reader')">
            <Option v-for="item in technicianList" :value="item.id" :key="item.id" >{{ item.loginName }}</Option>
          </Select>
          <DatePicker type="daterange" placement="bottom-start" split-panels :placeholder="$t('m.walkby.seltime')" style="width: 200px" @on-change="slectetime"></DatePicker>
          <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        </div>
        <div style="margin:10px 0;">
          <Button icon="plus-round" type="info" @click="addtask" style="margin-bottom: 5px;">{{$t('m.walkby.addtask')}}</Button>
          <Button icon="plus-round" type="primary" @click="taskdistribute" style="margin-bottom: 5px;">任务分布</Button>
          <Table :loading="loading" ref="selection" :columns="columnslist" :data="tasklist"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="tasktotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>
<style>

</style>
<script>
  export default {
    nane:'walkby',
    data() {
      return {
        technician:'',
        time:[],
        technicianList:[],
        index:'',
        tasktotal:0,
        loading:false,
        columnslist: [
          {
            title: this.$t('m.walkby.col1'),
            key: 'taskID',
          },
          {
            title:this.$t('m.walkby.col2'),
            key: 'taskName',
          },
          {
            title: this.$t('m.walkby.col3'),
            key: 'updateDate',
          },
          {
            title: this.$t('m.walkby.col4'),
            key: 'technicianName',
          },
          {
            title: this.$t('m.walkby.col5'),
            key: 'meterCount',
          },
          {
            title: this.$t('m.walkby.col6'),
            key: 'taskState',
            render: (h, params) => {
              const row = params.row;
              let colors = row.taskState;
              let texts = row.taskState;
              if(row.taskState === 1){
                colors='green';
                texts=this.$t('m.walkby.state2')
              }else if(row.taskState === 0){
                colors='blue';
                texts=this.$t('m.walkby.state1')
              }else{
                colors='blue';
                texts=this.$t('m.walkby.state1')
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
            title: this.$t('m.meter.operate'),
            key: 'action',
            render: (h, params) => {
              if(params.row.state==0){
                return h('div', [
                  h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.edittask(params.row)
                        }
                      }
                    },[h('Icon',{
                      props:{
                        color:'#fff',
                        type: 'android-create',
                        size:12
                      }
                    })]
                  ),
                  h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    },[h('Icon',{
                      props:{
                        color:'#fff',
                        type: 'android-delete',
                      }
                    })]
                  ),
                ]);
              }else{
                return h('div', [
                  h('Button', {
                      props: {
                        type: 'success',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.showinfo(params.row)
                        }
                      }
                    },[h('Icon',{
                    props:{
                      color:'#fff',
                      type: 'ios-eye',
                    }
                  })],),
                  h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    },[h('Icon',{
                      props:{
                        color:'#fff',
                        type: 'android-delete',
                      }
                    })]
                  ),
                ]);
              }
            }
          }
        ],
        tasklist: []
      }
    },
    methods: {
      slectetime(time){
          this.time=time;
      },
      query(){
        this.loading=true;
        this.$http({
          url:'walkby/findByPage.do',
          body: {
            conditions: {
              technicianID:this.technician,
              startTime:this.time[0],
              endTime:this.time[1],
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
          response.body.pageInfo.list.forEach((val,index)=> {
            if(val.walkByTaskExecuteRecord){
              val.taskState=val.walkByTaskExecuteRecord.taskState;
              val.state=1;
            }else{
              val.state=0;
            }
          });
          this.tasktotal=parseInt(response.body.pageInfo.total);
          this.tasklist=response.body.pageInfo.list;
          this.loading=false;
        })
      },
      changePage(page){
        this.loading=true;
        this.$http({
          url:'walkby/findByPage.do',
          body: {conditions: {
              technicianID:this.technician,
              startTime:this.time[0],
              endTime:this.time[1],
            },"limit": 10, "page": page},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.tasklist=response.body.pageInfo.list;
          this.loading=false;
        })
      },
      taskdistribute(){
        this.$router.push('/index/walkby/distributetask');
      },
      addtask(){
        this.$router.push('/index/walkby/addtask');
      },
      remove(index){
        this.index=index;
        this.$Modal.confirm({
          title: 'Meter import',
          content:'<p>'+this.$t('m.common.tips')+'</p><p>'+this.$t('m.common.sure')+'</p>',
          onOk: () => {
            this.removeconfirm();
          },
        });
      },
      removeconfirm () {
        let taskid=this.tasklist[this.index].taskID;
        this.$http({
          url:'walkby/del.do',
          body: {
            id:taskid
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.msg){
            this.tasklist.splice(this.index, 1);
            this.tasktotal=this.metertotal-1;
            this.$Message.success(response.body.msg);
          }else{
            this.$Message.error(response.body.errors);
          }
        });
      },
      edittask(row){
        let id=row.taskID;
        window.sessionStorage.setItem('taskid',JSON.stringify(id));
        this.$router.push({
          path: '/index/walkby/edittask',
          name: 'edittask',
          params:  {
            id:id
          }
        })
      },
      showinfo(row){
        let content=`
          <p style="line-height: 24px">${this.$t('m.walkby.con1')}: ${row.meterCount}</p>
          <p style="line-height: 24px">${this.$t('m.walkby.con2')}: ${row.walkByTaskExecuteRecord.readingSuccessCount}</p>
          <p style="line-height: 24px">${this.$t('m.walkby.con3')}: ${row.walkByTaskExecuteRecord.manualInputCount}</p>
          <p style="line-height: 24px">${this.$t('m.walkby.con4')}: ${row.walkByTaskExecuteRecord.readingFailedCount}</p>
          <p style="line-height: 24px">${this.$t('m.walkby.con5')}: ${row.walkByTaskExecuteRecord.taskDate}</p>`;
        this.$Modal.info({
          title:this.$t('m.walkby.con'),
          content: content,
          width:'500px',
        })
      },
      //获取抄表员
      gettechnicianList(){
        this.$http({
          url:'walkby/listTechnician.do',
          body:{
            isAll:true,
          },
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
      this.gettechnicianList();
      this.query();
    }
  }
</script>

