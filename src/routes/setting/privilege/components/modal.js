import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { tools } from '@components'
// import styles from '.'

const { Modal, MyForm } = tools

class formCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      data = {},
      form,
      dealSubmit,
      ...modalProps
    } = this.props

    const {
      getFieldValue,
    } = form

    // console.log(data)
    const handleSubmit = () => {
      console.log(form.getFieldsValue())
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          dealSubmit(values)
        }
      })
    }

    const formData = [
      {
        fieldType: 'Input',
        fieldName: '节点名称',
        settings: {
          placeholder: '例：权限配置',
          clear: true,
        },
        form,
        valueName: 'name',
        options: {
          initialValue: data['name'],
          rules: [{
            required: true,
            message: '请输入节点名称',
          }],
        },
      },
      {
        fieldType: 'Input',
        fieldName: '父节点',
        settings: {
          placeholder: '',
          disabled: true,
        },
        form,
        valueName: 'parentName',
        options: {
          initialValue: data['parentName'],
          rules: [{
            required: true,
            message: '父节点不能为空',
          }],
        },
      },
      {
        fieldType: 'Radio',
        fieldName: '节点类型',
        settings: {
          placeholder: '',
          clear: true,
        },
        form,
        valueName: 'menu',
        options: {
          initialValue: data['menu'],
          rules: [{
            required: true,
            message: '此项为必填项',
          }],
        },
        son: [
          {
            label: '菜单节点',
            value: '1',
          },
          {
            label: '按钮节点',
            value: '0',
          },
        ],
      },
      {
        fieldType: 'Input',
        fieldName: '节点路径',
        settings: {
          placeholder: '例：/public/role',
          clear: true,
        },
        form,
        valueName: 'path',
        options: {
          initialValue: data['path'],
          rules: [{
            required: true,
            message: '节点路径为必填项',
          }],
        },
      },
      {
        fieldType: 'Radio',
        fieldName: '数据权限',
        settings: {
          extra: '是否需要对拥有该权限的用户进行数据可见范围的限制',
        },
        form,
        valueName: 'dataAudit',
        options: {
          initialValue: data['dataAudit'] || '0',
          rules: [{
            required: true,
            message: '此项为必填项',
          }],
        },
        son: [
          {
            label: '有',
            tips: '可以配置该权限节点可以浏览的数据的范围',
            value: '1',
          },
          {
            label: '无',
            tips: '该权限节点不需要进行数据可见范围配置',
            value: '0',
          },
        ],
      },
      {
        fieldType: 'Checkbox',
        fieldName: '数据权限配置',
        settings: {
          block: true,
          extra: '只选择一项的时候为该权限项的使用值，用户无法配置为其他值；选择项时用户可以选择其一作为生效值',
        },
        form,
        valueName: 'dataAuditValue',
        options: {
          initialValue: data['dataAuditValue'] || ['0'],
          rules: [{
            required: true,
            message: '此项为必填项',
          }],
        },
        son: [
          {
            label: '个人数据',
            tips: '只能看到由本人经手的数据',
            value: '1',
          },
          {
            label: '渠道数据',
            tips: '只能看到所属渠道及其所有子渠道的所有数据',
            value: '2',
          },
          {
            label: '全局数据',
            tips: '能看到所有渠道的数据',
            value: '0',
          },
        ],
      },
      {
        fieldType: 'Radio',
        fieldName: '节点激活状态',
        settings: {
          placeholder: '',
          clear: true,
        },
        form,
        valueName: 'status',
        options: {
          initialValue: data['status'],
          rules: [{
            required: true,
            message: '此项为必填项',
          }],
        },
        son: [
          {
            label: '激活',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
      {
        fieldType: 'Textarea',
        fieldName: '备注',
        settings: {
          autosize: { minRows: 4, maxRows: 8 },
        },
        form,
        valueName: 'remark',
        options: {
          initialValue: data['remark'],
          rules: [],
        },
      },
      {
        fieldType: 'Hidden',
        fieldName: '父节点的level',
        form,
        valueName: 'parent',
        options: {
          initialValue: data['parent'],
          rules: [],
        },
      },
      {
        fieldType: 'Hidden',
        fieldName: '表单的编辑状态-add还是edit',
        form,
        valueName: 'editType',
        options: {
          initialValue: data['editType'],
          rules: [],
        },
      },
      {
        fieldType: 'Hidden',
        fieldName: '编辑时该节点的id',
        form,
        valueName: 'id',
        options: {
          initialValue: data['editType'] === 'add' ? null : data['id'],
          rules: [],
        },
      },
    ]

    const formProps = {
      data,
      fields: formData,
      form,
    }

    const sendProps = {
      modalProps: {
        ...modalProps,
        onOk: handleSubmit,
      },
    }

    return (
      <Modal {...sendProps}>
        <Form>
          <MyForm {...formProps} />
        </Form>
      </Modal>
    )
  }
}

formCon.defaultProps = {
  // dealMenuClick: false,
}

formCon.propTypes = {
  data: PropTypes.object.isRequired,
}

// const ModalCon = ({
//   modalProps,
//   body,
// }) => {
//   return (
//     <Modal { modalProps, body } />
//   )
// }

export default Form.create()(formCon)
// export default ModalCon
