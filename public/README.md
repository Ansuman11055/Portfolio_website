
<p align="center">
	<img src="https://img.shields.io/badge/Public%20Assets-Folder-blue?style=for-the-badge&logo=files" />
</p>

# 🗂️ Public Assets Guide

This folder contains all static assets used in the portfolio website, such as images and 3D models.

---

## 👤 Profile Image

<p align="center">
	<img src="https://user-images.githubusercontent.com/placeholder/profile-circle.png" width="120" style="border-radius: 50%; box-shadow: 0 0 20px #00d4ff;" alt="Profile Example" />
</p>

**How to add your profile photo:**

```mermaid
flowchart LR
		A[Take/Choose a Profile Photo] --> B[Rename to profile.jpg]
		B --> C[Place in public/ folder]
		C --> D[Displayed in About Section]
```

- Name the file **exactly**: `profile.jpg`
- Format: JPG/JPEG
- Recommended size: **800x800px** or higher
- Center your face in the image

The About section will display this image in a circular, glowing neon frame.

---

## 📦 3D Models

Place any 3D models (GLB, GLTF, etc.) in the `public/models/` folder.

```mermaid
flowchart TD
		A[Download/Export 3D Model] --> B[Place in public/models/]
		B --> C[Used in 3D Components]
```

---

## 📝 Asset Usage Tips

- Use optimized images for faster load times
- Keep filenames lowercase and descriptive
- Remove unused assets to keep the folder clean

---

<p align="center">
	<b>Every asset tells your story visually!</b> 🎨
</p>
