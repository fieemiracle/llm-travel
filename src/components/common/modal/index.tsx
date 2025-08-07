import { View } from '@tarojs/components'
import './index.less'

type ModalProps = {
  isOpened: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
}

export default function Modal(props: ModalProps) {
  const { title, header, content, children, footer, isOpened } = props

  // 当 isOpened 为 false 时，不渲染组件
  if (!isOpened) {
    return null
  }

  // 渲染header内容
  const renderHeader = () => {
    if (header) {
      return header
    }
    
    if (title) {
      return (
        <View className='modal-header'>
          <View className='modal-title'>{title}</View>
          <View className='modal-close' onClick={props.onClose}>
            <View className='close-icon'>×</View>
          </View>
        </View>
      )
    }
    
    return null
  }

  // 渲染content内容
  const renderContent = () => {
    if (content) {
      return content
    }
    
    return children
  }

  return (
    <View className='modal-wrapper'>
      {/* 遮罩层 */}
      <View className='modal-mask'></View>
      <View className='modal-body'>
        {/* 头部 */}
        {renderHeader()}
        {/* 内容 */}
        <View className='modal-content'>
          {renderContent()}
        </View>
        {/* 底部 */}
        {footer && (
          <View className='modal-footer'>
            {footer}
          </View>
        )}
      </View>
    </View>
  )
}