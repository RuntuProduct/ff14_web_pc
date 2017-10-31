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
          type: 'map/edit',
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
      fieldName: '地图id',
      form,
      valueName: 'mapId',
      options: {
        initialValue: data['mapId'],
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
      fieldName: '地点名称',
      settings: {
        placeholder: '地点名称',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '地点名称不能为空' },
        ],
      },
    },
    {
      fieldType: 'Select',
      fieldName: '地点类型',
      settings: {},
      form,
      valueName: 'type',
      options: {
        initialValue: data.type === undefined ? '01' : `${data.type}`,
        rules: [
          { required: true },
        ],
      },
      son: [
        { label: '采集点', value: '01' },
        { label: '挖矿点', value: '02' },
        { label: '传送点', value: '03' },
      ],
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
    confirmLoading: loading.effects['map/edit'],

    onOk: handleSubmit,
    onCancel: () => {
      dispatch({
        type: 'map/hideModal',
      })
    },
    // body: <VerForm {...formProps} />,
  }
  const MapSetting = () => {
    return (
      <div>aaa</div>
    )
  }

  const MultiColPropsP1 = [
    {
      label: '基本信息',
      childrens: <MyForm {...formPropsP1} />,
    },
    {
      label: '位置信息',
      childrens: MapSetting(),
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

export default Form.create()(formCon)
