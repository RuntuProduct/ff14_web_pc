import React from 'react'
import PropTypes from 'prop-types'
import { Link , routerRedux} from 'dva/router'
import { Menu, Icon } from 'antd'
// import styles from '.'

const { SubMenu, ItemGroup: MenuItemGroup } = Menu

class MenuFloatCon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const { config, data: menu } = this.props
    return (
      <Menu {...config}>
        {menu.map(item => {
          let tarid = item.id
          if(item.bpid == 1){
            return (
              <SubMenu key={item.id} title={<span>{item.icon && <Icon type={item.icon} />}<span>{item.name}</span></span>}>
                {menu.map(item => {
                  if(item.bpid == tarid && item.mpid != -1){
                    return (
                      <Menu.Item key={item.id}>
                        {item.icon && <Icon type={item.icon} />}
                        {item.name}
                      </Menu.Item>
                    )
                  }
                })}
              </SubMenu>
            )
          }
        })}
      </Menu>
    );
  }
}

MenuFloatCon.defaultProps = {
  // dealMenuClick: false,
}

MenuFloatCon.propTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
}

export default MenuFloatCon