import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Select, Input } from 'antd'
import les from './formulaTable.less'

const Option = Select.Option

const MdoalSelectCon = ({
  // data,
}) => {
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

  const selectBefore = () => {
    return (
      <Select defaultValue="01" style={{ width: 70 }}>
        <Option value="01">材料</Option>
        <Option value="02">作物</Option>
        <Option value="03">鱼类</Option>
      </Select>
    )
  }
  return (
    <div>
      <div className={les.btnLab}>
        <Input addonBefore={selectBefore} placeholder={'材料名称/作物名称/鱼类名称'} />
        <Button type="primary" size="large">搜索</Button>
      </div>
      <Table {...tableProps} />
    </div>
  )
}

MdoalSelectCon.defaultProps = {
  // dealMenuClick: false,
}

MdoalSelectCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default MdoalSelectCon
