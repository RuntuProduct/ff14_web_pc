import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Modal } from 'antd'
import { tools } from '@components'
import { dealStrAry } from '@utils/pubfuc'
// import les from '.'
import ModalEdit from './components/modal'

const { BtnLab, TableTab, Table } = tools
const { Nor } = TableTab

const ProductIndexCon = ({
  product,
  loading,

  location,
  dispatch,
}) => {
  const {
    list,
    pagination,

    jobQuery,

    modalTitle,
    modalVisible,
    modalItem,
  } = product

  const btnProps = [
    {
      childrens: <Button type="primary" size="large" onClick={() => showModal('新增作物', { editType: 'add' })}>新增作物</Button>,
    },
  ]

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
  // 提交表单
  const dealSubmit = (params) => {
    dispatch({
      type: 'product/edit',
      payload: params,
    })
  }
  // 显示弹窗
  const showModal = (title, obj) => {
    dispatch({
      type: 'product/jobQuery',
      payload: '',
    })
    dispatch({
      type: 'product/showModal',
      payload: {
        title,
        obj,
      },
    })
  }
  // 删除作物
  const dealDelete = (record) => {
    const { id, name } = record
    Modal.confirm({
      title: '删除确认',
      content: `确认要删除${name}？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'product/delete',
          payload: { id },
        })
      },
    })
  }
  const columns = [
    {
      title: '作物名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '生产职业',
      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
    },
    {
      title: '耐久',
      dataIndex: 'stamina',
      key: 'stamina',
    },
    {
      title: '操作',
      key: 'setting',
      render: (record) => {
        return (
          <span>
            <a onClick={() => showModal('编辑作物', record)}>编辑</a>
            <span className="ant-divider" />
            <a onClick={() => dealDelete(record)}>删除</a>
          </span>
        )
      },
    },
  ]
  const tableProps = {
    dataSource: list,
    columns,
    rowKey: record => record.id,
    loading: loading.effects['role/query'],
    pagination,
    onChange: onPageChange,
  }

  // 弹窗点击取消
  const onCancel = () => {
    dispatch({
      type: 'product/hideModal',
    })
  }
  const modalProps = {
    title: modalTitle,
    // key: Date.parse(new Date()),
    visible: true,
    width: '400px',
    wrapClassName: 'vertical-center-modal',
    maskClosable: false,
    confirmLoading: loading.effects['product/edit'],
    // onOk,
    onCancel,

    data: modalItem,
    dealSubmit,
    jobQuery,
    dispatch,
  }

  return (
    <div>
      <BtnLab data={btnProps} />
      <TableTab content={
        (<span>共搜索到<Nor content={pagination.total} />条数据</span>)
      }
      />
      <Table {...tableProps} />
      {/* 添加、编辑弹窗 */}
      {modalVisible && <ModalEdit {...modalProps} />}
    </div>
  )
}

ProductIndexCon.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ product, loading }) => ({ product, loading }))(ProductIndexCon)
