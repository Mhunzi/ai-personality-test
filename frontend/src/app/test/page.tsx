'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/data/questions'
import type { Answer } from '@/types'

export default function TestPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  useEffect(() => {
    // 检查用户信息
    const userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {
      router.push('/onboarding')
    }
  }, [router])

  const handleAnswer = (optionIndex: number) => {
    if (isAnimating) return

    setSelectedOption(optionIndex)
    setIsAnimating(true)

    // 保存答案
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      optionIndex,
    }
    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    // 延迟后进入下一题
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSelectedOption(null)
        setIsAnimating(false)
      } else {
        // 测试完成，保存答案并跳转到结果页
        localStorage.setItem('answers', JSON.stringify(newAnswers))
        router.push('/result')
      }
    }, 500)
  }

  const handlePrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      setCurrentIndex(currentIndex - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedOption(null)
    }
  }

  if (!currentQuestion) return null

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-3xl">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              第 {currentIndex + 1} / {questions.length} 题
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-blue transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 题目卡片 */}
        <div className="card mb-6 animate-slide-up">
          {/* 分类标签 */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                currentQuestion.category === 'personality'
                  ? 'bg-cyber-pink/20 text-cyber-pink'
                  : currentQuestion.category === 'ai_adaptation'
                  ? 'bg-cyber-blue/20 text-cyber-blue'
                  : 'bg-cyber-cyan/20 text-cyber-cyan'
              }`}
            >
              {currentQuestion.category === 'personality'
                ? '人格测试'
                : currentQuestion.category === 'ai_adaptation'
                ? 'AI适应力'
                : '工作偏好'}
            </span>
          </div>

          {/* 问题 */}
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
            {currentQuestion.question}
          </h2>

          {/* 选项 */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnimating}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                  selectedOption === index
                    ? 'border-cyber-cyan bg-cyber-cyan/20 scale-105'
                    : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                      selectedOption === index
                        ? 'border-cyber-cyan bg-cyber-cyan text-cyber-dark'
                        : 'border-gray-600'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isAnimating}
            className="px-6 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← 上一题
          </button>

          <div className="text-sm text-gray-500">
            {currentIndex === questions.length - 1 ? '最后一题' : '选择答案自动进入下一题'}
          </div>
        </div>
      </div>
    </main>
  )
}
