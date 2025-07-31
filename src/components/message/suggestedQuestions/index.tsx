import { View, Text } from '@tarojs/components'
import './index.less'
import { useMemo } from 'react'

type SuggestedQuestion = {
  id: string
  text: string
}

type SuggestedQuestionsProps = {
  questions?: SuggestedQuestion[]
  onQuestionClick?: (question: string) => void
  title?: string
  className?: string
}

const defaultQuestions: SuggestedQuestion[] = [
  {
    id: '1',
    text: '珠江新城附近有什么推荐的咖啡馆?'
  },
  {
    id: '2',
    text: '珠江新城最近的天气情况如何?'
  },
  {
    id: '3',
    text: '从珠江新城到广州塔的交通方式是什么?'
  }
]

export default function SuggestedQuestions(props: SuggestedQuestionsProps) {
  const {
    questions,
    onQuestionClick,
    title = '猜你想问',
    className = ''
  } = props

  const recommendedQuestions = useMemo(() => {
    return questions?.length ? questions : defaultQuestions
  }, [])
  // console.log('questions>>>>>>>', recommendedQuestions)

  const handleQuestionClick = (question: string) => {
    onQuestionClick?.(question)
  }

  return (
    <View className={`suggested-questions ${className}`}>
      <View className='suggested-questions-title'>
        <Text className='suggested-questions-title-text'>{title}</Text>
      </View>
      <View className='suggested-questions-list'>
        {recommendedQuestions.map((question) => (
          <View
            key={question.id}
            className='suggested-question-item'
            onClick={() => handleQuestionClick(question.text)}
          >
            <Text className='suggested-question-text'>{question.text}</Text>
          </View>
        ))}
      </View>
    </View>
  )
} 