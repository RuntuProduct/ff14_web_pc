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
  loading,
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
    // console.log(form.getFieldsValue())
    form.validateFields((err, values) => {
      console.log('err', err)
      if (!err) {
        console.log('Received values of form: ', values)
        // 提交表单
        dispatch({
          type: 'product/edit',
          payload: values,
        })
      }
    })
  }
  const handleJobSearch = (values) => {
    console.log(values)
    dispatch({ type: 'utils/jobQuery', payload: values })
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
      fieldName: '作物图标',
      settings: {
        length: 1,
        url: 'upload',
      },
      form,
      valueName: 'img',
      options: {
        initialValue: data['img'],
        rules: [
          { required: false, message: '请选择作物图标' },
        ],
      },
    },
    {
      fieldType: 'AutoComplete',
      fieldName: '生产职业',
      settings: {
        placeholder: '请选择',
        allowClear: true,
        dataSource: jobQuery.filter(da => da.type === '02').map(renderOption),
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
      fieldName: '等级',
      settings: {
        placeholder: '等级',
        type: 'number',
        clear: true,
      },
      form,
      valueName: 'level',
      options: {
        initialValue: data['level'],
        normalize: v => parseInt(v, 10),
        rules: [
          { required: false, type: 'number', message: '等级应为数字' },
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
          { required: false, type: 'number', message: '难度应为数字' },
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
          { required: false, type: 'number', message: '耐久应为数字' },
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
    confirmLoading: loading.effects['product/edit'],

    onOk: handleSubmit,
    onCancel: () => {
      dispatch({
        type: 'product/hideModal',
      })
    },
    // body: <VerForm {...formProps} />,
  }

  const MultiColPropsP1 = [
    {
      label: '作物信息',
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
