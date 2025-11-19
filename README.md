<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Futuristic AI-Powered Portfolio

一个现代化、未来感十足的个人作品集网站，采用 Angular 20.3.0 和最新的前端技术构建。

## ✨ 特性

- 🎨 **未来主义设计** - 玻璃态效果 + 霓虹美学
- 🚀 **最新 Angular** - 使用 Angular 20.3.0 和 Signals API
- ⚡ **高性能** - Zoneless 变更检测，Vite 构建
- 📱 **响应式设计** - 完美适配各种设备
- 🎯 **数据驱动** - 所有内容通过 JSON 配置
- 🔧 **易于定制** - 无需修改代码，只需编辑配置文件

## 🚀 快速开始

### 前置要求

- Node.js (v18+)
- npm

### 安装

1. 克隆项目：
   ```bash
   git clone <repository-url>
   cd my-home-page
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 配置你的数据：
   ```bash
   cp src/data/portfolio-data.example.json src/data/portfolio-data.json
   ```
   然后编辑 `src/data/portfolio-data.json` 文件，填入你的个人信息。

4. 启动开发服务器：
   ```bash
   npm run dev
   ```

5. 在浏览器中打开 http://localhost:3000

## 📝 配置你的作品集

### 快速配置

所有内容都可以通过编辑 `src/data/portfolio-data.json` 来自定义：

```json
{
  "home": {
    "name": "你的名字",
    "avatarUrl": "头像URL",
    "socialLinks": { ... }
  },
  "about": {
    "name": "你的名字",
    "title": "你的职位",
    "description": "个人简介",
    "skills": ["技能1", "技能2"]
  },
  "projects": [...],
  "notes": [...]
}
```

详细配置说明请查看 [src/data/README.md](src/data/README.md)

### 配置项包括

- ✅ 个人信息（姓名、头像、职位）
- ✅ 社交链接（GitHub、网站、邮箱）
- ✅ 技能标签
- ✅ 项目展示（包含详细信息）
- ✅ 笔记/想法

## 🏗️ 项目架构

### 技术栈

- **框架**: Angular 20.3.0
- **语言**: TypeScript 5.8.2
- **样式**: TailwindCSS
- **构建工具**: Vite 6.2.0 + Angular CLI
- **状态管理**: Angular Signals
- **响应式**: RxJS 7.8.2

### 目录结构

```
my-home-page/
├── src/
│   ├── components/          # 组件目录
│   │   ├── home/           # 首页组件
│   │   ├── about/          # 关于页面
│   │   ├── projects/       # 项目展示
│   │   └── notes/          # 笔记功能
│   ├── services/           # 服务层
│   │   └── data.service.ts # 数据服务
│   ├── data/               # 数据配置
│   │   ├── portfolio-data.example.json  # 示例配置
│   │   └── portfolio-data.json          # 你的配置（不会被提交）
│   └── app.component.ts    # 根组件
├── index.html              # HTML 入口
├── package.json            # 依赖配置
└── README.md               # 项目说明
```

### 核心特性

- **Zoneless 变更检测** - 使用最新的 Angular 特性，无需 Zone.js
- **Signals API** - 响应式状态管理
- **独立组件** - 所有组件都是 standalone
- **OnPush 策略** - 优化性能
- **数据驱动架构** - 内容与代码分离

## 📦 构建部署

### 开发环境

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

构建产物将输出到 `./dist` 目录。

### 预览构建

```bash
npm run preview
```

## 🎨 自定义样式

项目使用 TailwindCSS，主要样式定义在 `index.html` 中：

- 玻璃态效果
- 霓虹发光
- 动画效果
- 响应式布局

你可以根据需要修改这些样式来匹配你的品牌色。

## 🔧 开发说明

### 添加新项目

编辑 `src/data/portfolio-data.json`，在 `projects` 数组中添加：

```json
{
  "title": "项目名称",
  "description": "项目描述",
  "tech": ["技术1", "技术2"],
  "details": {
    "role": "你的角色",
    "problem": "要解决的问题",
    "solution": "解决方案",
    "outcome": "项目成果"
  }
}
```

### 添加新笔记

在 `notes` 数组中添加：

```json
{
  "id": 唯一ID,
  "content": "笔记内容",
  "category": "inspiration",
  "timestamp": "2 hours ago"
}
```

## 📄 许可证

MIT

## 🙋 支持

如有问题，请提交 issue 或查看详细文档。

## 📚 相关链接

- [Angular 文档](https://angular.dev)
- [TailwindCSS 文档](https://tailwindcss.com)
- [配置说明](src/data/README.md)

---

使用 ❤️ 和 Angular 构建
