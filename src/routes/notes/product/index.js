import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'
import { tools } from '@components'
import { dealStrAry } from '@utils/pubfuc'
import { imgBaseURL } from '@utils/config'
import les from './index.less'
import LabLeft from './components/labLeft'
import LabList from './components/labList'

const { BtnLab, TableTab, Table } = tools
const { Nor } = TableTab

const ProductNotesIndexCon = ({
  productNotes,
  job,
  loading,

  location,
  dispatch,
}) => {
  const {
    jobId,
    level,
    data,
  } = productNotes
  const {
    list: jobList,
  } = job

  // 生成职业列表
  const initJob = (ary) => {
    return (
      <div className={les.jobLabCon}>
        {
          ary
            .filter(da => da.type === '02')
            .map((ar) => {
              return (
                <div key={ar.id} className={`${les.jobIcon} ${jobId == ar.id ? les.act : ''}`} title={ar.name}><img src={`${imgBaseURL}${ar.img}`} alt={ar.name} /></div>
              )
            })
        }
      </div>
    )
  }

  const propsLabLeft = {
    level,
  }
  const propsLabList = {
    data,
    dispatch,
  }

  return (
    <div className={les.baseCon}>
      {/* 职业选择栏 */}
      {initJob(jobList)}
      <div className={les.botCon}>
        {/* 配方筛选器 */}
        <LabLeft {...propsLabLeft} />
        {/* 配方列表 */}
        <LabList {...propsLabList} />
      </div>
    </div>
  )
}

ProductNotesIndexCon.propTypes = {
  productNotes: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ productNotes, job, loading }) => ({ productNotes, job, loading }))(ProductNotesIndexCon)
