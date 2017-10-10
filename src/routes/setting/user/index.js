import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
// import styles from '.'
import { tools } from '@components'
import SearchArea from './components/search'
import MainModal from './components/modal'
import SetModal from './components/setModal'

const { BtnLab, TableTab, Table } = tools
const { Nor } = TableTab

const UserCon = ({
  settingUser,
  utils,
  location,
  dispatch,
  loading,
}) => {
  const {
    list,
    selectedRowKeys,
    pagination,

    modalTitle,
    modalItem,
    modalVisible,

    setModalVivible,
  } = settingUser

  // 搜索框表单提交回调
  const onSearchChange = (fData) => {
    const { query, pathname } = location
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
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
      type: 'settingUser/showModal',
      payload: {
        title,
        obj,
      },
    })
  }

  // 弹窗点击取消
  const onCancel = () => {
    dispatch({
      type: 'settingUser/hideModal',
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

  const multiSet = () => {
    // 批量设置
    if (selectedRowKeys && selectedRowKeys.length) {
      // 显示弹窗
      dispatch({ type: 'settingUser/showSetModal' })
    } else {
      message.error('请选择要操作的对象', 1)
    }
  }
  const btnProps = [
    {
      childrens: <Button type="primary" size="large" onClick={() => showModal('单个导入', {})}>单个导入</Button>,
    },
    {
      childrens: <Button type="" size="large" onClick={null}>批量导入</Button>,
    },
    {
      childrens: <Button type="primary" size="large" onClick={multiSet}>批量操作</Button>,
      options: { type: 'right' },
    },
  ]

  const pwdReset = () => {
    Modal.confirm({
      title: '操作确认',
      content: '是否重置该用户的密码为【123456】？',
      okText: '确认',
      cancelText: '取消',
    })
  }
  const dealDisable = (used) => {
    const tit = used == 1 ? '停用' : '启用'
    Modal.confirm({
      title: '操作确认',
      content: `确认${tit}该用户？`,
      okText: '确认',
      cancelText: '取消',
    })
  }
  const columns = [
    {
      title: '用户名',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '姓名',
      // dataIndex: 'name',
      key: 'name',
      render: () => 'xxx',
    },
    {
      title: '机构',
      dataIndex: 'apartment',
      key: 'apartment',
    },
    {
      title: '职位',
      dataIndex: 'post',
      key: 'post',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      render: date => moment(new Date(date)).format('YYYY-MM-DD HH:MM'),
    },
    {
      title: '是否启用',
      dataIndex: 'used',
      key: 'used',
      render: (used) => {
        return used === 1 ? '启用' : '不启用'
      },
    },
    {
      title: '创建人id',
      dataIndex: 'authorId',
      key: 'authorId',
    },
    {
      title: '操作',
      key: 'setting',
      render: (record) => {
        const { used } = record
        return [
          <a key={1} onClick={() => showModal('编辑用户', record)}>编辑</a>,
          <span key={2} className="ant-divider" />,
          <a key={3} onClick={pwdReset}>重置密码</a>,
          <span key={4} className="ant-divider" />,
          <a key={5} onClick={() => dealDisable(used)}>{ record.used == 1 ? '停用' : '启用'}</a>,
        ]
      },
    },
  ]

  const searchProps = {
    onChange: onSearchChange,
    utils,
    dispatch,
    loading,
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      dispatch({ type: 'settingUser/selectRow', payload: { selectedRowKeys } })
    },
    // getCheckboxProps: record => ({
    //   disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    // }),
  }
  const tableProps = {
    dataSource: list,
    columns,
    rowSelection,
    rowKey: record => record.id,
    loading: loading.effects['settingUser/query'],
    pagination,
    onChange: onPageChange,
  }

  const setModalProps = {
    title: '批量操作',
    // key: Date.parse(new Date()),
    visible: true,
    width: '200px',
    wrapClassName: 'vertical-center-modal',
    maskClosable: true,
    // onOk,
    onCancel: () => dispatch({ type: 'settingUser/hideSetModal' }),
    footer: null,

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
      {modalVisible && <MainModal {...modalProps} />}
      {/* 批量操作弹窗 */}
      {setModalVivible && <SetModal {...setModalProps} />}
    </div>
  )
}

UserCon.defaultProps = {
  // dealMenuClick: false,
}

UserCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default connect(({ settingUser, utils, loading }) => ({ settingUser, utils, loading }))(UserCon)
