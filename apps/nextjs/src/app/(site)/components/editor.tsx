"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArrowUTurnLeftIcon from "@heroicons/react/24/outline/ArrowUturnLeftIcon";
import ArrowUTurnRightIcon from "@heroicons/react/24/outline/ArrowUturnRightIcon";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import classNames from "classnames";

import { Button } from "@voiceai/ui";
import { IconCopy } from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";

interface TextEditorProps {
  className?: string;

  onChange: (content: string) => void;
  updatedContent?: string;
  scriptLoaded: boolean;
  script: string;
}

function TextEditor({
  onChange,
  className,
  updatedContent,
  scriptLoaded,
  script,
}: TextEditorProps) {
  const [charCount, setCharCount] = useState(0);
  const [showCharCount, setShowCharCount] = useState(false);
  const { scriptId } = useParams();
  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );
  const editorKey = scriptId?.[0] ?? "default";

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
      BulletList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      CharacterCount.configure({}),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: scriptLoaded
          ? ""
          : "1. Add your script here\n2. Choose the voice actor you like\n3. You can quickly check spelling and grammar",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "h-full prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none overflow-hidden overflow-y-auto break-words  border border-black ml-2",
      },
      transformPastedText(text) {
        return text.toUpperCase();
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getText()); //so it only gets the string for creating a script
      onChange(editor.getHTML()); // so it also get the styles when loading a chat
      setCharCount(editor.getCharacterCount());
    },
  })!;

  useEffect(() => {
    if (scriptDetails && editor) {
      editor.commands.setContent(scriptDetails.script);
    }
  }, [scriptDetails, editor]);

  useEffect(() => {
    if (editor && updatedContent) {
      editor.commands.setContent(updatedContent);
    }
  }, [updatedContent, editor]);

  const toggleCharCountDisplay = useCallback(() => {
    setShowCharCount(!showCharCount);
  }, [showCharCount]);

  const copyToClipboard = useCallback(() => {
    if (editor && navigator.clipboard) {
      const content = editor.getText();
      navigator.clipboard
        .writeText(content)
        .then(() => console.log("Content copied to clipboard"))
        .catch((err) => console.error("Failed to copy content", err));
    }
  }, [editor]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  // const toggleBulletList = useCallback(() => {
  //   editor.chain().focus().toggleBulletList().run();
  // }, [editor]);
  // const toggleHeading1 = useCallback(() => {
  //   editor.chain().focus().toggleHeading({ level: 1 }).run();
  // }, [editor]);
  // const toggleHeading2 = useCallback(() => {
  //   editor.chain().focus().toggleHeading({ level: 2 }).run();
  // }, [editor]);
  // const toggleHeading3 = useCallback(() => {
  //   editor.chain().focus().toggleHeading({ level: 3 }).run();
  // }, [editor]);
  // const toggleHeading4 = useCallback(() => {
  //   editor.chain().focus().toggleHeading({ level: 4 }).run();
  // }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={classNames(
        "flex flex-col rounded-md bg-white py-2 text-stone-900",
        className,
      )}
    >
      <div className="ml-1 flex flex-col items-center justify-center gap-2 md:flex-row lg:justify-start">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            className={classNames("rounded-full border border-slate-500", {
              "is-active": editor.isActive("bold"),
            })}
            onClick={toggleBold}
          >
            <FontBoldIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className={classNames("rounded-full border border-slate-500", {
              "is-active": editor.isActive("underline"),
            })}
            onClick={toggleUnderline}
          >
            <UnderlineIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className={classNames("rounded-full border border-slate-500", {
              "is-active": editor.isActive("italic"),
            })}
            onClick={toggleItalic}
          >
            <FontItalicIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full border border-slate-500"
            onClick={toggleCharCountDisplay}
          >
            Character count
          </Button>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            className="rounded-full border border-slate-500"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <ArrowUTurnLeftIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full border border-slate-500"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <ArrowUTurnRightIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full border border-slate-500"
            disabled={charCount === 0}
            onClick={copyToClipboard}
          >
            <IconCopy className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative mt-2 h-80 min-h-0 flex-shrink overflow-x-auto overflow-y-auto">
        <EditorContent
          key={editorKey}
          editor={editor}
          className="h-full" // Ensures the EditorContent fills its container vertically
          style={{ wordWrap: "break-word" }}
        />
        {showCharCount && (
          <div className="absolute bottom-0 right-0 mb-2 mr-3 text-sm text-gray-600">
            {charCount}
          </div>
        )}
      </div>
    </div>
  );
}

export { TextEditor };
