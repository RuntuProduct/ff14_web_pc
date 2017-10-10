import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'antd'
import styles from './index.less'

class IndexCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { data } = this.props

    const dealClassName = (obj) => {
      const { className } = obj
      if (obj) {
        return `${styles.btn} ${className}`
      } else {
        return styles.btn
      }
    }
    const mapDom = (type) => {
      const res = []
      for (let i = 0; i < data.length; i += 1) {
        const { options } = data[i]
        if (options && options.type == type) {
          res.push(
            <Col key={i} className={dealClassName(data[i])}>{data[i]['childrens']}</Col>,
          )
        }
        // left为默认状态
        if (!options && type == 'left') {
          res.push(
            <Col key={i} className={dealClassName(data[i])}>{data[i]['childrens']}</Col>,
          )
        }
      }
      return res
    }
    return (
      <Row type="flex" gutter={10} className={styles.btnLab}>
        {/* {
          data.map((da, idx) => {
            // 遍历左边元素
            return <Col key={idx} className={dealClassName(da)}>{da.childrens}</Col>
          })
        } */}
        {mapDom('left')}
        <Col style={{ flex: 1 }} />
        {mapDom('right')}
      </Row>
    )
  }
}

IndexCon.defaultProps = {
  data: [],
}

IndexCon.propTypes = {
  data: PropTypes.array,
}

export default IndexCon
