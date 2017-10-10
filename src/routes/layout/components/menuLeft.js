import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Breadcrumb, Menu, Icon } from 'antd'

const { Sider } = Layout

class BreadLab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const { menu, menuKey, sideMenuProps } = this.props
    return (
      <div>
        {/* 左侧栏顶部面包屑 */}
        <Breadcrumb style={{ padding: '12px 0px 5px 25px' }}>
          {menu.map(item => {
            if(item.bpid == 1 && item.id == menuKey.horizonKey){
              return (
                <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
              )
            }
            if(item.bpid == menuKey.horizonKey && item.id == menuKey.sideKey){
              return (
                <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
              )
            }
          })}
        </Breadcrumb>
        {/* 菜单 */}
        <Menu {...sideMenuProps}>
          {menu.map(item => {
            if(item.bpid == menuKey.horizonKey && item.mpid != -1){
              return (
                <Menu.Item key={item.id}>
                  {item.icon && <Icon type={item.icon} />}
                  {item.name}
                </Menu.Item>
              )
            }
          })}
        </Menu>
      </div>
    );
  }
}

BreadLab.defaultProps = {
  // dealMenuClick: false,
}

BreadLab.propTypes = {
  menu: PropTypes.array,
}

export default BreadLab