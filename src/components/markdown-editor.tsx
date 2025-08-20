'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { SimpleMdeToCodemirrorEvents } from 'react-simplemde-editor';

// Dynamically import SimpleMDE to prevent SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

// It's recommended to define the options and events outside the component
// to prevent re-creation on every render.
const mdeOptions: EasyMDE.Options = {
    spellChecker: false,
    minHeight: '300px',
    maxHeight: '500px',
    // You can add more configuration options here
};

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    // You can add other props from react-simplemde-editor if needed
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
    return (
        <SimpleMDE
            value={value}
            onChange={onChange}
            options={mdeOptions}
        />
    );
}
