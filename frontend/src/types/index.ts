// 星座类型
export type ZodiacSign =
  | '白羊座' | '金牛座' | '双子座' | '巨蟹座'
  | '狮子座' | '处女座' | '天秤座' | '天蝎座'
  | '射手座' | '摩羯座' | '水瓶座' | '双鱼座'

// MBTI类型
export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

// 用户基础信息
export interface UserInfo {
  zodiac: ZodiacSign
  mbti: MBTIType
  age: number
  gender: 'male' | 'female' | 'other'
}

// 测试题类型
export type QuestionCategory = 'personality' | 'ai_adaptation' | 'work_environment'

export interface Question {
  id: number
  category: QuestionCategory
  question: string
  options: {
    text: string
    scores: {
      E?: number  // 外向
      I?: number  // 内向
      S?: number  // 感觉
      N?: number  // 直觉
      T?: number  // 思考
      F?: number  // 情感
      J?: number  // 判断
      P?: number  // 感知
      AI?: number // AI倾向值
      aiScore?: number // AI分数（兼容）
    }
  }[]
}

// 答题记录
export interface Answer {
  questionId: number
  optionIndex: number
}

// 人格维度得分
export interface PersonalityScores {
  E: number  // 外向
  I: number  // 内向
  S: number  // 感觉
  N: number  // 直觉
  T: number  // 思考
  F: number  // 情感
  J: number  // 判断
  P: number  // 感知
  AI: number // AI倾向值 (0-100)
}

// 人格类型结果
export interface PersonalityResult {
  mbti: MBTIType
  aiLevel: number // 0-100
  zodiac: ZodiacSign
  title: string // 人格称号
  description: string // 详细描述
  traits: string[] // 特质标签
  strengths: string[] // 优势
  weaknesses: string[] // 劣势
  careerSuggestions: string[] // 职业建议
  aiUsagePattern: string // AI使用模式
  futurePersonality: {
    scenario: string // 场景
    predictedMBTI: MBTIType // 预测人格
    probability: number // 概率
    description: string // 描述
  }[]
}

// 人格卡片
export interface PersonalityCard {
  id: string
  mbti: MBTIType
  zodiac: ZodiacSign
  aiLevel: number
  title: string
  image: string // 卡片图片URL
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  collectedAt: string // 收集时间
}

// 测试进度
export interface TestProgress {
  currentQuestion: number
  totalQuestions: number
  answers: Answer[]
  startTime: string
}

// 本地存储数据结构
export interface LocalStorageData {
  userInfo?: UserInfo
  testProgress?: TestProgress
  latestResult?: PersonalityResult
  collectedCards: PersonalityCard[]
  testHistory: {
    date: string
    result: PersonalityResult
  }[]
}
