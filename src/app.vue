// vue文件提供了一个全新的开发方式

// html模板
<template>
  <div id="test">{{name}}</div>
</template>

// js脚本
<script>
export default {
  data() {
    return {
      name: 'aaa'
    }
  }
}
</script>

// 样式
<style>
  #test {
    color:  blue;
  }
</style>

