import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { tools } from '@components'
import { levelAry } from '@utils/config'
import les from './labLeft.less'

const { Modal, MyForm, MultiCol } = tools

const formCon = ({
  form,
  level,
  dispatch,
}) => {
  const mapLevel = (ary) => {
    return ary.map((ar, idx) => {
      const { key, ary } = ar
      return <li key={key} className={`${les.li} ${level.key === key ? les.act : ''}`}>{ary[0]}-{ary[1]}</li>
    })
  }

  return (
    <div className={les.leftCon}>
      <div className={les.searchCon}>
        <div className={les.title}>配方搜索</div>
        <Input />
      </div>
      <div className={les.levelSelCon}>
        <div className={les.title}>配方等级</div>
        <ul className={les.ul}>
          {mapLevel(levelAry)}
        </ul>
      </div>
    </div>
  )
}

formCon.defaultProps = {
  // dealMenuClick: false,
}

formCon.propTypes = {
  // data: PropTypes.object.isRequired,
}

export default Form.create()(formCon)
