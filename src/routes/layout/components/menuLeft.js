import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Breadcrumb, Menu, Icon } from 'antd'
import _ from 'lodash'

const { Sider } = Layout

const mapLeftBtn = (menu, horizonKey) => {
  const tarParent = menu.filter((item) => {
    if (item.id == horizonKey) {
      return true
    }
  })
  if (tarParent && !_.isEmpty(tarParent)) {
    const { childrens } = tarParent[0]
    if (childrens && childrens.length) {
      return childrens.map((ch) => {
        return (
          <Menu.Item key={ch.id}>
            {ch.icon && <Icon type={ch.icon} />}
            {ch.name}
          </Menu.Item>
        )
      })
    } else {
      return null
    }
  } else {
    return null
  }
}
const mapBread = (menu, horizonKey, sideKey) => {
  const tarParent = menu.filter((item) => {
    if (item.id == horizonKey) {
      return true
    }
  })
  if (tarParent && !_.isEmpty(tarParent) && tarParent.length == 1) {
    const tar = tarParent[0]
    const { childrens } = tar
    if (childrens && childrens.length) {
      const tarChild = _.findIndex(childrens, (tar) => {
        return tar.id == sideKey
      })
      if (tarChild !== -1) {
        return [
          <Breadcrumb.Item key={tar.id}>{tar.name}</Breadcrumb.Item>,
          <Breadcrumb.Item key={childrens[tarChild].id}>{childrens[tarChild].name}</Breadcrumb.Item>,
        ]
      } else {
        return null
      }
    } else {
      return null
    }
  }
}

const BreadLab = ({
  menu,
  horizonKey,
  sideKey,
  ...sideMenuProps
}) => {
  return (
    <div>
      {/* 左侧栏顶部面包屑 */}
      <Breadcrumb style={{ padding: '12px 0px 5px 25px' }}>
        {mapBread(menu, horizonKey, sideKey)}
      </Breadcrumb>
      {/* 菜单 */}
      <Menu {...sideMenuProps}>
        {mapLeftBtn(menu, horizonKey)}
      </Menu>
    </div>
  )
}

BreadLab.defaultProps = {
  // dealMenuClick: false,
}

BreadLab.propTypes = {
  menu: PropTypes.array.isRequired,
}

export default BreadLab
