<template>
  <div class="manage-staff">
    <Card title="人员管理" class="manage-staff-card">
    <Table :columns="proColumns" :data="staffs"></Table>
    </Card>
    <div class="bottom-row">
      <Button type="success" class="bottom-button" @click="modal1=true; isSave=true" style="margin-right:10px">添加</Button>
      <span class="message-alert"></span>
    </div>
    <!-- 添加 -->
    <Modal
      v-model="modal1"
      @on-cancel="cancel"
      @on-ok="submit"
      :mask-closable="false"
      width="600"
      title="添加"
      :loading="loading"
    >
      <Form ref="formValidate" :model="formValidate" :label-width="90" label-position="left" inline>
      <Row>
        <Col span="12">
          <FormItem
            prop="staff_name"
            :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}"
            label="姓名"
          >
            <Input v-model="formValidate.staff_name" placeholder="输入姓名" :maxlength="20"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="staff_notes_id"
            :rules="{required: true, message: 'notesID不能为空', trigger: 'blur'}"
            label="notesID"
          >
            <Input v-model="formValidate.staff_notes_id" placeholder="输入notesID" :maxlength="20"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="staff_email"
            label="邮箱"
            :rules="{required: true, message: '请输入邮箱', trigger: 'change'}"
            >
              <Input v-model="formValidate.staff_email" placeholder="输入邮箱" :maxlength="50"/>
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
            prop="base_id"
            label="办公地"
            :rules="{required: true, message: '请选择办公地', trigger: 'change'}"
            >
              <Select v-model="formValidate.base_id" placeholder="选择办公地">
                  <Option :value="`${option.base_id}`" v-for="(option, index) in enumerates.baseEnum" :key="index">{{option.base_name}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="group_id"
            label="所属群组"
            :rules="{required: true, message: '请选择群组', trigger: 'change'}"
            >
              <Select v-model="formValidate.group_id" placeholder="选择群组">
                  <Option :value="`${option.group_id}`" v-for="(option, index) in enumerates.groupEnum" :key="index">{{option.group_name}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="type_id"
            label="岗位类型"
            :rules="{required: true, message: '请选择岗位类型', trigger: 'change'}"
            >
              <Select v-model="formValidate.type_id" placeholder="选择岗位类型">
                  <Option :value="`${option.type_id}`" v-for="(option, index) in enumerates.typeEnum" :key="index">{{option.type_name}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="level_id"
            label="职级"
            :rules="{required: true, message: '请选择职级', trigger: 'change'}"
            >
              <Select v-model="formValidate.level_id" placeholder="选择职级">
                   <Option :value="`${option.level_id}`" v-for="(option, index) in enumerates.levelEnum" :key="index">{{option.level_name}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem
            prop="roles"
            label="角色"
            :rules="{ type: 'array', required: true, message: '请选择角色', trigger: 'change'}"
            >
              <Select v-model="formValidate.roles" multiple placeholder="选择角色">
                   <Option :value="`${option.role_id}`" v-for="(option, index) in enumerates.roleEnum" :key="index">{{option.role_name}}</Option>
              </Select>
          </FormItem>
        </Col>
      </Row>
      </Form>
    </Modal>
  </div>
</template>
<style scope>
    .manage-staff .manage-staff-card{
      margin-bottom: 30px;
    }
    .manage-staff .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-staff .ivu-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .manage-staff .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-staff .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-staff .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .manage-staff .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
    .manage-staff .bottom-row {
        position: absolute;
        bottom: 0px;
        left: 256px;
        background: #e8eaec;
        width: 100%;
    }
    .manage-staff .bottom-row .bottom-button {
      position: relative;
      bottom: 10px;
      left: 18px;
      margin-top: 20px;
    }
    .manage-staff .bottom-row .message-alert {
      position: relative;
      left: 55px;
      /* margin-left: 55px； */
    }
</style>
<script>
import { findStaff, saveStaff, updStaff, delStaff, findRoles } from '@/api/manage'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      loading: true,
      modal1: false,
      isSave: true,
      proColumns: [
        {
          title: '人员名称',
          key: 'staff_name'
        },
        {
          title: 'noteID',
          key: 'staff_notes_id'
        },
        {
          title: '归属分支',
          key: 'branch_name'
        },
        {
          title: '归属组别',
          key: 'group_name'
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
                    this.del(params.row.staff_id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      staffs: [],
      oprTitle: '操作',
      formValidate: {
        staff_id: '',
        staff_name: '',
        staff_notes_id: '',
        staff_email: '',
        branch_id: '',
        group_id: '',
        level_id: '',
        base_id: '',
        type_id: '',
        roles: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'enumerates'
    ])
  },
  mounted () {
    this.findStaffs()
  },
  methods: {
    findStaffs () {
      findStaff().then(res => {
        if (res && res.data && res.data.retCode === '000000') {
          this.staffs = res.data.data
        }
      })
    },
    submit (name) { // formValidate
      name = name || 'formValidate'
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Loading.start()
          const msg = this.$Message.loading({
            content: 'Loading...',
            duration: 0
          })
          const param = this.formValidate
          this.save(param, msg)
        } else {
          // iview组件存在的问题，表单验证需要处理loading的状态：https://github.com/iview/iview/issues/597#issuecomment-292422473
          setTimeout(() => {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
          }, 0)
        }
      })
    },
    cancel (name) {
      name = name || 'formValidate'
      this.$refs[name].resetFields()
    },
    save (param, msg) {
      let operate = this.isSave ? saveStaff : updStaff
      operate(param).then(res => {
        msg()
        if (res.data.retCode === '000000') {
          this.modal1 = false
          this.$Loading.finish()
          this.$Message.success('Success! 保存成功!')
          this.cancel()
          this.findStaffs()
        } else {
          this.$Loading.error()
          this.$Message.error('Error！ 系统错误，保存失败，请联系管理员')
        }
      })
    },
    upd (item) {
      this.formValidate.staff_id = item.staff_id
      this.formValidate.staff_name = item.staff_name
      this.formValidate.staff_notes_id = item.staff_notes_id
      this.formValidate.staff_email = item.staff_email
      this.formValidate.branch_id = item.branch_id + ''
      this.formValidate.group_id = item.group_id + ''
      this.formValidate.level_id = item.level_id + ''
      this.formValidate.base_id = item.base_id + ''
      this.formValidate.type_id = item.type_id + ''
      findRoles({ staff_id: item.staff_id }).then(res => {
        if (res.data.retCode === '000000') {
          this.formValidate.roles = res.data.data.map((item) => {
            return item.role_id + ''
          })
          this.modal1 = true
          this.isSave = false
        } else {
          this.$Message.error('Error! 信息异常!')
        }
      })
    },
    del (id) {
      delStaff({ id }).then(res => {
        if (res.data.retCode === '000000') {
          this.findStaffs()
          this.$Message.success('Success! 删除成功!')
        } else {
          this.$Message.error('Error! 删除失败!')
        }
      })
    }
  }
}
</script>
