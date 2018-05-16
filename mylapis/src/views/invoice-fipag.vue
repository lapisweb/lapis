<template>
    <div>
      <p v-if="install"> 请 <a href="http://192.168.0.174/file/CLodop_Setup_for_Win32NT_3.029.exe
">点击此处</a> 安装</p>
      <div class="h-buttonfbox not-print">
        <Button type="success" icon="printer" @click="printme()" class="h-button">打印</Button>
      </div>
      <div class="main" id="smallfipag">
        <div class="header">
          <p class="dotted"></p>
          <img src="../assets/img/fipag.jpg" alt="">
          <p class="dotted2"></p>
        </div>
        <div class="f-title">
          <p style="font-size: 18px;text-align: center;line-height: 28px;">Purchase</p>
          <p style="text-align: center;margin-bottom: 10px;">OPENRATIONAL AREA OF BEIRA</p>
          <p style="text-align: center;line-height: 18px;">RECEIPT NO. <span>00181200000138</span></p>
          <p style="text-align: center;line-height: 18px;margin-bottom: 8px;">19-04-2018 15:30</p>
          <p style="text-align: center;line-height: 18px;">TOKEN CODE:</p>
          <p style="text-align: center;line-height: 18px;font-weight: bold;margin-bottom: 6px;">1254 5486 4896 5469 5786</p>
        </div>
        <div class="customer fbox">
          <h3>CUSTOMER INFORMATION</h3>
          <ul>
            <li><span>name :</span> <span>Assucena Onika</span></li>
            <li><span>Meter No. :</span> <span>0123589654789</span></li>
            <li><span>Id No. :</span> <span>1432698569856325489</span></li>
            <li><span>Telephone :</span> <span>0010-8695654</span></li>
            <li><span>Address :</span> <span>#525 xixi xixi hangzhou zhejiang</span></li>
          </ul>
        </div>
        <div class="payment fbox">
          <h3>PAYMENTS DETEIL</h3>
          <ul>
            <li><span>Amount paid :</span> <span>MTN39.90</span></li>
            <li><span>VAT :</span> <span>12.75% , MTN33.92</span></li>
            <li><p style="line-height: 26px;">Additional fee detail</p></li>
            <li><span>Sanitation Fee :</span> <span>MTN10.00</span></li>
            <li><span>Rent Fee :</span> <span>MTN39.90</span></li>
            <li><span>Availability of the service :</span> <span>MTN50.00</span></li>
            <li style="margin-top: 6px;"><span>Total additional fee :</span> <span>117.95</span></li>
            <li><span>Debt repayment :</span> <span>0.00</span></li>
            <li><span>Remaining debt :</span> <span>200.00</span></li>
          </ul>
        </div>
        <div class="fbox">
          <h3>CONSUMPTION DETAILS</h3>
          <p style="line-height: 24px;">Payment detail</p>
          <table>
            <tr>
              <td>Escalao 1</td>
              <td>5.00m³</td>
              <td>MTN76.44</td>
            </tr>
            <tr>
              <td>Escalao 2</td>
              <td>3.20m³</td>
              <td>MTN89.73</td>
            </tr>
          </table>
          <ul>
            <li><span>Invoice volume :</span> <span>8.2</span></li>
            <li><span>Total water value :</span> <span>148.13</span></li>
          </ul>
        </div>
        <div class="fbox">
          <p style="text-align: center;line-height: 24px">Processed Buy : <span>admin</span></p>
          <P style="text-align: center;line-height: 24px">OPERATIONAL AREA(AO) BEIRA SHOP #03</P>
        </div>
        <p class="dotted"></p>
      </div>
    </div>
  <Alert show-icon>
    An info prompt
    <template slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </template>
  </Alert>
</template>
<style>
  *{
    font-family:Arial, sans-serif;
    list-style: none;
    font-size:12px;
    color:#333;
    margin:0;
    padding:0
  }
  .main{
    width:100%;
    margin-top: 10px;
  }
  .header{
    width:96%;
  }
  .dotted{
    border-top:1px dotted #333;
    margin-left:8px;
    height:10px;
  }
  .dotted2{
    margin-left:8px;
    height:14px;
    border-bottom:1px dotted #333;
  }
  .header img{
    height:60px;
    margin-left:5px;
  }
  h3{
    text-align: center;
    line-height: 20px;
  }
  .fbox{
    width:96%;
    margin:0 auto;
    border-top:1px dotted #333;
    padding:6px 0;
  }
  .fbox ul li{
    line-height: 20px;
  }
  .fbox ul li span:nth-child(1){
    display: inline-block;
    color:#666;
    word-break:break-word;
  }
  .customer ul li span:nth-child(1){
    width: 70px;
  }
  .payment ul li span:nth-child(1){
    width: 120px;
  }
  table tr{
    line-height: 20px;
  }
  table tr td{
    width:30%
  }
  table tr td:nth-child(1){
    width:40%
  }
</style>
<script>
  export default{
    data () {
      return {
        install:false,
      }
    },

    methods: {
      printme() {
        try
        {
          this.myprint()
        }
        catch(err)
        {
          this.install=true;
        }

      },
      myprint() {
        var strBodyStyle=`
        <style>
        *{
           font-family:Arial, sans-serif;
           list-style: none;
           font-size:12px;
           color:#333;
           margin:0;
           padding:0
          }
          .main{
            width:100%;
            margin-top: 10px;
          }
          .header{
            width:96%;
          }
          .dotted{
            border-top:1px solid #333;
            margin-left:8px;
            height:10px;
          }
          .dotted2{
            margin-left:8px;
            height:14px;
            border-bottom:1px solid #333;
          }
          .header img{
            width:100%;
            margin-left:5px;
          }
          h3{
            text-align: center;
            line-height: 20px;
          }
          .fbox{
            width:96%;
            margin:0 auto;
            border-top:1px solid #333;
            padding:6px 0;
          }
          .fbox ul li{
            line-height: 20px;
          }
          .fbox ul li span:nth-child(1){
            display: inline-block;
            color:#666;
            word-break:break-word;
          }
          .customer ul li span:nth-child(1){
            width: 70px;
          }
          .payment ul li span:nth-child(1){
            width: 120px;
          }
          table tr{
            line-height: 20px;
          }
          table tr td{
            width:30%
          }
          table tr td:nth-child(1){
            width:40%
          }
        </style>
        `;
        var strFormHtml=strBodyStyle+document.getElementById("smallfipag").innerHTML;
        let height=(document.getElementById("smallfipag").scrollHeight)+200+'px';
        console.log(height)
        if (LODOP.webskt && LODOP.webskt.readyState == 1) {
          console.log("开始打印！！");
          LODOP.PRINT_INIT('aaa');
          LODOP.SET_PRINT_PAGESIZE(1, 480, height,"");
          LODOP.ADD_PRINT_HTM(20, 0, '100%', height, strFormHtml);
          var patt = /POS104 Printer/i;//先由用户设置
          // var patt = /AiBao A-80USH/i;//先由用户设置
          // var patt = /Samsung M262x 282x Series/i;//先由用户设置
          console.log(LODOP.Printers.list,8888888)
          for (let j = 0, len = LODOP.Printers.list.length; j < len; j++) {
            if (patt.test(LODOP.Printers.list[j].name)) {
              LODOP.SET_PRINTER_INDEXA(j);
              LODOP.PREVIEW();//预览
              // LODOP.PRINT();//打印

            }
          }
        }
      },
    },
    created(){
    }
  }
</script>

