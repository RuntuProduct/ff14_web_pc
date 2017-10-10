import React from 'react'
import PropTypes from 'prop-types'
import { Steps, Row, Col } from 'antd'
import styles from './index.less'

const Step = Steps.Step

const dealCopy = (status) => {
  switch (status) {
    case 0:
      return { tit: '未审核', sta: 'wait' }
    case 1:
      return { tit: '审核通过', sta: 'finish' }
    case 2:
      return { tit: '审核驳回', sta: 'error' }
    case 3:
      return { tit: '审核中', sta: 'process' }
    default :
      return false
  }
}

const makeDom = (value, copy) => {
  if (value) {
    return (
      <Row gutter={16}>
        <Col span={4}>{`${copy}：`}</Col>
        <Col span={20}>{value}</Col>
      </Row>
    )
  } else {
    return null
  }
}

class ReviewStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { data } = this.props
    const mapDom = () => {
      return data.map((da, idx) => {
        const { status, reviewer, operator, date, remark } = da
        const tar = dealCopy(status)
        return (
          <Step
            title={tar.tit}
            status={tar.sta}
            key={idx}
            description={
              <div>
                {makeDom(reviewer, '审核机构')}
                {makeDom(date, '审核时间')}
                {makeDom(operator, '审核人')}
                {makeDom(remark, '备注')}
              </div>
            }
          />
        )
      })
    }
    return (
      <div>
        <Steps direction="vertical" size="default">
          {mapDom()}
        </Steps>
      </div>
    )
  }
}

ReviewStep.defaultProps = {
  data: [],
}

ReviewStep.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default ReviewStep
