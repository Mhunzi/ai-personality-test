'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { calculateResult, type TestResult } from '@/lib/calculator'
import type { Answer } from '@/types'
import ShareButton from '@/components/ShareButton'
import html2canvas from 'html2canvas'

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. 先尝试从 URL 参数读取结果（用于分享链接）
    const urlParams = new URLSearchParams(window.location.search)
    const resultParam = urlParams.get('data')

    if (resultParam) {
      try {
        const decodedResult = JSON.parse(decodeURIComponent(resultParam))
        setResult(decodedResult)
        setLoading(false)
        return
      } catch (error) {
        console.error('解析 URL 参数失败:', error)
      }
    }

    // 2. 从localStorage读取答案
    const answersStr = localStorage.getItem('answers')
    const userInfoStr = localStorage.getItem('userInfo')

    if (!answersStr || !userInfoStr) {
      router.push('/onboarding')
      return
    }

    const answers: Answer[] = JSON.parse(answersStr)
    const userInfo = JSON.parse(userInfoStr)

    // 计算结果
    const testResult = calculateResult(answers, userInfo)
    setResult(testResult)
    setLoading(false)

    // 保存结果到localStorage
    localStorage.setItem('lastResult', JSON.stringify(testResult))
  }, [router])

  // 保存卡片为图片
  const handleSaveCard = async () => {
    if (!cardRef.current) return

    setSaving(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1a0b2e',
        scale: 2,
        logging: false,
        useCORS: true,
      })

      // 转换为图片并下载
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `AI人格测试-${result?.personality}-${Date.now()}.png`
          link.click()
          URL.revokeObjectURL(url)
        }
      })
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  // 复制结果链接
  const handleCopyLink = async () => {
    if (!result) return

    const resultUrl = `${window.location.origin}/result?data=${encodeURIComponent(JSON.stringify(result))}`

    try {
      await navigator.clipboard.writeText(resultUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('复制失败:', error)
      alert('复制失败，请重试')
    }
  }

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 text-xl">正在生成你的专属报告...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* 星空背景 */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* 可保存的卡片区域 */}
        <div ref={cardRef}>
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 neon-text">
            你的AI时代人格报告
          </h1>
          <p className="text-cyan-300 text-lg">
            {result.userInfo.gender === 'male' ? '🚹' : '🚺'} {result.userInfo.zodiac} · {result.userInfo.birthday}
          </p>
        </div>

        {/* MBTI人格卡片 */}
        <div className="cyber-card mb-8 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-cyan-400 mb-2">
                {result.personality}
              </h2>
              <p className="text-2xl text-purple-300">{result.mbtiInfo.name}</p>
            </div>
            <div className="text-6xl">🎭</div>
          </div>

          <div className="space-y-6">
            {/* 核心特质 */}
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-3">💫 核心特质</h3>
              <div className="flex flex-wrap gap-2">
                {result.mbtiInfo.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/30 border border-purple-400 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* 优势 */}
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">✨ 你的优势</h3>
              <ul className="space-y-2">
                {result.mbtiInfo.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">▸</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 成长空间 */}
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">🌱 成长空间</h3>
              <ul className="space-y-2">
                {result.mbtiInfo.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">▸</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* AI适应力卡片 */}
        <div className="cyber-card mb-8 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-cyan-400 mb-2">
                AI适应力：{result.aiScore}分
              </h2>
              <p className="text-2xl text-purple-300">{result.aiLevel.level}</p>
            </div>
            <div className="text-6xl">🤖</div>
          </div>

          {/* AI分数进度条 */}
          <div className="mb-6">
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000"
                style={{ width: `${result.aiScore}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">📊 评估</h3>
              <p className="text-gray-300 leading-relaxed">{result.aiLevel.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">💡 建议</h3>
              <p className="text-gray-300 leading-relaxed">{result.aiLevel.advice}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">🎯 AI时代角色</h3>
              <p className="text-purple-300 leading-relaxed font-medium">{result.mbtiInfo.aiRole}</p>
            </div>
          </div>
        </div>

        {/* 工作环境偏好 */}
        <div className="cyber-card mb-8 p-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center">
            <span className="mr-3">💼</span>
            工作环境偏好
          </h2>

          <div className="space-y-6">
            {/* 远程工作倾向 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-lg">🏠 远程工作倾向</span>
                <span className="text-cyan-400 font-bold">{result.workPreference.remote}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${result.workPreference.remote}%` }}
                ></div>
              </div>
            </div>

            {/* 团队协作倾向 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-lg">👥 团队协作倾向</span>
                <span className="text-purple-400 font-bold">{result.workPreference.teamwork}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${result.workPreference.teamwork}%` }}
                ></div>
              </div>
            </div>

            {/* 创新倾向 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-lg">💡 创新倾向</span>
                <span className="text-green-400 font-bold">{result.workPreference.innovation}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${result.workPreference.innovation}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 职业推荐 */}
        <div className="cyber-card mb-8 p-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center">
            <span className="mr-3">🎯</span>
            适合的职业方向
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.mbtiInfo.careers.map((career, index) => (
              <div
                key={index}
                className="p-4 bg-purple-500/20 border border-purple-400/50 rounded-lg hover:bg-purple-500/30 transition-colors"
              >
                <span className="text-lg">{career}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 综合分析 */}
        <div className="cyber-card mb-8 p-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center">
            <span className="mr-3">🔮</span>
            综合分析
          </h2>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              作为<span className="text-cyan-400 font-bold">{result.personality}</span>人格类型的
              <span className="text-purple-400 font-bold">{result.userInfo.zodiac}</span>座，
              你展现出了独特的个性组合。
            </p>

            <p>
              你的AI适应力达到<span className="text-cyan-400 font-bold">{result.aiScore}分</span>，
              属于<span className="text-purple-400 font-bold">{result.aiLevel.level}</span>级别。
              {result.aiScore >= 70 ? '这意味着你能够很好地适应AI时代的变革，善于利用新技术提升效率。' : '建议你多尝试AI工具，逐步建立对新技术的信心。'}
            </p>

            <p>
              在工作环境方面，你
              {result.workPreference.remote > 60 ? '更倾向于远程工作，享受自主安排的自由' : '更适合团队协作环境，在与他人互动中获得能量'}。
              你的创新倾向为<span className="text-green-400 font-bold">{result.workPreference.innovation}%</span>，
              {result.workPreference.innovation > 60 ? '说明你喜欢探索新事物，适合创新型工作' : '说明你更注重稳定和可靠性'}。
            </p>

            <p className="text-cyan-300 font-medium">
              💫 记住：人格类型不是限制，而是帮助你更好地认识自己。在AI时代，保持开放心态和持续学习能力，
              才是最重要的竞争力！
            </p>
          </div>
        </div>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-4 mb-8">
          {/* 分享按钮 */}
          <ShareButton
            title={`我的AI时代人格：${result.personality} - ${result.mbtiInfo.name}`}
            text={`我在AI时代人格测试中是${result.personality}（${result.mbtiInfo.name}），AI适应力${result.aiScore}分！快来测测你的AI时代人格吧！`}
            url={`${typeof window !== 'undefined' ? window.location.origin : ''}/result?data=${encodeURIComponent(JSON.stringify(result))}`}
          />

          {/* 其他操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCopyLink}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
            >
              {copied ? '✅ 已复制链接' : '🔗 复制结果链接'}
            </button>

            <button
              onClick={() => {
                localStorage.clear()
                router.push('/')
              }}
              className="flex-1 px-6 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300"
            >
              🔄 重新测试
            </button>

            <button
              onClick={handleSaveCard}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '⏳ 保存中...' : '💾 保存卡片'}
            </button>
          </div>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>测试时间：{new Date(result.timestamp).toLocaleString('zh-CN')}</p>
          <p className="mt-2">本测试结果仅供参考，不构成专业建议</p>
        </div>
      </div>
    </div>
  )
}
