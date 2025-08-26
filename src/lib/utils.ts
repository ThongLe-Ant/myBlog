import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(isoDate?: string): string {
  if (!isoDate) return '';
  const now = new Date();
  const then = new Date(isoDate);
  const diffMs = now.getTime() - then.getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return 'vừa xong';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} phút trước`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} giờ trước`;
  const day = Math.floor(hour / 24);
  if (day < 7) return `${day} ngày trước`;
  const week = Math.floor(day / 7);
  if (week < 5) return `${week} tuần trước`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month} tháng trước`;
  const year = Math.floor(day / 365);
  return `${year} năm trước`;
}

export function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const wordsPerMinute = 220; // average reading speed
  return Math.max(1, Math.round(words / wordsPerMinute));
}
