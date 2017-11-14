import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Table, Modal } from 'antd'
import { imgBaseURL } from '@utils/config'
import les from './formulaTable.less'

const FormulaTable = ({
  data = {},
  formula = {},
  dispatch,
}) => {
  data = _.cloneDeep(data)
  const {
    id: pid,
  } = data
  // console.log(formula)
  // 打开添加素材弹窗
  const dealClick = () => {
    dispatch({ type: 'product/showSelect' })
    dispatch({ type: 'product/searchMat', name: '', pageData: {} })
  }
  // 打开编辑素材弹窗
  const handleEdit = (id, record) => {
    const { num, detail } = record
    dispatch({
      type: 'product/showSet',
      obj: { editType: 'edit', num, ...detail },
    })
  }
  // 删除素材
  const handleDel = (id, record) => {
    // 二次确认弹窗
    Modal.confirm({
      title: '删除素材',
      content: `是否确认删除素材${record.detail.name}`,
      onOk: () => dispatch({ type: 'product/delMat', id, pid }),
    })
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
    {
      title: '操作',
      // dataIndex: 'num',
      key: 'setting',
      render: (record) => {
        const { id } = record
        return (
          <div>
            <Button size="small" type="primary" style={{ marginRight: '10px' }} onClick={() => handleEdit(id, record)}>编辑</Button>
            <Button size="small" type="danger" onClick={() => handleDel(id, record)}>删除</Button>
          </div>
        )
      },
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
