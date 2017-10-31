import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
import les from './modalLocation.less'
import LocationPoint from './locationPoint'

const { Modal } = tools

const ModalLocationCon = ({
  data,
  loading,
  dispatch,
  ...modalProps
}) => {
  const { img, positionAry } = data
  const mapPosition = () => {
    return positionAry.map((po) => {
      const LPprops = {
        ...po,
      }
      return <LocationPoint key={po.id} {...LPprops} />
    })
  }
  const sendProps = {
    ...modalProps,
    title: '编辑地点',
    visible: true,
    width: '90%',
    wrapClassName: 'vertical-center-modal',
    maskClosable: true,
    confirmLoading: loading.effects['map/edit'],

    onOk: null,
    onCancel: () => {
      dispatch({
        type: 'map/hideModalLocation',
      })
    },
    // body: <VerForm {...formProps} />,
  }
  const handleAdd = () => {
    dispatch({ type: 'map/showModalLocationDetail', tit: '添加地点', obj: { editType: 'add' } })
  }

  return (
    <Modal modalProps={sendProps}>
      <div>
        <div className={les.btnArea}>
          <Button type="primary" onClick={handleAdd}>添加地点</Button>
        </div>
        <div className={les.imgArea}>
          {mapPosition()}
          <img src={`${imgBaseURL}${img}`} alt="地图图片" />
        </div>
      </div>
    </Modal>
  )
}

ModalLocationCon.defaultProps = {
  // dealMenuClick: false,
}

ModalLocationCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default ModalLocationCon
