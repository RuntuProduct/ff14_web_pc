import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import { tools } from '@components'
// import styles from './index.less'
import Tree from './components/tree'
import Modal from './components/modal'

const { BtnLab } = tools

class indexCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      privilege,
      dispatch,
      loading,
    } = this.props
    const {
      modalVisible,
      modalTitle,
      currentItem,
    } = privilege

    // 提交表单
    const dealSubmit = (params) => {
      console.log(params)
      dispatch({
        type: 'privilege/edit',
        payload: params,
      })
    }

    // 删除节点
    const dealDelete = (params) => {
      dispatch({
        type: 'privilege/delete',
        payload: params,
      })
    }

    // 显示弹窗
    const showModal = (title, obj) => {
      dispatch({
        type: 'privilege/showModal',
        payload: {
          title,
          obj,
        },
      })
    }

    // 弹窗点击取消
    const onCancel = () => {
      dispatch({
        type: 'privilege/hideModal',
      })
    }

    // 弹窗点击提交
    const onOk = (data) => {
      dispatch({
        type: 'privilege/edit',
        payload: data,
      })
    }

    const addObj = {
      editType: 'add',
      parent: '0',
      parentName: 'root',
      menu: '1',
      status: 1,
    }

    const modalProps = {
      title: modalTitle,
      // key: Date.parse(new Date()),
      visible: true,
      wrapClassName: 'vertical-center-modal',
      maskClosable: false,
      confirmLoading: loading.effects['privilege/edit'],
      onOk,
      onCancel,

      data: currentItem,
      dealSubmit,
    }
    const btnProps = [
      {
        childrens: <Button type="primary" size="large" onClick={() => showModal('添加顶部节点', addObj)}>添加顶部节点</Button>,
      },
    ]

    const treeProps = {
      privilege,
      modalVisible,
      currentItem,
      showModal,
      dealDelete,
    }

    return (
      <div>
        <BtnLab data={btnProps} />
        <Tree {...treeProps} />
        {/* 节点弹窗 */}
        {modalVisible && (<Modal {...modalProps} />)}
      </div>
    )
  }
}

indexCon.defaultProps = {
  // dealMenuClick: false,
}

indexCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default connect(({ privilege, loading }) => ({ privilege, loading }))(indexCon)
