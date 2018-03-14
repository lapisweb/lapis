<template>
  <div>
    <div class="subcenter">
      <p style="line-height: 30px;">操作员</p>
      <!--<Col span="4">-->
      <Select v-model="model1" style="width:200px" placeholder="选择操作员">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <!--</Col>-->
      <Button type="primary" icon="ios-search" @click="operatorquery">查询</Button>
      <ul class="subtotalview" v-show="operatorcha">
        <li>
          <p>今天<span></span></p>
        </li>
        <li>
          <p>本周<span></span></p>
        </li>
        <li>
          <p>本月<span></span></p>
        </li>
        <li>
          <p>本年<span></span></p>
        </li>
      </ul>
      <p style="line-height: 30px;">时间范围</p>
      <!--<Col span="4">-->
      <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px"></DatePicker>
      <!--</Col>-->
      <Button type="primary" icon="ios-search" @click="datequery">查询</Button>
      <ul class="subtotalview" v-show="datecha">
        <li>
          <p>销售总和<span></span></p>
        </li>
      </ul>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>

<script>
  import common from '../kits/common.js';
  export default {
    data () {
      return {
        operatorcha:false,
        datecha:false,
        cityList: [
          {
            value: 'admin',
            label: '管理员'
          },
          {
            value: 'superadmin',
            label: '超级管理员'
          },
          {
            value: 'vender',
            label: 'sss'
          },
          {
            value: 'hangzhou',
            label: 'lisa'
          },
        ],
        model1: ''
      }
    },
    methods:{
      operatorquery(){
          this.operatorcha=true;
      },
      datequery(){
        this.datecha=true;
      }
    }
  }
</script>
<style>
  .subcenter{
    padding:10px 80px;
    position: relative;
    top:70px;
  }
  .subtotalview{
    width:270px;
    background:#fff;
    border-radius:5px;
    margin-top:10px;
    margin-bottom:10px;
    box-shadow: 0 0 1px 1px #ccc;
  }
  .subtotalview li{
    height:25px;
    width:100%;
    padding:0 15px;
    border-bottom: 1px dashed lightskyblue;
  }
  .subtotalview li:last-child{
    border:none;
  }
  .subtotalview li p{
    line-height: 25px;
  }
</style>
