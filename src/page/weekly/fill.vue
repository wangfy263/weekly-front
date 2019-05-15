<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
    <Row>
        <Card :bordered="false">
            <p slot="title">参与项目情况</p>
            <p>
                <FormItem label="项目类型" prop="project.type">
                    <Input v-model="formValidate.project.type" placeholder="输入项目类型" :maxlength="10"/>
                </FormItem>
                <FormItem label="归属分支" prop="branch">
                    <Select v-model="formValidate.project.branch" placeholder="选择分支">
                        <Option value="1">移动总部</Option>
                        <Option value="2">北京电信</Option>
                        <Option value="3">北京联通</Option>
                        <Option value="4">天津电信</Option>
                        <Option value="5">山西移动</Option>
                        <Option value="6">山西电信</Option>
                        <Option value="7">陕西移动</Option>
                        <Option value="8">吉林电信</Option>
                        <Option value="9">吉林移动</Option>
                        <Option value="10">黑龙江移动</Option>
                        <Option value="11">安徽移动</Option>
                        <Option value="12">安徽联通</Option>
                    </Select>
                </FormItem>
                <FormItem label="项目名称" prop="project_name">
                    <Input v-model="formValidate.project.name" placeholder="输入项目名称" :maxlength="20"/>
                </FormItem>
                <FormItem label="目前阶段" prop="project_state">
                    <Select v-model="formValidate.project.state" placeholder="选择项目状态">
                        <Option value="1">正常</Option>
                        <Option value="2">紧急</Option>
                    </Select>
                </FormItem>
                <FormItem label="下一步计划" prop="next_work">
                    <Input v-model="formValidate.project.next_work" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="Enter something..." :maxlength="200"/>
                </FormItem>
            </p>
        </Card>
    </Row>
    <Divider />
    <Row>
        <Card :bordered="false">
            <p slot="title">个人总结部分</p>
            <p>
                <FormItem label="项目名称" prop="project_name">
                    <Input v-model="formValidate.summarize.project_name" placeholder="输入项目名称" :maxlength="20"/>
                </FormItem>
                <FormItem label="工作类别" prop="work_type">
                    <Input v-model="formValidate.summarize.work_type" placeholder="开发、设计、测试、部署、文档"  :maxlength="10"/>
                </FormItem>
                <FormItem label="本周工作" prop="weekly_work">
                    <Input v-model="formValidate.summarize.weekly_work" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="Enter something..." :maxlength="250"/>
                </FormItem>
                <FormItem label="下周计划" prop="next_weekly_work">
                    <Input v-model="formValidate.summarize.next_weekly_work" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="Enter something..." :maxlength="250" />
                </FormItem>
            </p>
        </Card>
    </Row>
    <Divider />
    <Row>
        <Card :bordered="false">
            <p slot="title">个人输出物</p>
            <p>
                <FormItem label="输出物" prop="article_name">
                    <Input v-model="formValidate.output.article_name" placeholder="输出物名称" :maxlength="50"/>
                </FormItem>
                <FormItem label="输出物url" prop="article_url">
                    <Input v-model="formValidate.output.article_url" placeholder="帖子 or SVN地址" :maxlength="100"/>
                </FormItem>
            </p>
        </Card>
    </Row>
    <Divider />
    <Row>
        <Card :bordered="false">
            <p slot="title">兴趣组部分</p>
            <p>
                <FormItem label="兴趣组模块" prop="module">
                    <Input v-model="formValidate.interest.module" placeholder="兴趣组模块" :maxlength="50"/>
                </FormItem>
                <FormItem label="技术栈" prop="technic">
                    <Input v-model="formValidate.interest.technic" placeholder="技术栈" :maxlength="50"/>
                </FormItem>
                <FormItem label="预计投入（人天）" prop="cost">
                    <Input v-model="formValidate.interest.cost" placeholder="投入人天" :maxlength="3"/>
                </FormItem>
                <FormItem label="投入月份" prop="mouth">
                    <Select v-model="formValidate.interest.mouth" placeholder="月份">
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
            </p>
        </Card>
    </Row>
    <Divider />
    <Row>
        <Card :bordered="false">
            <p slot="title">前端协助部分</p>
            <p>
                <FormItem label="归属组别" prop="module">
                    <Select v-model="formValidate.assist.group_id" placeholder="选择组别">
                        <Option value="1">前端</Option>
                        <Option value="2">能力开放</Option>
                    </Select>
                </FormItem>
                <FormItem label="协助分支" prop="branch_id">
                    <Select v-model="formValidate.assist.branch_id" placeholder="选择分支">
                        <Option value="1">移动总部</Option>
                        <Option value="2">北京电信</Option>
                        <Option value="3">北京联通</Option>
                        <Option value="4">天津电信</Option>
                        <Option value="5">山西移动</Option>
                        <Option value="6">山西电信</Option>
                        <Option value="7">陕西移动</Option>
                        <Option value="8">吉林电信</Option>
                        <Option value="9">吉林移动</Option>
                        <Option value="10">黑龙江移动</Option>
                        <Option value="11">安徽移动</Option>
                        <Option value="12">安徽联通</Option>
                    </Select>
                </FormItem>
                <FormItem label="解决问题" prop="resolve">
                    <Input v-model="formValidate.assist.resolve" placeholder="解决问题描述" />
                </FormItem>
                <FormItem label="帖子地址" prop="url">
                    <Input v-model="formValidate.assist.url" placeholder="解决问题的记录" />
                </FormItem>
            </p>
        </Card>
    </Row>
    <Divider />
    <Row>
      <Button type="success">保存</Button>
    </Row>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      formValidate: {
        project: {
          type: '',
          branch: '1',
          name: '',
          state: '',
          next_work: ''
        },
        summarize: {
          project_name: '',
          work_type: '',
          weekly_work: '',
          next_weekly_work: ''
        },
        output: {
          article_name: '',
          article_url: ''
        },
        interest: {
          module: '',
          technic: '',
          cost: 0,
          mouth: 5
        },
        assist: {
          branch_id: 1,
          group_id: 1,
          resolve: '',
          url: ''
        }
      },
      ruleValidate: {
        'project.type': [
          { required: true, message: '项目类型不能为空', trigger: 'blur' }
        ],
        'project.branch': [
          { required: true, message: '请选择分支', trigger: 'change' }
        ],
        'project.name': [
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ],
        'project.state': [
          { required: true, message: '请选择目前阶段', trigger: 'change' }
        ],
        'project.next_work': [
          { required: true, message: '请填写下一步计划', trigger: 'blur' }
        ],
        'summarize.project_name': [
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ],
        'summarize.work_type': [
          { required: true, message: '请填写工作类型', trigger: 'blur' }
        ],
        'summarize.weekly_work': [
          { required: true, message: '请填写本周工作总结', trigger: 'blur' }
        ],
        'summarize.next_weekly_work': [
          { required: true, message: '请填写下周工作计划', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    //
  }
}
</script>
