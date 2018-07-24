<template>
  <div class="h-content">
    <Alert v-if="install" closable show-icon style="position:absolute;z-index:10000;width:50%;top:100px;left:50%;margin-left:-25%;text-align: center">
      {{ $t("m.common.install1")}} <a href="http://laisontechsoft.xicp.net:29202/file/CLodop_Setup_for_Win32NT_3.029.exe">{{ $t("m.common.install2")}}</a> {{ $t("m.common.install3")}}
    </Alert>
    <div style="padding:10px">
      <Card>
        <p slot="title">
          <Icon type="printer"></Icon>
          {{$t('m.print.setting')}}
        </p>
        <p style="line-height: 26px;">{{$t('m.print.invoice')}}</p>
        <Select v-model="invoice" style="width:300px">
          <Option v-for="item in invoicelist" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
        <p style="line-height: 26px;margin-top: 10px;">{{$t('m.print.receipt')}}</p>
        <Select v-model="receipt" style="width:300px">
          <Option v-for="item in invoicelist" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
        <RadioGroup v-model="size" type="button">
          <Radio label="58mm"></Radio>
          <Radio label="80mm"></Radio>
        </RadioGroup>
        <div style="margin-top: 15px">
          <Button type="primary" @click="selectedprinter()">{{$t('m.common.confirm')}}</Button>
          <Button>{{$t('m.common.cancel')}}</Button>
        </div>
      </Card>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'app',
    data () {
      return {
        modal1:true,
        invoice:'',
        receipt:'',
        invoicelist:[],
        size:'',
        count:0,
        install:false,
      }
    },
    methods:{
      selectedprinter(){
        window.localStorage.setItem('size',this.size);
        window.localStorage.setItem('receipt',this.receipt);
        window.localStorage.setItem('invoice',this.invoice);
        this.$Message.success('打印机设置成功');
      },
      //获取打印机
      getprinter(){
        LODOP.Printers.list.forEach(function (val,index) {
          val.value=index;
        });
        this.invoicelist=LODOP.Printers.list;
      },
    },
    created(){
      //读取电脑上的打印机设备
      try
      {
        this.getprinter();
        if(window.localStorage.getItem('size')){
          this.size=window.localStorage.getItem('size');
        }
        if(window.localStorage.getItem('receipt')){
          this.receipt=parseInt(window.localStorage.getItem('receipt'));
        }
        if(window.localStorage.getItem('invoice')){
          this.invoice=parseInt(window.localStorage.getItem('invoice'));
        }
      }
      catch(err)
      {
        this.install=true;
      }
    },
  }
</script>
