# GoEat App

Ứng dụng quản trị xây dựng bằng Next.js (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Refine và Supabase. Bao gồm Page Builder, Schema Editor, RBAC và các trang quản trị mẫu.

## Công nghệ chính

- **Next.js 15 (App Router)**
- **React 19**, **TypeScript 5**
- **Tailwind CSS 4**, **shadcn/ui**
- **Refine** (core, nextjs-router, react-hook-form)
- **Supabase** (Auth, Database)

## Yêu cầu hệ thống

- Node.js: khuyến nghị >= 20 LTS (Node 18 vẫn chạy được nhưng Supabase cảnh báo deprecated)
- npm 10+ (hoặc dùng nvm để quản lý phiên bản Node)

## Cài đặt nhanh

1) Cài phiên bản Node khuyến nghị (nếu dùng nvm):
```bash
nvm install --lts=hydrogen
nvm use --lts=hydrogen
nvm alias default lts/hydrogen
```

2) Cài dependencies (do tương thích React 19/Refine, dùng cờ legacy peer deps):
```bash
npm ci --legacy-peer-deps
```

3) Tạo file `.env.local` tại thư mục gốc:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server-side (dùng cho script & tác vụ admin)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Tuỳ chọn cho script setup super admin
SUPER_ADMIN_EMAIL=admin@goeat.vn
SUPER_ADMIN_PASSWORD=admin123
SUPER_ADMIN_ROLE=SUPER_ADMIN
```

4) Thiết lập cơ sở dữ liệu (RBAC):
```bash
npm run setup-db
```
Script sẽ hiển thị nội dung SQL từ `docs/sql/rbac-setup.sql`. Vào Supabase Dashboard → SQL Editor → dán SQL → Run. Kiểm tra các bảng/func đã tạo (`roles`, `resources`, `actions`, …).

5) Tạo tài khoản Super Admin (tuỳ chọn nhưng nên làm):
```bash
npm run setup-super-admin
```
Script tạo user trong Supabase Auth, profile trong bảng `users`, role `SUPER_ADMIN` và gán role cho user.

6) (Tuỳ chọn) Thêm một số resources còn thiếu theo mẫu:
```bash
npx tsx scripts/add-missing-resources.ts
```

7) Chạy dev:
```bash
npm run dev
```
Mở `http://localhost:3000`.

## Lệnh npm

- `npm run dev`: chạy development server (Turbopack)
- `npm run build`: build production
- `npm start`: chạy production server
- `npm run lint`: chạy ESLint
- `npm run setup-db`: hiển thị và hướng dẫn chạy SQL thiết lập RBAC
- `npm run setup-super-admin`: tạo Super Admin, profile và gán role
- `npm run run-sql`: chạy SQL (tham khảo trong `scripts/`)
- `npm run run-sql-safe`: chạy SQL ở chế độ an toàn
- `npm run run-sql-manual`: hỗ trợ thao tác SQL thủ công

Lưu ý: build đang cấu hình bỏ qua lỗi type và lint để không chặn CI/CD:

- `next.config.ts` có `typescript.ignoreBuildErrors = true` và `eslint.ignoreDuringBuilds = true`.

## Cấu trúc dự án (tóm tắt)

```
src/
├─ app/
│  ├─ (auth)/login/              # Trang đăng nhập
│  ├─ (dashboard)/
│  │  ├─ dashboard/              # Dashboard
│  │  ├─ dynamic-base/           # Trang demo render động
│  │  ├─ page-builder/           # Page Builder
│  │  ├─ resources/              # Quản lý Resources
│  │  ├─ roles/                  # Quản lý Roles
│  │  ├─ schema-editor/          # Schema Editor
│  │  ├─ settings/               # Cài đặt
│  │  └─ users/                  # Quản lý Users
│  └─ api/                       # API routes (products, resources, users, ...)
├─ components/
│  ├─ base/                      # Renderers (table/form/page)
│  ├─ builder/                   # UI Page Builder
│  ├─ layout/                    # Layout chính
│  ├─ schema/                    # Trình chỉnh sửa schema
│  └─ ui/                        # shadcn/ui
├─ contexts/                     # Language, Permission, User
├─ lib/                          # Supabase, Refine, utils, resources
└─ types/                        # Kiểu dữ liệu (RBAC, schema, apps)
```

## Các tuyến trang chính

- `/login` — Đăng nhập Supabase
- `/dashboard` — Bảng điều khiển
- `/page-builder` — Trình tạo trang (kéo thả, cấu hình API/schema/UI)
- `/schema-editor` — Trình chỉnh sửa schema dữ liệu
- `/resources` — Quản lý tài nguyên hệ thống (menu/pages/actions)
- `/roles` — Quản lý vai trò
- `/settings` — Cài đặt
- `/users` — Quản lý người dùng

## Supabase & Quyền truy cập (RBAC)

- File SQL: `docs/sql/rbac-setup.sql` (tham khảo thêm `docs/RBAC.md`, `docs/RBAC_SETUP.md`, `docs/SUPER_ADMIN_SETUP.md`).
- Client phía trình duyệt: `src/lib/supabase.ts` và `src/lib/refine.tsx`.
- Provider: `src/app/layout.tsx` bọc `PermissionProvider`, `LanguageProvider`, `ThemeProvider`, `UserProvider`.

## Ghi chú kỹ thuật

- React 19 kết hợp một số thư viện (Refine) có peerDeps cho React 17/18, vì vậy nên cài deps bằng:
  ```bash
  npm ci --legacy-peer-deps
  ```
- Supabase cảnh báo Node <= 18 sắp ngừng hỗ trợ. Khuyến nghị dùng Node 20 LTS.
- Production build bỏ qua lỗi type/lint (xem `next.config.ts`). Chạy kiểm tra thủ công khi cần: `npm run lint`.

## Khắc phục sự cố (Troubleshooting)

- Lỗi cài đặt peer deps:
  ```bash
  npm ci --legacy-peer-deps
  ```
- Lỗi "Supabase is not configured": kiểm tra `.env.local` đã set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, và cho script server-side `SUPABASE_SERVICE_ROLE_KEY`.
- Không truy cập được trang sau đăng nhập: đảm bảo đã tạo Super Admin và bảng/role đã có (chạy `npm run setup-db` và `npm run setup-super-admin`).

## Tài liệu thêm

- Thư mục `docs/` chứa mô tả hệ thống, hướng dẫn RBAC, và các ghi chú đặc thù tính năng.

---

Made with ❤️ using Next.js, Refine, Supabase và shadcn/ui.