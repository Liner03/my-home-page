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
  "projects": [...],    // 项目列表
  "notes": [...]        // 笔记列表
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

#### 3. projects (项目列表)

项目数组，每个项目包含：

```json
{
  "title": "项目标题",
  "description": "项目简短描述",
  "tech": ["技术1", "技术2", "技术3"],
  "details": {
    "role": "您在项目中的角色",
    "problem": "项目要解决的问题",
    "solution": "您的解决方案",
    "outcome": "项目成果"
  }
}
```

#### 4. notes (笔记列表)

笔记数组，每个笔记包含：

```json
{
  "id": 1,
  "content": "笔记内容",
  "category": "inspiration",
  "timestamp": "2 hours ago"
}
```

**支持的分类 (category)：**
- `todo` - 待办事项
- `learning` - 学习笔记
- `inspiration` - 灵感想法
- `project` - 项目笔记
- `secure` - 安全/敏感信息（会显示模糊效果）

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
