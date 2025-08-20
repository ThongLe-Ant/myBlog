'use client';

import { useBackground } from '@/hooks/use-background';
import { useEffect } from 'react';

export function BackgroundProvider() {
  useBackground();
  return null;
}
