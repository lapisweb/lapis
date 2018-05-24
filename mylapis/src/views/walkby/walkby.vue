<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <Button icon="plus-round" type="info" @click="addtask">新增任务</Button>
        <!--<Button icon="trash-a" type="warning">删除已完成任务</Button>-->
        <div style="margin:10px 0;">
          <Table ref="selection" :columns="columnslist" :data="tasklist"></Table>
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
        index:'',
        tasktotal:0,
        columnslist: [
          {
            title: '任务编号',
            key: 'taskID',
          },
          {
            title: '任务名',
            key: 'taskName',
          },
          {
            title: '创建日期',
            key: 'updateDate',
          },
          {
            title: '抄表员',
            key: 'technicianName',
          },
          {
            title: '表计数量',
            key: 'meterCount',
          },

          {
            title: this.$t('m.meter.operate'),
            key: 'action',
            align: 'center',
            render: (h, params) => {
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
                        this.edittask(params.row)
                      }
                    }
                  },[h('Icon',{
                    props:{
                      color:'#fff',
                      type: 'edit',
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
            }
          }
        ],
        tasklist: []
      }
    },
    methods: {
      query(){
        this.$http({
          url:'walkby/findByPage.do',
          body: {conditions: {},"limit": 10, "page": 1},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          console.log(response.body.pageInfo.list)
          this.tasktotal=parseInt(response.body.pageInfo.total);
          this.tasklist=response.body.pageInfo.list;
        })
      },
      changePage(page){
        this.$http({
          url:'walkby/findByPage.do',
          body: {conditions: {},"limit": 10, "page": page},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.tasklist=response.body.pageInfo.list;
        })
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
          onCancel: () => {
//            this.$Message.info('Clicked cancel');
          }
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
        this.$router.push({
          path: '/index/walkby/edittask',
          name: 'edittask',
          params:  {
            id:id
          }
        })
      },
    },
    created(){
      this.query()
    }
  }
</script>

