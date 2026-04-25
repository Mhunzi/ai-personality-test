# 部署指南 🚀

## Vercel部署（推荐，免费）

Vercel是Next.js官方推荐的部署平台，提供免费额度，非常适合个人项目。

### 步骤1：准备GitHub仓库

1. 在GitHub创建新仓库
2. 将代码推送到GitHub：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/ai-personality-test.git
git push -u origin main
```

### 步骤2：连接Vercel

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择你的仓库 `ai-personality-test`

### 步骤3：配置项目

- **Framework Preset**: Next.js
- **Root Directory**: `frontend`（重要！）
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 步骤4：部署

点击 "Deploy" 按钮，等待1-2分钟。

部署成功后，你会得到一个类似这样的地址：
```
https://ai-personality-test.vercel.app
```

### 步骤5：自定义域名（可选）

在Vercel项目设置中，可以添加自己的域名。

## 其他部署方式

### Netlify部署

1. 访问 https://netlify.com
2. 连接GitHub仓库
3. 配置：
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next`

### 自托管部署

#### 使用Docker

创建 `Dockerfile`：
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install --cache .npm-cache

COPY frontend/ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

构建和运行：
```bash
docker build -t ai-personality-test .
docker run -p 3000:3000 ai-personality-test
```

#### 使用PM2

```bash
cd frontend
npm run build
npm install -g pm2
pm2 start npm --name "ai-test" -- start
pm2 save
pm2 startup
```

### 云服务器部署

#### 阿里云/腾讯云

1. 购买云服务器（1核2G即可）
2. 安装Node.js 18+
3. 克隆代码
4. 安装依赖并构建
5. 使用Nginx反向代理

Nginx配置示例：
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 环境变量配置

如果需要配置环境变量，在Vercel中：

1. 进入项目设置
2. 找到 "Environment Variables"
3. 添加变量（目前项目不需要）

## 性能优化建议

### 1. 启用CDN
Vercel自动提供全球CDN，无需额外配置。

### 2. 图片优化
使用Next.js的Image组件：
```tsx
import Image from 'next/image'
<Image src="/logo.png" width={200} height={200} alt="Logo" />
```

### 3. 代码分割
Next.js自动进行代码分割，无需手动配置。

### 4. 缓存策略
在 `next.config.js` 中配置：
```js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 监控和分析

### Vercel Analytics

在Vercel项目中启用Analytics，可以查看：
- 页面访问量
- 性能指标
- 用户地理分布

### Google Analytics

在 `src/app/layout.tsx` 中添加：
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## 故障排查

### 构建失败

1. 检查Node.js版本（需要18+）
2. 检查TypeScript错误：`npx tsc --noEmit`
3. 查看构建日志

### 页面404

1. 确认Root Directory设置为 `frontend`
2. 检查路由文件是否正确

### 样式丢失

1. 确认Tailwind CSS配置正确
2. 检查 `globals.css` 是否被正确导入

## 更新部署

### 自动部署
推送到GitHub后，Vercel会自动重新部署：
```bash
git add .
git commit -m "Update features"
git push
```

### 手动部署
在Vercel控制台点击 "Redeploy"。

## 成本估算

### Vercel免费额度
- 100GB带宽/月
- 无限部署次数
- 自动HTTPS
- 全球CDN

对于个人项目完全够用！

### 付费升级（可选）
- Pro: $20/月
- 更多带宽和构建时间
- 团队协作功能

## 域名配置

### 购买域名
推荐平台：
- 阿里云：https://wanwang.aliyun.com
- 腾讯云：https://dnspod.cloud.tencent.com
- GoDaddy：https://godaddy.com

### 配置DNS
在域名管理中添加CNAME记录：
```
类型: CNAME
主机记录: @
记录值: cname.vercel-dns.com
```

### 在Vercel添加域名
1. 进入项目设置
2. Domains -> Add Domain
3. 输入你的域名
4. 等待DNS生效（通常5-10分钟）

## 安全建议

1. 启用HTTPS（Vercel自动配置）
2. 设置CSP头部
3. 定期更新依赖：`npm update`
4. 使用环境变量存储敏感信息

## 备份策略

1. 代码备份：GitHub自动保存
2. 用户数据：目前存储在LocalStorage，建议添加后端数据库
3. 定期导出部署配置

---

部署完成后，分享你的链接，让更多人体验AI时代人格测试！🎉
