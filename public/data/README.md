# Portfolio Data Configuration

此目录包含作品集网站的所有数据配置文件。

## 快速开始

**首次使用：**

1. 复制示例文件创建你的配置：
   ```bash
   cp public/data/portfolio-data.example.json public/data/portfolio-data.json
   ```

2. 编辑 `portfolio-data.json` 文件，填入你自己的信息

3. 启动项目查看效果

**注意：** `portfolio-data.json` 已被添加到 `.gitignore`，你的个人数据不会被提交到 Git 仓库。

## 文件说明

- **portfolio-data.example.json** - 示例配置文件（会被提交到 Git）
- **portfolio-data.json** - 你的个人配置文件（不会被提交到 Git）

## 配置文件结构

### 文件结构

```json
{
  "home": { ... },      // 首页数据
  "about": { ... },     // 关于页面数据
  "websites": [...],    // 网站链接列表
  "rss": { ... }        // RSS 配置
}
```

### 配置项说明

#### 1. home (首页)

```json
{
  "name": "您的名字",
  "avatarUrl": "头像图片URL",
  "socialLinks": {
    "github": "https://github.com/yourusername",
    "website": "https://yourwebsite.com",
    "email": "mailto:your-email@example.com"
  }
}
```

#### 2. about (关于页面)

```json
{
  "name": "您的名字",
  "avatarUrl": "头像图片URL",
  "title": "您的职位/头衔",
  "description": "您的个人简介描述",
  "githubUsername": "您的GitHub用户名",
  "skills": [
    "技能1",
    "技能2",
    "技能3"
  ]
}
```

**注意：**
- `githubUsername` 将用于动态获取并显示您的 GitHub 贡献热力图
- 贡献数据从 GitHub API 实时加载，无需配置 token
- 热力图会自动显示过去一年的代码提交活跃度

#### 3. websites (网站链接列表)

网站数组，每个网站包含：

```json
{
  "title": "网站标题",
  "description": "网站简短描述",
  "url": "https://example.com",
  "icon": "🌐",
  "tags": ["标签1", "标签2", "标签3"]
}
```

**字段说明：**
- `title` - 网站名称
- `description` - 网站描述
- `url` - 网站链接（点击卡片时打开）
- `icon` - 可选，用于显示的 emoji 图标
- `tags` - 可选，网站标签数组

#### 4. rss (RSS 配置)

**Notes 页面从 RSS feed 获取内容**

Notes 页面不需要手动配置文章列表，而是从远程 RSS feed 自动获取。只需配置 RSS feed 的 URL：

```json
{
  "feedUrl": "https://example.com/feed.xml",
  "corsProxy": "https://api.allorigins.win/raw?url="
}
```

**字段说明：**
- `feedUrl` - RSS feed 的完整 URL 地址（必填）
- `corsProxy` - CORS 代理服务的 URL 前缀（可选，用于解决跨域问题）

**关于 CORS 跨域问题：**

由于浏览器的同源策略限制，直接从前端获取第三方 RSS feed 可能会遇到 CORS 跨域错误。解决方案：

1. **使用 CORS 代理**（推荐）：配置 `corsProxy` 字段，使用第三方 CORS 代理服务

   常用的 CORS 代理服务：
   - `https://api.allorigins.win/raw?url=` - AllOrigins (推荐)
   - `https://corsproxy.io/?` - CORS Proxy

   示例配置：
   ```json
   {
     "feedUrl": "https://your-blog.com/feed.xml",
     "corsProxy": "https://api.allorigins.win/raw?url="
   }
   ```

2. **RSS feed 支持 CORS**：如果你的 RSS feed 服务器已经配置了 CORS 头，可以不配置 `corsProxy`

   示例配置：
   ```json
   {
     "feedUrl": "https://your-blog.com/feed.xml"
   }
   ```

**功能说明：**
- 当点击导航栏的 Notes 按钮时，自动从配置的 RSS feed URL 获取文章
- RSS feed 应遵循 RSS 2.0 标准格式
- 支持的文章分类（category）：`todo`、`learning`、`inspiration`、`project`、`secure`
- 分类按钮会根据 RSS feed 中的分类自动生成并去重
- 显示加载状态和错误提示
- 无需后端服务器或构建时处理，完全在运行时动态获取

**RSS feed 格式要求：**

您的 RSS feed 应包含以下字段：
- `<title>` - 文章标题
- `<description>` - 文章简短描述
- `<link>` - 文章链接（可选）
- `<pubDate>` - 发布日期（RFC 822 格式）
- `<category>` - 文章分类（todo/learning/inspiration/project/secure）
- `<content:encoded>` - 文章完整内容（可选，使用 CDATA）

示例 RSS feed 结构：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>My Blog</title>
    <description>My articles and notes</description>
    <link>https://example.com</link>
    <item>
      <title>Article Title</title>
      <description>Short description</description>
      <link>https://example.com/article</link>
      <pubDate>Mon, 15 Jan 2025 10:30:00 GMT</pubDate>
      <category>learning</category>
      <content:encoded><![CDATA[Full article content here]]></content:encoded>
    </item>
  </channel>
</rss>
```

## 如何修改

1. 打开 `portfolio-data.json` 文件
2. 修改对应的字段值
3. 保存文件
4. 重新加载网站，更改会自动生效

## 注意事项

- ✅ 确保 JSON 格式正确（可以使用在线 JSON 验证器检查）
- ✅ 图片 URL 需要是可访问的完整 URL
- ✅ 邮箱链接格式：`mailto:your-email@example.com`
- ✅ RSS feed URL 必须是可访问的完整 URL，并返回有效的 RSS 2.0 格式内容
- ✅ 如果要使用本地图片，建议将图片放在 `public` 文件夹中

## 图片建议

推荐使用以下免费图片服务：
- [Unsplash](https://unsplash.com/) - 高质量免费图片
- [Picsum](https://picsum.photos/) - 随机占位图片
- [Gravatar](https://gravatar.com/) - 头像服务

## 常见问题

**Q: 修改后页面没有更新？**
- 刷新浏览器（Ctrl/Cmd + R）
- 清除浏览器缓存后重试

**Q: 数据会被提交到 Git 吗？**
- 不会。`portfolio-data.json` 已经被添加到 `.gitignore`，只有示例文件会被提交

**Q: 如何恢复默认配置？**
- 重新复制示例文件：`cp public/data/portfolio-data.example.json public/data/portfolio-data.json`
