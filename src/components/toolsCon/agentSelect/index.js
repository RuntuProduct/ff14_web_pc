import React from 'react'
import PropTypes from 'prop-types'
import { Table, Radio, Checkbox, Select, Input, Button } from 'antd'
import styles from './index.less'

const Option = Select.Option

const agentSelect = ({
  data,
  loading,
  pagination,

  dispatch,
  query,
  agentModalProps,
}) => {
  const {
    selectType,
    selectVal,
    searchType,
    searchVal,
  } = agentModalProps

  // 换页回调函数
  const onPageChange = (page) => {
    dispatch({
      type: 'utils/query',
      payload: {
        ...query,
        page: page.current,
      },
    })
  }
  const columns = [
    {
      title: null,
      key: 'radio',
      width: '40px',
      className: styles.radioCol,
      render: (record) => {
        const { id } = record
        if (selectType == 'single') {
          return <Radio value={id} checked={id == selectVal} />
        } else {
          return <Checkbox value={id} checked={selectVal && selectVal.indexOf(id) >= 0} />
        }
      },
    },
    {
      title: '渠道编号',
      key: 'outId',
      width: '120px',
      render: record => record.id,
    },
    {
      title: '渠道名称',
      key: 'name',
      render: record => record.name,
    },
  ]
  const tableProps = {
    dataSource: data,
    columns,
    bordered: true,
    rowKey: record => record.id,
    rowClassName: () => styles.rowStyle,
    onRowClick: (record) => {
      dispatch({ type: 'utils/select', payload: record.id })
    },
    loading,
    pagination,
    onChange: onPageChange,
  }

  const searchSelectChange = (value) => {
    dispatch({ type: 'utils/setAgentSearch', payload: { searchType: value } })
  }
  const searchBefore = (
    <Select value={searchType} style={{ width: 80 }} onChange={searchSelectChange}>
      <Option value="name">渠道名称</Option>
      <Option value="id">渠道编号</Option>
    </Select>
  )

  return (
    <div>
      <div className={styles.search}>
        <Input
          addonBefore={searchBefore}
          size="large"
          type="text"
          className={styles.ipt}
        />
        <Button type="primary" size="large" className={styles.btn}>搜索</Button>
      </div>
      <Table {...tableProps} />
    </div>
  )
}

agentSelect.defaultProps = {
  data: [],
  pagination: {
    showSizeChanger: true,
    current: 1,
    total: 1303,
    pageSize: 10,
  },
}

agentSelect.propTypes = {
  data: PropTypes.array.isRequired,
}

export default agentSelect
