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
- 📡 **RSS 订阅** - 动态生成的 RSS feed 支持

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
   cp src/data/portfolio-data.example.json public/data/portfolio-data.json
   ```
   然后编辑 `public/data/portfolio-data.json` 文件，填入你的个人信息。

4. 启动开发服务器：
   ```bash
   npm run dev
   ```

5. 在浏览器中打开 http://localhost:4200

### 生产环境运行

如需运行带有动态 RSS feed 的完整功能服务器：

```bash
npm run build
npm start
```

服务器将在 http://localhost:4200 启动，RSS feed 可通过 http://localhost:4200/feed.xml 访问。

## 📝 配置你的作品集

### 快速配置

所有内容都可以通过编辑 `public/data/portfolio-data.json` 来自定义：

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
    "githubUsername": "你的GitHub用户名",
    "skills": ["技能1", "技能2"]
  },
  "websites": [...],
  "notes": [...]
}
```

详细配置说明请查看 [public/data/README.md](public/data/README.md)

### 配置项包括

- ✅ 个人信息（姓名、头像、职位、简介）
- ✅ 社交链接（GitHub、网站、邮箱）
- ✅ GitHub 贡献日历（自动获取）
- ✅ 技能标签
- ✅ 网站链接展示（可跳转到外部网站）
- ✅ 笔记/文章（支持分类和 RSS 订阅）

## 🏗️ 项目架构

### 技术栈

- **框架**: Angular 20.3.0
- **语言**: TypeScript 5.8.2
- **样式**: TailwindCSS
- **构建工具**: Vite 6.2.0 + Angular CLI
- **状态管理**: Angular Signals
- **响应式**: RxJS 7.8.2
- **服务端**: Express.js 4.18+ (用于动态 RSS)

### 目录结构

```
my-home-page/
├── public/                 # 静态资源目录
│   └── data/              # 数据配置
│       ├── portfolio-data.example.json  # 示例配置
│       ├── portfolio-data.json          # 你的配置（不会被提交）
│       └── README.md                    # 配置说明
├── src/
│   ├── components/        # 组件目录
│   │   ├── home/         # 首页组件
│   │   ├── about/        # 关于页面（含GitHub日历）
│   │   ├── websites/     # 网站链接展示
│   │   └── notes/        # 笔记/文章功能
│   ├── data.service.ts   # 数据服务
│   └── app.component.ts  # 根组件
├── scripts/              # 工具脚本
│   └── generate-rss.js  # RSS 生成脚本
├── server.js            # Express 服务器（动态 RSS）
├── index.html           # HTML 入口
├── package.json         # 依赖配置
└── README.md            # 项目说明
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

开发服务器将在 http://localhost:4200 启动（仅前端，不包含 RSS 功能）。

### 生产构建

```bash
npm run build
```

构建产物将输出到 `./dist` 目录。

### 生产服务器

启动完整功能服务器（包含动态 RSS）：

```bash
npm run serve
```

或分步执行：

```bash
npm run build
npm start
```

服务器将在 http://localhost:4200 启动。

### 环境变量

可以通过环境变量配置服务器：

```bash
PORT=3000 SITE_URL=https://yoursite.com npm start
```

- `PORT`: 服务器端口（默认 4200）
- `SITE_URL`: 网站 URL（用于 RSS feed）
- `SITE_TITLE`: RSS feed 标题
- `SITE_DESCRIPTION`: RSS feed 描述
- `AUTHOR_EMAIL`: RSS feed 作者邮箱

## 🎨 自定义样式

项目使用 TailwindCSS，主要样式定义在 `index.html` 中：

- 玻璃态效果
- 霓虹发光
- 动画效果
- 响应式布局

你可以根据需要修改这些样式来匹配你的品牌色。

## 🔧 开发说明

### 添加新网站链接

编辑 `public/data/portfolio-data.json`，在 `websites` 数组中添加：

```json
{
  "title": "网站名称",
  "description": "网站描述",
  "url": "https://example.com",
  "icon": "🌐",
  "tags": ["标签1", "标签2"]
}
```

### 添加新笔记/文章

在 `notes` 数组中添加：

```json
{
  "id": 唯一ID,
  "title": "文章标题",
  "description": "文章简短描述",
  "content": "文章完整内容",
  "category": "inspiration",
  "timestamp": "2025-01-15T10:30:00Z",
  "url": "https://external-link.com"
}
```

**分类说明：**
- `inspiration` - 灵感想法
- `todo` - 待办事项
- `learning` - 学习笔记
- `project` - 项目笔记
- `secure` - 安全信息（显示模糊，不包含在 RSS 中）

分类按钮会根据数据中实际存在的分类自动生成。

### RSS 订阅

访问 `/feed.xml` 获取 RSS feed。RSS feed 会实时从数据文件生成，包含所有非 `secure` 类别的笔记，并按分类组织。

## 📄 许可证

MIT

## 🙋 支持

如有问题，请提交 issue 或查看详细文档。

## 📚 相关链接

- [Angular 文档](https://angular.dev)
- [TailwindCSS 文档](https://tailwindcss.com)
- [配置说明](public/data/README.md)

---

使用 ❤️ 和 Angular 构建
