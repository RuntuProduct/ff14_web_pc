import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Modal } from 'antd'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
import les from './index.less'
import ModalEdit from './components/modal'
import ModalForm from './components/modalFormula'
import ModalSelect from './components/modalSelect'
import ModalItemSet from './components/modalSet'
import SearchArea from './components/search'

const { BtnLab, TableTab, Table } = tools
const { Nor } = TableTab

const ProductIndexCon = ({
  product,
  job,
  utils,
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
    modalFVisible,
    modalItem,
    formula,

    modalSelectVisible,
    modalSelectType,
    modalSelectVal,
    modalSelectList,
    modalSelectPage,

    modalItemSetVisible,
    modalItemSetItem,
  } = product
  const {
    list: jobList,
  } = job
  const {
    jobQuery,
  } = utils

  const searchProps = {
    jobList,
    location,
    dispatch,
    query: listQuery,
  }

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
  // 显示弹窗
  const showModal = (title, obj) => {
    dispatch({
      type: 'utils/jobQuery',
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
  // 显示配方编辑弹窗
  const showModalF = (title, obj) => {
    const { id } = obj
    dispatch({
      type: 'product/getFormula',
      payload: { pid: id },
    })
    dispatch({
      type: 'product/showModalF',
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
      key: 'name',
      className: les.iconLab,
      render: (rec) => {
        return (
          <div className={les.iconCon}>
            <img className={les.icon} src={`${imgBaseURL}${rec.img}`} alt="图标" />
            <div className={les.name}>{rec.name}</div>
          </div>
        )
      },
    },
    {
      title: '生产职业',
      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
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
            <a onClick={() => showModalF('编辑配方', record)}>编辑配方</a>
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
    loading: loading.effects['role/query'],
    pagination,
    onChange: onPageChange,
  }

  const modalProps = {
    title: modalTitle,
    data: modalItem,
    jobQuery,
    loading,
    dispatch,
  }
  const modalFProps = {
    title: modalTitle,
    data: modalItem,
    formula,
    loading,
    dispatch,
  }
  const modalSProps = {
    title: '添加素材',
    data: modalItem,
    modalSelectType,
    modalSelectVal,
    modalSelectList,
    modalSelectPage,
    loading,
    dispatch,
  }
  const modalSetProps = {
    title: '添加素材',
    data: modalItemSetItem,
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
      {/* 配方编辑弹窗 */}
      {modalFVisible && <ModalForm {...modalFProps} />}
      {/* 素材搜索弹窗 */}
      {modalSelectVisible && <ModalSelect {...modalSProps} />}
      {/* 素材添加弹窗 */}
      {modalItemSetVisible && <ModalItemSet {...modalSetProps} />}
    </div>
  )
}

ProductIndexCon.propTypes = {
  product: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ product, job, utils, loading }) => ({ product, job, utils, loading }))(ProductIndexCon)
