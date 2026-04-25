'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ZodiacSign } from '@/types'

// 星座计算函数
function getZodiacSign(month: number, day: number): ZodiacSign {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '白羊座'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '金牛座'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return '双子座'
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return '巨蟹座'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '狮子座'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '处女座'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return '天秤座'
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return '天蝎座'
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return '射手座'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '摩羯座'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '水瓶座'
  return '双鱼座'
}

export default function OnboardingPage() {
  const router = useRouter()
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [zodiac, setZodiac] = useState<ZodiacSign | ''>('')

  const handleDateChange = (m: string, d: string) => {
    setMonth(m)
    setDay(d)

    if (m && d) {
      const monthNum = parseInt(m)
      const dayNum = parseInt(d)
      if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31) {
        const sign = getZodiacSign(monthNum, dayNum)
        setZodiac(sign)
      }
    }
  }

  const handleStart = () => {
    if (!gender || !month || !day) {
      alert('请完成所有必填项')
      return
    }

    const userInfo = {
      gender,
      month: parseInt(month),
      day: parseInt(day),
      zodiac: zodiac as ZodiacSign,
    }

    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    router.push('/test')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-md">
        {/* 标题 */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold mb-2 gradient-text">开始你的探索</h1>
          <p className="text-gray-400">告诉我们一些关于你的信息</p>
        </div>

        {/* 表单 */}
        <div className="glass-card p-8 space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {/* 性别选择 */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              性别 <span className="text-cyber-pink">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'male', label: '男生', emoji: '👨' },
                { value: 'female', label: '女生', emoji: '👩' },
                { value: 'other', label: '其他', emoji: '🌈' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGender(option.value as any)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    gender === option.value
                      ? 'border-cyber-pink bg-cyber-pink/20 scale-105'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-3xl mb-1">{option.emoji}</div>
                  <div className="text-sm">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 生日选择 */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              生日 <span className="text-cyber-pink">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={month}
                onChange={(e) => handleDateChange(e.target.value, day)}
                className="bg-gray-800/50 border-2 border-gray-700 rounded-lg px-4 py-3 focus:border-cyber-blue focus:outline-none transition-colors"
              >
                <option value="">月份</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}月
                  </option>
                ))}
              </select>
              <select
                value={day}
                onChange={(e) => handleDateChange(month, e.target.value)}
                className="bg-gray-800/50 border-2 border-gray-700 rounded-lg px-4 py-3 focus:border-cyber-blue focus:outline-none transition-colors"
              >
                <option value="">日期</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}日
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 星座显示 */}
          {zodiac && (
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-cyber-pink/20 to-cyber-purple/20 border border-cyber-pink/30 animate-slide-up">
              <div className="text-sm text-gray-400 mb-1">你的星座是</div>
              <div className="text-2xl font-bold gradient-text">{zodiac}</div>
            </div>
          )}

          {/* 开始按钮 */}
          <button
            onClick={handleStart}
            disabled={!gender || !month || !day}
            className="neon-button w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            开始测试 →
          </button>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-6 text-sm text-gray-500 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p>⏱️ 预计用时：8-10分钟</p>
          <p>📝 共60道题目</p>
        </div>
      </div>
    </main>
  )
}
