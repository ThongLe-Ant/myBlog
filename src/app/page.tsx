'use client';

import { HeroHighlight } from '@/components/motion/hero-highlight';
import { SectionReveal } from '@/components/motion/section-reveal';
import { CardInteractive } from '@/components/motion/card-interactive';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-24 md:space-y-32">
      <HeroHighlight />

      <SectionReveal>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Dự án tiêu biểu
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Các giải pháp công nghệ được thiết kế và triển khai với sự tập trung vào hiệu năng, trải nghiệm người dùng và kiến trúc bền vững.
          </p>
        </div>
      </SectionReveal>

      <div className="grid w-full gap-8 md:grid-cols-2 lg:gap-12">
        <SectionReveal>
          <CardInteractive
            title="Hệ thống Thanh toán Vi mô"
            description="Kiến trúc Microservices cho nền tảng thanh toán B2B, xử lý hàng triệu giao dịch mỗi ngày với độ trễ thấp."
            tags={['Golang', 'Kafka', 'Kubernetes', 'gRPC']}
            imageUrl="https://placehold.co/600x400.png"
            aiHint="payment system architecture"
          />
        </SectionReveal>

        <SectionReveal options={{ delay: 0.2 }}>
          <CardInteractive
            title="Nền tảng Quản lý Nội dung"
            description="Xây dựng Headless CMS cho phép các nhà tiếp thị tạo và triển khai nội dung trên nhiều kênh một cách linh hoạt."
            tags={['Next.js', 'TypeScript', 'GraphQL', 'Framer Motion']}
            imageUrl="https://placehold.co/600x400.png"
            aiHint="content management system"
          />
        </SectionReveal>

        <SectionReveal>
           <CardInteractive
            title="IoT Smart Factory"
            description="Giải pháp IoT thu thập và phân tích dữ liệu thời gian thực từ dây chuyền sản xuất, tối ưu hóa hiệu suất và giảm thiểu thời gian chết."
            tags={['.NET Core', 'Azure IoT Hub', 'TimescaleDB', 'Grafana']}
            imageUrl="https://placehold.co/600x400.png"
            aiHint="iot factory"
          />
        </SectionReveal>

        <SectionReveal options={{ delay: 0.2 }}>
           <CardInteractive
            title="Ứng dụng Giao vận"
            description="Phát triển ứng dụng di động cho tài xế và hệ thống quản lý cho điều phối viên, tối ưu hóa lộ trình và theo dõi đơn hàng."
            tags={['React Native', 'Node.js', 'PostgreSQL', 'GIS']}
            imageUrl="https://placehold.co/600x400.png"
            aiHint="delivery application"
          />
        </SectionReveal>
      </div>

      <SectionReveal>
        <div className="text-center">
           <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Sẵn sàng hợp tác?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tôi luôn tìm kiếm những cơ hội và thách thức mới. Hãy kết nối để cùng nhau tạo ra những sản phẩm đột phá.
          </p>
          <div className="mt-8">
            <Button size="lg">
              Liên hệ với tôi <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
