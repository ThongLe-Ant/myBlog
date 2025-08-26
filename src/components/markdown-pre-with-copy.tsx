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
      <pre ref={preRef} className={`rounded-lg overflow-x-auto p-3 md:p-4 pr-10 md:pr-12 bg-surface ${className}`} {...rest}>
        {children}
      </pre>
      <Button
        type="button"
        variant="secondary"
        className="absolute top-1.5 right-1.5 h-7 w-7 p-0 md:h-8 md:w-auto md:px-2 z-10"
        onClick={handleCopy}
        aria-label="Copy code"
        title={copied ? 'Copied' : 'Copy code'}
      >
        <Copy className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-1" />
        <span className="hidden md:inline">{copied ? 'Copied' : 'Copy'}</span>
      </Button>
    </div>
  );
}

export default PreWithCopy;


