<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <a href="https://clock.cuiyi.club/timeline?eventName=%E7%99%BD%E9%A9%AC%E5%B1%B1%E5%BA%84" target="_blank">
          <h2>白马山庄</h2>
        </a>
      </div>
      <div class="col-sm-4">
        <a href="https://clock.cuiyi.club/timeline?eventName=%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C" target="_blank">
          <h2>平凡的世界</h2>
        </a>
      </div>
      <div class="col-sm-4">
        <a href="https://clock.cuiyi.club/timeline?eventName=%E4%B8%89%E5%8F%A3%E6%A3%BA%E6%9D%90" target="_blank">
          <h2>三口棺材</h2>
        </a>
      </div>
      <div class="col-sm-4">
        <a href="https://clock.cuiyi.club/timeline?eventName=gpt" target="_blank">
          <h2>gpt</h2>
        </a>
      </div>
      <div class="col-sm-4">
        <a href="https://clock.cuiyi.club/upload" target="_blank">
          <h2>上传图片</h2>
        </a>
      </div>
      <div class="col-sm-4">
        <a href="https://clock.cuiyi.club/novel" target="_blank">
          <h2>看小说</h2>
        </a>
      </div>

      <div class="col-sm-4">
        <a href="https://ape.punengshuo.com" target="_blank">
          <h2>自建博客</h2>
        </a>
      </div>

      <div class="col-sm-4">
        <a href="https://blog.punengshuo.com" target="_blank">
          <h2>hexo博客</h2>
        </a>
      </div>

      <div class="col-sm-4">
        <a href="http://chat.punengshuo.com" target="_blank">
          <h2>聊天</h2>
        </a>
      </div>

      <div class="col-sm-4">
        <a href="http://tools.punengshuo.com" target="_blank">
          <h2>工具</h2>
        </a>
      </div>
      <div class="col-sm-4">
        <a href="https://plane.punengshuo.com" target="_blank">
          <h2>飞机</h2>
        </a>
      </div>
      <div class="col-sm-4">
        <a href="http://music.punengshuo.com" target="_blank">
          <h2>简谱</h2>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon,
  },
}
</script>

<style>
.container {
  margin-top: 50px;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.col-sm-4 {
  flex: 1;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  min-width: 80px;
  transition: all 0.2s ease-in-out;
}
.col-sm-4:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 10px #ccc;
}
h2 {
  margin-top: 20px;
}
</style>
