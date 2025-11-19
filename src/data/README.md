# Portfolio Data Configuration

此目录包含作品集网站的所有数据配置文件。

## portfolio-data.json

这是主要的数据配置文件，包含网站的所有内容。您可以通过编辑这个 JSON 文件来自定义您的作品集内容。

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
    "github": "GitHub 链接",
    "website": "个人网站链接",
    "email": "mailto:您的邮箱"
  }
}
```

#### 2. about (关于页面)

```json
{
  "name": "您的名字",
  "avatarUrl": "头像图片URL",
  "title": "您的职位/头衔",
  "description": "个人简介描述",
  "skills": [
    "技能1",
    "技能2",
    ...
  ]
}
```

#### 3. projects (项目列表)

项目数组，每个项目包含：

```json
{
  "title": "项目标题",
  "description": "项目简短描述",
  "tech": ["技术1", "技术2", ...],
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
  "id": 唯一ID（数字）,
  "content": "笔记内容",
  "category": "todo | learning | inspiration | project | secure",
  "timestamp": "时间戳（如：2 hours ago）"
}
```

支持的分类：
- `todo`: 待办事项
- `learning`: 学习笔记
- `inspiration`: 灵感想法
- `project`: 项目笔记
- `secure`: 安全/敏感信息（会显示模糊效果）

## 如何修改

1. 打开 `portfolio-data.json` 文件
2. 修改对应的字段值
3. 保存文件
4. 重新加载网站，更改会自动生效

## 注意事项

- 确保 JSON 格式正确（使用 JSON 验证器检查）
- 图片 URL 需要是可访问的完整 URL
- 社交链接使用 `#` 作为占位符，替换为真实链接
- 邮箱链接格式：`mailto:your-email@example.com`
- 笔记的 `id` 必须是唯一的
