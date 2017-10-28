import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Select, Input, Row, Col } from 'antd'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
import les from './modalSelect.less'

const { Modal, MyForm, MultiCol } = tools
const Option = Select.Option

const MdoalSelectCon = ({
  modalSelectType,
  modalSelectVal,
  modalSelectList,
  modalSelectPage,
  loading,
  dispatch,
  ...modalProps
}) => {
  const sendProps = {
    ...modalProps,
    visible: true,
    width: '40%',
    wrapClassName: 'vertical-center-modal',
    maskClosable: true,
    onOk: null,
    onCancel: () => {
      dispatch({ type: 'product/hideSelect' })
    },
  }
  const columns = [
    {
      title: '素材图标',
      dataIndex: 'img',
      key: 'img',
      className: les.imgCol,
      width: '6em',
      render: da => <img className={les.img} src={`${imgBaseURL}${da}`} alt="图标" />,
    },
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
    // {
    //   title: '素材类型',
    //   dataIndex: 'type',
    //   key: 'type',
    // },
    {
      title: '操作',
      // dataIndex: 'num',
      width: 70,
      key: 'setting',
      render: (record) => {
        return <Button type="primary" size="small" onClick={() => dispatch({ type: 'product/showSet', obj: record })}>添加</Button>
      },
    },
  ]
  const tableProps = {
    dataSource: modalSelectList,
    columns,
    bordered: true,
    rowKey: record => record.id,
    loading: loading.effects['product/searchMat'],
    pagination: modalSelectPage,
  }
  const dealSearch = () => {
    if (modalSelectType === '01') {
      dispatch({ type: 'product/searchMat', name: modalSelectVal, pageData: {} })
    } else if (modalSelectType === '02') {
      dispatch({ type: 'product/searchPro', name: modalSelectVal, pageData: {} })
    }
  }
  const handleSelChange = (payload) => {
    console.log(payload)
    dispatch({ type: 'product/saveSelectType', payload })
  }
  const selectBefore = () => {
    return (
      <Select value={modalSelectType} style={{ width: 70 }} onChange={handleSelChange}>
        <Option value="01">材料</Option>
        <Option value="02">作物</Option>
        <Option value="03">鱼类</Option>
      </Select>
    )
  }
  const handleValChange = (e) => {
    console.log(e.target.value)
    const payload = e.target.value
    dispatch({ type: 'product/saveSelectVal', payload })
  }

  const formMultiProps = [
    {
      label: '素材检索',
      childrens: (
        <div>
          <div className={les.btnLab}>
            <div className={les.ipt}>
              <Input addonBefore={selectBefore()} placeholder={'材料名称/作物名称/鱼类名称'} onChange={handleValChange} />
            </div>
            <Button className={les.btn} type="primary" size="large" onClick={dealSearch}>搜索</Button>
          </div>
          <Table {...tableProps} />
        </div>
      ),
    },
  ]

  return (
    <Modal modalProps={sendProps}>
      <MultiCol data={formMultiProps} className="ant-row" />
    </Modal>
  )
}

MdoalSelectCon.defaultProps = {
  // dealMenuClick: false,
}

MdoalSelectCon.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default MdoalSelectCon
