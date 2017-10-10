import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import styles from './menuTop.less'

const MenuTop = ({
  config: horizonMenuProps,
  data: menu,
}) => {
  return (
    <div className={styles.scrollMenu}>
      <div className={styles.inner}>
        <div className={styles.scroll}>
          <Menu {...horizonMenuProps} className={styles.horMenu}>
            {menu.map((item) => {
              if (item.bpid == 1) {
                return (
                  <Menu.Item key={item.id} style={{}}>
                    {item.icon && <Icon type={item.icon} />}
                    {item.name}
                  </Menu.Item>
                )
              } else {
                return null
              }
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
