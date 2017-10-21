import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, AutoComplete } from 'antd'
import { tools } from '@components'
import FormTable from './formulaTable'
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
    console.log(form.getFieldsValue())
    form.validateFields((err, values) => {
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
      fieldName: '编辑时该节点的id',
      form,
      valueName: 'id',
      options: {
        initialValue: data['editType'] === 'add' ? null : data['id'],
        rules: [],
      },
    },
    {
      fieldType: 'nor',
      fieldName: '作物名称',
      value: data['name'],
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
      fieldType: 'nor',
      fieldName: '生产职业',
      value: 'jobName',
    },
    {
      fieldType: 'nor',
      fieldName: '难度',
      value: data['difficulty'],
    },
    {
      fieldType: 'nor',
      fieldName: '耐久',
      valueName: data['stamina'],
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
    width: '60%',
    wrapClassName: 'vertical-center-modal',
    maskClosable: true,
    confirmLoading: loading.effects['product/edit'],

    onOk: handleSubmit,
    onCancel: () => {
      dispatch({
        type: 'product/hideModalF',
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
  const MultiColPropsP2 = [
    {
      label: '配方信息',
      childrens: <FormTable />,
    },
  ]

  return (
    <Modal modalProps={sendProps}>
      <Row gutter={16}>
        <Col span={10}><MultiCol data={MultiColPropsP1} /></Col>
        <Col span={14}><MultiCol data={MultiColPropsP2} /></Col>
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
