import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { Layout, Menu, Breadcrumb, Icon, Tabs, Button } from 'antd'
import { config } from '@utils'
import styles from './index.less'

import MenuTop from './components/menuTop'
import MenuLeft from './components/menuLeft'
import MenuFloat from './components/menuFloat'

const { SubMenu, ItemGroup: MenuItemGroup } = Menu
const { TabPane } = Tabs
const { Header, Content, Sider, Footer } = Layout
const { footerTxt } = config

const IndexCom = ({
  app,
  page,
  location,
  children,
  dispatch,
}) => {
  const {
    menu,

    horizonKey,
    sideKey,
    panes,

    isNavbar,
    showFloatMenu,
  } = page
  const {
    user,
  } = app

  // 顶部菜单属性
  const horizonMenuProps = {
    theme: 'dark',
    mode: 'horizontal',
    selectedKeys: [horizonKey],
    // defaultSelectedKeys: [horizonKey.toString()],
    onClick(item) {
      // 路由跳转
      dispatch({ type: 'page/linkTo', id: item.key })
    },

    data: menu,
  }

  // 用户菜单属性
  const userMenuProps = {
    theme: 'dark',
    mode: 'horizontal',
    className: styles.usrMenu,
    onClick(e) {
      if (e.key == 'logout') {
        dispatch({ type: 'app/logout' })
      }
    },
  }

  // 左侧菜单属性
  const sideMenuProps = {
    mode: 'inline',
    style: { height: '100%', borderRight: 0 },
    selectedKeys: [sideKey],
    onClick(item) {
      dispatch({ type: 'page/linkTo', id: item.key })
    },

    menu,
    horizonKey,
    sideKey,
  }

  // 内容tab的相关属性
  const tabsProps = {
    hideAdd: true,
    type: 'editable-card',
    activeKey: sideKey,
    onEdit(targetKey, action) {
      if (action == 'remove') {
        dispatch({ type: 'page/paneRemove', id: targetKey })
      }
    },
    onChange(id) {
      dispatch({ type: 'page/linkTo', id })
    },
  }

  const floatMenuProps = {
    config: {
      theme: 'dark',
      mode: 'inline',
      className: `${styles.floatMenu} ${(showFloatMenu && isNavbar) ? 'animated fadeInDownBig' : ''} ${(!showFloatMenu && isNavbar ? 'animated fadeOutUpBig' : '')}`,
      defaultOpenKeys: [horizonKey],
      openKeys: [horizonKey],
      selectedKeys: [sideKey],
      onOpenChange(openKeys) {
        console.log(openKeys)
        // 记录当前选中的key
        const defKey = openKeys[1] + '1'
        dispatch({
          type: 'page/handleMenuKey',
          payload: {
            menuKey: {
              horizonKey: openKeys[1],
              sideKey: 0,
              panes: [],
            },
          },
        })
      },
      onClick(item, key, keyPath) {
        // 路由跳转
        dispatch({ type: 'page/linkTo', id: item.key })
        dispatch({ type: 'page/changeFloatMenu' })
      },
    },
    menu,
  }

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        {
          isNavbar ?
            <div className={styles.smBar}>
              <div className={`${styles.tapBar} ${(showFloatMenu && isNavbar) ? styles.up : styles.down}`} onClick={() => dispatch({ type: 'page/changeFloatMenu' })}>
                <Icon type="down-square" />
              </div>
            </div> :
            <div className={styles.logo} onClick={() => dispatch({ type: 'page/home' })}>
              <img alt={'logo'} src={config.logo} className={styles.pic} />
              <span className={styles.sfName}>{config.name}</span>
            </div>
        }

        {/* 顶部菜单 */}
        {
          isNavbar ?
            <div className={styles.flex1} /> :
            <MenuTop {...horizonMenuProps} />
        }
        {/* 用户操作菜单 */}
        <Menu {...userMenuProps}>
          <SubMenu
            style={{ lineHeight: '64px' }}
            title={
              <span>
                <Icon type="user" />
                {user.name}
              </span>
            }
          >
            <Menu.Item key="logout">注销</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Layout>
        {/* 浮动菜单 */}
        {
          (isNavbar) ?
            <MenuFloat {...floatMenuProps} /> : ''
        }
        {
          (!isNavbar && location.pathname !== '/') ?
            <Sider width={170} className={styles.siderLeft}>
              <MenuLeft {...sideMenuProps} />
            </Sider> :
            ''
        }
        <Layout style={{ padding: '5px 0 0' }}>
          {
            location.pathname !== '/' ?
              <Content style={{ position: 'relative', margin: 0, width: '100%' }}>
                <div className={styles.absCon}>
                  <Tabs className={styles.tab} {...tabsProps}>{
                    panes.map((pane) => {
                      return (
                        <TabPane tab={pane.name} key={pane.id}>
                          <div className={styles.absBody}>
                            <div className={styles.body}>
                              {
                                location.pathname == pane.path ?
                                  children :
                                  ''
                              }
                            </div>
                            <Footer>{footerTxt}</Footer>
                          </div>
                        </TabPane>
                      )
                    })
                  }</Tabs>
                </div>
              </Content> :
              <Content>
                <div className={styles.smBody}>
                  {children}
                  <Footer>{footerTxt}</Footer>
                </div>
              </Content>
          }
        </Layout>
      </Layout>
    </Layout>
  )
}

IndexCom.propTypes = {
  app: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ app, page, loading }) => ({ app, page, loading }))(IndexCom)
