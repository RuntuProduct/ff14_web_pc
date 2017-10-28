import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Table } from 'antd'
import { imgBaseURL } from '@utils/config'
import les from './formulaTable.less'

const FormulaTable = ({
  data = {},
  formula = {},
  dispatch,
}) => {
  data = _.cloneDeep(data)
  console.log(formula)
  const dealClick = () => {
    dispatch({ type: 'product/showSelect' })
    dispatch({ type: 'product/searchMat', name: '', pageData: {} })
  }
  const columns = [
    {
      title: '素材名称',
      // dataIndex: 'name',
      key: 'name',
      render: (rec) => {
        return (
          <div className={les.nameLab}>
            <img src={`${imgBaseURL}${rec.detail.img}`} alt="图标" />
            <span className={les.name}>{rec.detail.name}</span>
          </div>
        )
      },
    },
    {
      title: '来源职业',
      // dataIndex: 'jobName',
      key: 'jobName',
      render: rec => rec.detail.jobName,
    },
    {
      title: '素材类型',
      dataIndex: 'tarType',
      key: 'tarType',
      render: (rec) => {
        if (rec === '01') {
          return '材料'
        } else if (rec === '02') {
          return '作物'
        } else if (rec === '03') {
          return '鱼类'
        } else {
          return '其他'
        }
      },
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    },
  ]
  const tableProps = {
    dataSource: formula.formula,
    rowKey: record => record.id,
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
