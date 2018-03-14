<template>
  <div>
    <div class="move-left">
      <ul>
        <li>
          <h3>筛选条件</h3>
        </li>
        <li>
          <p>操作类型</p>
          <Select v-model="model10" multiple style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <p>公司站点</p>
          <Input v-model="value4"  icon="ios-pricetags-outline" style="width: 100px"></Input>
          <Input v-model="value4"  icon="ios-pricetags-outline" style="width: 100px"></Input>
        </li>
        <li>
          <p>时间范围</p>
          <DatePicker  type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px"></DatePicker>
        </li>
        <li>
          <p>操作员</p>
          <Select v-model="models2" style="width:200px">
            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <p>客户基本信息</p>
          <Input v-model="value4"  style="width: 100px" placeholder="姓名"></Input>
          <Input v-model="value4"  style="width: 100px" placeholder="电话号"></Input>
          <div style="height:6px;" ></div>
          <Input v-model="value4"  style="width: 200px" placeholder="身份证号"></Input>
        </li>
        <li>
          <Button type="primary" icon="ios-search">搜索</Button>
        </li>
      </ul>
    </div>
    <div class="fiterRight">
      <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出</Button>
      <Button type="success" size="large" @click="exportData(2)"><Icon type="ios-printer-outline"></Icon> 打印</Button>
      <div style="height:10px"></div>
      <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
      <my-footer1></my-footer1>
    </div>
  </div>
</template>
<style>
  .move-left{
    width: 240px;
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow-y: auto;
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
  .fiterRight{
    position: relative;
    top:84px;
    margin-left:260px;
    margin-right:30px;
  }
  .fiterRight .footer{
    left:100px;
    right:0
  }
</style>
<script>
  import common from '../kits/common.js';
  export default {
    name:'operation',
    data() {
      return {
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        model10: [],
        value1: [],
        data: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ],
        }],
        cityList1: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
        ],
        models1: '',
        cityList2: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
        ],
        models2: '',
        tableData1: this.mockTableData1(),
        tableColumns1: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              const row = params.row;
              const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
              const text = row.status === 1 ? '构建中' : row.status === 2 ? '构建完成' : '构建失败';

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: '画像内容',
            key: 'portrayal',
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: params.row.portrayal.length + '个画像',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.portrayal.length),
                h('div', {
                  slot: 'content'
                }, [
                  h('ul', this.tableData1[params.index].portrayal.map(item => {
                    return h('li', {
                      style: {
                        textAlign: 'center',
                        padding: '4px'
                      }
                    }, item)
                  }))
                ])
              ]);
            }
          },
          {
            title: '选定人群数',
            key: 'people',
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: params.row.people.length + '个客群',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.people.length),
                h('div', {
                  slot: 'content'
                }, [
                  h('ul', this.tableData1[params.index].people.map(item => {
                    return h('li', {
                      style: {
                        textAlign: 'center',
                        padding: '4px'
                      }
                    }, item.n + '：' + item.c + '人')
                  }))
                ])
              ]);
            }
          },
          {
            title: '取样时段',
            key: 'time',
            render: (h, params) => {
              return h('div', '近' + params.row.time + '天');
            }
          },
          {
            title: '更新时间',
            key: 'update',
            render: (h, params) => {
              return h('div', this.formatDate(this.tableData1[params.index].update));
            }
          }
        ]
      }
    },
    methods: {
      mockTableData1() {
        let data = [];
        for (let i = 0; i < 10; i++) {
          data.push({
            name: '商圈' + Math.floor(Math.random() * 100 + 1),
            status: Math.floor(Math.random() * 3 + 1),
            portrayal: ['城市渗透', '人群迁移', '消费指数', '生活指数', '娱乐指数'],
            people: [
              {
                n: '客群' + Math.floor(Math.random() * 100 + 1),
                c: Math.floor(Math.random() * 1000000 + 100000)
              },
              {
                n: '客群' + Math.floor(Math.random() * 100 + 1),
                c: Math.floor(Math.random() * 1000000 + 100000)
              },
              {
                n: '客群' + Math.floor(Math.random() * 100 + 1),
                c: Math.floor(Math.random() * 1000000 + 100000)
              }
            ],
            time: Math.floor(Math.random() * 7 + 1),
            update: new Date()
          })
        }
        return data;
      },
      formatDate(date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      changePage() {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        this.tableData1 = this.mockTableData1();
      }
    }
  }
</script>

