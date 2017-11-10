import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import CollectionSearch from './collectionSearchIpt'
import les from './collectionLab.less'

const CollectionLabCon = ({
  tarList,
  dispatch,
}) => {
  const tarSelect = (type, data) => {
    const { id, name } = data
    return (
      <div key={`${type}-${id}`} className={les.tarLab}>{name}</div>
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
            da.children &&
            <div className={les.tarList}>{da.children.map(d => tarSelect(type, d))}</div>
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
