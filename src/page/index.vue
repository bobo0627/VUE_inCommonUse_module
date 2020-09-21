<template>
 <div class="test">
   <!-- <h1>flexible_PC适配</h1>-->
   <div class="box1"></div>
   <div class="box2"></div>
   <div class="box3"></div>
   <div class="box4"></div>
   <div class="box5"></div>
   <!-- <p></p> -->
 </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created(){

  },
  mounted(){

  },
  methods:{

  }
}
</script>
<style lang='stylus' scoped>
.test
  width 100%
  height 100%
  div
    height 30px

  .box1
    width 200px
    background #f0f
  .box2
    width 300px
    background #ff0
  .box3
    width 400px
    background #0f0
  .box4
    width 500px
    background #0ff
  .box5
    width 600px
    background #f00
</style>
