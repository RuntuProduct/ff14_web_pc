import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'
import { tools } from '@components'
import { dealStrAry } from '@utils/pubfuc'
// import les from '.'
import ModalEdit from './components/modal'

const { BtnLab, TableTab, Table } = tools
const { Nor } = TableTab

const JobIndexCon = ({
  job,
  loading,

  location,
  dispatch,
}) => {
  const {
    list,
    pagination,

    modalTitle,
    modalVisible,
    modalItem,
  } = job

  const btnProps = [
    {
      childrens: <Button type="primary" size="large" onClick={() => showModal('新增角色', {})}>新增职业</Button>,
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
      type: 'job/showModal',
      payload: {
        title,
        obj,
      },
    })
  }
  const columns = [
    {
      title: '职业类型',
      dataIndex: 'type',
      key: 'type',
      render: (used) => {
        return used === '01' ? '大地使者' : '能工巧匠'
      },
    },
    {
      title: '职业名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'setting',
      render: (record) => {
        return [
          <a key={1} onClick={() => showModal('编辑职业', record)}>编辑</a>,
        ]
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
      type: 'job/hideModal',
    })
  }
  const modalProps = {
    title: modalTitle,
    // key: Date.parse(new Date()),
    visible: true,
    width: '60%',
    wrapClassName: 'vertical-center-modal',
    maskClosable: false,
    confirmLoading: loading.effects['job/edit'],
    // onOk,
    onCancel,

    data: modalItem,
    // dealSubmit,
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

JobIndexCon.propTypes = {
  job: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ job, loading }) => ({ job, loading }))(JobIndexCon)
