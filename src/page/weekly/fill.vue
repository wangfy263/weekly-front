<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :label-width="120" label-position="left" inline>
    <Row v-show="formValidate.project.length > 0">
        <Card :bordered="false">
            <p slot="title">参与项目情况 <Icon type="ios-add-circle-outline" size="20" @click="addContent('project')"/></p>
            <p v-for="(item, index) in formValidate.project"
               :key="index">
              <Row>
                <Col span="12">
                  <FormItem
                    :prop="'project.' + index + '.type'"
                    :rules="{required: true, message: '项目类型不能为空', trigger: 'change'}"
                    label="项目类型"
                  >
                      <!-- <Input v-model="item.type" placeholder="输入项目类型" :maxlength="10" :disabled="index<length"/> -->
                      <Select v-model="item.type" placeholder="选择项目类型" :disabled="index<length">
                        <Option :value="`${option.state_id}`" v-for="(option, ind) in enumerates.proStateEnum" :key="ind">{{option.state_name}}</Option>
                        <!-- <Option value="1">商务</Option>
                        <Option value="2">研发</Option>
                        <Option value="3">培训</Option> -->
                      </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="归属分支"
                    :prop="'project.' + index + '.branch'"
                    :rules="{required: true, message: '请选择分支', trigger: 'change'}"
                    >
                      <Select v-model="item.branch" placeholder="选择分支" :disabled="index <length">
                          <Option :value="`${option.branch_id}`" v-for="(option, index) in enumerates.branchEnum" :key="index">{{option.branch_name}}</Option>
                      </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="项目名称"
                    :prop="'project.' + index + '.name'"
                    :rules="{required: true, message: '请输入项目名称', trigger: 'change'}"
                    >
                      <Input v-model="item.name" placeholder="输入项目名称" :maxlength="20" :disabled="index<length"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="目前阶段"
                    :prop="'project.' + index + '.state'"
                    :rules="{required: true, message: '请选择目前阶段', trigger: 'change'}">
                      <Select v-model="item.state" placeholder="选择项目状态">
                          <Option value="1">正常</Option>
                          <Option value="2">紧急</Option>
                      </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="下一步计划"
                    :prop="'project.' + index + '.next_work'"
                    :rules="{required: true, message: '请填写下一步计划', trigger: 'blur'}">
                      <Input v-model="item.next_work" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="Enter something ..." :maxlength="200"/>
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="end" class="code-row-bg" v-show="index >= length">
                  <Col span="2"><Button type="error" @click="del('project')">删除</Button></Col>
              </Row>
              <Divider v-show="index !== formValidate.project.length-1" />
            </p>
        </Card>
    </Row>
    <Divider v-show="formValidate.project.length > 0"/>
    <Row>
        <Card :bordered="false">
            <p slot="title">个人总结部分 <Icon type="ios-add-circle-outline" size="20" @click="addContent('summarize')"/></p>
            <p v-for="(item, index) in formValidate.summarize"
               :key="index">
              <Row>
                <Col span="12">
                <FormItem
                  label="项目名称"
                  :prop="'summarize.' + index + '.project_name'"
                  :rules="{required: true, message: '请选择分支', trigger: 'change'}">
                    <Input v-model="item.project_name" placeholder="输入项目名称" :maxlength="20"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem
                  label="项目类别"
                  :prop="'summarize.' + index + '.work_type'"
                  :rules="{required: true, message: '请填写项目类型', trigger: 'blur'}"
                  >
                    <!-- <Input v-model="item.work_type" placeholder="开发、设计、测试、部署、文档"  :maxlength="10"/> -->
                    <Select v-model="item.work_type" placeholder="选择项目类型">
                      <Option :value="`${option.state_id}`" v-for="(option, ind) in enumerates.proStateEnum" :key="ind">{{option.state_name}}</Option>
                      <!-- <Option value="1">商务</Option>
                      <Option value="2">研发</Option>
                      <Option value="3">培训</Option> -->
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem
                  label="本周工作"
                  :prop="'summarize.'+index+'.weekly_work'"
                  :rules="{required: true, message: '请填写本周工作总结', trigger: 'blur'}">
                    <Input v-model="item.weekly_work" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="Enter something..." :maxlength="250"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem
                  label="下周计划"
                  :prop="'summarize.'+index+'.next_weekly_work'"
                  :rules="{required: true, message: '请填写下周工作计划', trigger: 'blur'}">
                    <Input v-model="item.next_weekly_work" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="Enter something..." :maxlength="250" />
                </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="end" class="code-row-bg" v-show="index !== 0">
                  <Col span="2"><Button type="error" @click="del('summarize')">删除</Button></Col>
              </Row>
              <Divider v-show="index !== formValidate.summarize.length-1" />
            </p>
        </Card>
    </Row>
    <Divider />
    <Row>
        <Card :bordered="false">
            <p slot="title">个人输出物 <Icon type="ios-add-circle-outline" size="20" @click="addContent('output')"/></p>
            <p v-for="(item, index) in formValidate.output"
               :key="index">
              <Row>
                <Col span="12">
                <FormItem label="输出物" >
                    <Input v-model="item.article_name" placeholder="输出物名称" :maxlength="50"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="输出物url">
                    <Input v-model="item.article_url" placeholder="帖子 or SVN地址" :maxlength="100"/>
                </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="end" class="code-row-bg">
                  <Col span="2"><Button type="error" @click="del('output')">删除</Button></Col>
              </Row>
              <Divider v-show="index !== formValidate.output.length-1" />
            </p>
        </Card>
    </Row>
    <Divider />
    <Row>
        <Card :bordered="false">
            <p slot="title">兴趣组部分 <Icon type="ios-add-circle-outline" size="20" @click="addContent('interest')"/></p>
            <p v-for="(item, index) in formValidate.interest"
               :key="index">
              <Row>
                <Col span="12">
                <FormItem label="兴趣组模块">
                    <Input v-model="item.module" placeholder="兴趣组模块" :maxlength="50"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="技术栈">
                    <Input v-model="item.technic" placeholder="技术栈" :maxlength="50"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="预计投入（人天）">
                    <Input v-model="item.cost" placeholder="投入人天" :maxlength="3"/>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="投入月份">
                    <Select v-model="item.mouth" placeholder="月份">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                        <Option value="11">11</Option>
                        <Option value="12">12</Option>
                    </Select>
                </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="end" class="code-row-bg">
                  <Col span="2"><Button type="error" @click="del('interest')">删除</Button></Col>
              </Row>
              <Divider v-show="index !== formValidate.interest.length-1" />
            </p>
        </Card>
    </Row>
    <Divider />
    <Row>
        <Card :bordered="false">
            <p slot="title">前端协助部分 <Icon type="ios-add-circle-outline" size="20" @click="addContent('assist')"/></p>
            <p v-for="(item, index) in formValidate.assist"
               :key="index">
              <Row>
                <Col span="12">
                <FormItem label="归属组别">
                    <Select v-model="item.group_id" placeholder="选择组别">
                        <Option value="1">前端</Option>
                        <Option value="2">能力开放</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="协助分支">
                    <Select v-model="item.branch_id" placeholder="选择分支">
                        <Option :value="`${option.branch_id}`" v-for="(option, index) in enumerates.branchEnum" :key="index">{{option.branch_name}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="解决问题">
                    <Input v-model="item.resolve" placeholder="解决问题描述" />
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="帖子地址">
                    <Input v-model="item.url" placeholder="解决问题的记录" />
                </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="end" class="code-row-bg">
                  <Col span="2"><Button type="error" @click="del('assist')">删除</Button></Col>
              </Row>
              <Divider v-show="index !== formValidate.assist.length-1" />
            </p>
        </Card>
    </Row>
    <Divider />
    <Row class="bottom-row">
      <Button type="success" class="bottom-button" @click="save('formValidate')">保存周报内容</Button>
      <span class="message-alert">请填写本周工作内容/下周工作计划，并保存</span>
    </Row>
    </Form>
  </div>
</template>
<style>
.bottom-row {
  position: absolute;
  bottom: 0px;
  left: 256px;
  background: #F5F7F9;
  width: 100%;
  /* border-top: 1px solid #515a6e; */
}
.bottom-row .bottom-button {
  position: relative;
  bottom: 10px;
  left: 18px;
  margin-top: 20px;
}
.bottom-row .message-alert {
  position: relative;
  left: 55px;
  /* margin-left: 55px； */
}
</style>
<script>
import { saveReport, findByUserId } from '@/api/weekly'
import { mapGetters } from 'vuex'
export default {
  name: 'fill',
  components: {
  },
  data () {
    return {
      formValidate: {
        project: [],
        summarize: [{
          project_name: '',
          work_type: '',
          weekly_work: '',
          next_weekly_work: ''
        }],
        output: [],
        interest: [],
        assist: []
      },
      length: 0,
      saveFlag: false
    }
  },
  computed: {
    ...mapGetters([
      'enumerates'
    ])
  },
  mounted () {
    this.findProject()
  },
  methods: {
    save (name) {
      console.log(this.formValidate)
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.saveFlag) {
            this.$Message.warning('warning 请勿重复提交')
            return
          }
          this.saveFlag = true
          this.$Loading.start()
          const msg = this.$Message.loading({
            content: 'Loading...',
            duration: 0
          })
          saveReport(this.formValidate).then(res => {
            msg()
            if (res.data.retCode === '000000') {
              this.$Loading.finish()
              this.$Message.success('Success! 你输入的周报成功保存!')
            } else {
              this.saveFlag = false
              this.$Loading.error()
              this.$Message.error('Error！ 系统错误，保存失败，请联系管理员')
            }
          })
        } else {
          this.saveFlag = false
          this.$Loading.error()
          this.$Message.error('Fail! 项目进度和个人总结部分为必填内容，请检查是否有遗漏！')
        }
      })
    },
    addContent (key) {
      if (key === 'project' && this.formValidate.project.length < 5) {
        this.formValidate.project.push({
          type: '',
          branch: '',
          name: '',
          state: '',
          next_work: ''
        })
      }
      if (key === 'summarize' && this.formValidate.summarize.length < 5) {
        this.formValidate.summarize.push({
          project_name: '',
          work_type: '',
          weekly_work: '',
          next_weekly_work: ''
        })
      }
      if (key === 'output' && this.formValidate.output.length < 5) {
        this.formValidate.output.push({
          article_name: '',
          article_url: ''
        })
      }
      if (key === 'interest' && this.formValidate.interest.length < 5) {
        this.formValidate.interest.push({
          module: '',
          technic: '',
          cost: 0,
          mouth: 0
        })
      }
      if (key === 'assist' && this.formValidate.assist.length < 5) {
        this.formValidate.assist.push({
          branch_id: 0,
          group_id: 0,
          resolve: '',
          url: ''
        })
      }
    },
    del (key) {
      if (key === 'project' && this.formValidate.project.length > 1) {
        this.formValidate.project.pop()
      }
      if (key === 'summarize' && this.formValidate.summarize.length > 1) {
        this.formValidate.summarize.pop()
      }
      if (key === 'output' && this.formValidate.output.length > 0) {
        this.formValidate.output.pop()
      }
      if (key === 'interest' && this.formValidate.interest.length > 0) {
        this.formValidate.interest.pop()
      }
      if (key === 'assist' && this.formValidate.assist.length > 0) {
        this.formValidate.assist.pop()
      }
    },
    findProject () {
      findByUserId().then(res => {
        if (res.data.retCode === '000000') {
          // let list = res.data.data
          this.formValidate.project = res.data.data
          this.length = res.data.data.length
        }
      })
    }
  }
}
</script>
