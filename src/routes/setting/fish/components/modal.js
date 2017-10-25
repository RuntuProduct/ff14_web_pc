import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, AutoComplete } from 'antd'
import { tools } from '@components'
// import styles from '.'

const { Modal, MyForm, MultiCol } = tools
const Option = AutoComplete.Option

const formCon = ({
  data = {},
  form,
  loading,
  dispatch,
  ...modalProps
}) => {
  data = _.cloneDeep(data)
  const { img } = data
  if (img && typeof img == 'string') {
    data.img = [{
      uid: 'upload-1',
      url: img,
    }]
  }
  console.log(data)

  // console.log(data)
  const handleSubmit = () => {
    console.log(form.getFieldsValue())
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // 提交表单
        dispatch({
          type: 'fish/edit',
          payload: values,
        })
      }
    })
  }
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
      fieldName: '鱼类名称',
      settings: {
        placeholder: '鱼类名称',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '鱼类名称不能为空' },
        ],
      },
    },
    {
      fieldType: 'ImageUploadItem',
      fieldName: '鱼类图标',
      settings: {
        length: 1,
        url: 'upload',
      },
      form,
      valueName: 'img',
      options: {
        initialValue: data['img'],
        rules: [
          { required: false, message: '请选择鱼类图标' },
        ],
      },
    },
  ]


  const formPropsP1 = {
    data,
    fields: formData,
    form,
    layout: { span: 24 },
  }

  const sendProps = {
    ...modalProps,
    visible: true,
    width: '400px',
    wrapClassName: 'vertical-center-modal',
    maskClosable: true,
    confirmLoading: loading.effects['fish/edit'],

    onOk: handleSubmit,
    onCancel: () => {
      dispatch({
        type: 'fish/hideModal',
      })
    },
    // body: <VerForm {...formProps} />,
  }

  const MultiColPropsP1 = [
    {
      label: '鱼类信息',
      childrens: <MyForm {...formPropsP1} />,
    },
  ]

  return (
    <Modal modalProps={sendProps}>
      <MultiCol data={MultiColPropsP1} />
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
