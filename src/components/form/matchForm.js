import React from 'react'
import { Input, Textarea, Select, DatePicker, Radio, Checkbox, ImageUpload, Cascader, Hidden, ViewItem } from '@components/form'
import ImageViewer from '../toolsCon/imageViewer'

const matchFuc = (data) => {
  const { fieldType } = data
  if (fieldType === 'Input') {
    return <Input {...data} />
  } else if (fieldType === 'Textarea') {
    return <Textarea {...data} />
  } else if (fieldType === 'Select') {
    return <Select {...data} />
  } else if (fieldType === 'DatePicker') {
    return <DatePicker {...data} />
  } else if (fieldType === 'Radio') {
    return <Radio {...data} />
  } else if (fieldType === 'Checkbox') {
    return <Checkbox {...data} />
  } else if (fieldType === 'ImageUpload') {
    return <ImageUpload {...data} />
  } else if (fieldType === 'Cascader') {
    return <Cascader {...data} />
  } else if (fieldType === 'Hidden') {
    return <Hidden {...data} />
  } else if (fieldType === 'nor') {
    return <ViewItem {...data} />
  } else if (fieldType === 'image') {
    return <ImageViewer {...data} />
  } else {
    throw new Error('fieldType error!')
    return null
  }
}

export default matchFuc
