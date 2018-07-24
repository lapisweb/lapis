<template>
  <div class="index">
    <div class="h-content">
      <div>
        <Carousel autoplay :autoplay-speed=3000 v-model="value1" loop>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="../../assets/img/h-bigbg.jpg" alt="" style="width:100%">
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="../../assets/img/4.jpg" alt="" style="width:100%">
            </div>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="bigBox">
        <Row :gutter="16">
        <Col span="24">
        <h3><Icon type="android-send"></Icon> {{$t('m.main.skyequiKey')}} </h3>
        </Col>
        <Col span="6">
          <!--<a href="/#/index/open">-->
          <a href="javascript:;">
            <div class="basic basic-one">
              <p class="tiao">{{$t('m.main.user')}}</p>
              <img src="../../assets/img/h-kaihu.png" alt="" class="left-icon">
              <div class="right-word">
                <h3>{{todaydata.openAccountCount}}</h3>
              </div>
            </div>
          </a>
        </Col>
        <Col span="6">
          <!--<a href="/#/index/purchase">-->
          <a href="javascript:;">
            <div class="basic basic-two">
              <p class="tiao">{{$t('m.main.sale')}}</p>
              <img src="../../assets/img/hgoumai.png" alt="" class="left-icon">
              <div class="right-word">
                <h3>{{todaydata.volume}}m³</h3>
              </div>
            </div>
          </a>
        </Col>
        <Col span="6">
          <!--<a href="/#/index/meter">-->
          <a href="javascript:;">
            <div class="basic basic-three">
              <p class="tiao">{{$t('m.main.meter')}}</p>
              <img src="../../assets/img/hbiaoji.png" alt="" class="left-icon">
              <div class="right-word">
                <h3>{{todaydata.meterStockCount}}</h3>
              </div>
            </div>
          </a>
        </Col>
        <Col span="6">
          <!--<a href="/#/index/statistic">-->
          <a href="javascript:;">
            <div class="basic basic-four">
              <p class="tiao">{{$t('m.main.daysale')}}</p>
              <img src="../../assets/img/hbaobiao.png" alt="" class="left-icon">
              <div class="right-word">
                <h3>${{todaydata.amount}}</h3>
              </div>
            </div>
          </a>
        </Col>
      </Row>
        <Row :gutter="16">
          <Col span="24">
          <h3><Icon type="android-send"></Icon> {{$t('m.main.analysis')}}</h3>
          </Col>
          <Col span="8">
            <div class="analysis">
              <p class="title"><Icon type="pie-graph" size="14"></Icon> Regional Sales Analysis</p>
              <div id="main1-1" class="box"></div>
            </div>
          </Col>
          <Col span="16">
            <div class="analysis">
              <p class="title"><Icon type="stats-bars" size="16"></Icon> Total area sales</p>
              <div id="main1-3" class="box"></div>
            </div>
          </Col>
          <Col span="24" style="margin-top: 10px;">
          <div class="analysis">
            <p class="title"><Icon type="arrow-graph-up-right" size="16"></Icon> xx Station Monthly sales statistics</p>
            <div id="main1-2" class="box"></div>
          </div>
          </Col>
          <Col span="24" style="margin-top: 10px;">
          <div class="analysis">
            <p class="title"><Icon type="person-stalker" size="16"></Icon> Add customer information today</p>
            <Table :columns="columns1" :data="data8" style="margin-top: 10px;"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="customertotal" :current="1" :page-size=5 @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
              </div>
            </div>
          </div>
          </Col>
        </Row>
      </div>
      <my-footer></my-footer>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        value1:0,
        columns1: [
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
          },
          {
            title: this.$t('m.customerinfo.label4'),
            key: 'openDate'
          }
        ],
        data8: [],
        customertotal:0,
        metertotal:0,
        todaydata:{},
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      //获取今日数据
      gettodaydata(){
        this.$http({
          url: 'biz/index/getData.do',
          body: {},
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          this.todaydata=response.body;
        })
      },
      rowClassName(row, index) {
        if (index === 1) {
          return 'demo-table-info-row';
        } else if (index === 3) {
          return 'demo-table-error-row';
        }
        return '';
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('main1-1'));
        let myChart2 = this.$echarts.init(document.getElementById('main1-2'));
        let myChart3 = this.$echarts.init(document.getElementById('main1-3'));
        let colors = ['#3BC5CF', '#00ACEE', '#675bba'];
        let colorss = ['#3BC5CF', '#00ACEE', '#87daf9', '#F7B547', '#F88A6F'];
        let data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
        var dateList = data.map(function (item) {
          return item[0];
        });
        var valueList = data.map(function (item) {
          return item[1];
        })
        // 绘制图表
        myChart1.setOption({
          color: colorss,

          // title: {
          //   text: 'Regional Sales Analysis',
          //   subtext: 'virtual data',
          //   left: 'center'
          // },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            top: 20,
            left: 'center',
            data: ['Cairo', 'Johannesburg', 'Cape Town', 'Nairobi', 'Algiers']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {
                  value: 1548,
                  name: 'Cairo',

                },
                {value: 535, name: 'Johannesburg'},
                {value: 510, name: 'Cape Town'},
                {value: 634, name: 'Nairobi'},
                {value: 735, name: 'Algiers'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        myChart3.setOption({
          color: colors,
          // title: {
          //   text: 'Total area sales',
          //   subtext: 'virtual data'
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['2016', '2017']
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['Brazil', 'Indonesia', 'America', 'India', 'China', 'Total']
          },
          series: [
            {
              name: '2016',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
              name: '2017',
              type: 'bar',
              data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
          ]
        });
        myChart2.setOption({
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          },],

          xAxis: [{
            data: dateList
          },],
          yAxis: [{
            splitLine: {show: false}
          }],
          series: [{
            type: 'line',
            showSymbol: false,
            data: valueList
          }]
        });
        window.onresize = myChart1.resize, myChart2.resize, myChart3.resize;
      },
      changePage(page) {
        this.$http({
          url: 'biz/customer/findByPage.do',
          body: {
            "conditions": {
              orderByClause: "open_date desc",
            },
            "limit": 5,
            "page": page
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          this.data8 = response.body.pageInfo.list;
        })
      },
      getcustomer() {
        this.$http({
          url: 'biz/customer/findByPage.do',
          body: {
            "conditions": {
              // startTime: '2018-06-22',
              orderByClause: "open_date desc",
            },
            "limit": 5,
            "page": 1
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          this.customertotal = parseInt(response.body.pageInfo.total);
          this.data8 = response.body.pageInfo.list;
        });
      },
    },
    created(){
      this.gettodaydata();
      this.getcustomer()
    }
  }
</script>
<style>
  .index .h-content{
    margin-bottom: 0;
  }
  .ivu-table .demo-table-info-row td{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
  }
  .ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-age {
    background-color: #3BC5CF;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-address {
    background-color: #F88A6F;
    color: #fff;
  }
  .bigBox{
    width: 80%;
    margin: 10px auto;
    border-radius: 3px;
  }
  .bigBox h3{
    line-height: 40px;
    color:#666;
  }
  .bigBox:after{
    content: '';
    display: block;
    width: 100%;
    clear: both;
  }
  div.box{
    height:380px;
  }

  .basic{
    height:150px;
    border-radius:8px;
    color:#fff;
    background:#F88A6F;
    overflow: hidden;
  }
  .basic-two{
    background:#F7B547;
  }
  .basic-three{
    background:#3BC5CF;
  }
  .basic-four{
    background:#00ACEE;
  }
  .basic p.tiao{
    width:100%;
    height:40px;
    line-height:40px;
    font-size:14px;
    border-bottom: 2px solid #ED7F64;
    padding-left:24px;
  }
  .basic-two p.tiao{
    border-bottom: 2px solid #EAAA3C;
  }
  .basic-three p.tiao{
    border-bottom: 2px solid #33BCC6;
  }
  .basic-four p.tiao{
    border-bottom: 2px solid #00A5E7;
  }
  .analysis{
    /*height:400px;*/
    border-radius:8px;
    background: #fff;
    box-shadow: 0 0 4px 1px #EBEBEB;
    box-sizing: border-box;
    padding:10px 15px;
    transition:all 0.2s ease-in-out
  }
  .analysis:hover{
    box-shadow: 0 0 10px 3px #EBEBEB;

  }
  .analysis .title{
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 35px;
    font-size: 14px;
    color: #1c2438;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom:1px solid #e9eaec;
  }

  .left-icon{
    width:60px;
    margin:15px;
    float: left;
  }
  .right-word{
    padding: 26px 10px;
  }
  .right-word p.aa{
    color:#fff;
    font-size: 16px;
    font-weight: 300;
  }
  .right-word h3{
    color:#fff;
    font-size: 20px;
  }
  .ivu-carousel-dots{
    z-index: 5;
  }
</style>
