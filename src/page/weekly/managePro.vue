<template>
  <div class="manage-project">
    <Card title="团队所辖项目管理">
    <Table :columns="proColumns" :data="projects" height="300"></Table>
    </Card>
    <Card :title="oprTitle" style="margin-top:20px;margin-bottom:30px" v-show="isShow">
      <Form ref="formValidate" :model="formValidate" :label-width="120" label-position="left" inline>
      <Row>
        <Col span="12">
          <FormItem
            prop="state_id"
            :rules="{required: true, message: '项目类型不能为空', trigger: 'blur'}"
            label="项目类型"
          >
              <!-- <Input v-model="formValidate.type" placeholder="输入项目类型" :maxlength="10"/> -->
              <Select v-model="formValidate.state_id" placeholder="选择项目类型">
                  <Option :value="`${option.state_id}`" v-for="(option, ind) in enumerates.proStateEnum" :key="ind">{{option.state_name}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="branch_id"
            label="归属分支"
            :rules="{required: true, message: '请选择分支', trigger: 'change'}"
            >
              <Select v-model="formValidate.branch_id" placeholder="选择分支">
                  <Option :value="`${option.branch_id}`" v-for="(option, index) in enumerates.branchEnum" :key="index">{{option.branch_name}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="name"
            label="项目名称"
            :rules="{required: true, message: '请输入项目名称', trigger: 'change'}"
            >
              <Input v-model="formValidate.name" placeholder="输入项目名称" :maxlength="20"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="staff_id"
            label="前端负责人"
            :rules="{required: true, message: '请选择负责人', trigger: 'change'}"
            >
              <Select v-model="formValidate.staff_id" placeholder="选择负责人">
                  <Option value="1">wangfy</Option>
                  <Option value="2">lihao_mios</Option>
                  <Option value="3">liule</Option>
                  <Option value="4">chenrr_miso</Option>
                  <Option value="5">liyn_miso</Option>
              </Select>
          </FormItem>
        </Col>
      </Row>
      </Form>
    </Card>
    <div class="bottom-row">
      <Button type="success" class="bottom-button" @click="add()" style="margin-right:10px" v-show="!isShow">添加</Button>
      <Button type="success" class="bottom-button" @click="save('formValidate')" v-show="isShow" style="margin-right:20px">保存</Button>
      <Button type="info" class="bottom-button" @click="cancel()" v-show="isShow">取消</Button>
      <span class="message-alert"></span>
    </div>
  </div>
</template>
<style>
    .manage-project .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-project .ivu-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .manage-project .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-project .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-project .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .manage-project .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
    .manage-project .bottom-row {
        position: absolute;
        bottom: 0px;
        left: 256px;
        background: #e8eaec;
        width: 100%;
    }
    .manage-project .bottom-row .bottom-button {
      position: relative;
      bottom: 10px;
      left: 18px;
      margin-top: 20px;
    }
    .manage-project .bottom-row .message-alert {
      position: relative;
      left: 55px;
      /* margin-left: 55px； */
    }
</style>
<script>
import { findProjects, saveProject, updateProject, deleteProject } from '@/api/weekly'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      proColumns: [
        {
          title: '项目类型',
          key: 'type'
        },
        {
          title: '归属分支',
          key: 'branch'
        },
        {
          title: '项目名称',
          key: 'name'
        },
        {
          title: '前端负责人',
          key: 'staffNoteId'
          // className: 'demo-table-info-column'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.upd(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.del(params.row.project_id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      projects: [],
      oprTitle: '操作',
      isShow: false,
      formValidate: {
        project_id: '',
        name: '',
        state_id: '',
        branch_id: '',
        staff_id: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'enumerates'
    ])
  },
  mounted () {
    this.findProjects()
  },
  methods: {
    findProjects () {
      findProjects().then(res => {
        if (res.data.retCode === '000000') {
          this.projects = res.data.data
        } else {
          this.$Message.error('Error！ 系统错误，请联系管理员')
        }
      })
    },
    add () {
      this.oprTitle = '添加'
      this.isShow = true
      this.formValidate.project_id = ''
      this.formValidate.state_id = ''
      this.formValidate.name = ''
      this.formValidate.branch_id = ''
      this.formValidate.staff_id = ''
    },
    upd (obj) {
      this.oprTitle = '修改'
      this.isShow = true
      this.formValidate.project_id = obj.project_id
      this.formValidate.state_id = `${obj.state_id}`
      this.formValidate.name = obj.name
      this.formValidate.branch_id = `${obj.branch_id}`
      this.formValidate.staff_id = `${obj.staff_id}`
    },
    cancel () {
      this.isShow = false
    },
    save (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let param = {}
          for (var key in this.formValidate) {
            if (this.formValidate.hasOwnProperty(key)) {
              let value = this.formValidate[key]
              param[key] = key !== 'name' && value ? parseInt(value, 10) : value
            }
          }
          if (this.oprTitle === '修改') {
            param.project_id = parseInt(this.formValidate.project_id, 10)
            this.update(param)
          }
          if (this.oprTitle === '添加') {
            this.insert(param)
          }
        }
      })
    },
    insert (param) {
      saveProject(param).then(res => {
        if (res.data.retCode === '000000') {
          this.findProjects()
          this.$Message.success('Success! 保存成功!')
        } else {
          this.$Message.error('Error！ 系统错误，保存失败，请联系管理员')
        }
      })
    },
    update (param) {
      updateProject(param).then(res => {
        if (res.data.retCode === '000000') {
          this.findProjects()
          this.$Message.success('Success! 修改成功!')
        } else {
          this.$Message.error('Error！ 系统错误，修改失败，请联系管理员')
        }
      })
    },
    del (id) {
      deleteProject({ id: parseInt(id, 10) }).then(res => {
        if (res.data.retCode === '000000') {
          this.findProjects()
          this.$Message.success('Success! 删除成功!')
        } else {
          this.$Message.error('Error！ 系统错误，删除失败，请联系管理员')
        }
      })
    }
  }
}
</script>
