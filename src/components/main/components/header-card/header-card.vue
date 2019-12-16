<template>
    <Card style="width:100%" v-if="path">
        <div style="display:flex;">
            <div style="display: block;flex: 0 1 72px;"><img src="@/assets/images/user-logo.png" style="width: 72px;"></div>
            <div style="margin-left: 30px;">
                <div class="content-title">{{ greetings }}, {{userInfo.staff_notes_id}}, 祝你开心每一天！</div>
                <div>{{isSubmit === 0 ? '您本周已经填写完周报！' : '您尚未填写本周周报，请及时填写！'}} <router-link to="fill"><span class="to-block" v-show="isSubmit">>>>去填写</span></router-link></div>
            </div>
        </div>
    </Card>
</template>
<style scoped>
.content-title {
    margin-bottom: 12px;
    color: rgba(0,0,0,.85);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
}
.to-block {
    color:#2D8cF0;
}
/* :class="isSubmit ? 'fu-red-title' : 'fu-black-title'" */
/* .fu-black-title {
    color: black;
}
.fu-red-title {
    color: red;
} */
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderCard',
  data () {
    return {
      greetings: ''
    }
  },
  created () {
    const now = new Date()
    const hour = now.getHours()
    if (hour > 6 && hour <= 11) {
      this.greetings = '早上好'
    } else if (hour > 11 && hour <= 13) {
      this.greetings = '中午好'
    } else if (hour > 13 && hour <= 18) {
      this.greetings = '下午好'
    } else if (hour > 18 || hour <= 6) {
      this.greetings = '晚上好'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isSubmit']),
    path () {
      return this.$route.path === '/home'
    }
  }
}
</script>
