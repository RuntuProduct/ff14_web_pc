import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import { Form } from 'antd'
// import styles from '.'
import { matchForm } from '@components/form'
import { tools } from '@components'
import { imgs } from '@utils/config'

const { SearchArea } = tools
const { mining, quarrying, logging, harvesting } = imgs

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
      fieldName: '材料名称',
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
    {
      fieldType: 'Select',
      fieldName: '所属职业',
      form,
      valueName: 'getType',
      options: {
        initialValue: '00',
        validate: [],
      },
      son: [
        { label: '全部', value: '00' },
        { label: '挖掘', value: '01', img: mining },
        { label: '碎石', value: '02', img: quarrying },
        { label: '采伐', value: '03', img: logging },
        { label: '割草', value: '04', img: harvesting },
      ],
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
