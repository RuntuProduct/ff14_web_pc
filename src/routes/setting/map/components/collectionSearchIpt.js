import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input } from 'antd'
import { imgBaseURL } from '@utils/config'
import les from './collectionSearchIpt.less'

const Search = Input.Search

const CollectionSearchIptCon = ({
  data,
  dispatch,
}) => {
  const handleSearch = (val) => {
    if (!_.isEmpty(val)) {
      dispatch({ type: 'map/getTarSearch', val })
    }
  }
  const atoProps = {
    placeholder: '作物名称/鱼类名称',
    onSearch: handleSearch,
  }
  return (
    <div className={les.iptCon}>
      <Search {...atoProps} />
    </div>
  )
}

CollectionSearchIptCon.defaultProps = {
  // dealMenuClick: false,
}

CollectionSearchIptCon.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default CollectionSearchIptCon
