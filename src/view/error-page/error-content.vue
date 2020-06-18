<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code">
      <div class="text-con">
        <h4>{{ code }}</h4>
        <!-- <h5>{{ desc }}</h5> -->
        <h5>请前往：<a href="http://172.18.194.93:8001/home">http://172.18.194.93:8001/home</a></h5>
      </div>
      <!-- <back-btn-group class="back-btn-group"></back-btn-group> -->
    </div>
  </div>
</template>

<script>
import './error.less'
import backBtnGroup from './back-btn-group.vue'
export default {
  name: 'error_content',
  components: {
    backBtnGroup
  },
  props: {
    code: String,
    desc: String,
    src: String
  }
}
</script>
