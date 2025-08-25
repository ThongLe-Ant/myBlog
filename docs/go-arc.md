# Goeat Backend API

## Mô tả
Đây là dự án backend API viết bằng Go, sử dụng Gin, Google Wire cho Dependency Injection, GORM, Postgres, và tích hợp Swagger UI.

## Yêu cầu hệ thống
- Go 1.20+
- PostgreSQL
- (Tuỳ chọn) Redis nếu sử dụng cache
## Cấu trúc dự án GO-ARC
```
app-server/
├── cmd/
│   ├── api/
│   │   └── main.go               # Entry point của ứng dụng
│   ├── migrate/
│   │   └── main.go               # Entry point cho database migrations
│   └── worker/
│       └── main.go               # Entry point cho background workers (nếu cần)
├── internal/
│   ├── domain/
│   │   ├── entity/               # Entity (User, Product, Order)
│   │   │   ├── user.go
│   │   │   ├── product.go
│   │   │   └── order.go
│   │   └── repository/           # Interface repo
│   │       ├── user_repository.go
│   │       ├── product_repository.go
│   │       └── order_repository.go
│   ├── usecase/                  # Business logic
│   │   ├── user/
│   │   │   ├── interface.go      # Interface cho use case
│   │   │   └── service.go        # Implement use case (Create, Update...)
│   │   ├── product/
│   │   └── order/
│   ├── interface/
│   │   └── api/
│   │       └── handler/
│   │           ├── v1/           # API version 1
│   │           │   ├── user_handler.go
│   │           │   ├── product_handler.go
│   │           │   └── order_handler.go
│   │           └── v2/           # API version 2 (nếu cần)
│   ├── persistence/              # Data access layer triển khai repo
│   │   └── repository/
│   │       ├── generic_repo.go   # GenericBaseRepo[users] (Create, Update, Delete...)
│   │       └── postgres/
│   │           ├── user_repository.go
│   │           ├── product_repository.go
│   │           └── order_repository.go
│   ├── shared/                   # Shared model request, response, DTOs
│   │   └── model/
│   │       ├── user_model.go
│   │       ├── product_model.go
│   │       └── order_model.go
│   └── infrastructure/
│       ├── database/
│       │   └── postgres.go       # Database connection
│       ├── server/
│       │   └── http.go           # HTTP server setup
│       └── middleware/           # HTTP middleware
│           ├── auth.go           # Xác thực
│           ├── authorization.go  # Xác thực role permission
│           ├── cors.go           # Cors
│           ├── logger.go         # Logging
│           ├── validate.go       # Validate input
│           └── response_handler.go # Xử lý kết quả success và error
├── pkg/                          # Shared packages
│   ├── errors/
│   │   └── errors.go             # Custom error types
│   ├── cache/
│   │   └── redis.go              # Cache with redis
│   ├── email/
│   │   └── email.go              # Send email
│   ├── logger/
│   │   └── logger.go             # Logging utility
│   └── response/
│       └── response.go           # API response structures
├── configs/
│   ├── config.yaml               # Base configuration
│   ├── config.development.yaml   # Development-specific config
│   ├── config.staging.yaml       # Staging-specific config
│   └── config.production.yaml    # Production-specific config
├── migrations/                   # Database migrations
│   ├── 001_create_users_table.up.sql
│   ├── 001_create_users_table.down.sql
│   ├── 002_create_products_table.up.sql
│   └── 002_create_products_table.down.sql
├── docs/
│   ├── api/
│   │   └── swagger.yaml          # API documentation
│   └── README.md                 # Project documentation
├── scripts/
│   ├── setup.sh                  # Setup script
│   ├── run_tests.sh              # Script to run tests
│   └── build.sh                  # Build script
├── tests/                        # Integration and e2e tests
├── go.mod                        # Go module file
├── go.sum
├── Dockerfile                    # Run with docker
├── docker-compose.yml            # Run with docker compose
├── .gitignore
├── README.md
├── Makefile                      # For common tasks
└── ci/
    └── .github/
        └── workflows/
            └── main.yml          # Run CI/CD with GitHub

```

## Chi tiết các tính năng

### 1. Middleware
#### a. Xác thực (auth)
- **Mục đích:** Xác thực người dùng thông qua Bearer token.
- **Chức năng:** Middleware kiểm tra token từ header Authorization, nếu không có hoặc không hợp lệ sẽ trả về lỗi 401 Unauthorized.

#### b. Kiểm tra quyền truy cập (authorization)
- **Mục đích:** Xác minh vai trò của người dùng.
- **Chức năng:** Middleware kiểm tra vai trò của người dùng và xác thực quyền truy cập vào tài nguyên. Nếu quyền hạn không đủ, trả về lỗi 403 Forbidden.

#### c. Xử lý phản hồi API (response_handler)
- **Mục đích:** Chuẩn hóa định dạng phản hồi từ API.
- **Chức năng:** Mọi phản hồi đều được xử lý và trả về theo định dạng APIResponse, bao gồm HttpStatus, Errors, và Data nếu thành công.

#### d. Xử lý lỗi API (errorHandler)
- **Mục đích:** Quản lý lỗi phát sinh.
- **Chức năng:** Mọi lỗi trong quá trình xử lý request được trả về theo định dạng chuẩn APIResponse với mã lỗi HTTP và thông báo lỗi chi tiết.

#### e. Kiểm tra dữ liệu đầu vào (validate)
- **Mục đích:** Kiểm tra và xác thực dữ liệu đầu vào từ client.
- **Chức năng:** Middleware kiểm tra các trường dữ liệu bắt buộc và định dạng, trả về lỗi 400 Bad Request nếu không hợp lệ.

#### f. Ghi log (logger)
- **Mục đích:** Ghi lại thông tin về các yêu cầu HTTP.
- **Chức năng:** Middleware ghi log các thông tin quan trọng như phương thức HTTP, đường dẫn, trạng thái HTTP, và thời gian xử lý.

### 2. API Response
- **APIResponse**
  - **Mục đích:** Chuẩn hóa phản hồi API.
  - **Chức năng:**
    - **Success:** Trả về phản hồi thành công với dữ liệu.
    - **Error:** Trả về lỗi hệ thống hoặc lỗi xác thực quyền truy cập.
    - **ValidationError:** Trả về lỗi kiểm tra dữ liệu đầu vào.

### 3. Repository Pattern
- **GenericBaseRepository**
  - **Mục đích:** Cung cấp các chức năng CRUD chung.
  - **Chức năng:**
    - **Create:** Tạo mới một bản ghi.
    - **Update:** Cập nhật bản ghi.
    - **Delete:** Xóa bản ghi theo ID.
    - **FindAll:** Lấy tất cả bản ghi.
    - **FindByID:** Tìm bản ghi theo ID.
- **Repository cụ thể**
  - **Mục đích:** Cung cấp các chức năng CRUD cho từng entity (User, Product, Order).
  - **Chức năng:** Kế thừa từ GenericBaseRepository và mở rộng nếu cần.

### 4. Use Case
- **Business Logic**
  - **Mục đích:** Xử lý các nghiệp vụ liên quan đến các đối tượng User, Product, Order.
  - **Chức năng:**
    - **CreateUser, GetUserByID, UpdateUser, DeleteUser:** Các thao tác CRUD với User.
    - Tương tự cho Product và Order.

### 5. Entity
- **Entity**
  - **Mục đích:** Phản ánh các bảng trong cơ sở dữ liệu.
  - **Chức năng:** Các entity như User, Product, Order được định nghĩa với các trường tương ứng với bảng trong database.

### 6. Database
- **GORM**
  - **Mục đích:** Kết nối và thao tác với cơ sở dữ liệu PostgreSQL.
  - **Chức năng:** Sử dụng GORM để quản lý các phiên làm việc với database.
- **Database Migration**
  - **Mục đích:** Quản lý schema database.
  - **Chức năng:** Các file SQL trong thư mục migrations/ để tạo và xóa bảng.

### 7. API Handlers
- **Handlers**
  - **Mục đích:** Xử lý các yêu cầu HTTP cho các endpoint API.
  - **Chức năng:**
    - **GetUsers, CreateUser, UpdateUser, DeleteUser:** Tương tác với entity User qua HTTP.
    - Tương tự cho Product và Order.

### 8. HTTP Server
- **Gin Framework**
  - **Mục đích:** Khởi chạy server HTTP.
  - **Chức năng:** Khởi tạo server với các route API và áp dụng các middleware.
  - **Run:** `go run ./cmd/api/main.go`
### 9. Database Migrations
- **Hệ thống quản lý phiên bản** cho database thông qua các file SQL migration được lưu trữ trong thư mục `migrations/`.

### 10. Cấu hình (Configs)
- **Cấu hình chung và môi trường** (development, staging, production) được lưu trữ trong các file cấu hình YAML, bao gồm cấu hình kết nối cơ sở dữ liệu, port server và các thiết lập môi trường khác.

### 11. Wire (Dependency Injection)
- **Sử dụng Wire** để quản lý và tự động inject các thành phần như repository, service, và handler.

## Cài đặt & Khởi chạy

### 1. Clone source code
```bash
git clone <repo-url>
cd <tên-thư-mục-project>
```

### 2. Cài đặt Go module
```bash
go mod tidy
```

### 3. Cấu hình môi trường
- Copy file cấu hình mẫu nếu có (ví dụ `.env.example` → `.env` hoặc `config.yaml`).
- Chỉnh sửa thông tin kết nối database, port, ... trong file cấu hình.

### 4. Khởi chạy nhanh với 1 lệnh duy nhất
Script `run.sh` sẽ tự động:
- Generate wire DI
- Generate Swagger docs
- Chạy server

#### Chạy script
```bash
# Cấp quyền thực thi (chỉ cần 1 lần)
chmod +x run.sh
# Chạy script
./run.sh
```

> Nếu gặp lỗi thiếu lệnh `wire` hoặc `swag`, cài đặt bằng:
> ```bash
> go install github.com/google/wire/cmd/wire@latest
> go install github.com/swaggo/swag/cmd/swag@latest
> ```

### 5. (Tuỳ chọn) Thực hiện thủ công từng bước
Nếu không dùng script, bạn có thể thực hiện từng bước như sau:

- Generate wire:
  ```bash
  cd cmd/inject
  wire
  cd ../..
  ```
- Generate Swagger docs:
  ```bash
  swag init -g cmd/main.go
  ```
- Chạy server:
  ```bash
  go run ./cmd/main.go
  ```

### 6. Khởi tạo database (nếu cần)
- Tạo database Postgres, chạy migration nếu có.

### 7. Truy cập Swagger UI
- Sau khi server chạy, truy cập: [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)
- Tài liệu API sẽ tự động sinh từ comment trong code.

## Cấu trúc dự án
- `cmd/main.go`: Entrypoint khởi chạy server
- `cmd/inject/wire.go`: Định nghĩa dependency injection với Wire
- `internal/inject/`: Các provider DI cho từng domain/service
- `internal/provider/`: Provider cho các handler (tách biệt để tránh import cycle)
- `internal/interface/api/handler/v1/`: Các handler cho API
- `internal/usecase/`: Business logic/service
- `internal/persistence/`: Repository, database
- `internal/infrastructure/`: Server, middleware, config

## Lưu ý
- Nếu thay đổi DI, phải chạy lại `wire` để generate code.
- Nếu gặp lỗi import cycle, kiểm tra lại các provider và import giữa usecase/handler.
- Để build production:
  ```bash
  go build -o app-server ./cmd/main.go
  ```

## Đóng góp
PR và issue luôn được chào đón!

## Quy trình khởi tạo API mới

Dưới đây là quy trình chuẩn để thêm một API mới vào dự án:

### 1. Định nghĩa Entity (nếu cần)
- **Vị trí:** `internal/domain/entity/`
- **Ví dụ:**
  ```go
  // internal/domain/entity/product.go
  package entity
  type Product struct {
      ID   uint
      Name string
      Price float64
  }
  ```

### 2. Tạo DTO (Data Transfer Object)
- **Vị trí:** `internal/shared/productdto/`
- **Ví dụ:**
  ```go
  // internal/shared/productdto/product.go
  package productdto
  type CreateProductRequest struct {
      Name  string  `json:"name"`
      Price float64 `json:"price"`
  }
  type ProductResponse struct {
      ID    uint    `json:"id"`
      Name  string  `json:"name"`
      Price float64 `json:"price"`
  }
  ```

### 3. Repository (nếu thao tác DB)
- **Vị trí:**
  - Interface: `internal/persistence/repository/`
  - Triển khai: `internal/persistence/repository/postgres/`
- **Ví dụ:**
  ```go
  // internal/persistence/repository/postgres/product_repository.go
  package postgres
  type ProductRepository struct { ... }
  func NewProductRepository(db *gorm.DB) *ProductRepository { ... }
  func (r *ProductRepository) Create(product *entity.Product) error { ... }
  ```

### 4. Service/Usecase
- **Vị trí:** `internal/usecase/product/`
- **Ví dụ:**
  ```go
  // internal/usecase/product/service.go
  package product
  type ServiceInterface interface {
      CreateProduct(req *productdto.CreateProductRequest) (*entity.Product, error)
  }
  type service struct { repo *postgres.ProductRepository }
  func NewService(repo *postgres.ProductRepository) ServiceInterface { ... }
  ```

### 5. Handler (API Layer)
- **Vị trí:** `internal/interface/api/handler/v1/`
- **Ví dụ:**
  ```go
  // internal/interface/api/handler/v1/product_handler.go
  package v1
  type ProductHandler struct { service product.ServiceInterface }
  func NewProductHandler(service product.ServiceInterface) *ProductHandler { ... }
  // @Summary Tạo sản phẩm mới
  // @Router /api/products/add [post]
  func (h *ProductHandler) CreateProduct(c *gin.Context) { ... }
  ```

### 6. Provider/Inject (DI)
- **Vị trí:**
  - Provider service: `internal/inject/product.go`
  - Provider handler: `internal/provider/handler_provider.go`
- **Ví dụ:**
  ```go
  // internal/inject/product.go
  func ProvideProductModule(db *gorm.DB) product.ServiceInterface { ... }
  // internal/provider/handler_provider.go
  func ProvideProductHandler(service product.ServiceInterface) *v1.ProductHandler { ... }
  ```

### 7. Đăng ký route
- **Vị trí:** `internal/infrastructure/server/product_router.go`
- **Ví dụ:**
  ```go
  func RegisterProductRoutes(api *gin.RouterGroup, handler *v1.ProductHandler) {
      api.POST("/products/add", handler.CreateProduct)
  }
  ```

### 8. Cập nhật Wire
- **Vị trí:** `cmd/inject/wire.go`
- **Ví dụ:**
  ```go
  wire.Build(
      ...
      inject.ProvideProductModule,
      provider.ProvideProductHandler,
      ...
  )
  ```

### 9. Thêm swagger comment
- **Vị trí:** Trên các hàm handler
- **Ví dụ:**
  ```go
  // @Summary Tạo sản phẩm mới
  // @Tags products
  // @Accept json
  // @Produce json
  // @Param data body productdto.CreateProductRequest true "Product info"
  // @Success 200 {object} productdto.ProductResponse
  // @Router /api/products/add [post]
  func (h *ProductHandler) CreateProduct(c *gin.Context) { ... }
  ```

### 10. Chạy lại wire, gen swagger và chạy server
```bash
./run.sh
```

---

**Tóm tắt:**
1. Định nghĩa entity (nếu cần)
2. Tạo DTO request/response
3. Tạo repository (nếu thao tác DB)
4. Tạo service/usecase
5. Tạo handler
6. Tạo provider cho service và handler
7. Đăng ký route
8. Cập nhật wire.go
9. Thêm swagger comment
10. Chạy lại wire, gen swagger, chạy server

---

> Nếu cần ví dụ chi tiết hơn cho domain khác, hãy tham khảo các thư mục tương ứng hoặc liên hệ team! 

