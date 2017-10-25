import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Modal } from 'antd'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
// import les from '.'
import SearchArea from './components/search'
import ModalEdit from './components/modal'

const { BtnLab, TableTab, Table } = tools
const { Nor } = TableTab

const ProductIndexCon = ({
  fish,
  loading,

  location,
  dispatch,
}) => {
  const {
    list,
    listQuery,
    pagination,

    modalTitle,
    modalVisible,
    modalItem,
  } = fish

  const searchProps = {
    location,
    dispatch,
    query: listQuery,
  }

  const btnProps = [
    {
      childrens: <Button type="primary" size="large" onClick={() => showModal('新增鱼类', { editType: 'add' })}>新增鱼类</Button>,
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
  // 显示弹窗
  const showModal = (title, obj) => {
    dispatch({
      type: 'fish/showModal',
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
          type: 'fish/delete',
          payload: { id },
        })
      },
    })
  }
  const columns = [
    {
      title: '图标',
      dataIndex: 'img',
      key: 'img',
      render: img => <img src={`${imgBaseURL}${img}`} alt="图标" />,
    },
    {
      title: '鱼类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'setting',
      render: (record) => {
        return (
          <span>
            <a onClick={() => showModal('编辑鱼类', record)}>编辑</a>
            {/* <span className="ant-divider" />
            <a onClick={() => dealDelete(record)}>删除</a> */}
          </span>
        )
      },
    },
  ]
  const tableProps = {
    dataSource: list,
    columns,
    rowKey: record => record.id,
    loading: loading.effects['fish/query'],
    pagination,
    onChange: onPageChange,
  }

  const modalProps = {
    title: modalTitle,
    data: modalItem,
    loading,
    dispatch,
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
      {/* 添加、编辑弹窗 */}
      {modalVisible && <ModalEdit {...modalProps} />}
    </div>
  )
}

ProductIndexCon.propTypes = {
  fish: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ fish, loading }) => ({ fish, loading }))(ProductIndexCon)
