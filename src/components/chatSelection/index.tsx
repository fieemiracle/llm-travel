import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChatSelection } from '@/store/actions/chat'
import './index.less'

interface ChatSelectionProps {
    chatId: string
}

export default function ChatSelection({ chatId }: ChatSelectionProps) {
    const dispatch = useDispatch()
    const { shareMode, selectedChatIds } = useSelector((state: any) => state.chat)

    if (!shareMode) return null

    const isSelected = selectedChatIds.includes(chatId)

    const handleToggle = () => {
        dispatch(toggleChatSelection(chatId))
    }

    return (
        <View className='chat-selection' onClick={handleToggle}>
            <View className={`selection-checkbox ${isSelected ? 'checked' : ''}`}>
                {isSelected && <Text className='check-icon'>✓</Text>}
            </View>
        </View>
    )
} 