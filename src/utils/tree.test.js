import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { mock, Random } from 'mockjs'
import { expect } from 'chai'
// import { shallow } from 'enzyme'

import { test } from './tree'

const {
  group,
  dealChild,
  dealTree,
} = test

describe('/utils/tree.js', () => {

  // 模拟测试数据
  const groupData = mock({
    'normal|1-100': [
      {
        'level|1-100': '1',
      },
    ],
    'aryErr|1-10': [{
      'lev| 1-10': '1',
    }],
    'aryNull|1-10': [null],
    'null': null,
  })

  // 测试group
  describe('group()', () => {
    // 接收对象数组，根据对象的 level 长度 len 分组返回一个以 len 为 key 的对象
    it('normal', () => {
      const gData = groupData.normal
      const output = group(gData)
      expect(output).be.a('object')
      const keys = Object.keys(output)
      for (let i = 0; i < keys.length; i += 1) {
        const children = output[keys[i]]
        expect(children).be.a('array')
        for (let j = 0; j < children.length; j += 1) {
          expect(children[j])
            .be.a('object')
          const { level } = children[j]
          expect(level)
            .be.a('string')
            .have.length(keys[i])
        }
      }
    })
    it('aryerr', () => {
      const gData = groupData.aryErr
      const output = group(gData)
      expect(output)
        .be.a('object')
        .be.empty
    })
    it('arynull', () => {
      const gData = groupData.aryNull
      const output = group(gData)
      expect(output)
      .be.a('object')
      .be.empty
    })
    it('null', () => {
      const gData = groupData.null
      const output = group(gData)
      expect(output)
        .be.a('object')
        .be.empty
    })
  })

  // 模拟测试数据
  const dealChildData = mock({
    'normal|1-100': [
      {
        'level|1-6': Random.string(3),
      },
    ],
    'aryErr|1-10': [{
      'lev| 1-10': '001',
    }],
    'aryNull|1-10': [null],
    'null': null,
  })

  describe('dealChild()', () => {
    it('normal', () => {
      const data = group(dealChildData.normal)
      const result = dealChild(data, 3)
      checkChildrens(result)
    })
    it('aryErr', () => {
      const data = group(dealChildData.aryErr)
      const result = dealChild(data, 3)
      expect(result)
        .be.a('array')
        .be.empty
    })
    it('aryNull', () => {
      const data = group(dealChildData.aryNull)
      const result = dealChild(data, 3)
      expect(result)
        .be.a('array')
        .be.empty
    })
    it('null', () => {
      const data = group(dealChildData.null)
      const result = dealChild(data, 3)
      expect(result)
        .be.a('array')
        .be.empty
    })
  })

  const checkChildrens = (ary) => {
    expect(ary).be.a('array')
    for (let i = 0; i < ary.length; i += 1) {
      const { level: parentLevel, childrens } = ary[i]
      if (childrens) {
        expect(childrens).be.a('array')
        for (let j = 0; j < childrens.length; j += 1) {
          const { level } = childrens[j]
          expect(level).be.a('string').not.be.empty
          const cut = level.slice(0, -3)
          expect(cut)
            .be.a('string')
            .be.equal(parentLevel)
        }
        checkChildrens(childrens)
      }
    }
  }

  const dealTreeData = mock({
    'normal|1-100': [{
      'level|1-6': Random.string(3),
    }],
  })

  describe('dealTree()', () => {
    it('normal', () => {
      const data = dealTreeData.normal
      const result = dealTree(data, 3)
      expect(data).to.not.eql(result)
    })
  })
})
