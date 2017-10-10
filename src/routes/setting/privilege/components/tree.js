import React from 'react'
import PropTypes from 'prop-types'
import { Tree, Input, Button, Tooltip, Icon, Modal } from 'antd'
import { tree } from '@utils'
import styles from './tree.less'

const { dealTree } = tree

const TreeNode = Tree.TreeNode
const Search = Input.Search

// 获取父节点id
const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i]
    if (node.childrens) {
      if (node.childrens.some(item => item.id === key)) {
        parentKey = node.id + ''
      } else if (getParentKey(key, node.childrens)) {
        parentKey = getParentKey(key, node.childrens)
      }
    }
  }
  return parentKey
}

class TreeCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
    }
  }

  render() {
    const {
      privilege,
      showModal,
      dealDelete,
    } = this.props
    const {
      searchValue,
      expandedKeys,
      autoExpandParent,
    } = this.state
    const { list } = privilege
    const treeData = dealTree(list)

    const onExpand = (expandedKeys) => {
      console.log(treeData)
      this.setState({
        expandedKeys,
        autoExpandParent: false,
      })
    }

    const handleDelete = (id) => {
      Modal.confirm({
        title: '删除节点',
        content: '删除节点操作不可撤销，你确定要删除此节点吗？',
        iconType: 'exclamation-circle',
        onOk() {
          dealDelete(id)
        },
      })
    }

    // 搜索框检索函数
    const onChange = (e) => {
      const value = e.target.value
      const expandedKeys = list.map((item) => {
        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.id, treeData)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      this.setState({
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      })
    }

    const dealChild = (parent, da) => {
      return da.map((d) => {
        const index = d.name.indexOf(searchValue)
        const beforeStr = d.name.substr(0, index)
        const afterStr = d.name.substr(index + searchValue.length)

        const addObj = {
          editType: 'add',
          parent: d.level,
          parentName: d.name,
          menu: '1',
          status: 1,
        }

        const editObj = {
          editType: 'edit',
          id: d.id,
          name: d.name,
          path: d.path,
          parent: parent ? parent.level : '0',
          parentName: parent ? parent.name : 'root',
          menu: d.menu,
          status: d.status,
        }

        return (
          <TreeNode
            className={styles.tree}
            title={(
              <div>
                {
                  d.menu == 1 && <Tooltip placement="top" title="此节点为菜单节点"><Icon type="bars" style={{ fontSize: 16, color: '#08c', marginRight: '6px' }} /></Tooltip>
                }
                {
                  index > -1 ? (
                    <span className={styles.title}>
                      {beforeStr}
                      <span style={{ color: '#f50' }}>{searchValue}</span>
                      {afterStr}
                    </span>
                  ) : <span>{d.name}</span>
                }
                {/* <span className={styles.title}>{d.name}</span> */}
                {/* 添加子节点按钮 */}
                <Tooltip placement="top" title="添加子节点">
                  <Button
                    icon="usergroup-add"
                    size="small"
                    className={styles.btn}
                    onClick={() => showModal('添加子节点', addObj)}
                  />
                </Tooltip>
                {/* 编辑节点按钮 */}
                <Tooltip placement="top" title="编辑节点">
                  <Button
                    icon="edit"
                    size="small"
                    className={styles.btn}
                    onClick={() => showModal('编辑子节点', editObj)}
                  />
                </Tooltip>
                {/* 删除节点按钮 */}
                <Tooltip placement="top" title="删除节点">
                  <Button
                    icon="delete"
                    type="danger"
                    size="small"
                    className={styles.btn}
                    onClick={() => handleDelete(d.id)}
                  />
                </Tooltip>
              </div>
            )}
            key={d.id}
          >
            {
              d.childrens ? dealChild(d, d.childrens) : ''
            }
          </TreeNode>
        )
      })
    }

    return (
      <div>
        <Search style={{ width: 300 }} placeholder="权限节点名" onChange={onChange} />
        <Tree
          showLine
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {
            dealChild(null, treeData)
          }
        </Tree>
      </div>
    )
  }
}

TreeCon.defaultProps = {
  // dealMenuClick: false,
}

TreeCon.propTypes = {
  privilege: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  dealDelete: PropTypes.func.isRequired,
}

export default TreeCon
