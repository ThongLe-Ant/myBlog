"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

type PreWithCopyProps = React.HTMLAttributes<HTMLPreElement> & {
  children?: React.ReactNode;
};

export function PreWithCopy(props: PreWithCopyProps) {
  const { children, className = '', ...rest } = props;
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      let textToCopy = '';
      // Try to get raw text from code element if available
      const code = preRef.current?.querySelector('code');
      if (code) {
        textToCopy = (code.textContent ?? '').trim();
      } else {
        textToCopy = preRef.current?.textContent?.trim() ?? '';
      }
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // no-op
    }
  };

  return (
    <div className="relative">
      <pre ref={preRef} className={`rounded-lg overflow-x-auto p-4 bg-surface ${className}`} {...rest}>
        {children}
      </pre>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="absolute top-2 right-2 h-8 px-2"
        onClick={handleCopy}
        aria-label="Copy code"
        title={copied ? 'Copied' : 'Copy code'}
      >
        <Copy className="h-4 w-4 mr-1" />
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </div>
  );
}

export default PreWithCopy;


