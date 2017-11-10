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
import ModalLocation from './components/modalLocation'
import ModalLocationDetail from './components/modalEditLocation'

const { BtnLab, TableTab, Table } = tools
const { Nor } = TableTab

const ProductIndexCon = ({
  map,
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

    modalLocationVisible,

    modalLocationDetailTitle,
    modalLocationDetailItem,
    modalLocationDetailVisible,

    tarList,
  } = map

  const searchProps = {
    location,
    dispatch,
    query: listQuery,
  }

  const btnProps = [
    {
      childrens: <Button type="primary" size="large" onClick={() => showModal('新增地图', { editType: 'add' })}>新增地图</Button>,
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
      type: 'map/showModal',
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
          type: 'map/delete',
          payload: { id },
        })
      },
    })
  }
  // 显示地点编辑弹窗
  const showModalLocation = (rec) => {
    dispatch({
      type: 'map/showModalLocation',
      payload: { obj: rec },
    })
  }
  const columns = [
    {
      title: '地图名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'setting',
      render: (record) => {
        return (
          <span>
            <a onClick={() => showModal('编辑地图', record)}>编辑</a>
            <span className="ant-divider" />
            <a onClick={() => showModalLocation(record)}>编辑地点</a>
          </span>
        )
      },
    },
  ]
  const tableProps = {
    dataSource: list,
    columns,
    rowKey: record => record.id,
    loading: loading.effects['map/query'],
    pagination,
    onChange: onPageChange,
  }

  const modalProps = {
    title: modalTitle,
    data: modalItem,
    loading,
    dispatch,
  }
  const modalLocationProps = {
    data: modalItem,
    loading,
    dispatch,
  }
  const modalLocationDetailProps = {
    title: modalLocationDetailTitle,
    data: modalLocationDetailItem,
    tarList,
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
      {/* 地点一览弹窗 */}
      {modalLocationVisible && <ModalLocation {...modalLocationProps} />}
      {/* 地点详情编辑弹窗 */}
      {modalLocationDetailVisible && <ModalLocationDetail {...modalLocationDetailProps} />}
    </div>
  )
}

ProductIndexCon.propTypes = {
  map: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ map, loading }) => ({ map, loading }))(ProductIndexCon)
