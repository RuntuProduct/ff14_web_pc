import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, AutoComplete } from 'antd'
import { tools } from '@components'
// import styles from '.'

const { Modal, MyForm, MultiCol } = tools
const Option = AutoComplete.Option

const formCon = ({
  data = {},
  jobQuery,
  form,
  dealSubmit,
  dispatch,
  ...modalProps
}) => {
  const {
    getFieldValue,
  } = form
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
        dealSubmit(values)
      }
    })
  }
  const handleJobSearch = (values) => {
    console.log(values)
    dispatch({ type: 'product/jobQuery', payload: values })
  }
  const renderOption = (da) => {
    return <Option key={da.id} label={da.name}>{da.name}</Option>
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
      fieldName: '作物名称',
      settings: {
        placeholder: '作物名称',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '作物名称不能为空' },
        ],
      },
    },
    {
      fieldType: 'ImageUploadItem',
      fieldName: '职业图标',
      settings: {
        length: 1,
        url: 'upload',
      },
      form,
      valueName: 'img',
      options: {
        initialValue: data['img'],
        rules: [
          { required: false, message: '请选择职业图标' },
        ],
      },
    },
    {
      fieldType: 'AutoComplete',
      fieldName: '生产职业',
      settings: {
        placeholder: '请选择',
        allowClear: true,
        dataSource: jobQuery.map(renderOption),
        onSearch: v => handleJobSearch(v),
      },
      form,
      valueName: 'jobId',
      options: {
        initialValue: data['jobId'] ? data['jobId'].toString() : null,
        rules: [
          { required: true, message: '生产职业为必选项' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '难度',
      settings: {
        placeholder: '难度',
        type: 'number',
        clear: true,
      },
      form,
      valueName: 'difficulty',
      options: {
        initialValue: data['difficulty'],
        normalize: v => parseInt(v, 10),
        rules: [
          { type: 'number', message: '难度应为数字' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '耐久',
      settings: {
        placeholder: '耐久',
        type: 'number',
        clear: true,
      },
      form,
      valueName: 'stamina',
      options: {
        initialValue: data['stamina'],
        normalize: v => parseInt(v, 10),
        rules: [
          { type: 'number', message: '耐久应为数字' },
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