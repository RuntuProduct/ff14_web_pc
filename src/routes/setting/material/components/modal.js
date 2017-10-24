import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, AutoComplete } from 'antd'
import { tools } from '@components'
// import styles from '.'
import { imgs } from '@utils/config'

const { Modal, MyForm, MultiCol } = tools
const Option = AutoComplete.Option
const { mining, quarrying, logging, harvesting } = imgs

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
      fieldName: '材料名称',
      settings: {
        placeholder: '材料名称',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '材料名称不能为空' },
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
        initialValue: data['img'],
        rules: [
          { required: false, message: '请选择材料图标' },
        ],
      },
    },
    {
      fieldType: data['editType'] === 'add' ? 'Hidden' : 'AutoComplete',
      fieldName: '所属生产职业',
      settings: {
        placeholder: '请选择',
        allowClear: true,
        readonly: true,
        disabled: true,
        dataSource: jobQuery.map(renderOption),
        // onSearch: v => handleJobSearch(v),
      },
      form,
      valueName: 'jobId',
      options: {
        initialValue: data['jobId'] ? data['jobId'].toString() : null,
        rules: [
          { required: false, message: '生产职业为必选项' },
        ],
      },
    },
    {
      fieldType: 'Radio',
      fieldName: '采集类型',
      settings: {
        placeholder: '请选择',
      },
      form,
      valueName: 'getType',
      options: {
        initialValue: data['getType'],
        rules: [
          { required: true, message: '生产职业为必选项' },
        ],
      },
      son: [
        { label: '挖掘', value: '01', img: mining },
        { label: '碎石', value: '02', img: quarrying },
        { label: '采伐', value: '03', img: logging },
        { label: '割草', value: '04', img: harvesting },
      ],
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
