import { View } from '@tarojs/components'
import FormInput from '@/components/formInput'
import './index.less'

export default function Chat () {

  const onSendQuery = (value: string) => {
    console.log(value)
  }
  return (
    <View className='chat-wrapper'>
      <View className='chat-content'>
  
      </View>
      <View className='chat-input'>
        <FormInput onSend={(value) => onSendQuery(value)} />
      </View>
    </View>
  )
}
