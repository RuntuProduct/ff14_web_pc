import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button, Modal } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { tools } from '@components'
import SearchArea from './components/search'
import MainModal from './components/modal'

const { BtnLab, TableTab, Table } = tools
const { Nor } = TableTab

const RoleIndexCon = ({
  role,
  location,
  dispatch,
  loading,
}) => {
  const {
    list,
    pagination,
    modalTitle,
    modalItem,
    modalVisible,
  } = role

  // 搜索框表单提交回调
  const onSearchChange = (fData) => {
    const { query, pathname } = location
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...fData,
      },
    }))
  }

  // 换页回调函数
  const onPageChange = (page) => {
    const { query, pathname } = location
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        page: page.current,
        pageSize: page.pageSize,
      },
    }))
  }

  // 显示弹窗
  const showModal = (title, obj) => {
    dispatch({
      type: 'role/showModal',
      payload: {
        title,
        obj,
      },
    })
  }

  // 弹窗点击取消
  const onCancel = () => {
    dispatch({
      type: 'role/hideModal',
    })
  }

  const modalProps = {
    title: modalTitle,
    // key: Date.parse(new Date()),
    visible: true,
    width: '80%',
    wrapClassName: 'vertical-center-modal',
    maskClosable: false,
    confirmLoading: loading.effects['agent/edit'],
    // onOk,
    onCancel,

    data: modalItem,
    // dealSubmit,
  }

  const btnProps = [
    {
      childrens: <Button type="primary" size="large" onClick={() => showModal('新增角色', {})}>新增角色</Button>,
    },
  ]

  const dealDisabled = (used) => {
    const tit = used !== 1 ? '启用' : '停用'
    Modal.confirm({
      title: '操作确认',
      content: `确认要${tit}该角色？`,
      okText: '确认',
      cancelText: '取消',
    })
  }
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '是否启用',
      dataIndex: 'used',
      key: 'used',
      render: (used) => {
        return used === 1 ? '启用' : '停用'
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      render: date => moment(new Date(parseInt(date, 10))).format('YYYY-MM-DD HH:MM'),
    },
    {
      title: '创建人',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '操作',
      key: 'setting',
      render: (record) => {
        const { used } = record
        return [
          <a key={1} onClick={() => showModal('编辑角色', record)}>编辑</a>,
          <span key={2} className="ant-divider" />,
          <a key={3} onClick={() => dealDisabled(used)}>{ record.used == 1 ? '停用' : '启用'}</a>,
        ]
      },
    },
  ]

  const searchProps = {
    onChange: onSearchChange,
  }

  const tableProps = {
    dataSource: list,
    columns,
    rowKey: record => record.id,
    loading: loading.effects['role/query'],
    pagination,
    onChange: onPageChange,
  }

  return (
    <div>
      <SearchArea {...searchProps} />
      <BtnLab data={btnProps} />
      <TableTab content={
        (<span>共搜索到<Nor content={pagination.total} />条数据</span>)
      }
      />
      <Table {...tableProps} />
      {modalVisible && <MainModal {...modalProps} />}
    </div>
  )
}

RoleIndexCon.propTypes = {
  role: PropTypes.object.isRequired,
}

export default connect(({ role, loading }) => ({ role, loading }))(RoleIndexCon)
