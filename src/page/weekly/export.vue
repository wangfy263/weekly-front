<template>
  <div style="font-size: 14px">
    <p class="mgb-10">文件名称：
      <Input v-model="fileName" placeholder="可选，自定义导出文件名称" style="width: 350px" />
    </p>
    <p class="mgb-10">周报周期：
      <Select v-model="weekRange" style="width:350px">
        <Option v-for="(item,index) in rangeList" :value="item" :key="index">{{ item }}</Option>
      </Select>
    </p>
    <p class="mgb-10">导出文件全名：{{fileName}}@{{weekRange}}.xlsx</p>
    <Button type="success" @click="exportExcel()">导出</Button>
  </div>
</template>
<style scoped>
.mgb-10{
  margin-bottom: 10px;
}
</style>

<script>
import { exportExcel } from '@/api/weekly'
import { getWeekRange } from '@/libs/myUtils'
export default {
  data () {
    return {
      fileName: '前端能开@技术栈 研发&工程人员周状态@2019周报@山西@前端1组',
      weekRange: getWeekRange(),
      rangeList: [getWeekRange(), getWeekRange(1), getWeekRange(2)]
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
