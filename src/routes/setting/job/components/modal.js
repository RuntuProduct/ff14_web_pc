import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'antd'
import { tools } from '@components'
// import styles from '.'

const { Modal, MyForm, MultiCol } = tools

const formCon = ({
  data = {},
  form,
  dispatch,
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
        // dispatch({ type: '', values})
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
      fieldType: 'Radio',
      fieldName: '职业类型',
      settings: {
        placeholder: '',
      },
      form,
      valueName: 'type',
      options: {
        initialValue: `${data['type']}`,
        rules: [
          { required: true, message: '职业类型为必填项' },
        ],
      },
      son: [
        {
          label: '大地使者',
          value: '01',
        },
        {
          label: '能工巧匠',
          value: '02',
        },
      ],
    },
    {
      fieldType: 'Input',
      fieldName: '职业名称',
      settings: {
        placeholder: '职业名称',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '职业名称不能为空' },
        ],
      },
    },
    {
      fieldType: 'ImageUploadItem',
      fieldName: '材料图标',
      settings: {
        length: 1,
        url: 'upload',
      },
      form,
      valueName: 'img',
      options: {
        initialValue: [{ url: data['img'] }],
        rules: [
          { required: false, message: '请选择材料图标' },
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
    // body: <VerForm {...formProps} />,
  }

  return (
    <Modal {...sendProps}>
      <MyForm {...formProps} />
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
