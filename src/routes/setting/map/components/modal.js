import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, AutoComplete } from 'antd'
import { imgBaseURL } from '@utils/config'
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
  // console.log(data)

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
      fieldName: '地图名称',
      settings: {
        placeholder: '地图名称',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '地图名称不能为空' },
        ],
      },
    },
    {
      fieldType: 'ImageUploadItem',
      fieldName: '地图图片',
      settings: {
        length: 1,
        url: 'upload',
        viewProps: { width: '80%' },
        dealChange: (fileList) => {
          console.log(fileList)
          if (fileList && fileList.length && fileList[0]['fileDetail']) {
            const { width, height } = fileList[0]['fileDetail']
            form.setFieldsValue({ baseX: width, baseY: height })
          }
        },
      },
      form,
      valueName: 'img',
      options: {
        initialValue: data['img'],
        rules: [
          { required: true, message: '请选择地图图片' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '地图宽度',
      settings: {
        placeholder: '地图宽度(通过添加地图图片自动获取）',
        readonly: true,
      },
      form,
      valueName: 'baseX',
      options: {
        initialValue: data['baseX'],
        rules: [
          { required: true, message: '地图宽度不能为空' },
        ],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '地图高度',
      settings: {
        placeholder: '地图高度(通过添加地图图片自动获取）',
        readonly: true,
      },
      form,
      valueName: 'baseY',
      options: {
        initialValue: data['baseY'],
        rules: [
          { required: true, message: '地图高度不能为空' },
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
    confirmLoading: loading.effects['map/edit'],

    onOk: handleSubmit,
    onCancel: () => {
      dispatch({
        type: 'map/hideModal',
      })
    },
    // body: <VerForm {...formProps} />,
  }

  const MultiColPropsP1 = [
    {
      label: '基本信息',
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

export default Form.create()(formCon)
