<h1 align="center">🤖 AI时代人格测试系统 (Cyber-MBTI)</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript" alt="TS">
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel" alt="Vercel">
</p>



<p align="center">
  <strong>融合 MBTI 理论、AI 适应力评估与赛博朋克美学的全栈心理测评系统。</strong>
</p>

<p align="center">
  <a href="#-特色功能">特色功能</a> •
  <a href="#-快速启动">快速启动</a> •
  <a href="#-技术栈">技术栈</a> •
  <a href="#-核心算法">算法逻辑</a> •
  <a href="#-开发计划">路线图</a>
</p>

---

## ✨ 特色功能

### 🌌 赛博星座视觉体验
* **动态交互首页**：基于 CSS 动画实现的 12 星座圆形阵列，支持浮动特效。
* **沉浸式 UI**：霓虹渐变配色方案，专为现代审美设计的赛博朋克视觉风格。

### 📊 深度测评维度 (60 题题库)
* **MBTI 精准画像 (30题)**：深度还原 E/I, S/N, T/F, J/P 四大维度。
* **AI 进化潜力 (20题)**：量化个体在 AI 浪潮中的学习能力与工具掌控欲。
* **职场生态偏好 (10题)**：分析远程办公、团队协同及创新驱动力。

### 📋 工业级分析报告
* **多维报告**：涵盖 16 种人格解析 + 0-100 AI 指数 + 职业方向建议。
* **响应式适配**：完美的移动端与桌面端体验，随时随地开启测评。

---

<p align="center">
  <img width="1280" height="551" alt="74cc35b7924751999b326a70fecfa129_720" src="https://github.com/user-attachments/assets/52fc53ab-a995-463c-aa86-5f67c78b6a19" />
</p>

<p align="center">
  <img width="760" height="5650" alt="64ee9a3be32d5f9840e6838471da0029" src="https://github.com/user-attachments/assets/db24f943-fe23-4fd9-bd6d-d7668ac76049" />
</p>

---
## 🛠️ 快速启动

### 环境要求
* **Node.js**: 18.0.0+
* **Package Manager**: npm / yarn / pnpm

### 部署步骤
```bash
# 1. 克隆项目
git clone [https://github.com/YourUsername/ai-personality-test.git](https://github.com/YourUsername/ai-personality-test.git)
cd ai-personality-test/frontend

# 2. 安装依赖 (推荐使用缓存加速)
npm install --cache .npm-cache

# 3. 开启开发模式
npm run dev
```
> 访问 [http://localhost:3000](http://localhost:3000) 即可预览。

---

## 🏗️ 技术栈

| 领域 | 技术选型 |
| :--- | :--- |
| **核心框架** | **Next.js 14** (App Router) |
| **开发语言** | **TypeScript** (强类型保障) |
| **样式方案** | **Tailwind CSS** + Framer Motion |
| **状态管理** | React Hooks + LocalStorage |
| **部署环境** | Vercel |

---

## 📁 项目结构

```text
frontend/
├── src/
│   ├── app/            # Next.js 14 路由 (首页、测评、报告)
│   ├── data/           # 核心题库 (questions.ts)
│   ├── lib/            # 核心算法 (人格计算器、AI 评分逻辑)
│   └── types/          # 全局类型定义
└── public/             # 静态资源 (星座图标、背景图)
```

---

## 🤖 AI 适应力模型

根据 20 项核心指标，系统将用户划分为四个进化等级：

| 等级 | 评分区间 | 描述 |
| :--- | :--- | :--- |
| **AI 先锋** | 80 - 100 | 极高的技术敏锐度，擅长将 AI 转化为生产力。 |
| **AI 探索者** | 60 - 79 | 对新技术持开放态度，正在积极寻找应用场景。 |
| **AI 观望者** | 40 - 59 | 保持关注，但在工具实践上相对谨慎。 |
| **AI 新手** | 0 - 39 | 刚开始触及 AI 概念，需要系统性的认知引导。 |

---

## 🚀 路线图 (Roadmap)

- [x] **Phase 1**: 核心算法与 60 题题库构建。
- [x] **Phase 2**: 赛博朋克风星座动画首页实现。
- [ ] **Phase 3**: 基于 Canvas 的一键分享人格卡片生成。
- [ ] **Phase 4**: 引入多轮测试数据的历史趋势分析。

---

## 🤝 贡献与反馈

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 开启 Pull Request

---

## 📄 许可证

基于 **MIT License** 协议开源。

<p align="right">(<a href="#-ai时代人格测试系统-🤖✨">回到顶部</a>)</p>
```
