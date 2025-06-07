# HiDream 文生图生成器 🚀

这是一个基于 [HiDream 模型 API (chutes.ai)](https://chutes.ai) 的文本生成图像网站，支持部署至 Vercel，并且具备历史记录与图像下载功能。

## 🧠 功能亮点
- 支持中英文提示词
- 历史记录本地保存
- 一键下载生成图像
- 使用 Next.js + shadcn/ui

## 🚀 一键部署

点击下方按钮立即部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/yourname/hidream-vercel-template)

## 🛠️ 本地开发

```bash
npm install
npx shadcn-ui@latest init
npx shadcn-ui@latest add input button card
```

然后创建 `.env.local` 文件，并填入你的 API 密钥：

```env
CHUTES_API_KEY=your_real_key_here
```

启动开发环境：

```bash
npm run dev
```
