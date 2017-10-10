import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
// import styles from '.'
import { tools } from '@components'

const { SearchArea, SelectAgent, Modal } = tools

const SearchCom = ({
  form,
  utils,
  loading,
  dispatch,
  onChange,
}) => {
  const {
    agentList,
    agentQuery,
    agentPagination,
    agentModalProps,
    agentModalVisible,
  } = utils
  const data = [
    {
      fieldType: 'Input',
      fieldName: '所属渠道',
      settings: {
        placeholder: '请选择',
        clear: true,
        readonly: true,
        onClick: () => {
          dispatch({ type: 'utils/query' })
          dispatch({ type: 'utils/showAgentModal' })
        },
      },
      form,
      valueName: 'name',
      options: {
        initialValue: '',
        validate: [],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '姓名',
      settings: {
        placeholder: '模糊搜索',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: '',
        validate: [],
      },
    },
    {
      fieldType: 'Input',
      fieldName: '登录账号',
      settings: {
        placeholder: '模糊搜索',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: '',
        validate: [],
      },
    },
    {
      fieldType: 'Select',
      fieldName: '审核状态',
      settings: {
      },
      form,
      valueName: 'status',
      options: {
        initialValue: '0',
        validate: [],
      },
      son: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '未审核',
          value: 1,
        },
        {
          label: '审核中',
          value: 2,
        },
        {
          label: '审核失败',
          value: 3,
        },
        {
          label: '审核通过',
          value: 4,
        },
      ],
    },
  ]

  const dealChange = (fData) => {
    const { date, status } = fData
    if (date) {
      const start = date[0].valueOf()
      const end = date[1].valueOf()
      fData.date = `${start} ${end}`
    }
    if (parseInt(status, 10) === 2) {
      delete fData.status
    }
    onChange(fData)
  }

  const searchProp = {
    form,
    data,
    onChange: dealChange,
  }

  const selectProps = {
    data: agentList,
    loading: loading.effects['utils/query'],
    pagination: agentPagination,
    dispatch,
    query: agentQuery,
    agentModalProps,
  }
  const modalProps = {
    title: '选择渠道',
    // key: Date.parse(new Date()),
    visible: true,
    width: '50%',
    wrapClassName: 'vertical-center-modal',
    maskClosable: true,
    footer: null,
    onCancel: () => dispatch({ type: 'utils/hideAgentModal' }),
  }
  const selectModal = (
    <Modal modalProps={modalProps}>
      <SelectAgent {...selectProps} />
    </Modal>
  )

  return (
    <div>
      <SearchArea {...searchProp} />
      {agentModalVisible && selectModal}
    </div>
  )
}

SearchCom.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Form.create()(SearchCom)
