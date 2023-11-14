"use client";

import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = ({ ...props }) => {
  const { className, content } = props;
  const editor: Editor | null = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "h-32 w-full",
      },
    },
  });

  return editor ? (
    <EditorContent className={className} editor={editor} />
  ) : null;
};

export { TiptapEditor };
