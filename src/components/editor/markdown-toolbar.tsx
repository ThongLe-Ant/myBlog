
'use client';

import { Bold, Italic, Code, Link, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MarkdownToolbarProps {
  onAction: (syntax: 'bold' | 'italic' | 'code' | 'link' | 'list') => void;
}

const toolbarItems = [
  { action: 'bold', icon: Bold, tooltip: 'Bold' },
  { action: 'italic', icon: Italic, tooltip: 'Italic' },
  { action: 'code', icon: Code, tooltip: 'Code Block' },
  { action: 'link', icon: Link, tooltip: 'Insert Link' },
  { action: 'list', icon: List, tooltip: 'Bulleted List' },
] as const;

export function MarkdownToolbar({ onAction }: MarkdownToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-2 bg-surface rounded-t-md border-b">
      {toolbarItems.map((item, index) => (
        <React.Fragment key={item.action}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAction(item.action)}
            aria-label={item.tooltip}
            title={item.tooltip}
            className="h-8 w-8"
          >
            <item.icon className="h-4 w-4" />
          </Button>
          {(item.action === 'italic' || item.action === 'link') && <Separator orientation="vertical" className="h-6 mx-1" />}
        </React.Fragment>
      ))}
    </div>
  );
}

// Add React to the scope for the map function
import React from 'react';
