import { questions } from '@/data/questions'
import type { Answer, MBTIType } from '@/types'

// MBTI维度计算
function calculateMBTI(answers: Answer[]): MBTIType {
  const scores = {
    E: 0, I: 0, // 外向/内向
    S: 0, N: 0, // 感觉/直觉
    T: 0, F: 0, // 思考/情感
    J: 0, P: 0, // 判断/感知
  }

  // 只计算人格测试题（1-30题）
  const personalityAnswers = answers.filter(a => a.questionId <= 30)

  personalityAnswers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question || question.category !== 'personality') return

    const option = question.options[answer.optionIndex]

    // 累加各维度得分
    Object.keys(option.scores).forEach(key => {
      if (key in scores) {
        scores[key as keyof typeof scores] += option.scores[key as keyof typeof option.scores] || 0
      }
    })
  })

  // 确定MBTI类型
  const mbti =
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P')

  return mbti as MBTIType
}

// AI适应力计算（0-100分）
function calculateAIScore(answers: Answer[]): number {
  const aiAnswers = answers.filter(a => a.questionId >= 31 && a.questionId <= 50)

  let totalScore = 0
  let maxPossibleScore = 0

  aiAnswers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question) return

    const option = question.options[answer.optionIndex]
    totalScore += option.scores.AI || 0

    // 找出该题的最高分
    const maxScore = Math.max(...question.options.map(opt => opt.scores.AI || 0))
    maxPossibleScore += maxScore
  })

  // 归一化到0-100
  if (maxPossibleScore === 0) return 50
  return Math.round((totalScore / maxPossibleScore) * 100)
}

// 工作环境偏好计算
function calculateWorkPreference(answers: Answer[]): {
  remote: number
  teamwork: number
  innovation: number
} {
  const workAnswers = answers.filter(a => a.questionId >= 51 && a.questionId <= 60)

  let eScore = 0, iScore = 0, nScore = 0, sScore = 0

  workAnswers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question) return

    const option = question.options[answer.optionIndex]

    // 累加各维度得分
    eScore += option.scores.E || 0
    iScore += option.scores.I || 0
    nScore += option.scores.N || 0
    sScore += option.scores.S || 0
  })

  return {
    remote: Math.round((iScore / (eScore + iScore + 0.01)) * 100), // 远程工作倾向
    teamwork: Math.round((eScore / (eScore + iScore + 0.01)) * 100), // 团队协作倾向
    innovation: Math.round((nScore / (nScore + sScore + 0.01)) * 100), // 创新倾向
  }
}

// MBTI类型描述
const mbtiDescriptions: Record<MBTIType, {
  name: string
  traits: string[]
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  aiRole: string
}> = {
  INTJ: {
    name: '建筑师',
    traits: ['战略思维', '独立自主', '追求完美', '理性分析'],
    strengths: ['系统思考能力强', '善于长期规划', '学习能力出众', '创新思维活跃'],
    weaknesses: ['过于理想化', '不善社交', '容易忽视他人感受', '完美主义倾向'],
    careers: ['软件架构师', 'AI研究员', '数据科学家', '战略顾问', '系统工程师'],
    aiRole: 'AI系统设计师 - 擅长构建复杂AI架构，将前沿技术转化为实际应用'
  },
  INTP: {
    name: '逻辑学家',
    traits: ['好奇心强', '逻辑严谨', '创新思维', '独立思考'],
    strengths: ['分析能力超群', '理论研究深入', '问题解决能力强', '开放包容'],
    weaknesses: ['缺乏执行力', '社交困难', '容易分心', '不善表达'],
    careers: ['算法工程师', '理论物理学家', '哲学研究员', '数学家', '技术作家'],
    aiRole: 'AI算法研究员 - 专注于探索AI底层原理，推动技术边界'
  },
  ENTJ: {
    name: '指挥官',
    traits: ['领导力强', '目标导向', '果断决策', '战略眼光'],
    strengths: ['组织能力出众', '执行力强', '善于激励他人', '长期规划能力'],
    weaknesses: ['过于强势', '缺乏耐心', '忽视细节', '不够灵活'],
    careers: ['CEO', '项目经理', '创业者', '管理咨询', '产品总监'],
    aiRole: 'AI产品负责人 - 将AI技术转化为商业价值，领导团队实现目标'
  },
  ENTP: {
    name: '辩论家',
    traits: ['思维敏捷', '善于辩论', '创新求变', '挑战权威'],
    strengths: ['创意无限', '适应力强', '沟通能力好', '视野开阔'],
    weaknesses: ['缺乏专注', '不善执行', '容易争论', '忽视细节'],
    careers: ['创新顾问', '产品经理', '营销策划', '创业者', '演讲家'],
    aiRole: 'AI创新顾问 - 探索AI应用新场景，推动跨界融合'
  },
  INFJ: {
    name: '提倡者',
    traits: ['理想主义', '富有洞察', '关心他人', '追求意义'],
    strengths: ['同理心强', '创造力丰富', '坚持原则', '善于启发他人'],
    weaknesses: ['过于敏感', '容易倦怠', '完美主义', '不善拒绝'],
    careers: ['心理咨询师', 'UX设计师', '教育工作者', '作家', '社会工作者'],
    aiRole: 'AI伦理专家 - 确保AI技术符合人类价值观，关注技术的社会影响'
  },
  INFP: {
    name: '调停者',
    traits: ['理想主义', '富有创意', '价值驱动', '追求和谐'],
    strengths: ['创造力强', '同理心深', '适应力好', '开放包容'],
    weaknesses: ['过于理想化', '缺乏实际性', '容易情绪化', '不善冲突'],
    careers: ['作家', '艺术家', '心理咨询', '内容创作', 'UX写作'],
    aiRole: 'AI内容创作者 - 利用AI工具进行艺术创作，探索人机协作的创意边界'
  },
  ENFJ: {
    name: '主人公',
    traits: ['富有魅力', '善于激励', '关心他人', '组织能力强'],
    strengths: ['领导力强', '沟通能力好', '同理心深', '善于协调'],
    weaknesses: ['过于理想化', '容易倦怠', '不善拒绝', '忽视自我'],
    careers: ['培训师', 'HR总监', '教育管理', '公关经理', '团队领导'],
    aiRole: 'AI培训专家 - 帮助团队适应AI时代，推动组织数字化转型'
  },
  ENFP: {
    name: '竞选者',
    traits: ['热情洋溢', '创意无限', '善于社交', '追求自由'],
    strengths: ['沟通能力强', '创新思维活跃', '适应力好', '激励他人'],
    weaknesses: ['缺乏专注', '不善规划', '容易分心', '逃避冲突'],
    careers: ['市场营销', '品牌策划', '内容创作', '活动策划', '创业者'],
    aiRole: 'AI营销专家 - 利用AI工具创新营销方式，打造爆款内容'
  },
  ISTJ: {
    name: '物流师',
    traits: ['务实可靠', '注重细节', '遵守规则', '责任心强'],
    strengths: ['执行力强', '组织能力好', '可靠稳定', '注重质量'],
    weaknesses: ['缺乏灵活性', '抗拒变化', '不善创新', '过于严肃'],
    careers: ['会计师', '审计师', '项目管理', '质量控制', '行政管理'],
    aiRole: 'AI质量工程师 - 确保AI系统稳定可靠，建立完善的测试体系'
  },
  ISFJ: {
    name: '守卫者',
    traits: ['细心体贴', '责任心强', '忠诚可靠', '注重传统'],
    strengths: ['耐心细致', '支持他人', '可靠稳定', '记忆力好'],
    weaknesses: ['抗拒变化', '不善表达', '容易倦怠', '过于谦逊'],
    careers: ['护士', '教师', '行政助理', '客户服务', '图书管理员'],
    aiRole: 'AI客服专家 - 优化AI客服系统，提升用户体验和满意度'
  },
  ESTJ: {
    name: '总经理',
    traits: ['组织能力强', '务实高效', '遵守规则', '果断决策'],
    strengths: ['执行力强', '管理能力好', '目标导向', '责任心强'],
    weaknesses: ['缺乏灵活性', '不善变通', '过于强势', '忽视情感'],
    careers: ['运营经理', '项目经理', '行政主管', '供应链管理', '军官'],
    aiRole: 'AI运营经理 - 将AI工具整合到业务流程，提升运营效率'
  },
  ESFJ: {
    name: '执政官',
    traits: ['热心助人', '善于社交', '注重和谐', '责任心强'],
    strengths: ['组织能力强', '善于协调', '关心他人', '执行力好'],
    weaknesses: ['过于在意他人看法', '不善冲突', '缺乏创新', '抗拒变化'],
    careers: ['人力资源', '活动策划', '客户关系', '社区管理', '教师'],
    aiRole: 'AI社区运营 - 建立AI用户社区，促进用户交流和产品改进'
  },
  ISTP: {
    name: '鉴赏家',
    traits: ['动手能力强', '逻辑思维', '独立自主', '灵活应变'],
    strengths: ['问题解决能力强', '技术能力好', '冷静理性', '适应力强'],
    weaknesses: ['不善表达', '缺乏规划', '容易冒险', '不善社交'],
    careers: ['机械工程师', '技术支持', '飞行员', '运动员', '手工艺人'],
    aiRole: 'AI硬件工程师 - 开发AI硬件设备，实现算法的物理落地'
  },
  ISFP: {
    name: '探险家',
    traits: ['艺术气质', '灵活自由', '关心他人', '追求美感'],
    strengths: ['创造力强', '审美能力好', '适应力强', '开放包容'],
    weaknesses: ['缺乏规划', '不善竞争', '容易情绪化', '逃避冲突'],
    careers: ['设计师', '艺术家', '摄影师', '美容师', '厨师'],
    aiRole: 'AI设计师 - 利用AI工具进行视觉设计，探索艺术与技术的融合'
  },
  ESTP: {
    name: '企业家',
    traits: ['行动力强', '善于应变', '冒险精神', '现实主义'],
    strengths: ['执行力强', '适应力好', '沟通能力强', '善于谈判'],
    weaknesses: ['缺乏规划', '冲动行事', '不善深思', '容易冒险'],
    careers: ['销售经理', '创业者', '投资人', '活动策划', '运动员'],
    aiRole: 'AI商务拓展 - 快速识别AI商业机会，推动产品市场化'
  },
  ESFP: {
    name: '表演者',
    traits: ['热情开朗', '善于社交', '享受当下', '富有表现力'],
    strengths: ['沟通能力强', '适应力好', '乐观积极', '善于激励'],
    weaknesses: ['缺乏规划', '不善深思', '容易分心', '逃避冲突'],
    careers: ['演员', '主持人', '活动策划', '销售', '导游'],
    aiRole: 'AI内容主播 - 利用AI工具进行直播和内容创作，打造个人IP'
  },
}

// AI适应力等级
function getAILevel(score: number): {
  level: string
  description: string
  advice: string
} {
  if (score >= 80) {
    return {
      level: 'AI先锋者',
      description: '你是AI时代的领航员！对新技术充满热情，学习能力强，能够快速掌握并应用AI工具。你不仅是使用者，更是推动者。',
      advice: '继续保持对前沿技术的关注，可以考虑深入学习AI原理，甚至参与AI产品开发。你的优势在于快速适应，但要注意不要过度依赖技术而忽视人文关怀。'
    }
  } else if (score >= 60) {
    return {
      level: 'AI实践者',
      description: '你对AI技术持开放态度，愿意尝试新工具来提升效率。虽然不是技术狂热者，但能够理性评估AI的价值并合理应用。',
      advice: '可以多参加AI工具的实践培训，在工作中逐步引入AI辅助。你的优势在于平衡，既不盲目追捧也不抗拒变化。建议多关注行业内的AI应用案例。'
    }
  } else if (score >= 40) {
    return {
      level: 'AI观望者',
      description: '你对AI技术保持谨慎态度，更倾向于观察和等待。虽然认可AI的潜力，但对快速变化感到不安，需要更多时间适应。',
      advice: '不要过于焦虑，AI是工具而非替代品。建议从简单的AI应用开始尝试，比如AI写作助手、智能翻译等。循序渐进地建立信心，你会发现AI其实没那么可怕。'
    }
  } else {
    return {
      level: 'AI新手',
      description: '你对AI技术还比较陌生，可能对快速变化的科技世界感到不适应。这完全正常，每个人都有自己的节奏。',
      advice: '不必强迫自己立刻拥抱所有新技术。可以从日常生活中的AI应用开始了解，比如语音助手、智能推荐等。重要的是保持开放心态，在舒适的节奏中逐步学习。'
    }
  }
}

// 生成详细报告
export function calculateResult(answers: Answer[], userInfo: any) {
  const personality = calculateMBTI(answers)
  const aiScore = calculateAIScore(answers)
  const workPreference = calculateWorkPreference(answers)
  const mbtiInfo = mbtiDescriptions[personality]
  const aiLevel = getAILevel(aiScore)

  return {
    personality,
    aiScore,
    workPreference,
    mbtiInfo,
    aiLevel,
    userInfo,
    timestamp: new Date().toISOString(),
  }
}

// 导出类型定义
export type TestResult = ReturnType<typeof calculateResult>
