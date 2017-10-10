import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'antd'
import { tools } from '@components'
import industry from '@utils/industry'
import city from '@utils/city'
import { dealStrAry } from '@utils/pubfuc'
// import styles from '.'
import Tree from './tree'

const { Modal, MyForm, MultiCol } = tools

const formCon = ({
  data = {},
  form,
  dealSubmit,
  ...modalProps
}) => {
  const {
    getFieldValue,
  } = form

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

  console.log(data)

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
      fieldName: '角色名称',
      settings: {
        placeholder: '角色名称',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: data['name'],
        rules: [
          { required: true, message: '角色名称不能为空' },
        ],
      },
    },
    // {
    //   fieldType: 'Radio',
    //   fieldName: '获取移动端权限',
    //   settings: {
    //     placeholder: '',
    //   },
    //   form,
    //   valueName: 'mobile',
    //   options: {
    //     initialValue: data['mobile'],
    //     rules: [
    //       { required: true, message: '获取移动端权限为必填项' },
    //     ],
    //   },
    //   son: [
    //     {
    //       label: '是',
    //       value: '1',
    //     },
    //     {
    //       label: '否',
    //       value: '0',
    //     },
    //   ],
    // },
    {
      fieldType: 'Radio',
      fieldName: '启用状态',
      settings: {
        placeholder: '',
      },
      form,
      valueName: 'bCity',
      options: {
        initialValue: `${data['used']}`,
        rules: [
          { required: true, message: '启用状态为必填项' },
        ],
      },
      son: [
        {
          label: '启用',
          value: '1',
        },
        {
          label: '停用',
          value: '0',
        },
      ],
    },
    // {
    //   fieldType: 'Radio',
    //   fieldName: '渠道可见',
    //   settings: {
    //     placeholder: '',
    //   },
    //   form,
    //   valueName: 'address',
    //   options: {
    //     initialValue: '',
    //     rules: [
    //       { required: true, message: '渠道可见为必填项' },
    //     ],
    //   },
    //   son: [
    //     {
    //       label: '是',
    //       value: '1',
    //     },
    //     {
    //       label: '否',
    //       value: '0',
    //     },
    //   ],
    // },
    {
      fieldType: 'Textarea',
      fieldName: '备注',
      settings: {
        placeholder: '角色备注',
        autosize: { minRows: 6 },
      },
      form,
      valueName: 'remark',
      options: {
        initialValue: data['remark'],
        rules: [
          // { required: true, message: '请选择该渠道所属的渠道' },
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
      <Row gutter={16}>
        <Col sm={12} xs={24}>
          <MultiCol
            data={
              [{ label: '角色设置', childrens: <MyForm {...formProps} /> }]
            }
          />
        </Col>
        <Col sm={12} xs={24}>
          <MultiCol
            data={
              [{ label: '权限设置', childrens: <Tree /> }]
            }
          />
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
