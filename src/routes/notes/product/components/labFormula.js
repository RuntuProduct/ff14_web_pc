import React from 'react'
import PropTypes from 'prop-types'
import {  } from 'antd'
import { imgBaseURL } from '@utils/config'
import les from './labFormula.less'

const LabFormulaCon = ({
  formula = {},
  dispatch,
}) => {
  // 详情区域
  const mapInfo = () => {
    const { img, name, difficulty, stamina } = formula
    return (
      <div className={les.infoCon}>
        <div className={les.iconLab}>
          <img src={`${imgBaseURL}${img}`} alt="图标" />
          <div className={les.name}>{name}</div>
        </div>
        <div className={les.infoDetail}>
          <div className={les.detailPart}>
            <div className={les.detailT1}>
              <div className={les.label}>难度</div>
              <div className={les.content}>{difficulty}</div>
            </div>
            <div className={les.detailT1}>
              <div className={les.label}>难度</div>
              <div className={les.content}>{stamina}</div>
            </div>
          </div>
          <div className={les.detailPart}></div>
        </div>
      </div>
    )
  }
  // 素材列表
  const mapList = () => {
    const { formula: ary = [] } = formula
    return ary.map((da) => {
      const { id, tarType, num, detail } = da
      const { name, img } = detail
      let typeTxt
      if (tarType === '01') { typeTxt = '材料' }
      if (tarType === '02') { typeTxt = '作物' }
      if (tarType === '03') { typeTxt = '鱼类' }
      return (
        <div key={id} className={les.itemCon}>
          <div className={les.icon}><img src={`${imgBaseURL}${img}`} alt="图标" /></div>
          <div className={les.info}>
            <div className={les.name}>{name}</div>
            <div className={les.type}>{typeTxt}</div>
          </div>
          <div className={les.num}>{num}</div>
        </div>
      )
    })
  }
  return (
    <div className={les.LFCon}>
      {/* 详情区域 */}
      {mapInfo()}
      <div className={les.title}>所需素材列表</div>
      <div className={les.matListCon}>
        {/* 素材区域 */}
        {mapList()}
      </div>
    </div>
  )
}

LabFormulaCon.defaultProps = {
  // dealMenuClick: false,
}

LabFormulaCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default LabFormulaCon
