'use client'

import { useState } from 'react'

interface ShareButtonProps {
  title: string
  text: string
  url?: string
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  // Web Share API（移动端原生分享）
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
      } catch (err) {
        console.log('分享取消或失败')
      }
    } else {
      setShowMenu(true)
    }
  }

  // 复制链接
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败', err)
    }
  }

  // 分享到微信（生成二维码）
  const handleWechatShare = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`
    window.open(qrUrl, '_blank')
  }

  // 分享到微博
  const handleWeiboShare = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`
    window.open(weiboUrl, '_blank', 'width=600,height=400')
  }

  // 分享到QQ空间
  const handleQzoneShare = () => {
    const qzoneUrl = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`
    window.open(qzoneUrl, '_blank', 'width=600,height=400')
  }

  // 分享到Twitter
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="relative">
      {/* 主分享按钮 */}
      <button
        onClick={handleNativeShare}
        className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        🎉 分享我的测试结果
      </button>

      {/* 分享菜单（桌面端） */}
      {showMenu && (
        <div className="absolute bottom-full left-0 right-0 mb-4 bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-purple-500/30">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-bold">选择分享方式</h3>
            <button
              onClick={() => setShowMenu(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 复制链接 */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <span className="text-white text-sm">
                {copied ? '已复制!' : '复制链接'}
              </span>
            </button>

            {/* 微信 */}
            <button
              onClick={handleWechatShare}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <span className="text-2xl">💬</span>
              <span className="text-white text-sm">微信</span>
            </button>

            {/* 微博 */}
            <button
              onClick={handleWeiboShare}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <span className="text-2xl">📱</span>
              <span className="text-white text-sm">微博</span>
            </button>

            {/* QQ空间 */}
            <button
              onClick={handleQzoneShare}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
            >
              <span className="text-2xl">🌟</span>
              <span className="text-white text-sm">QQ空间</span>
            </button>

            {/* Twitter */}
            <button
              onClick={handleTwitterShare}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors col-span-2"
            >
              <span className="text-2xl">🐦</span>
              <span className="text-white text-sm">Twitter</span>
            </button>
          </div>
        </div>
      )}

      {/* 更多分享选项按钮（桌面端） */}
      {!showMenu && (
        <button
          onClick={() => setShowMenu(true)}
          className="w-full mt-3 px-8 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300"
        >
          更多分享方式 ▼
        </button>
      )}
    </div>
  )
}
