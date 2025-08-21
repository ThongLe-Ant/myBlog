import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ProfileAvatarProps = {
  className?: string;
  alt?: string;
  fallbackText?: string;
};

export function ProfileAvatar({ className, alt = 'Profile avatar', fallbackText = 'AV' }: ProfileAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src="/avatar.jpg" alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}


