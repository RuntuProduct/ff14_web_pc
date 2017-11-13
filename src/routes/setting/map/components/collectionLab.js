import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Icon, Modal, Button, message } from 'antd'
import { imgBaseURL } from '@utils/config'
import CollectionSearch from './collectionSearchIpt'
import les from './collectionLab.less'

const CollectionLabCon = ({
  loId,
  tarList,
  colList,
  dispatch,
}) => {
  const handleAdd = (type, id, name) => {
    Modal.confirm({
      title: '添加采集物',
      content: `是否确认添加采集物${name}？`,
      onOk: () => {
        // 检查是否已有该项
        const search = colList.filter(da => (da.tarType === type && da.tarId == id))
        if (search.length) {
          // 已存在
          message.error('该采集物已存在！', 1)
        } else {
          // 调用方法
          dispatch({
            type: 'map/addCollection',
            params: { loId, tarType: type, tarId: id },
          })
        }
      },
    })
  }
  const tarSelect = (type, data) => {
    const { id, name } = data
    return (
      <div key={`${type}-${id}`} className={les.tarLab}>
        <div className={les.name}>{name}</div>
        <Icon type="plus-circle" className={les.addBtn} onClick={() => handleAdd(type, id, name)} />
      </div>
    )
  }
  const mapSearchTar = (ary) => {
    return ary.map((da) => {
      const { type, children } = da
      return (
        <div key={type} className={les.labCon}>
          <div className={les.label}>
            {type == '01' && '材料'}
            {type == '02' && '鱼类'}
          </div>
          {
            (da.children && da.children.length !== 0) &&
            <div className={les.tarList}>{da.children.map(d => tarSelect(type, d))}</div>
          }
          {
            (da.children && da.children.length === 0) &&
            <div className={les.noContent}><Icon type="frown-o" />&nbsp;无搜索结果</div>
          }
        </div>
      )
    })
  }
  const propColSearchIpt = {
    dispatch,
  }

  const handleDelete = (id, name) => {
    Modal.confirm({
      title: '删除采集物',
      content: `是否确认删除采集物${name}？`,
      onOk: () => {
        // 检查是否已有该项
        // 调用方法
        dispatch({
          type: 'map/deleteCollextion',
          loId,
          id,
        })
      },
    })
  }
  // 采集物列表
  const colListDom = (ary) => {
    return ary.map((da) => {
      const { id, img, name, tarType } = da
      return (
        <div key={id} className={les.colItem}>
          {/* 采集物图标 */}
          <div className={les.img}>
            <img src={`${imgBaseURL}${img}`} alt={name} />
          </div>
          {/* 采集物名称 */}
          <div className={les.tarName}>{name}</div>
          {/* 采集物类型 */}
          <div className={les.tarType}>
            {tarType == '01' && '材料'}
            {tarType == '02' && '鱼类'}
          </div>
          {/* 操作栏 */}
          <div className={les.btnArea}>
            <Button type="danger" size="small" onClick={() => handleDelete(id, name)}>删除</Button>
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      <Row gutter={10}>
        {/* 搜索结果栏 */}
        <Col span="8">
          <CollectionSearch {...propColSearchIpt} />
          <div className="content">
            {mapSearchTar(tarList)}
          </div>
        </Col>
        {/* 采集列表 */}
        <Col span="16">
          <div className={les.colListcon}>{colListDom(colList)}</div>
        </Col>
      </Row>
    </div>
  )
}

CollectionLabCon.defaultProps = {
  // dealMenuClick: false,
}

CollectionLabCon.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default CollectionLabCon
