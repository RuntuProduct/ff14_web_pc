import React from 'react'
import PropTypes from 'prop-types'
import { Link, routerRedux } from 'dva/router'
import { Menu, Icon } from 'antd'
// import styles from '.'

const { SubMenu, ItemGroup: MenuItemGroup } = Menu

const MenuFloatCon = ({
  config,
  menu,
}) => {
  return (
    <Menu {...config}>
      {
        menu.map((item) => {
          const { childrens } = item
          return (
            <SubMenu
              key={item.id}
              title={
                <span>{item.icon && <Icon type={item.icon} />}<span>{item.name}</span></span>
              }
            >
              {
                childrens.map((ch) => {
                  return (
                    <Menu.Item key={ch.id}>
                      {ch.icon && <Icon type={ch.icon} />}
                      {ch.name}
                    </Menu.Item>
                  )
                })
              }
            </SubMenu>
          )
        })
      }
    </Menu>
  )
}

MenuFloatCon.defaultProps = {
  // dealMenuClick: false,
}

MenuFloatCon.propTypes = {
  config: PropTypes.object,
  menu: PropTypes.array,
}

export default MenuFloatCon