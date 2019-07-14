<template>
  <div style="font-size: 14px">
    <Input v-model="fileName" placeholder="可选，自定义导出文件名称" style="width: 300px" />@<Input v-model="weekRange" placeholder="请输入日报周期，示例：0701-0705" style="width:150px" :maxlength="10"/>.xlsx
    <Button type="success" @click="exportExcel()">导出</Button>
  </div>
</template>
<script>
import { exportExcel } from '@/api/weekly'
import { getWeekRange } from '@/libs/myUtils'
export default {
  data () {
    return {
      fileName: '',
      weekRange: getWeekRange()
    }
  },
  methods: {
    exportExcel () {
      this.$Spin.show()
      exportExcel({ fileName: this.fileName, week_range: this.weekRange }).then(res => {
        if (res.data.retCode === '000000') {
          this.$Spin.hide()
          this.$Message.success('导出成功!')
          window.open(`/${res.data.data.excelName}`, 'download')
        }
      }).catch(e => {
        this.$Spin.hide()
      })
    }
  }
}
</script>
