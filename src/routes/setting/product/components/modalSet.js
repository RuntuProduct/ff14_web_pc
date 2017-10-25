import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
import les from './modalSet.less'

const { Modal, MyForm, MultiCol } = tools

const MdoalSelectCon = ({
  form,
  data = {},
  dispatch,
  ...modalProps
}) => {
  const dealCancel = () => {
    dispatch({ type: 'product/hideSet' })
  }
  const dealSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        dispatch({ type: 'product/addMat', obj: values })
      }
    })
  }
  const sendProps = {
    ...modalProps,
    visible: true,
    width: '400px',
    wrapClassName: 'vertical-center-modal',
    maskClosable: true,
    onOk: null,
    onCancel: dealCancel,

    footer: [
      <Button type="" key="cancel" onClick={dealCancel}>取消</Button>,
      <Button type="primary" key="ok" onClick={dealSubmit}>添加</Button>,
    ],
  }

  const formData = [
    {
      fieldType: 'nor',
      fieldName: '素材名称',
      value: data.name,
    },
    {
      fieldType: 'nor',
      fieldName: '来源职业',
      value: data.jobName,
    },
    {
      fieldType: 'Input',
      fieldName: '添加数量',
      settings: {
        placeholder: '要添加的数量',
        clear: true,
      },
      form,
      valueName: 'addNum',
      options: {
        initialValue: data['addNum'],
        rules: [
          { required: true, message: '要输入要添加的数量哦' },
        ],
      },
    },
  ]
  const formProps = {
    data,
    fields: formData,
    form,
  }
  return (
    <Modal modalProps={sendProps}>
      <div className={les.outer}>
        <div className={les.infoLine}>
          <div className={les.imgCon}>
            <img src={`${imgBaseURL}${data.img}`} alt="图标" />
          </div>
          <div className={les.detailPart}>
            <MyForm {...formProps} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

MdoalSelectCon.defaultProps = {
  // dealMenuClick: false,
}

MdoalSelectCon.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default Form.create()(MdoalSelectCon)
