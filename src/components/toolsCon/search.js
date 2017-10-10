import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Icon } from 'antd'
import { matchForm } from '@components/form'
import styles from './search.less'

const defaultCols = { sm: 6, xs: 8 }

class MineAccordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: true,
    }
  }

  // To generate mock Form.Item
  getFields = (count, data) => {
    const { expand } = this.state
    const children = data.map((da, idx) => {
      let { cols } = da
      cols = (cols && JSON.stringify(cols) !== '{}') ? cols : defaultCols

      return (
        <Col
          {...cols}
          key={idx}
          style={{
            display: (expand) ? 'block' : ((idx <= count) ? 'block' : 'none'),
          }}
        >
          {da.childrens}
        </Col>
      )
    })
    return children
  }

  handleReset = () => {
    this.props.form.resetFields()
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
    })
  }

  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
    })
  }

  handleSubmit = (e) => {
    const { form, onChange } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        // 数据格式处理
        onChange(values)
      }
    })
  }

  // 计算一行元素的数量
  dealCount = (data) => {
    let count = 0
    for (let i = 0, sizes = 0; i < data.length; i += 1) {
      // 判断屏幕分辨率
      let colSize
      const cols = (data[i].cols && JSON.stringify(data[i].cols) !== '{}') ? data[i].cols : defaultCols
      if (document.body.clientWidth < 1200) {
        // xs判断
        colSize = cols.xs
      } else {
        // lg判断
        colSize = cols.lg
      }
      sizes += parseInt(colSize, 10)
      // console.log(i, colSize, sizes)
      if (sizes <= 24) {
        count = i
      }
      // console.log(count)
    }
    return count
  }

  render() {
    const { data } = this.props
    const dataNode = data.map((da) => {
      return {
        cols: da.cols,
        childrens: matchForm(da),
      }
    })
    const count = this.dealCount(dataNode)

    return (
      <Form layout="horizontal" className={styles.outer}>
        <Row gutter={32}>{this.getFields(count, dataNode)}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
            {
              dataNode.length > count + 1 ?
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
                </a> :
                ''
            }
          </Col>
        </Row>
      </Form>
    )
  }
}

MineAccordion.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MineAccordion
