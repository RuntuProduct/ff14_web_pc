import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col } from 'antd'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
import CollectionSearch from './collectionSearchIpt'
import les from './modalEditLocation.less'
import LocationSetting from './locationSetting'

const { Modal, MyForm, MultiCol } = tools

const formCon = ({
  data = {},
  form,
  loading,
  dispatch,
  ...modalProps
}) => {
  data = _.cloneDeep(data)

  const handleSubmit = () => {
    console.log(form.getFieldsValue())
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // 提交表单
        dispatch({
          type: 'map/editLocation',
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
        { label: '挖矿点', value: '01' },
        { label: '碎石点', value: '02' },
        { label: '采集点', value: '03' },
        { label: '割草点', value: '04' },
        { label: '传送点', value: '05' },
      ],
    },
    {
      fieldType: 'Input',
      fieldName: 'X坐标',
      settings: {
        placeholder: 'X坐标',
        readonly: true,
      },
      form,
      valueName: 'axisX',
      options: {
        initialValue: data['axisX'] || 0,
        rules: [
          { required: true, message: 'X坐标不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: 'Y坐标',
      settings: {
        placeholder: 'Y坐标',
        readonly: true,
      },
      form,
      valueName: 'axisY',
      options: {
        initialValue: data['axisY'] || 0,
        rules: [
          { required: true, message: 'Y坐标不能为空' },
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
    width: '90%',
    wrapClassName: 'vertical-center-modal',
    maskClosable: true,
    confirmLoading: loading.effects['map/editLocation'],

    onOk: handleSubmit,
    onCancel: () => {
      dispatch({
        type: 'map/hideModalLocationDetail',
      })
    },
    // body: <VerForm {...formProps} />,
  }
  const propLS = {
    data,
    form,
  }
  const propColSearchIpt = {
    dispatch,
  }

  const MultiColPropsP1 = [
    {
      label: '基本信息',
      childrens: <MyForm {...formPropsP1} />,
    },
  ]
  if (data['editType'] !== 'add') {
    MultiColPropsP1.push({
      label: '可采集物品',
      childrens: (
        <div>
          <CollectionSearch {...propColSearchIpt} />
        </div>
      ),
    })
  }
  const MultiColPropsP2 = [
    {
      label: '位置信息',
      childrens: <LocationSetting {...propLS} />,
    },
  ]

  return (
    <Modal modalProps={sendProps}>
      <Row gutter={16}>
        <Col span={10}>
          <MultiCol data={MultiColPropsP1} />
        </Col>
        <Col span={14}>
          <MultiCol data={MultiColPropsP2} />
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

export default Form.create()(formCon)
