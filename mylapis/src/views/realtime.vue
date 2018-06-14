<template>
  <div>
    <div class="h-content">
      <my-customer :traderecord="traderecord" :currentcustomer="currentcustomer"></my-customer>
      {{traderecord}}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'realtime',
    data() {
      return {
        traderecord:{},
        currentcustomer:{},
      }
    },
    created(){
      console.log(this._props)
    }
  }
</script>
