# 快速启动指南 ⚡

## 第一次使用？跟着这个指南5分钟启动项目！

### 步骤1：检查环境 ✅

打开命令行，检查Node.js版本：
```bash
node -v
```
应该显示 v18.0.0 或更高版本。如果没有安装，请访问 https://nodejs.org 下载安装。

### 步骤2：进入项目目录 📁

```bash
cd ai-personality-test/frontend
```

### 步骤3：安装依赖 📦

```bash
npm install --cache .npm-cache
```

这一步会下载所有需要的包，大约需要1-2分钟。

### 步骤4：启动开发服务器 🚀

```bash
npm run dev
```

看到这样的输出就成功了：
```
✓ Ready in 8.6s
- Local:        http://localhost:3000
```

### 步骤5：打开浏览器 🌐

访问：http://localhost:3000

你会看到炫酷的星座动画首页！

## 常见问题 ❓

### Q: 端口3000被占用怎么办？
A: Next.js会自动使用3001端口，按照终端提示的地址访问即可。

### Q: npm install报错EPERM？
A: 使用本地缓存目录：
```bash
npm install --cache .npm-cache
```

### Q: 页面打不开？
A: 检查：
1. 开发服务器是否正在运行
2. 浏览器地址是否正确
3. 防火墙是否阻止了本地访问

### Q: 修改代码后没有生效？
A: Next.js支持热更新，保存文件后会自动刷新。如果没有，手动刷新浏览器（Ctrl+R）。

## 开发命令 🛠️

```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run type-check
# 或
npx tsc --noEmit

# 生产构建
npm run build

# 启动生产服务器
npm start
```

## 项目结构速览 📂

```
frontend/
├── src/app/              # 页面文件
│   ├── page.tsx         # 首页（星座动画）
│   ├── onboarding/      # 数据采集
│   ├── test/            # 答题页面
│   └── result/          # 结果报告
├── src/data/            # 数据文件
│   └── questions.ts     # 60道题库
├── src/lib/             # 工具函数
│   └── calculator.ts    # 计算逻辑
└── src/types/           # 类型定义
```

## 下一步 🎯

1. 浏览代码，了解项目结构
2. 尝试修改样式或文案
3. 添加新功能
4. 部署到Vercel

## 需要帮助？ 💬

- 查看完整文档：README.md
- 提交Issue：GitHub Issues
- 查看Next.js文档：https://nextjs.org/docs

祝你开发愉快！🎉
