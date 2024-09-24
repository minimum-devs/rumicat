'use client';

import { useState } from 'react';
import type { EditorProps } from '@maily-to/core';
import { Editor } from '@maily-to/core';
import { Loader2, X } from 'lucide-react';
import type { Editor as TiptapEditor, JSONContent } from '@tiptap/core';
import { useEditorContext } from '@/stores/editor-store';
import { cn } from '@/utils/classname';
import { Input } from './ui/input';
import { PreviewTextInfo } from './preview-text-info';
import { Label } from './ui/label';

interface EditorPreviewProps {
  className?: string;
  content?: JSONContent;
  config?: Partial<EditorProps['config']>;
}

export function EditorPreview(props: EditorPreviewProps) {
  const { className, content: defaultContent, config: defaultConfig } = props;
  const {
    editor,
    previewText,
    setPreviewText,
    setEditor,
    setJson,
    subject,
    setSubject,
    from,
    setFrom,
    replyTo,
    setReplyTo,
    to,
    setTo,
    apiKey,
  } = useEditorContext((s) => s);

  const [showReplyTo, setShowReplyTo] = useState(false);

  const defaultHtml = `<h3><strong>Let's Keep It Simple (Like, Really Simple)</strong></h3><p>Sometimes, the best way to reach people is the simplest way. No tracking pixels. No dashboards full of charts. Just thoughtful, human-to-human communication.</p><p>We’ve built a newsletter service that’s all about keeping it personal. It’s designed for those who care more about sharing good ideas than watching analytics. Think of it as a quiet conversation with your readers, without the noise of metrics or fancy features getting in the way.</p><p>If this sounds like your kind of thing, I won’t ask you to click through to a landing page or fill out a form. Instead, if you're curious and want to hear more, just subscribe to this newsletter for updates.</p><p>P.S. Yep, this email is the newsletter.</p>`;

  return (
    <div className={cn('mt-8', className)}>
      <Label className="flex items-center font-normal">
        <span className="w-20 shrink-0 font-normal text-gray-600 after:ml-0.5 after:text-red-400 after:content-['*']">
          Subject
        </span>
        <Input
          className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          placeholder="Email Subject"
          type="text"
          value={subject}
        />
      </Label>
      <div className="flex items-center gap-1.5">
        <Label className="flex grow items-center font-normal">
          <span className="w-20 shrink-0 font-normal text-gray-600">From</span>
          <Input
            className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={!apiKey}
            onChange={(e) => {
              setFrom(e.target.value);
            }}
            placeholder="Minimum Devs <dev@minimum.studio>"
            type="text"
            value={from}
          />
        </Label>

        {showReplyTo ? null : (
          <button
            className="inline-block h-full shrink-0 bg-transparent px-1 text-sm text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            disabled={!apiKey}
            onClick={() => {
              setShowReplyTo(true);
            }}
            type="button"
          >
            Reply-To
          </button>
        )}
      </div>
      {showReplyTo ? (
        <Label className="flex items-center font-normal">
          <span className="w-20 shrink-0 font-normal text-gray-600">
            Reply-To
          </span>
          <div className="align-content-stretch flex grow items-center">
            <Input
              className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={!apiKey}
              onChange={(e) => {
                setReplyTo(e.target.value);
              }}
              placeholder="noreply@minimum.studio"
              type="text"
              value={replyTo}
            />
            <button
              className="flex h-10 shrink-0 items-center bg-transparent px-1 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => {
                setReplyTo('');
                setShowReplyTo(false);
              }}
              type="button"
            >
              <X className="inline-block" size={16} />
            </button>
          </div>
        </Label>
      ) : null}
      <Label className="flex items-center font-normal">
        <span className="w-20 shrink-0 font-normal text-gray-600">To</span>
        <Input
          className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={!apiKey}
          onChange={(e) => {
            setTo(e.target.value);
          }}
          placeholder="Email Recipient(s)"
          type="text"
          value={to}
        />
      </Label>

      <div className="relative my-6">
        <Input
          className="h-auto rounded-none border-x-0 border-gray-300 px-0 py-2.5 pr-5 text-base focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setPreviewText(e.target.value);
          }}
          placeholder="Preview Text"
          type="text"
          value={previewText}
        />
        <span className="absolute right-0 top-0 flex h-full items-center">
          <PreviewTextInfo />
        </span>
      </div>
      <div>
        {!editor ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        ) : null}
        <Editor
          config={{
            hasMenuBar: false,
            wrapClassName: 'editor-wrap',
            bodyClassName: '!mt-0 !border-0 !p-0',
            contentClassName: 'editor-content',
            toolbarClassName: 'flex-wrap !items-start',
            spellCheck: false,
            autofocus: false,
            ...defaultConfig,
          }}
          contentHtml={defaultHtml}
          contentJson={defaultContent}
          onCreate={(e) => {
            setEditor(e as unknown as TiptapEditor);
            setJson(e?.getJSON() || {});
          }}
          onUpdate={(e) => {
            setEditor(e as unknown as TiptapEditor);
            setJson(e?.getJSON() || {});
          }}
        />
      </div>
    </div>
  );
}
