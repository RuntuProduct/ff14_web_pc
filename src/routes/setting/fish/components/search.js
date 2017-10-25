import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import { Form } from 'antd'
// import styles from '.'
import { matchForm } from '@components/form'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'

const { SearchArea } = tools

const SearchCom = ({
  form,
  query,
  loading,
  location,
  dispatch,
  onChange,
}) => {
  const data = [
    {
      fieldType: 'Input',
      fieldName: '鱼类名称',
      settings: {
        placeholder: '请输入',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: '',
      },
    },
  ]

  const dealChange = (values) => {
    // const { } = fData
    const { pathname } = location
    dispatch({ type: 'utils/search', pathname, values })
  }

  const searchProp = {
    location,
    dispatch,
    form,
    data,
    query,
    onChange: dealChange,
  }

  return (
    <SearchArea {...searchProp} />
  )
}

SearchCom.propTypes = {
  form: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Form.create()(SearchCom)
