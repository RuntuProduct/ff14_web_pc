import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
import les from './modalLocation.less'
import LocationPointShow from './locationPointShow'

const { Modal } = tools

const ModalLocationCon = ({
  data,
  loading,
  dispatch,
  ...modalProps
}) => {
  const { id, img, baseX, baseY, positionAry } = data
  const mapPosition = () => {
    return positionAry.map((po) => {
      const LPprops = {
        ...po,
        baseX,
        baseY,
        mapId: id,
        mapImg: img,
        dispatch,
      }
      return <LocationPointShow key={po.id} {...LPprops} />
    })
  }
  // 进入添加地点弹窗
  const handleAdd = () => {
    dispatch({
      type: 'map/showModalLocationDetail',
      tit: '添加地点',
      obj: { editType: 'add', mapId: id, img, baseX, baseY },
    })
  }
  const sendProps = {
    ...modalProps,
    title: '地点一览',
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
