import { View, Text } from '@tarojs/components'
import { HOME_WELCOME_TEXT } from '@/utils/const'
import { formatArrayByCustomLength } from '@/utils/tools'
import { HOME_BOTTOM_TIPS } from '@/mock'
import FormInput from '@/components/formInput'
import './index.less'

type HomeProps = {
  getTipText: (tipText: string) => void
  getInputValue: (inputText: string) => void
}

export default function Home(props: HomeProps) {
  const homeTipsList = formatArrayByCustomLength(HOME_BOTTOM_TIPS, 2)

  // 点击词条
  const onTipsClick = (tipText: string) => {
    props.getTipText(tipText)
  }

  // 发送查询
  const onSendQuery = (inputText: string) => {
    console.log(inputText, 'onSendQuery')
    const query = inputText.trim()
    if (!query) {
      return
    }
    props.getInputValue(query)
  }

  return (
    <View className='home-wrapper'>
      {/* 欢迎语 */}
      <View className='home-welcome'>
        <Text>{HOME_WELCOME_TEXT}</Text>
      </View>
      {/* 内容区 */}
      <View className='home-content'>
      </View>
      <View className='home-footer'>
        {/* 底部词条 */}
        <View className='home-tips'>
          {
            homeTipsList.map((listItem, listIndex) => (
              <View className='home-tip' key={listIndex}>
                {listItem.map((item, index) => (
                  <View key={index} className='home-tips-item' onClick={() => onTipsClick(item)}>
                    <Text>{item}</Text>
                  </View>
                ))}
              </View>
            ))
          }
        </View>
        
        {/* 输入框 */}
        <View className='home-input'>
          <FormInput onSend={(inputText) => onSendQuery(inputText)} />
        </View>
      </View>
    </View>
  )
}
