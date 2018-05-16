<template>
  <div>
    <Button @click="flag=!flag">点我</Button>

    <transition>
      <h3 v-if="flag">我是一个有动画的标签</h3>
    </transition>

    <my-customer></my-customer>
  </div>

</template>
<style>
  .v-enter,.v-leave-to{ opacity:0;transform: translateX(80px)}
  .v-enter-active , .v-leave-active{ transition:all 0.8s ease}
</style>
<script>
  // Vue.component('mycom',{
  //   template:'<h1>组件</h1>'
  // });
  export default{
    data() {
      return {
        flag:false,
      }
    }
  }
</script>
