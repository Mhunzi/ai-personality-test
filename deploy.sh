#!/bin/bash

echo "================================"
echo "  AI人格测试系统 - 快速部署"
echo "================================"
echo ""

# 检查是否已经初始化git
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
    echo "✅ Git初始化完成"
    echo ""
fi

# 添加所有文件
echo "📝 添加文件到Git..."
git add .
echo "✅ 文件添加完成"
echo ""

# 创建提交
echo "💾 创建提交..."
git commit -m "AI人格测试系统 - 准备部署"
echo "✅ 提交创建完成"
echo ""

# 提示用户输入GitHub仓库地址
echo "🔗 请在GitHub创建新仓库："
echo "   1. 访问 https://github.com/new"
echo "   2. 仓库名填：ai-personality-test"
echo "   3. 设置为Public（公开）"
echo "   4. 不要勾选任何初始化选项"
echo "   5. 点击Create repository"
echo ""
echo "创建完成后，复制仓库地址（格式：https://github.com/你的用户名/ai-personality-test.git）"
echo ""
read -p "请粘贴你的GitHub仓库地址: " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ 未输入仓库地址，退出"
    exit 1
fi

# 添加远程仓库
echo ""
echo "🔗 关联远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "$repo_url"
echo "✅ 远程仓库关联完成"
echo ""

# 推送代码
echo "🚀 推送代码到GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "================================"
    echo "  ✅ 代码推送成功！"
    echo "================================"
    echo ""
    echo "📋 下一步："
    echo "1. 访问 https://vercel.com"
    echo "2. 用GitHub账号登录"
    echo "3. 点击 'Add New...' → 'Project'"
    echo "4. 选择 'ai-personality-test' 仓库"
    echo "5. ⚠️ 重要：Root Directory 设置为 'frontend'"
    echo "6. 点击 'Deploy'"
    echo "7. 等待2-3分钟，获取你的网站链接"
    echo ""
    echo "🎉 部署完成后，你就可以分享链接给朋友了！"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "1. GitHub仓库地址是否正确"
    echo "2. 是否有权限推送到该仓库"
    echo "3. 网络连接是否正常"
    echo ""
fi
