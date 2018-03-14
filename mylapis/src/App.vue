<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
  html body{
    background: #f7f8f8;
  }
  *{
    word-break: keep-all;
    list-style: none;
  }
  .wrapper-container {
    background: #fff;
    width: 90%;
    margin: 10px auto 20px;
    border-radius: 6px;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    min-height:700px;
    overflow: hidden;
  }
  .h-content{
    position: relative;
    top:70px;
    margin-bottom: 100px;
    background: #f7f8f8;
  }
</style>
