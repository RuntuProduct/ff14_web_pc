import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { Layout, Menu, Breadcrumb, Icon, Tabs, Button } from 'antd'
import { config, menu } from '@utils'
import styles from './index.less'

import MenuTop from './components/menuTop'
import MenuLeft from './components/menuLeft'
import MenuFloat from './components/menuFloat'

const { SubMenu, ItemGroup: MenuItemGroup } = Menu
const { TabPane } = Tabs
const { Header, Content, Sider, Footer } = Layout
const { footerTxt } = config

class IndexCom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { app, page, location, children, dispatch } = this.props
    const { menuKey, isNavbar, showFloatMenu } = page
    const { user } = app

    // 顶部菜单属性
    const horizonMenuProps = {
      config: {
        theme: 'dark',
        mode: 'horizontal',
        selectedKeys: [menuKey.horizonKey + ''],
        defaultSelectedKeys: [menuKey.horizonKey + ''],
        onClick(item, key, keyPath) {
          // 记录当前选中的key
          const defKey = item.key + '1'
          dispatch({
            type: 'page/handleMenuKey',
            payload: {
              menuKey: {
                horizonKey: item.key,
                sideKey: defKey,
                panes: [defKey],
              },
            },
          })

          // 查找第一个子key，并跳转
          const selectKey = item.key
          let selectSubItem
          menu.map((item) => {
            if (item.bpid == selectKey && item.id == defKey && item.mpid != -1) {
              selectSubItem = item
              return null
            }
          })

          // 路由跳转
          dispatch({
            type: 'app/link',
            payload: {
              rpath: selectSubItem.router,
              path: selectSubItem.router,
            },
          })
        },
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
      selectedKeys: [menuKey.sideKey],
      onClick(item, key, keyPath) {
        let npanes
        if (menuKey.panes.find((n) => { return n == item.key }) == undefined) {
          npanes = menuKey.panes.concat([item.key])
        } else {
          npanes = menuKey.panes
        }
        dispatch({
          type: 'page/handleMenuKey',
          payload: {
            menuKey: {
              horizonKey: menuKey.horizonKey,
              sideKey: item.key,
              panes: npanes,
            },
          },
        })

        // 查找key，并跳转
        const selectKey = item.key
        let selectSubItem
        menu.map((item) => {
          if (item.id == selectKey && item.mpid != -1) {
            selectSubItem = item
            return null
          }
        })

        // 路由跳转
        dispatch({
          type: 'app/link',
          payload: {
            rpath: selectSubItem.router,
            path: selectSubItem.router,
          },
        })
      },
    }

    const panes = []
    menu.map((item) => {
      if (item.bpid == menuKey.horizonKey && item.mpid != -1) {
        menuKey.panes.map((key) => {
          if (key == item.id) {
            panes.push({
              title: item.name,
              content: '',
              key: item.id,
              router: item.router,
            })
          }
        })
      }
    })

    // 内容tab的相关属性
    const tabsProps = {
      hideAdd: true,
      type: 'editable-card',
      activeKey: menuKey.sideKey,
      onEdit(targetKey, action) {
        console.log(targetKey, action)
        if (action == 'remove') {
          const nPanes = []
          menuKey.panes.map((item) => {
            if (item != targetKey) {
              nPanes.push(item)
            }
          })

          dispatch({
            type: 'page/handleMenuKey',
            payload: {
              menuKey: {
                horizonKey: menuKey.horizonKey,
                sideKey: (nPanes.length > 0) ? nPanes[nPanes.length - 1] : undefined,
                panes: nPanes,
              },
            },
          })

          menu.map((item) => {
            const sideKey = (nPanes.length > 0) ? nPanes[nPanes.length - 1] : undefined
            if (item.id == sideKey) {
              // 路由跳转
              dispatch({
                type: 'app/link',
                payload: {
                  rpath: item.router,
                  path: item.router,
                },
              })
            }
          })
        }
      },
      onChange(activeKey) {
        dispatch({
          type: 'page/handleMenuKey',
          payload: {
            menuKey: {
              horizonKey: menuKey.horizonKey,
              sideKey: activeKey,
              panes: menuKey.panes,
            },
          },
        })

        menu.map((item) => {
          if (item.id == activeKey) {
            console.log('tab', item)
            // 路由跳转
            dispatch({
              type: 'app/link',
              payload: {
                rpath: item.router,
                path: item.router,
              },
            })
          }
        })
      },
    }

    const floatMenuProps = {
      config: {
        theme: 'dark',
        mode: 'inline',
        className: `${styles.floatMenu} ${(showFloatMenu && isNavbar) ? 'animated fadeInDownBig' : ''} ${(!showFloatMenu && isNavbar ? 'animated fadeOutUpBig' : '')}`,
        defaultOpenKeys: [menuKey.horizonKey + ''],
        openKeys: [menuKey.horizonKey + ''],
        defaultSelectedKeys: menuKey.panes,
        selectedKeys: menuKey.panes,
        onOpenChange(openKeys) {
          // console.log(openKeys)
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
        onClick(item, key, keyPath ) {
          // 记录当前选中的key
          const defKey = item.key
          dispatch({
            type: 'page/handleMenuKey',
            payload: {
              menuKey: {
                horizonKey: defKey[0],
                sideKey: defKey,
                panes: [defKey],
              },
            },
          })

          // 跳转路由
          const selectKey = item.key
          let selectSubItem
          menu.map((item) => {
            if (item.id == defKey && item.mpid != -1) {
              selectSubItem = item
              return null
            }
          })

          dispatch({
            type: 'app/link',
            payload: {
              rpath: selectSubItem.router,
              path: selectSubItem.router,
            },
          })
          dispatch({ type: 'page/changeFloatMenu' })
        },
      },
      data: menu,
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
                <MenuLeft menu={menu} menuKey={menuKey} sideMenuProps={sideMenuProps} />
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
                          <TabPane tab={pane.title} key={pane.key}>
                            <div className={styles.absBody}>
                              <div className={styles.body}>
                                {
                                  location.pathname == pane.router ?
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
}

IndexCom.propTypes = {
  app: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ app, page, loading }) => ({ app, page, loading }))(IndexCom)
