# Xiangyu-ai
# 湘遇AI · 与红色人物对话

一个基于 AI 技术的红色文化教育项目，让用户能够与湖湘历史人物进行跨时空对话。

## 功能特点

- 🗣️ **人物对话**：与青年毛泽东、蔡和森、向警予三位湖湘红色人物进行 AI 对话
- 📖 **预设问题**：针对每位人物提供精选的历史问题，快速了解人物生平
- 🎨 **精美界面**：红色主题设计，响应式布局，支持移动端访问
- 🔄 **即时交互**：实时对话体验，支持自由提问和预设问题两种模式

## 技术栈

- **前端**：原生 HTML/CSS/JavaScript
- **后端**：Vercel Serverless Functions (Node.js)
- **AI 引擎**：DeepSeek API
- **部署**：Vercel

## 快速开始

### 环境要求

- Node.js >= 18.x
- Vercel CLI (可选)

### 本地开发

1. **克隆项目**

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   echo "DEEPSEEK_API_KEY=your_api_key" > .env.local
   ```
   在 [DeepSeek 平台](https://platform.deepseek.com/) 获取 API Key。

4. **启动开发服务器**
   ```bash
   npx vercel dev
   ```

5. **访问应用**
   打开浏览器访问 `http://localhost:3000`

### 部署到 Vercel

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel --prod
   ```

4. **配置环境变量**
   在 Vercel 控制台设置环境变量：
   ```
   DEEPSEEK_API_KEY=your_api_key
   ```

## 项目结构

```
.
├── index.html          # 主页面（前端逻辑）
├── api/
│   └── chat.js         # 后端 API（代理 DeepSeek 请求）
└── README.md           # 项目说明
```

## API 接口

### POST /api/chat

请求体：
```json
{
  "character": "毛泽东",
  "systemPrompt": "角色设定描述...",
  "userMessage": "用户提问内容"
}
```

响应体：
```json
{
  "reply": "AI 回复内容"
}
```

## 人物配置

当前支持三位湖湘红色人物：

| 人物 | 时期 | 主题 |
|------|------|------|
| 毛泽东 | 青年时期（1913-1921） | 实事求是、心忧天下 |
| 蔡和森 | 留法勤工俭学时期 | 理论求索、建党先驱 |
| 向警予 | 妇女运动时期 | 妇女解放、革命英烈 |

## 注意事项

⚠️ AI 生成内容仅供参考，请以权威史料为准。

## 许可证

本项目为研究性学习公益项目，仅供学习和研究使用。
