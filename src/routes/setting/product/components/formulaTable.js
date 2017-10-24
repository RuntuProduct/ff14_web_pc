import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'antd'
import les from './formulaTable.less'

const FormulaTable = ({
  dispatch,
}) => {
  const dealClick = () => {
    dispatch({ type: 'product/showSelect' })
    dispatch({ type: 'product/searchMat', name: '', pageData: {} })
  }
  const columns = [
    {
      title: '素材名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '来源职业',
      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: '素材类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    },
  ]
  const tableProps = {
    dataSource: [],
    columns,
    bordered: true,
  }
  return (
    <div>
      <div className={les.btnLab}>
        <Button type="primary" size="large" onClick={dealClick}>添加素材</Button>
      </div>
      <Table {...tableProps} />
    </div>
  )
}

FormulaTable.defaultProps = {
  // dealMenuClick: false,
}

FormulaTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default FormulaTable
