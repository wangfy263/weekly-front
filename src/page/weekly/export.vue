<template>
  <div>
    <Button type="success" @click="exportExcel()">导出本周周报excel</Button>
  </div>
</template>
<script>
import { exportExcel } from '@/api/weekly'
export default {
  methods: {
    exportExcel () {
      this.$Spin.show()
      exportExcel({}).then(res => {
        if (res.data.retCode === '000000') {
          this.$Spin.hide()
          this.$Message.success('导出成功!')
        }
      }).catch(e => {
        this.$Spin.hide()
      })
    }
  }
}
</script>
