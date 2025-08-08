import { View, Text, Canvas } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { setShareMode, selectAllChats, clearChatSelection } from '@/store/actions/chat'
import Taro from '@tarojs/taro'
import './index.less'
import * as dayjs from 'dayjs'

export default function ShareActionBar() {
    const dispatch = useDispatch()
    const { shareMode, selectedChatIds, chatList } = useSelector((state: any) => state.chat)

    // 固定Canvas尺寸，避免压缩比问题
    const CANVAS_WIDTH = 750
    const CANVAS_MAX_HEIGHT = 3000

    if (!shareMode) return null

    // 取消分享模式
    const handleCancel = () => {
        dispatch(setShareMode(false))
    }

    // 全选/取消全选
    const handleSelectAll = () => {
        if (selectedChatIds.length === chatList.length) {
            dispatch(clearChatSelection())
        } else {
            dispatch(selectAllChats())
        }
    }

    // 生成图片
    const handleGenerateImage = async () => {
        if (selectedChatIds.length === 0) {
            Taro.showToast({
                title: '请先选择要分享的对话',
                icon: 'none'
            })
            return
        }

        try {
            Taro.showLoading({ title: '生成中...' })

            // 获取选中的对话内容
            const selectedMessages = chatList.filter(msg => selectedChatIds.includes(msg.chatId))

            // 生成图片内容
            await generateChatImage(selectedMessages)

        } catch (error) {
            Taro.hideLoading()
            Taro.showToast({
                title: '生成失败，请重试',
                icon: 'none'
            })
        }
    }

    // 生成对话截图
    const generateChatImage = async (messages: any[]) => {

        try {
            // 获取系统信息
            const systemInfo = Taro.getSystemInfoSync()

            // 创建画布来生成图片
            const canvas = Taro.createCanvasContext('chatCanvas')

            // 画布配置 - 使用固定尺寸避免压缩
            const canvasWidth = CANVAS_WIDTH
            const pixelRatio = systemInfo.pixelRatio || 2
            const baseHeight = 300
            let totalHeight = baseHeight

            // 预计算每条消息需要的高度
            messages.forEach(message => {
                const contentLines = Math.ceil(message.content.length / 30) // 每行约30个字符
                const messageHeight = Math.max(120, 60 + contentLines * 40 + 40) // 调整行高
                totalHeight += messageHeight + 30 // 消息间距
            })

            const canvasHeight = Math.min(totalHeight + 150, CANVAS_MAX_HEIGHT) // 限制最大高度

            // console.log('canvasSize:', {
            //     canvasWidth,
            //     canvasHeight,
            //     actualContentHeight: totalHeight + 150,
            //     pixelRatio,
            //     messageCount: messages.length
            // })

            // 设置背景色
            canvas.setFillStyle('#FFFFFF')
            canvas.fillRect(0, 0, canvasWidth, canvasHeight)

            // 绘制顶部装饰条
            canvas.setFillStyle('#00CCC9')
            canvas.fillRect(0, 0, canvasWidth, 8)

            // 设置标题
            canvas.setFillStyle('#333333')
            canvas.setFontSize(36)
            canvas.setTextAlign('center')
            canvas.fillText('旅团子', canvasWidth / 2, 60)

            canvas.setFillStyle('#666666')
            canvas.setFontSize(24)
            canvas.fillText(dayjs().format('YYYY年MM月DD日 HH:mm'), canvasWidth / 2, 90)

            let yPos = 150

            // 绘制每条消息
            for (let index = 0; index < messages.length; index++) {
                const message = messages[index]
                const isUser = message.role === 'user'
                const bgColor = isUser ? '#90F9F2' : '#E8F5E8'
                const textColor = isUser ? '#00CCC9' : '#388E3C'
                const role = isUser ? '我' : '游小助'

                // console.log(`绘制第${index + 1}条消息，yPos: ${yPos}, canvasHeight: ${canvasHeight}`)

                // 计算消息内容需要的行数和高度
                const maxCharsPerLine = 30
                const contentLines = Math.ceil(message.content.length / maxCharsPerLine)
                const messageHeight = Math.max(120, 60 + contentLines * 40)

                // 确保不超出画布范围
                if (yPos + messageHeight > canvasHeight) {
                    console.warn(`消息${index + 1}超出画布范围，跳过绘制`)
                    break
                }

                // 绘制消息背景
                canvas.setFillStyle(bgColor)
                canvas.fillRect(40, yPos, canvasWidth, messageHeight)

                // 绘制角色标签背景
                canvas.setFillStyle(textColor)
                canvas.fillRect(40, yPos, 100, 35)

                // 绘制角色标签文字
                canvas.setFillStyle('#FFFFFF')
                canvas.setFontSize(20)
                canvas.setTextAlign('center')
                canvas.fillText(role, 90, yPos + 25)

                // 绘制消息内容（支持换行）
                canvas.setFillStyle('#333333')
                canvas.setFontSize(24)
                canvas.setTextAlign('left')

                // 分行绘制文本
                for (let i = 0; i < contentLines; i++) {
                    const startIndex = i * maxCharsPerLine
                    const endIndex = Math.min(startIndex + maxCharsPerLine, message.content.length)
                    const lineText = message.content.slice(startIndex, endIndex)
                    const textY = yPos + 60 + i * 40

                    // 确保文本不超出画布
                    if (textY > canvasHeight - 50) {
                        console.warn(`文本行超出画布范围，停止绘制`)
                        break
                    }

                    canvas.fillText(lineText, 60, textY)
                    // console.log(`绘制文本行 ${i + 1}: "${lineText}" at Y: ${textY}`)
                }

                yPos += messageHeight + 30
                // console.log(`第${index + 1}条消息绘制完成，新yPos: ${yPos}`)
            }

            // 添加底部信息
            yPos += 20
            canvas.setFillStyle('#999999')
            canvas.setFontSize(20)
            canvas.setTextAlign('center')
            canvas.fillText(`${new Date().toLocaleString()}`, canvasWidth / 2, yPos)
            canvas.fillText('旅团子 - 让您的旅行更轻松', canvasWidth / 2, yPos + 30)

            // 绘制完成
            canvas.draw(true, () => {
                // 将画布内容转换为图片
                Taro.canvasToTempFilePath({
                    canvasId: 'chatCanvas',
                    x: 0,
                    y: 0,
                    width: canvasWidth,
                    height: canvasHeight,
                    destWidth: canvasWidth * pixelRatio,
                    destHeight: canvasHeight * pixelRatio,
                    fileType: 'png',
                    quality: 1,
                    success: async (res) => {
                        const tempFilePath = res.tempFilePath
                        try {
                            // 先请求保存图片权限
                            await Taro.authorize({
                                scope: 'scope.writePhotosAlbum'
                            }).catch(() => {
                                // 权限被拒绝，引导用户开启
                                return Taro.showModal({
                                    title: '需要相册权限',
                                    content: '需要您的授权保存图片到相册',
                                    confirmText: '去设置',
                                    success: (modalRes) => {
                                        if (modalRes.confirm) {
                                            Taro.openSetting()
                                        }
                                    }
                                })
                            })

                            // 保存到相册
                            // TODO 存在保存图片之后会刷新页面，注释这段代码就不会了，可能是因为saveImageToPhotosAlbum的默认行为？
                            // 暂不解决吧，后续可能也不会使用这个方式去保存图片，图片或许需要上传到服务器？生成链接？
                            await Taro.saveImageToPhotosAlbum({
                                filePath: tempFilePath,
                                success: () => {
                                },
                                fail: () => {
                                }
                            })

                            Taro.hideLoading()

                            // 先关闭分享模式，再显示成功提示，避免modal回调中的状态更新导致页面刷新
                            dispatch(setShareMode(false))

                            // 延迟显示成功提示，确保状态更新完成
                            setTimeout(() => {
                                Taro.showToast({
                                    title: `图片已保存到相册`,
                                    icon: 'none',
                                    duration: 2000
                                })
                            }, 150)

                        } catch (saveError) {
                            console.error('保存图片失败:', saveError)

                            // 如果保存失败，先关闭分享模式再显示错误
                            dispatch(setShareMode(false))
                            Taro.hideLoading()

                            setTimeout(() => {
                                Taro.showToast({
                                    title: '保存失败，请重试',
                                    icon: 'none'
                                })
                            }, 100)
                        }
                    },
                    fail: (error) => {
                        console.error('生成图片失败:', error)
                        dispatch(setShareMode(false))
                        Taro.hideLoading()

                        setTimeout(() => {
                            Taro.showToast({
                                title: '生成图片失败',
                                icon: 'none'
                            })
                        }, 100)
                    }
                })
            })

            // 添加超时处理
            setTimeout(() => {
                console.log('Canvas绘制超时检查')
            }, 3000)

        } catch (error) {
            console.error('创建画布失败:', error)

            // 如果画布创建失败，先关闭分享模式
            dispatch(setShareMode(false))
            Taro.hideLoading()

            setTimeout(() => {
                Taro.showToast({
                    title: '图片生成失败，请重试',
                    icon: 'none'
                })
            }, 100)
        }
    }

    // 分享给微信好友
    const handleShareToWechat = () => {
        if (selectedChatIds.length === 0) {
            Taro.showToast({
                title: '请先选择要分享的对话',
                icon: 'none'
            })
            return
        }

        // 获取选中的消息内容
        const selectedMessages = chatList.filter(msg => selectedChatIds.includes(msg.chatId))
        const selectedContent = selectedMessages
            .map(msg => `${msg.role === 'user' ? '我' : 'AI'}: ${msg.content}`)
            .join('\n\n')

        try {
            Taro.showShareMenu({
                withShareTicket: true
            })
        } catch (error) {
        }

        Taro.showToast({
            title: '请点击右上角分享',
            icon: 'none'
        })

        dispatch(setShareMode(false))
    }

    return (
        <View className='share-action-bar'>
            {/* 隐藏的画布用于生成图片 */}
            <Canvas
                canvasId="chatCanvas"
                className="hidden-canvas"
                width={`${CANVAS_WIDTH}`}
                height={`${CANVAS_MAX_HEIGHT}`}
                style={{
                    width: `${CANVAS_WIDTH}px`,
                    height: `${CANVAS_MAX_HEIGHT}px`
                }}
            />

            {/* 顶部操作栏 */}
            <View className='share-header'>
                <View className='share-cancel' onClick={handleCancel}>
                    <Text className='cancel-text'>取消</Text>
                </View>
                <View className='share-title'>
                    <Text className='title-text'>已选择 {selectedChatIds.length} 条对话</Text>
                </View>
                <View className='share-select-all' onClick={handleSelectAll}>
                    <Text className='select-all-text'>
                        {selectedChatIds.length === chatList.length ? '取消全选' : '全选'}
                    </Text>
                </View>
            </View>

            {/* 分享选项 */}
            <View className='share-actions'>
                <View className='share-option' onClick={handleGenerateImage}>
                    <View className='share-option-icon'>
                        <Text className='share-icon'>📷</Text>
                    </View>
                    <Text className='share-option-text'>生成图片</Text>
                </View>

                <View className='share-option' onClick={handleShareToWechat}>
                    <View className='share-option-icon wechat'>
                        <Text className='wechat-icon'>💬</Text>
                    </View>
                    <Text className='share-option-text'>微信好友</Text>
                </View>
            </View>
        </View>
    )
} 