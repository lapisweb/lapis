<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <Button icon="plus-round" type="info" @click="addtask">新增任务</Button>
        <Button icon="trash-a" type="warning">删除已完成任务</Button>
        <div style="margin:10px 0;">
          <Table ref="selection" :columns="columns4" :data="data1"></Table>
        </div>
      </div>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>
<style>

</style>
<script>
  import common from '../kits/common.js';
  export default {
    nane:'walkby',
    data() {
      return {
        index:'',
        columns4: [
          {
            title: '操作员',
            key: 'name',
            fixed: 'left',
            width: 150,
          },
          {
            title: '创建日期',
            key: 'time',
            fixed: 'left',
            width: 160,
          },
          {
            title: '抄表员',
            key: 'name',
            width: 150,
          },
          {
            title: '表计数量',
            key: 'num',
            width: 120,
          },
          {
            title: '计划开始日期',
            key: 'time',
            width: 180,
          },
          {
            title: '计划结束日期',
            key: 'time',
            width: 180,
          },
          {
            title: '状态',
            key: 'name',
            width: 180,
            render: (h, params) => {
              const row = params.row;
              const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
              const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: '抄表成功的表计数量',
            key: 'num',
            width: 140,
          },
          {
            title: '手动录入的表计数量',
            key: 'num',
            width: 140,
          },
          {
            title: '抄表失败的表计数量',
            key: 'num',
            width: 140,
          },
          {
            title: '任务文件名',
            key: 'name',
            width: 200,
          },
          {
            title: this.$t('m.meter.operate'),
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 100,
            render: (h, params) => {
              return h('div', [
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
                )
              ]);
            }
          }
        ],
        data1: [
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
          {
            name: 'John Brown',
            time: '2018-03-20 16:48:15',
            num: 100,
          },
        ]
      }
    },
    methods: {
      addtask(){
        this.$router.push('/index/walkby/addtask');
      },
      remove(index){
        // this.meterid=this.meterdata[index].meterId;
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
        this.data1.splice(this.index, 1);
        // this.$http({
        //   url:common.apiLink+'/biz/meterStock/del.do',
        //   body: "id="+this.meterid,
        //   credentials:true,
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //   },
        // }).then((response) => {
        //   if(response.body.msg){
        //     this.meterdata.splice(this.index, 1);
        //     this.metertotal=this.metertotal-1;
        //     this.$Message.success(response.body.msg);
        //   }else{
        //     this.$Message.error(response.body.errors);
        //   }
        // });
      }
    }
  }
</script>

