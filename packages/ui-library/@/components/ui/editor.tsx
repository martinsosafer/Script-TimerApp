"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BiBold, BiItalic, BiUnderline } from "react-icons/bi"; // Assuming you are using react-icons for simplicity

interface TiptapEditorProps {
  className?: string;
  content?: string;
  onChange: (content: string) => void;
}

const TiptapEditor = ({ className, content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Use getHTML() for rich text
    },
    editorProps: {
      attributes: {
        class:
          "outline-none ring-transparent prose h-full w-full border-gray-400 border rounded-md text-black p-2",
      },
    },
  });

  if (!editor) {
    return null;
  }

  // Function to run editor commands such as 'setBold', 'setItalic', etc.
  const applyFormat = (format: () => void) => {
    format();
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <EditorContent editor={editor} className="flex-grow" />
      <div className="flex items-center justify-between border-t p-2">
        <button
          onClick={() =>
            applyFormat(() => editor.chain().focus().toggleBold().run())
          }
          className="p-1"
        >
          hello
        </button>
        <button
          onClick={() =>
            applyFormat(() => editor.chain().focus().toggleItalic().run())
          }
          className="p-1"
        >
          <BiItalic size="1.25em" />
        </button>
        <button
          onClick={() =>
            applyFormat(() => editor.chain().focus().toggleUnderline().run())
          }
          className="p-1"
        >
          <BiUnderline size="1.25em" />
        </button>
      </div>
    </div>
  );
};

export { TiptapEditor };
