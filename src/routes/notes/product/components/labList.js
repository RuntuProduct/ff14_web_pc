import React from 'react'
import PropTypes from 'prop-types'
import {  } from 'antd'
import { imgBaseURL } from '@utils/config'
import les from './labList.less'

const LabListCon = ({
  data = [],
  productId,
  dispatch,
}) => {
  const dealClick = (pid) => {
    dispatch({ type: 'productNotes/selectProduct', payload: pid })
    dispatch({ type: 'productNotes/getFormula', pid })
  }
  const mapListCon = (ary) => {
    return ary.map((ar) => {
      return (
        <div key={ar.id} className={`${les.itemCon} ${productId == ar.id ? les.act : ''}`} onClick={() => dealClick(ar.id)}>
          <div className={les.icon}><img src={`${imgBaseURL}${ar.img}`} alt="图标" /></div>
          <div className={les.content}>
            <div className={les.name}>{ar.name}</div>
            <div className={les.level}>{`等级${ar.level}`}</div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className={les.listCon}>
      <div className={les.infoCon}>
        {/* 遍历显示作物列表 */}
        {mapListCon(data)}
      </div>
      <div className={les.descCon}>
        <div className={les.tit}>制作说明</div>
      </div>
    </div>
  )
}

LabListCon.defaultProps = {
  // dealMenuClick: false,
}

LabListCon.propTypes = {
  // data: PropTypes.object.isRequired,
}

export default LabListCon
