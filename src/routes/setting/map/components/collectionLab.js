import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Icon, Modal } from 'antd'
import CollectionSearch from './collectionSearchIpt'
import les from './collectionLab.less'

const CollectionLabCon = ({
  loId,
  tarList,
  dispatch,
}) => {
  const handleAdd = (type, id, name) => {
    Modal.confirm({
      title: '添加采集物',
      content: `是否确认添加采集物${name}？`,
      onOk: () => {
        // 检查是否已有该项
        // 调用方法
        dispatch({
          type: 'map/addCollection',
          params: { loId, tarType: type, tarId: id,  },
        })
      },
    })
    
  }
  const tarSelect = (type, data) => {
    const { id, name } = data
    return (
      <div key={`${type}-${id}`} className={les.tarLab}>
        <div className={les.name}>{name}</div>
        <Icon type="plus-circle" className={les.addBtn} onClick={() => handleAdd(type, id, name)}/>
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

  return (
    <div>
      <Row>
        <Col span="8">
          <CollectionSearch {...propColSearchIpt} />
          <div className="content">
            {mapSearchTar(tarList)}
          </div>
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
