# 如何添加真实的水晶手串图片

## 方法一：使用本地图片（推荐）

1. 在 `public` 目录下创建 `images` 文件夹
2. 将你的水晶手串图片放入 `public/images/` 目录
3. 在 `src/data/products.js` 中修改图片路径：

```javascript
{
  id: 1,
  name: "紫水晶能量手链",
  image: "/images/purple-crystal.jpg",  // 使用你的图片文件名
  ...
}
```

## 方法二：使用在线图片

直接在 `src/data/products.js` 中使用图片URL：

```javascript
{
  id: 1,
  name: "紫水晶能量手链",
  image: "https://your-image-url.com/crystal.jpg",
  ...
}
```

## 建议的图片规格

- **尺寸**: 400x400px 或更大的正方形
- **格式**: JPG 或 PNG
- **背景**: 建议使用纯色或透明背景
- **主体**: 水晶手串应居中显示

## 示例文件结构

```
public/
  ├── images/
  │   ├── purple-crystal.jpg    # 紫水晶手链
  │   ├── yellow-crystal.jpg    # 黄水晶摆件
  │   ├── pink-crystal.jpg      # 粉水晶
  │   └── black-obsidian.jpg    # 黑曜石
```

## 当前使用的图片

目前使用的是 Unsplash 的示例图片，你可以：
1. 保持使用在线图片（需要网络连接）
2. 下载这些图片到本地使用
3. 替换为你自己的商品图片

