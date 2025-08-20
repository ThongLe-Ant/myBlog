
'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

// Dynamically import SimpleMDE to ensure it's client-side only
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  // Allow any other props SimpleMDE might accept
  [key: string]: any; 
}

export function MarkdownEditor({ value, onChange, ...rest }: MarkdownEditorProps) {
  const editorOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: [
        'bold', 'italic', 'heading', '|',
        'quote', 'unordered-list', 'ordered-list', '|',
        'link', 'image', '|',
        'preview', 'side-by-side', 'fullscreen', '|',
        'guide',
      ],
      ...rest.options, // Allow overriding options
    };
  }, [rest.options]);

  return <SimpleMDE value={value} onChange={onChange} options={editorOptions} />;
}
