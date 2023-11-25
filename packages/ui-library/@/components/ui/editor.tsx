"use client";

import React, { useCallback, useEffect, useState } from "react";
import ArrowUTurnLeftIcon from "@heroicons/react/24/outline/ArrowUturnLeftIcon";
import ArrowUTurnRightIcon from "@heroicons/react/24/outline/ArrowUturnRightIcon";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import Bold from "@tiptap/extension-bold";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import classNames from "classnames";

import { Button } from "./button";

interface SimpleEditorProps {
  className?: string;
  content?: string;
  onChange: (content: string) => void;
}

function SimpleEditor({ content, onChange, className }: SimpleEditorProps) {
  const [charCount, setCharCount] = useState(0);
  const [showCharCount, setShowCharCount] = useState(false);

  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Bold,
      Underline,
      Italic,
      Typography,
      CharacterCount.configure({}),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Type something...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getText());
      setCharCount(editor.storage.characterCount.characters());
    },
  }) as Editor;

  useEffect(() => {
    if (editor) {
      setCharCount(editor.storage.characterCount.characters());
    }
  }, [editor]);

  const toggleCharCountDisplay = () => {
    setShowCharCount(!showCharCount);
  };

  const copyToClipboard = () => {
    if (editor && navigator.clipboard) {
      const content = editor.getText();
      navigator.clipboard
        .writeText(content)
        .then(() => console.log("Content copied to clipboard"))
        .catch((err) => console.error("Failed to copy content", err));
    }
  };

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={classNames(
        "h-inherit flex w-full flex-col rounded-md px-8 py-4 text-stone-900",
        className,
      )}
    >
      {editor && (
        <>
          {/* TODO add other buttons */}
          <EditorContent editor={editor} />
          <div className="z-30 flex w-full items-center justify-start gap-8 self-center pt-3">
            <div className="flex items-center justify-between">
              <Button
                className="menu-button mr-1 border border-slate-500"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <ArrowUTurnLeftIcon className="h-5 w-5 text-black" />
              </Button>
              <Button
                className="menu-button mr-1 border border-slate-500"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <ArrowUTurnRightIcon className="h-5 w-5 text-black" />
              </Button>
              <Button
                className="menu-button border border-slate-500"
                disabled={charCount === 0}
                onClick={copyToClipboard}
              >
                <ClipboardIcon className="h-5 w-5 text-black" />
              </Button>
            </div>
            <div className="flex w-1/4 items-center justify-between">
              <Button
                className={classNames("menu-button border border-slate-500", {
                  "is-active": editor.isActive("bold"),
                })}
                onClick={toggleBold}
              >
                Bold
              </Button>
              <Button
                className={classNames("menu-button border border-slate-500", {
                  "is-active": editor.isActive("underline"),
                })}
                onClick={toggleUnderline}
              >
                Underline
              </Button>
              <Button
                className={classNames("menu-button border border-slate-500", {
                  "is-active": editor.isActive("intalic"),
                })}
                onClick={toggleItalic}
              >
                Italic
              </Button>
            </div>
            <div className="flex w-1/2 items-center justify-between">
              <Button
                className="border border-slate-500"
                onClick={toggleCharCountDisplay}
              >
                Word count
              </Button>
              {showCharCount && <span className="text-black">{charCount}</span>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { SimpleEditor };
