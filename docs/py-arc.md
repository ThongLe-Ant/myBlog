# FastAPI Clean Architecture Migration

## Cấu trúc thư mục

```
📁 app/
│   ├── 📁 domain/              # Định nghĩa entity (user.py, product.py, order.py, role.py, ...)
│   │     ├── user.py
│   │     ├── product.py
│   │     ├── order.py
│   │     ├── role.py
│   │     └── __init__.py
│   ├── 📁 repository/          # Tầng truy xuất dữ liệu (user_repository.py, ...)
│   │     ├── user_repository.py
│   │     ├── product_repository.py
│   │     ├── order_repository.py
│   │     ├── role_repository.py
│   │     ├── base.py
│   │     └── __init__.py
│   ├── 📁 usecase/             # Xử lý nghiệp vụ/service (user_service.py, ...)
│   │     ├── user_service.py
│   │     ├── product_service.py
│   │     ├── order_service.py
│   │     └── __init__.py
│   ├── 📁 api/
│   │     ├── 📁 handler/       # API routers/controllers (user_handler.py, ...)
│   │     │     ├── user_handler.py
│   │     │     ├── product_handler.py
│   │     │     ├── order_handler.py
│   │     │     └── __init__.py
│   │     └── __init__.py
│   ├── 📁 middleware/          # Middleware (auth.py, logger.py, ...)
│   │     ├── auth.py
│   │     ├── authorization.py
│   │     ├── error_handler.py
│   │     ├── logger.py
│   │     ├── response_handler.py
│   │     ├── validate.py
│   │     └── __init__.py
│   ├── 📁 config/              # Cấu hình ứng dụng (settings.py, ...)
│   │     ├── settings.py
│   │     └── __init__.py
│   ├── 📁 shared/
│   │     ├── 📁 model/         # Pydantic schemas, DTO (user_model.py, ...)
│   │     │     ├── user_model.py
│   │     │     ├── product_model.py
│   │     │     ├── order_model.py
│   │     │     ├── role_model.py
│   │     │     ├── api_response.py
│   │     │     └── __init__.py
│   │     ├── 📁 utils/         # Tiện ích dùng chung (response.py, ...)
│   │     │     ├── response.py
│   │     │     └── __init__.py
│   │     ├── constants.py
│   │     └── __init__.py
│   ├── 📁 infrastructure/      # Kết nối DB, service ngoài (database.py, server.py, ...)
│   │     ├── database.py
│   │     ├── server.py
│   │     └── __init__.py
│   └── __init__.py
│
📁 migrations/
│   ├── env.py
│   ├── script.py.mako
│   ├── 📁 versions/            # Các file migration cụ thể
│   └── README
│
📁 tests/
│   ├── 📁 api/
│   │     └── test_product.py
│   └── __init__.py
│
📁 logs/
│   └── app.log
│
📁 memory-bank/
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── activeContext.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   └── progress.md
│
📁 .github/
│   └── 📁 workflows/
│         └── main.yml
│
📁 venv/                       # Môi trường ảo Python
│   ├── bin/
│   ├── include/
│   ├── lib/
│   ├── pyvenv.cfg
│   └── .gitignore
│
main.py                       # Điểm khởi động FastAPI
requirements.txt              # Thư viện phụ thuộc Python
Dockerfile                    # Docker build
alembic.ini                   # Cấu hình Alembic
.env.example                  # Mẫu file biến môi trường
.gitignore                    # Loại trừ file khỏi git
README.md                     # Tài liệu dự án
```

## Công nghệ sử dụng
- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- Pytest
- Docker
- GitHub Actions

## Khởi động project

### Chạy local
1. Tạo môi trường ảo:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   Debug
   Nhấn Cmd+Shift+P (hoặc Ctrl+Shift+P trên Windows).
   Gõ: Python: Select Interpreter
   Chọn đúng đường dẫn:
   /Volumes/DATA/goeat_samho/py-arc/venv/bin/python
   {
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Uvicorn",
      "type": "debugpy",
      "request": "launch",
      "module": "uvicorn",
      "args": [
        "main:app",
        "--reload"
      ],
      "jinja": true
    }
  ]
}
   ```
2. Cài đặt dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy file .env.example thành .env và chỉnh sửa config phù hợp.
4. Chạy migration DB (nếu dùng Alembic):
   ```bash
   alembic upgrade head
   ```
5. Chạy server:
   ```bash
   uvicorn main:app --reload
   ```

### Chạy bằng Docker
1. Build và chạy toàn bộ hệ thống:
   ```bash
   docker-compose up --build
   ```
2. Truy cập API tại: http://localhost:8000 - swagger tại : http://localhost:8000/docs

### CI/CD
- Đã cấu hình sẵn workflow GitHub Actions (/.github/workflows/main.yml) để tự động test, build, deploy.

### Cấu hình môi trường
- Sử dụng file `.env` (tham khảo `.env.example`).
- Thay đổi thông tin kết nối DB, secret key, ... theo môi trường thực tế.

### Tài liệu API
- Định nghĩa router, schema, response theo chuẩn OpenAPI (FastAPI tự sinh docs tại `/docs`).
- Có thể mở rộng thêm tài liệu chi tiết tại `docs/` nếu cần.

## Mục tiêu
- Mapping từng module từ Go sang Python, giữ nguyên logic, response, error, middleware, API contract.
- Đảm bảo dễ maintain, mở rộng, onboard dev mới.

## Quy trình tạo một API mới (chuẩn hóa, đầy đủ từng bước)

1. **Xác định nghiệp vụ và dữ liệu**
   - Xác định rõ API cần làm gì (ví dụ: CRUD cho Product, Order, ...).
   - Xác định dữ liệu vào/ra (request/response).
2. **Tạo schema (Pydantic) cho request/response**
   - File: `app/shared/model/<entity>_model.py`
   - Khai báo: Class kế thừa BaseModel cho request/response.
   - Ví dụ:
     ```python
     from pydantic import BaseModel
     class ProductCreate(BaseModel):
         name: str
         price: float
     class ProductRead(ProductCreate):
         id: int
     ```
3. **Tạo hoặc cập nhật entity (nếu cần)**
   - File: `app/domain/<entity>.py`
   - Khai báo: Class SQLAlchemy model mapping với bảng DB.
   - Ví dụ:
     ```python
     from sqlalchemy import Column, Integer, String, Float
     from app.infrastructure.database import Base
     class Product(Base):
         __tablename__ = "products"
         id = Column(Integer, primary_key=True, index=True)
         name = Column(String, index=True)
         price = Column(Float)
     ```
4. **Tạo hoặc cập nhật repository**
   - File: `app/repository/<entity>_repository.py`
   - Khai báo: Class kế thừa BaseRepository, thêm method đặc thù nếu cần.
   - Ví dụ:
     ```python
     from app.repository.base_repository import BaseRepository
     class ProductRepository(BaseRepository):
         pass  # Thêm method đặc thù nếu cần
     ```
5. **Tạo hoặc cập nhật service/usecase**
   - File: `app/usecase/<entity>_service.py`
   - Khai báo: Class xử lý logic nghiệp vụ, gọi repository.
   - Ví dụ:
     ```python
     class ProductService:
         def __init__(self, repo):
             self.repo = repo
         def get_products(self, db):
             return self.repo.get_all(db)
     ```
6. **Tạo hoặc cập nhật handler (router)**
   - File: `app/api/handler/<entity>_handler.py`
   - Khai báo: Định nghĩa router, import service, sử dụng success_response.
   - Ví dụ:
     ```python
     from fastapi import APIRouter, Depends
     from app.usecase.product_service import ProductService
     from app.shared.utils.response import success_response
     router = APIRouter(prefix="/products", tags=["products"])
     product_service = ProductService(...)
     @router.get("/", response_model=APIResponse)
     def list_products(db=Depends(get_db)):
         products = product_service.get_products(db)
         return success_response(data=products)
     ```
7. **Đăng ký router vào app**
   - File: `app/infrastructure/server.py`
   - Khai báo: `app.include_router(product_router)` (nếu chưa có).
8. **(Tùy chọn) Viết test cho API**
   - File: `tests/api/test_product.py`
   - Khai báo: Test endpoint với pytest, httpx.
9. **(Tùy chọn) Update migration nếu có thay đổi DB**
   - Chạy: `alembic revision --autogenerate -m "add product"`
   - Chạy: `alembic upgrade head`

### Tóm tắt trình tự & vị trí file

| Bước | File/Thư mục                    | Nội dung khai báo                        |
|------|----------------------------------|------------------------------------------|
| 1    | app/shared/model/                | Schema request/response (Pydantic)       |
| 2    | app/domain/                      | Entity (SQLAlchemy model)                |
| 3    | app/repository/                  | Repository (CRUD, query DB)              |
| 4    | app/usecase/                     | Service/Usecase (logic nghiệp vụ)        |
| 5    | app/api/handler/                 | Handler/router (API endpoint)            |
| 6    | app/infrastructure/server.py     | Đăng ký router vào app                   |
| 7    | tests/api/                       | Test API (pytest, httpx)                 |
| 8    | migrations/                      | Migration DB (Alembic)                   |

### Mục đích
- Tách biệt rõ ràng từng layer (Clean Architecture).
- Dễ maintain, dễ onboard, dễ mở rộng.
- Đảm bảo mọi API đều chuẩn hóa response, logging, error handling.

## Hướng dẫn áp dụng authentication & authorization vào router

- Để bảo vệ endpoint chỉ cho user đã đăng nhập:
  - Thêm `dependencies=[Depends(auth_middleware)]` vào router hoặc endpoint.
- Để bảo vệ endpoint cần phân quyền động:
  - Thêm `dependencies=[Depends(authorization_middleware(resource, action))]` vào endpoint.
  - Ví dụ: `Depends(authorization_middleware("product", "create"))`
- Có thể kết hợp cả hai, nhưng authorization_middleware đã bao gồm xác thực.

**Ví dụ:**
```python
@router.get("/", dependencies=[Depends(auth_middleware)])
def list_products(...):
    ...

@router.post("/", dependencies=[Depends(authorization_middleware("product", "create"))])
def create_product(...):
    ...
```

