import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
// import styles from '.'
import { tools } from '@components'

const { SearchArea } = tools

const SearchCom = ({
  form,
  onChange,
}) => {
  const data = [
    {
      fieldType: 'Input',
      fieldName: '角色名称',
      settings: {
        placeholder: '模糊查询',
        clear: true,
      },
      form,
      valueName: 'name',
      options: {
        initialValue: null,
        validate: [],
      },
    },
    {
      fieldType: 'DatePicker',
      fieldName: '创建时间',
      settings: {
        placeholder: '开始-结束',
      },
      form,
      valueName: 'date',
      options: {
        initialValue: null,
        validate: [],
      },
    },
    {
      fieldType: 'Select',
      fieldName: '启用状态',
      settings: {
      },
      form,
      valueName: 'used',
      options: {
        initialValue: '2',
        validate: [],
      },
      son: [
        {
          label: '全部',
          value: 2,
        },
        {
          label: '启用',
          value: 1,
        },
        {
          label: '停用',
          value: 0,
        },
      ],
    },
  ]

  const dealChange = (fData) => {
    const { name, date, used } = fData
    if (!name) {
      delete fData.name
    }
    if (date) {
      const start = date[0].valueOf()
      const end = date[1].valueOf()
      fData.date = `${start},${end}`
    } else {
      delete fData.date
    }
    if (parseInt(used, 10) === 2) {
      delete fData.used
    }
    onChange(fData)
  }

  const searchProp = {
    form,
    data,
    onChange: dealChange,
  }
  return (
    <SearchArea {...searchProp} />
  )
}

SearchCom.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Form.create()(SearchCom)
