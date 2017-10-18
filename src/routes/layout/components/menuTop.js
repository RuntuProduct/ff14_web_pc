import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import styles from './menuTop.less'

const MenuTop = ({
  data: menu,
  ...horizonMenuProps
}) => {
  return (
    <div className={styles.scrollMenu}>
      <div className={styles.inner}>
        <div className={styles.scroll}>
          <Menu {...horizonMenuProps} className={styles.horMenu}>
            {menu.map((item) => {
              return (
                <Menu.Item key={item.id} style={{}}>
                  {item.icon && <Icon type={item.icon} />}
                  {item.name}
                </Menu.Item>
              )
            })}
          </Menu>
        </div>
      </div>
    </div>
  )
}

MenuTop.defaultProps = {
  // dealMenuClick: false,
}

MenuTop.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default MenuTop
