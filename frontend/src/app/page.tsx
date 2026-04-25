'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// 12星座数据
const zodiacSigns = [
  { name: '白羊座', icon: '♈', color: '#FF006E', dates: '3.21-4.19' },
  { name: '金牛座', icon: '♉', color: '#8338EC', dates: '4.20-5.20' },
  { name: '双子座', icon: '♊', color: '#3A86FF', dates: '5.21-6.21' },
  { name: '巨蟹座', icon: '♋', color: '#06FFF0', dates: '6.22-7.22' },
  { name: '狮子座', icon: '♌', color: '#FFB627', dates: '7.23-8.22' },
  { name: '处女座', icon: '♍', color: '#00F5A0', dates: '8.23-9.22' },
  { name: '天秤座', icon: '♎', color: '#FF006E', dates: '9.23-10.23' },
  { name: '天蝎座', icon: '♏', color: '#8338EC', dates: '10.24-11.22' },
  { name: '射手座', icon: '♐', color: '#3A86FF', dates: '11.23-12.21' },
  { name: '摩羯座', icon: '♑', color: '#06FFF0', dates: '12.22-1.19' },
  { name: '水瓶座', icon: '♒', color: '#FFB627', dates: '1.20-2.18' },
  { name: '双鱼座', icon: '♓', color: '#00F5A0', dates: '2.19-3.20' },
]

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStart = () => {
    router.push('/onboarding')
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      {/* 主标题 */}
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
          AI时代人格测试
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-2">
          探索你在AI时代的独特人格
        </p>
        <p className="text-sm md:text-base text-gray-400">
          星座 × MBTI × AI使用习惯 = 你的专属人格画像
        </p>
      </div>

      {/* 12星座动画区域 */}
      <div className="relative w-full max-w-4xl h-96 mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          {zodiacSigns.map((sign, index) => {
            const angle = (index * 360) / 12
            const radius = 150
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius

            return (
              <div
                key={sign.name}
                className="absolute animate-float"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl cursor-pointer transition-all hover:scale-125"
                  style={{
                    background: `radial-gradient(circle, ${sign.color}40, transparent)`,
                    boxShadow: `0 0 20px ${sign.color}60`,
                  }}
                  title={`${sign.name} ${sign.dates}`}
                >
                  {sign.icon}
                </div>
              </div>
            )
          })}

          {/* 中心光环 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-blue opacity-20 animate-glow" />
          </div>
        </div>
      </div>

      {/* 开始按钮 */}
      <button
        onClick={handleStart}
        className="neon-button text-lg md:text-xl px-8 py-4 animate-slide-up"
        style={{ animationDelay: '0.3s' }}
      >
        开始测试 →
      </button>

      {/* 底部说明 */}
      <div className="mt-12 text-center text-sm text-gray-400 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <p>📊 60道精心设计的测试题</p>
        <p>🎨 生成专属人格卡片</p>
        <p>🔮 预测不同场景下的人格转变</p>
      </div>
    </main>
  )
}
