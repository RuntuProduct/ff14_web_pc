import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
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
  data = _.cloneDeep(data)
  console.log(data)
  const dealCancel = () => {
    dispatch({ type: 'product/hideSet' })
  }
  const dealSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        const { editType } = data
        if (editType == 'add') {
          dispatch({ type: 'product/addMat', obj: values })
        } else if (editType == 'edit') {
          const { id, num } = values
          dispatch({ type: 'product/editMat', id, num })
        }
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
      fieldType: 'Hidden',
      fieldName: '素材名称',
      valueName: 'id',
      form,
      options: {
        initialValue: data['id'],
      },
    },
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
      fieldName: '数量',
      settings: {
        placeholder: '素材的数量',
        clear: true,
      },
      form,
      valueName: 'num',
      options: {
        initialValue: data['num'],
        rules: [
          { required: true, message: '要输入素材的数量哦' },
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
