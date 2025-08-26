# 🍽️ Go Eat ZAVN - Hệ thống Đặt Món Ăn

[![Odoo Version](https://img.shields.io/badge/Odoo-18.0-blue.svg)](https://github.com/odoo/odoo)
[![License](https://img.shields.io/badge/License-LGPL--3-green.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Python](https://img.shields.io/badge/Python-3.10+-yellow.svg)](https://www.python.org/)

Hệ thống quản lý đặt món ăn cho công ty AZVN, được xây dựng trên nền tảng Odoo 18 với multi-environment setup và hot reload development.

---

## 🚀 Quick Start cho Team

### ⚡ **Zero-Config Setup** 
```bash
# Clone project (lần đầu)
git clone <repository-url>
cd goeat-zavn

# Khởi chạy LOCAL (1 lệnh → sẵn sàng ngay!)
../run.sh local

# 🎉 Done! System tự động:
# ✅ Start containers (web + database)  
# ✅ Initialize database với Odoo
# ✅ Tạo 2 users sẵn sàng
# ✅ Enable hot reload
```

### 🔐 **Login ngay:**
- **URL:** http://localhost:8069
- **Admin:** admin@goeat.vn / admin123
- **User:** thongle@goeat.vn / Admin

---

## 🌟 System Features

### 🏗️ **Multi-Environment Architecture**
- **🖥️ LOCAL**: Development với hot reload (localhost:8069)
- **🧪 SIT**: System Integration Testing (localhost:8070)  
- **🚀 PROD**: Production deployment (localhost:8071)

### 🔥 **Development Features**
- **Auto-Setup**: Database + Users tự động 
- **Hot Reload**: Code changes → instant feedback
- **File Watching**: Auto reload khi thay đổi files
- **Cross-Platform**: macOS + Linux support

### 👥 **Auto-Created Users**
- **Administrator**: admin@goeat.vn (full access)
- **Standard User**: thongle@goeat.vn (employee access)

---

## 🍽️ Application Features

### 👥 **Employee Management**
- ✅ Import/Export từ Excel với wizard
- ✅ Quản lý thông tin (mã, tên, thẻ từ, contact)
- ✅ Auto-generate employee codes (EMP0001, EMP0002...)
- ✅ Statistics: orders placed & meals received

### 🍽️ **Menu Management**  
- ✅ Daily menus với multiple meal times
- ✅ Food items (standard + custom dishes)
- ✅ Flexible meal time slots với lock mechanism
- ✅ Auto-generate menus với default items

### 📱 **Ordering & Pickup**
- ✅ Modern dashboard với OWL components
- ✅ Pickup system với card/employee code scanning
- ✅ Audio notifications (success/error sounds)
- ✅ Real-time order history và tracking

### 🔐 **Security & Access Control**
- ✅ Role-based permissions (Employee/Manager/Admin)
- ✅ Restricted access: chỉ imported employees
- ✅ Detailed function-level permissions

### 🌐 **API Integration**
- ✅ REST API endpoints cho mobile apps
- ✅ Order, pickup, reporting APIs
- ✅ JSON responses với comprehensive error handling

---

## 🛠️ Development Setup

### **Prerequisites:**
- Docker & Docker Compose
- Git

### **Team Development Workflow:**

#### 1. **First Time Setup:**
```bash
# Clone repository  
git clone <repository-url>
cd goeat-zavn

# Cài fswatch cho hot reload (recommend)
../install-fswatch.sh

# Start development
../run.sh local
```

#### 2. **Daily Development:**
```bash
# Start containers (if stopped)
../run.sh local

# Start auto file watching (new terminal)
../run.sh watch

# Develop normally:
# - Edit files trong addons/goeat_zavn/
# - System tự động reload
# - Test tại http://localhost:8069
```

#### 3. **Available Commands:**
```bash
# Environment Management
../run.sh local          # Start LOCAL environment
../run.sh sit            # Start SIT environment  
../run.sh prod           # Start PROD environment
../run.sh stop           # Stop all containers
../run.sh status         # Check system status

# Development Tools
../run.sh reload         # Manual hot reload
../run.sh watch          # Auto file watching
../run.sh shell          # Odoo shell access
../run.sh bash           # Container bash access

# User Management  
../run.sh createuser     # Create new users
../run.sh listusers      # List all users
../run.sh setup          # Manual database setup

# System Tools
../run.sh logs           # View real-time logs
../run.sh help           # Full command reference
```

---

## 🏗️ Technical Architecture

### **Directory Structure:**
```
goeat-zavn/
├── addons/goeat_zavn/           # 🔥 Main addon (hot reload enabled)
│   ├── models/                  # Python ORM models
│   │   ├── employee.py          # Employee management
│   │   ├── meal_time.py         # Meal time slots
│   │   ├── food_item.py         # Food items
│   │   ├── menu.py              # Daily menus
│   │   ├── meal_order.py        # Order management
│   │   └── food_change_quota.py # Change quotas
│   ├── controllers/             # REST API controllers
│   │   ├── goeat_api.py         # Main API endpoints
│   │   ├── goeat_pickup_api.py  # Pickup API
│   │   └── goeat_report_api.py  # Reporting API
│   ├── static/src/              # Frontend assets
│   │   ├── components/          # OWL components
│   │   │   ├── meal_dashboard/  # Order dashboard
│   │   │   └── meal_pickup/     # Pickup interface
│   │   └── sounds/              # Audio notifications
│   ├── views/                   # XML views & menus
│   ├── security/                # Access rights & rules
│   └── wizard/                  # Import/Export wizards
├── config/                      # Environment configs
│   ├── local.conf              # LOCAL với hot reload
│   ├── sit.conf                # SIT remote database
│   └── prod.conf               # PROD remote database  
├── docker/                     # Docker compose files
│   ├── docker-compose.local.yml
│   ├── docker-compose.sit.yml
│   └── docker-compose.prod.yml
└── logs/                       # Application logs
```

### **Database Architecture:**
```
Models (Python ORM):
├── goeat.employee              # Employee master data
├── goeat.meal_time            # Meal time configuration  
├── goeat.food_item           # Food items catalog
├── goeat.menu               # Daily menu planning
├── goeat.meal_order        # Order transactions
└── goeat.food_change_quota # Change quota management

API Endpoints:
├── /goeat/api/orders/*       # Order management
├── /goeat/api/pickup/*      # Pickup operations  
└── /goeat/api/reports/*     # Reporting & analytics

Frontend Components:
├── MealDashboard (OWL)      # Order placement UI
└── MealPickup (OWL)        # Pickup interface
```

---

## 📱 User Guide

### **For Developers:**
1. **Start development:** `../run.sh local`
2. **Edit code:** Files trong `addons/goeat_zavn/`
3. **Hot reload:** Auto hoặc `../run.sh reload`
4. **Test:** http://localhost:8069

### **For Administrators:**  
1. **Employee Setup:**
   - Go Eat → Configuration → Employee Management
   - Import Excel: Employee Code | Full Name | Card Number | Phone | Email
   
2. **Menu Configuration:**
   - Tạo Meal Times: Go Eat → Configuration → Meal Times
   - Tạo Food Items: Go Eat → Configuration → Food Items  
   - Tạo Daily Menus: Go Eat → Menu Management

3. **Daily Operations:**
   - **Order Dashboard:** Go Eat → Dashboard
   - **Pickup Interface:** Go Eat → Pickup
   - **Reports:** Go Eat → Reports

### **For Employees:**
1. **Place Orders:** Dashboard → Select meal time → Choose food → Confirm
2. **Pickup Meals:** Pickup interface → Scan card/enter employee code
3. **View History:** Dashboard → Order history tab

---

## 🔧 Configuration

### **Environment Variables:**
```yaml
# LOCAL Environment (localhost:8069)
DATABASE: PostgreSQL container local
FEATURES: Hot reload, debug mode, auto-setup
USERS: Auto-created admin + standard user

# SIT Environment (localhost:8070)  
DATABASE: Remote test database (51.79.212.76:15433)
FEATURES: Integration testing, moderate logging

# PROD Environment (localhost:8071)
DATABASE: Remote production (51.79.212.76:15432)  
FEATURES: Production optimized, minimal logging
```

### **Container Configuration:**
```yaml
# LOCAL containers:
goeat-zavn-local-web    # Odoo web server
goeat-zavn-local-db     # PostgreSQL database

# SIT containers:
goeat-zavn-sit-web      # Odoo web server (remote DB)

# PROD containers:  
goeat-zavn-prod-web     # Odoo web server (remote DB)
```

---

## 🚨 Troubleshooting

### **Common Issues:**

#### **Container won't start:**
```bash
# Check logs
../run.sh logs

# Reset environment
../run.sh stop
docker system prune -a --volumes  
../run.sh local
```

#### **Database connection failed:**
```bash
# Check database status
../run.sh status

# Manual setup
../run.sh setup
```

#### **Hot reload not working:**
```bash
# Check file mount
docker exec goeat-zavn-local-web ls -la /mnt/extra-addons/

# Install fswatch (if not done)
../install-fswatch.sh

# Manual reload
../run.sh reload
```

#### **Permission issues (macOS):**
```bash
sudo chown -R $(whoami) addons/
```

### **Emergency Reset:**
```bash
# Nuclear option - reset everything
../run.sh stop
docker system prune -a --volumes
../run.sh local    # Rebuild từ đầu
```

---

## 🤝 Team Collaboration

### **Git Workflow:**
```bash
# Update code
git pull origin main

# Start development  
../run.sh local

# Make changes & test
# ... develop ...

# Commit & push
git add .
git commit -m "feat: add new feature"
git push origin feature-branch
```

### **Best Practices:**
- **Always start với LOCAL:** `../run.sh local`
- **Use auto-watch:** `../run.sh watch` trong terminal riêng
- **Test trước deploy:** Verify LOCAL → SIT → PROD
- **Clean workspace:** Reset database khi cần
- **Same credentials:** Everyone dùng admin/admin123

---

## 📊 Monitoring & Logs

### **System Status:**
```bash
# Check all environments
../run.sh status

# Real-time logs
../run.sh logs

# Container health
docker ps | grep goeat-zavn
```

### **Performance:**
```bash
# Resource usage
docker stats

# Cleanup old containers
docker system prune
```

---

## 🔗 API Documentation

### **Order API:**
```bash
# Place order
POST /goeat/api/orders/create
Content-Type: application/json
{
    "employee_id": 123,
    "menu_id": 456,
    "food_items": [1, 2, 3]
}

# Get order history  
GET /goeat/api/orders/employee/{employee_id}
```

### **Pickup API:**
```bash
# Pickup meal
POST /goeat/api/pickup/confirm
Content-Type: application/json
{
    "employee_code": "EMP0001",
    "meal_time_id": 789
}
```

---

## 📝 License & Support

### **License:**
LGPL-3.0 - See `LICENSE` file for details

### **Support:**
- **Documentation:** `README_ENVIRONMENTS.md` (detailed guide)
- **Commands:** `../run.sh help`
- **Issues:** Create GitHub issue hoặc contact team lead

### **Contributors:**
- **ThongLe-Ant** - Initial development & architecture
- **Team AZVN** - Requirements & testing

---

## 🎉 Happy Coding!

**System designed for maximum team productivity:**
- ⚡ **Zero-config setup:** One command to start developing
- 🔥 **Hot reload:** Instant feedback on code changes  
- 👥 **Team-ready:** Consistent environment cho everyone
- 🚀 **Production-ready:** Smooth deployment pipeline

⭐ **Star this repo nếu hữu ích cho team!** ⭐ 