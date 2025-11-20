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
  "notes": [...],       // 笔记列表
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

#### 4. notes (笔记列表)

笔记/文章数组，每个笔记包含：

```json
{
  "id": 1,
  "title": "文章标题",
  "description": "文章简短描述（用于RSS feed和预览）",
  "content": "文章完整内容",
  "category": "inspiration",
  "timestamp": "2025-01-15T10:30:00Z",
  "url": "https://example.com/article"
}
```

**字段说明：**
- `id` - 唯一标识符（数字）
- `title` - 笔记/文章标题
- `description` - 简短描述，在列表中显示
- `content` - 完整内容
- `category` - 分类（见下方）
- `timestamp` - ISO 8601 格式时间戳
- `url` - 可选，外部文章链接

**支持的分类 (category)：**
- `todo` - 待办事项
- `learning` - 学习笔记
- `inspiration` - 灵感想法
- `project` - 项目笔记
- `secure` - 安全/敏感信息（会显示模糊效果，不会包含在RSS中）

**RSS 订阅功能：**
- Notes 页面支持 RSS 订阅
- RSS feed 在运行时动态生成（当点击导航栏的 Notes 按钮时）
- `secure` 类别的笔记不会包含在 RSS 中
- 分类按钮会根据实际 notes 数据中的分类动态生成并去重
- 无需后端服务器或构建时生成

#### 5. rss (RSS 配置)

RSS 订阅源的配置信息：

```json
{
  "siteUrl": "https://example.com",
  "siteTitle": "My Portfolio",
  "siteDescription": "Notes and articles from my portfolio",
  "authorEmail": "author@example.com"
}
```

**字段说明：**
- `siteUrl` - 网站的完整 URL（用于生成 RSS feed 中的链接）
- `siteTitle` - RSS feed 的标题
- `siteDescription` - RSS feed 的描述
- `authorEmail` - 作者邮箱地址（用于 RSS feed 的 managingEditor 字段）

**注意：**
- RSS 配置只需在此文件配置一次，所有相关功能会自动使用这些配置
- RSS feed 在点击导航栏的 Notes 按钮时自动生成
- 如果未配置，系统会使用默认值

## 如何修改

1. 打开 `portfolio-data.json` 文件
2. 修改对应的字段值
3. 保存文件
4. 重新加载网站，更改会自动生效

## 注意事项

- ✅ 确保 JSON 格式正确（可以使用在线 JSON 验证器检查）
- ✅ 图片 URL 需要是可访问的完整 URL
- ✅ 邮箱链接格式：`mailto:your-email@example.com`
- ✅ 笔记的 `id` 必须是唯一的数字
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
