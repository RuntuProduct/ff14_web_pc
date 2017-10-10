import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon } from 'antd'
import { config } from '@utils'
// import styles from './index.less'

const { defaultPage, defaultPageSize } = config

class TableCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { ...tabProps } = this.props

    return (
      <Table {...tabProps} />
    )
  }
}

TableCon.defaultProps = {
  dataSource: [],
  columns: [],
  pagination: {
    defaultCurrent: defaultPage,
    total: 0,
    defaultPageSize,
    showSizeChanger: true,
  },
}

TableCon.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  pagination: PropTypes.object,
}

export default TableCon
