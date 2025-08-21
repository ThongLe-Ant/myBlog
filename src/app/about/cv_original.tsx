<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Lê Minh Thông - Senior Software Engineer & Solution Architect. Chuyên gia phát triển hệ thống ERP, giải pháp doanh nghiệp với .NET, Golang, Cloud, Microservices.">
    <meta name="keywords" content="Lê Minh Thông, Software Engineer, Solution Architect, ERP, .NET, Golang, Cloud, Microservices, Tech Lead, Việt Nam">
    <meta property="og:title" content="Lê Minh Thông | Senior Software Engineer & Solution Architect">
    <meta property="og:description" content="Chuyên gia phát triển hệ thống ERP, giải pháp doanh nghiệp với .NET, Golang, Cloud, Microservices.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="assets/avatar.jpg">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="assets/avatar.jpg" type="image/jpeg">
    <title>Lê Minh Thông | Senior Software Engineer & Solution Architect</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.23.2/babel.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        // Navigation Component
        const Navigation = () => {
            const [isOpen, setIsOpen] = useState(false);

            return (
                <header className="bg-white/95 shadow-sm sticky top-0 z-50 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="text-3xl font-bold text-blue-600 font-['Space_Grotesk'] tracking-wide">
                            <span className="text-gray-900">LMT</span>
                        </div>
                        <nav className="hidden md:flex gap-8">
                            {['Giới thiệu', 'Kỹ năng', 'Kinh nghiệm', 'Dự án', 'Liên hệ'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-gray-700 hover:text-blue-600 font-medium relative group transition-all duration-300"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}
                        </nav>
                        <a
                            href="#contact"
                            className="hidden md:inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            aria-label="Liên hệ ngay"
                        >
                            Liên hệ ngay
                        </a>
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>
                    {isOpen && (
                        <div className="md:hidden bg-white shadow-md">
                            <nav className="flex flex-col items-center gap-4 py-4">
                                {['Giới thiệu', 'Kỹ năng', 'Kinh nghiệm', 'Dự án', 'Liên hệ'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
                                    aria-label="Liên hệ ngay"
                                >
                                    Liên hệ ngay
                                </a>
                            </nav>
                        </div>
                    )}
                </header>
            );
        };

        // Hero Component
        const Hero = () => {
            return (
                <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left animate-fade-in">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-['Space_Grotesk'] mb-4 leading-tight">
                                Lê Minh <span className="text-blue-600 relative">Thông<span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-200/50 rounded-full"></span></span>
                            </h1>
                            <div className="text-2xl text-blue-700 font-semibold mb-6">Senior Software Engineer | Solution Architect</div>
                            <p className="text-gray-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed text-lg">
                                Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống ERP và giải pháp doanh nghiệp. Chuyên sâu về .NET, Golang, Cloud và Microservices.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <i className="fas fa-envelope text-blue-600"></i>
                                    <span>thongproleminh@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <i className="fas fa-phone text-blue-600"></i>
                                    <span>0396 870 644</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <i className="fas fa-map-marker-alt text-blue-600"></i>
                                    <span>TP.HCM, Việt Nam</span>
                                </div>
                            </div>
                            <a
                                href="#projects"
                                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-block font-medium"
                                aria-label="Xem dự án của tôi"
                            >
                                Xem dự án của tôi
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full hover:-translate-y-2 transition-all duration-300 animate-slide-up relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                                <div className="flex flex-col items-center mb-6 mt-4">
                                    <img src="assets/avatar.jpg" alt="Avatar Lê Minh Thông" className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md mb-4" />
                                    <h2 className="text-3xl font-bold text-blue-600 font-['Space_Grotesk']">Lê Minh Thông</h2>
                                    <p className="text-gray-600 text-lg">Solution Architect & Tech Lead</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {[
                                        { number: '10+', label: 'Năm kinh nghiệm' },
                                        { number: '20+', label: 'Hệ thống' },
                                        { number: '5+', label: 'Lĩnh vực' },
                                        { number: '100%', label: 'Cam kết' }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all duration-300">
                                            <div className="text-3xl font-bold text-blue-600 font-['Space_Grotesk']">{stat.number}</div>
                                            <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center gap-4">
                                    {['linkedin-in', 'github', 'twitter', 'facebook-f'].map((icon) => (
                                        <a
                                            key={icon}
                                            href="#"
                                            className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md"
                                            aria-label={icon}
                                        >
                                            <i className={`fab fa-${icon} text-xl`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        // About Component
        const About = () => {
            return (
                <section id="giới-thiệu" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Space_Grotesk'] relative inline-block">
                                Giới thiệu
                                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-blue-600 rounded-full"></span>
                            </h2>
                            <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                                Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống doanh nghiệp và giải pháp ERP
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                                    Với hơn 10 năm kinh nghiệm, tôi chuyên sâu về thiết kế và triển khai các hệ thống ERP quy mô lớn cho các tập đoàn hàng đầu tại Việt Nam. Nền tảng kỹ thuật vững chắc cùng hiểu biết sâu về nghiệp vụ đa ngành.
                                </p>
                                <div className="bg-blue-100 p-6 rounded-xl border-l-4 border-blue-600 mb-6">
                                    <p className="text-blue-800 leading-relaxed text-lg font-medium">
                                        Đã triển khai thành công 20+ hệ thống quy mô lớn cho các tập đoàn hàng đầu Việt Nam trong các lĩnh vực tài chính-ngân hàng, sản xuất và nhân sự.
                                    </p>
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                                    Tôi luôn hướng đến việc tạo ra các giải pháp công nghệ không chỉ đáp ứng yêu cầu kỹ thuật mà còn giải quyết hiệu quả các bài toán nghiệp vụ phức tạp.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { number: '10+', label: 'Năm kinh nghiệm' },
                                        { number: '20+', label: 'Hệ thống triển khai' },
                                        { number: '5+', label: 'Lĩnh vực chuyên môn' }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-all duration-300">
                                            <div className="text-3xl font-bold text-blue-600 font-['Space_Grotesk']">{stat.number}</div>
                                            <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="space-y-8">
                                    {[
                                        {
                                            icon: 'industry',
                                            title: 'Lĩnh vực chuyên sâu',
                                            items: ['Hệ thống ERP', 'Quản lý sản xuất', 'Nhân sự & Tiền lương', 'Quản lý kho & Mua hàng', 'Hệ thống thanh toán']
                                        },
                                        {
                                            icon: 'chart-line',
                                            title: 'Kết quả nổi bật',
                                            items: ['Xử lý >10.000 giao dịch/ngày', 'Giảm 30% thời gian kiểm kê', 'Giảm 20% thời gian xử lý', 'Tự động hóa quy trình', 'Tối ưu chi phí vận hành']
                                        }
                                    ].map((category, index) => (
                                        <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                                            <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-3 mb-4">
                                                <i className={`fas fa-${category.icon} text-blue-500 text-2xl`}></i>
                                                {category.title}
                                            </h3>
                                            <ul className="space-y-3">
                                                {category.items.map((item, i) => (
                                                    <li key={i} className="text-gray-700 flex items-center gap-3 text-lg">
                                                        <span className="text-blue-600 text-2xl">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        // Skills Component
        const Skills = () => {
            const canvasRef = useRef(null);

            // Dữ liệu kỹ năng công nghệ
            const techSkills = [
                { name: '.NET/C#', level: 95 },
                { name: 'Golang', level: 85 },
                { name: 'Python', level: 80 },
                { name: 'Node.js', level: 90 },
                { name: 'React.js', level: 85 },
                { name: 'MSSQL/Oracle', level: 90 },
                { name: 'Docker', level: 80 },
                { name: 'Cloud Solutions', level: 85 }
            ];

            useEffect(() => {
                const ctx = canvasRef.current.getContext('2d');
                new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: techSkills.map(skill => skill.name),
                        datasets: [{
                            label: 'Kỹ năng công nghệ',
                            data: techSkills.map(skill => skill.level),
                            backgroundColor: 'rgba(37, 99, 235, 0.18)',
                            borderColor: 'rgb(37, 99, 235)',
                            borderWidth: 3,
                            pointBackgroundColor: 'rgb(37, 99, 235)',
                            pointRadius: 6,
                            pointHoverRadius: 10,
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 100,
                                ticks: { stepSize: 20, color: '#2563EB', font: { size: 14 } },
                                angleLines: { color: '#2563EB', lineWidth: 1 },
                                grid: { color: '#E2E8F0', lineWidth: 1 },
                                pointLabels: { color: '#2563EB', font: { size: 16, weight: 'bold' } }
                            }
                        }
                    }
                });
            }, []);

            return (
                <section id="kỹ-năng" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Space_Grotesk'] relative inline-block">
                                Kỹ năng cốt lõi
                                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-blue-600 rounded-full"></span>
                            </h2>
                            <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                                Các công nghệ và lĩnh vực chuyên môn tạo nên giá trị khác biệt
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <h3 className="text-2xl font-semibold text-blue-600 flex items-center gap-3 mb-8 font-['Space_Grotesk']">
                                    <i className="fas fa-laptop-code text-3xl text-blue-500"></i>
                                    Lĩnh Vực
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { icon: 'sitemap', name: 'Kiến trúc hệ thống', level: 'Chuyên gia' },
                                        { icon: 'project-diagram', name: 'Giải pháp ERP', level: 'Chuyên gia' },
                                        { icon: 'money-check-alt', name: 'Hệ thống thanh toán', level: 'Nâng cao' },
                                        { icon: 'chart-bar', name: 'Báo cáo & Dashboard', level: 'Chuyên gia' },
                                        { icon: 'robot', name: 'Tự động hóa', level: 'Nâng cao' },
                                        { icon: 'server', name: 'Tối ưu hiệu năng', level: 'Chuyên gia' },
                                        { icon: 'users-cog', name: 'Quản lý dự án', level: 'Nâng cao' },
                                        { icon: 'shield-alt', name: 'Bảo mật hệ thống', level: 'Nâng cao' }
                                    ].map((skill, index) => (
                                        <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                            <i className={`fas fa-${skill.icon} text-blue-600 text-2xl w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg`}></i>
                                            <div>
                                                <div className="font-semibold text-gray-800">{skill.name}</div>
                                                <div className="text-blue-600 text-sm font-medium">{skill.level}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <h3 className="text-2xl font-semibold text-blue-600 flex items-center gap-3 mb-8 font-['Space_Grotesk']">
                                    <i className="fas fa-cogs text-3xl text-blue-500"></i>
                                   Công nghệ
                                </h3>
                                <canvas ref={canvasRef} width={400} height={400} className="w-full max-w-lg mx-auto"></canvas>
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        // Experience Component
        const Experience = () => {
            return (
                <section id="kinh-nghiệm" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Space_Grotesk'] relative inline-block">
                                Kinh nghiệm nổi bật
                                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-blue-600 rounded-full"></span>
                            </h2>
                            <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                                Hành trình phát triển nghề nghiệp trong 10 năm qua
                            </p>
                        </div>
                        <div className="relative max-w-4xl mx-auto">
                            <div className="absolute left-1/2 w-1 bg-blue-200 h-full -translate-x-1/2"></div>
                            {[
                                {
                                    company: 'Ngân hàng Á Châu (ACB)',
                                    date: '2022 - Hiện tại',
                                    title: 'Backend Engineer',
                                    desc: 'Phát triển hệ thống Ngân hàng Số cho một trong những ngân hàng hàng đầu Việt Nam.',
                                    projects: [
                                        'SmartPOS: Ứng dụng POS thông minh xây dựng trên nền tảng .NET Core và Docker',
                                        'Thanh toán quốc tế: Tích hợp các hệ thống ARP/MoneyGram/Western Union'
                                    ],
                                    result: 'Xử lý >10.000 giao dịch/ngày',
                                    icon: 'building-columns'
                                },
                                {
                                    company: 'MoMo',
                                    date: '2020 - 2021',
                                    title: 'Backend Developer',
                                    desc: 'Phát triển hệ thống CSM & Thanh toán nội bộ cho ví điện tử hàng đầu Việt Nam.',
                                    projects: ['Tối ưu hóa hệ thống giao dịch với Golang & Kafka'],
                                    result: 'Giảm 20% thời gian xử lý thanh toán',
                                    icon: 'wallet'
                                },
                                {
                                    company: 'FPT Software',
                                    date: '2018 - 2020',
                                    title: 'Technical Analyst',
                                    desc: 'Phát triển các giải pháp ERP cho các khách hàng lớn trong nước và quốc tế.',
                                    projects: [
                                        'Nguyễn Minh Steel: Hệ thống quản lý sản xuất thép toàn diện',
                                        'Sacombank: Giải pháp quản lý kho thiết bị tập trung'
                                    ],
                                    icon: 'laptop-code'
                                },
                                {
                                    company: 'SamHo',
                                    date: '2016 - 2018',
                                    title: 'ERP Developer',
                                    desc: 'Phát triển hệ thống ERP cho nhà máy với hơn 5.000 nhân viên.',
                                    projects: ['Module Nhân sự - Tiền lương tích hợp', 'Quản lý sản xuất & BOM sản phẩm'],
                                    icon: 'industry'
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16 md:left-1/2'}`}
                                >
                                    <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-all duration-300 relative">
                                        <div className={`absolute top-8 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl ${index % 2 === 0 ? '-right-6' : '-left-6'}`}>
                                            <i className={`fas fa-${item.icon}`}></i>
                                        </div>
                                        <div className="flex justify-between flex-wrap gap-4 mb-4">
                                            <div className="text-xl font-bold text-blue-600">{item.company}</div>
                                            <div className="text-sm bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-medium">{item.date}</div>
                                        </div>
                                        <div className="text-lg font-semibold text-gray-800 mb-2">{item.title}</div>
                                        <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
                                        <div className="space-y-3">
                                            {item.projects && item.projects.map((project, i) => (
                                                <div key={i} className="text-gray-700 flex items-start gap-3">
                                                    <span className="text-blue-600 text-xl">•</span>
                                                    {project}
                                                </div>
                                            ))}
                                            {item.result && (
                                                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm inline-block mt-4 font-medium">
                                                    {item.result}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );
        };

        // Projects Component
        const Projects = () => {
            return (
                <section id="dự-án" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Space_Grotesk'] relative inline-block">
                                Dự án tư vấn tiêu biểu
                                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-blue-600 rounded-full"></span>
                            </h2>
                            <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                                Các giải pháp công nghệ đã triển khai thành công cho đối tác
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    company: 'MWG',
                                    domain: 'Bán lẻ',
                                    title: 'Thanh toán không dùng tiền mặt',
                                    desc: 'Giải pháp tích hợp thanh toán điện tử cho chuỗi bán lẻ lớn nhất Việt Nam, xử lý hàng triệu giao dịch mỗi tháng.',
                                    tech: ['.NET Core', 'API Gateway', 'MSSQL', 'Docker'],
                                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800'
                                },
                                {
                                    company: 'EOC',
                                    domain: 'Suất ăn công nghiệp',
                                    title: 'Quản lý đặt hàng & tồn kho',
                                    desc: 'Hệ thống quản lý chuỗi cung ứng cho nhà cung cấp suất ăn công nghiệp với hơn 50.000 suất/ngày.',
                                    tech: ['Python', 'Java', 'Node.js', 'MongoDB'],
                                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800'
                                },
                                {
                                    company: 'VCS',
                                    domain: 'Nông nghiệp',
                                    title: 'IoT quản lý sản xuất',
                                    desc: 'Giải pháp IoT giám sát và quản lý sản xuất nông nghiệp công nghệ cao trên 500ha.',
                                    tech: ['Golang', 'Next.js', 'IoT', 'PostgreSQL'],
                                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800'
                                },
                                {
                                    company: 'ZA VN',
                                    domain: 'Xuất nhập khẩu',
                                    title: 'Quản lý kho & hải quan',
                                    desc: 'Giải pháp quản lý kho, xuất nhập khẩu và hải quan cho doanh nghiệp logistics, tích hợp quy trình kiểm soát hàng hóa và chứng từ điện tử.',
                                    tech: ['Python', 'React Native'],
                                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800'
                                },
                                ].map((project, index) => (
                                    <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300 group">
                                        <div className="relative">
                                            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <a href="#" className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition-all duration-300">Xem chi tiết</a>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="text-sm text-gray-500 mb-1">{project.domain}</div>
                                            <div className="text-xl font-bold text-blue-600 mb-2">{project.company}</div>
                                            <div className="text-lg font-semibold text-gray-800 mb-3">{project.title}</div>
                                            <p className="text-gray-600 mb-4 flex-1 leading-relaxed">{project.desc}</p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {project.tech.map((tech, i) => (
                                                    <span key={i} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            );
        };

        // Goals Component
        const Goals = () => {
            return (
                <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">Mục tiêu nghề nghiệp</h2>
                            <p className="text-xl opacity-90 leading-relaxed mb-8">
                                Hướng tới vai trò Senior System Architect/Technical Product Owner, tập trung phát triển giải pháp ERP và hệ thống thanh toán quy mô doanh nghiệp.
                            </p>
                            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20 text-lg font-medium">
                                Tiếp tục nâng cao chuyên môn về kiến trúc microservices, điện toán đám mây và AI ứng dụng trong quản trị doanh nghiệp
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        // Contact Component
        const Contact = () => {
            const [formData, setFormData] = useState({ name: '', email: '', message: '' });
            const [status, setStatus] = useState('');

            const handleSubmit = (e) => {
                e.preventDefault();
                setStatus('Đang gửi...');
                setTimeout(() => {
                    setStatus('Thông điệp đã được gửi thành công!');
                    setFormData({ name: '', email: '', message: '' });
                }, 1000);
            };

            const handleChange = (e) => {
                setFormData({ ...formData, [e.target.id]: e.target.value });
            };

            return (
                <footer id="liên-hệ" className="bg-gray-900 text-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-4xl font-bold font-['Space_Grotesk'] mb-6">
                                    Liên hệ với <span className="text-blue-400">tôi</span>
                                </h3>
                                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                                    Luôn sẵn sàng cho các cơ hội hợp tác, dự án mới và trao đổi kiến thức chuyên môn.
                                </p>
                                <div className="space-y-6 mb-8">
                                    {[
                                        { icon: 'envelope', text: 'thongproleminh@gmail.com' },
                                        { icon: 'phone', text: '0396 870 644' },
                                        { icon: 'map-marker-alt', text: 'TP.HCM, Việt Nam' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 text-gray-300 text-lg">
                                            <i className={`fas fa-${item.icon} text-blue-400 text-xl`}></i>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-6">
                                    {['linkedin-in', 'github', 'twitter', 'facebook-f'].map((icon) => (
                                        <a
                                            key={icon}
                                            href="#"
                                            className="text-white hover:text-blue-400 transition-all duration-300 text-2xl"
                                            aria-label={icon}
                                        >
                                            <i className={`fab fa-${icon}`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-md border border-white/10">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-300 mb-2 text-lg">Họ và tên</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-blue-400 focus:bg-white/20 outline-none transition-all duration-300"
                                            placeholder="Nhập họ tên của bạn"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-gray-300 mb-2 text-lg">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-blue-400 focus:bg-white/20 outline-none transition-all duration-300"
                                            placeholder="Nhập địa chỉ email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-gray-300 mb-2 text-lg">Nội dung</label>
                                        <textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-blue-400 focus:bg-white/20 outline-none transition-all duration-300 min-h-[150px] resize-y"
                                            placeholder="Nhập nội dung liên hệ"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 font-medium text-lg"
                                        aria-label="Gửi thông điệp"
                                    >
                                        Gửi thông điệp
                                    </button>
                                    {status && <div className="text-green-400 text-center text-lg mt-4">{status}</div>}
                                </form>
                            </div>
                        </div>
                        <div className="text-center mt-16 border-t border-white/10 pt-8 text-gray-400 text-lg">
                            © 2025 Lê Minh Thông. Tất cả quyền được bảo lưu.
                        </div>
                    </div>
                </footer>
            );
        };

        // Main App Component
        const App = () => {
            return (
                <div>
                    <Navigation />
                    <Hero />
                    <About />
                    <Skills />
                    <Experience />
                    <Projects />
                    <Goals />
                    <Contact />
                </div>
            );
        };

        // Render the app
        ReactDOM.render(<App />, document.getElementById('root'));

        // Animation styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-fade-in {
                animation: fadeIn 1s ease-out;
            }
            .animate-slide-up {
                animation: slideUp 1s ease-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>