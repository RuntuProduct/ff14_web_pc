import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'antd'
import { tools } from '@components'
import industry from '@utils/industry'
import city from '@utils/city'
import { dealStrAry } from '@utils/pubfuc'
// import styles from '.'

const { Modal, MyForm, MultiCol } = tools

const formCon = ({
  data = {},
  form,
  dealSubmit,
  ...modalProps
}) => {
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

  console.log(data)

  const formData = [
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
    {
      fieldType: 'Input',
      fieldName: '用户名',
      settings: {
        placeholder: '登录用户名',
        clear: true,
      },
      form,
      valueName: 'account',
      options: {
        initialValue: data['account'],
        rules: [
          { required: true, message: '用户名不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '密码',
      settings: {
        placeholder: '登录密码',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '密码不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '再次输入密码',
      settings: {
        placeholder: '登录密码',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '密码不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '姓名',
      settings: {
        placeholder: '用户姓名',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '用户姓名不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '手机号',
      settings: {
        placeholder: '手机号',
        clear: true,
      },
      form,
      valueName: 'phone',
      options: {
        initialValue: data['phone'],
        rules: [
          { required: true, message: '手机号不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '所属渠道',
      settings: {
        placeholder: '所属渠道',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '所属渠道不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '部门',
      settings: {
        placeholder: '部门',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          // { required: true, message: '手机号不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '职位',
      settings: {
        placeholder: '职位',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          // { required: true, message: '手机号不能为空' },
        ],
      },
    },
    {
      fieldType: 'Textarea',
      fieldName: '备注',
      settings: {
        placeholder: '',
        autosize: { minRows: 6 },
      },
      form,
      valueName: 'remark',
      options: {
        initialValue: data['remark'],
        rules: [
          // { required: true, message: '请选择该渠道所属的渠道' },
        ],
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
    // body: <MyForm {...formProps} />,
  }

  return (
    <Modal {...sendProps}>
      <Row gutter={16}>
        <Col sm={12} xs={24}>
          <MultiCol
            data={
              [{ label: '用户信息', childrens: <MyForm {...formProps} /> }]
            }
          />
        </Col>
        <Col sm={12} xs={24}>
          <MultiCol
            data={
              [{ label: '角色设置', childrens: null }]
            }
          />
        </Col>
      </Row>
    </Modal>
  )
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
