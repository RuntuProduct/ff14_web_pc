import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { AutoComplete } from 'antd'
import { imgBaseURL } from '@utils/config'
// import les from './modalEditLocation.less'

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
    <AutoComplete {...atoProps} />
  )
}

CollectionSearchIptCon.defaultProps = {
  // dealMenuClick: false,
}

CollectionSearchIptCon.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CollectionSearchIptCon
