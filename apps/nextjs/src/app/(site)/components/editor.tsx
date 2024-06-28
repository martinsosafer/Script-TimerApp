"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ArrowUTurnLeftIcon from "@heroicons/react/24/outline/ArrowUturnLeftIcon";
import ArrowUTurnRightIcon from "@heroicons/react/24/outline/ArrowUturnRightIcon";
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
import { EditorContent, useEditor } from "@tiptap/react";
import classNames from "classnames";

import { Button } from "@voiceai/ui";
import { IconCopy } from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import { CharLimitModal } from "./charlimit-modal";

interface TextEditorProps {
  className?: string;
  onChange: (content: string) => void;
  updatedContent?: string;
  scriptLoaded: boolean;
  script: string;
  isSubscriptionActive?: boolean;
}
const CHAR_LIMITS = {
  FREE: 300,
  FREE_TRIAL: 1600,
  STUDENT: 2000,
  CREATOR: 5000,
  BUSINESS: 5000,
};
function TextEditor({
  onChange,
  className,
  updatedContent,
  scriptLoaded,
  script,
  subData,
}: TextEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("SUBDATA", subData.status);
  const [charCount, setCharCount] = useState(0);
  const [showCharCount, setShowCharCount] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [localContent, setLocalContent] = useState(script);
  const { scriptId } = useParams();
  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );
  const editorKey = scriptId?.[0] ?? "default";
  const charLimit = CHAR_LIMITS[subData.status] || CHAR_LIMITS.FREE;
  const editor = useEditor({
    extensions: useMemo(
      () => [
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
      [scriptLoaded],
    ),
    content: localContent,
    editorProps: {
      attributes: {
        class:
          "h-full prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none overflow-hidden overflow-y-auto break-words border border-slate-400 bg-white dark:border-black",
      },
      transformPastedText(text) {
        return text.toUpperCase();
      },
    },
    onUpdate: useCallback(
      ({ editor }) => {
        const text = editor.getText();
        setLocalContent(text);
        setCharCount(text.length);

        // Throttle or debounce onChange calls here
        const handleUpdate = () => onChange(text);
        const debounceUpdate = debounce(handleUpdate, 300); // Adjust the debounce delay as needed
        debounceUpdate();
      },
      [onChange],
    ),
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

  useEffect(() => {
    if (charCount >= charLimit) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [charCount, charLimit]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const copyToClipboard = useCallback(() => {
    if (editor && navigator.clipboard) {
      const content = editor.getText();
      navigator.clipboard
        .writeText(content)
        .then(() => console.log("Content copied to clipboard"))
        .catch((err) => console.error("Failed to copy content", err));
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={classNames(
        "flex flex-col rounded-md py-2 text-stone-900",
        className,
      )}
    >
      <div className="ml-1 flex flex-col items-center justify-center gap-2 md:flex-row lg:justify-start">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            className={classNames(
              "rounded-full border border-slate-500 bg-white",
              {
                "is-active": editor.isActive("bold"),
              },
            )}
            onClick={toggleBold}
          >
            <FontBoldIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className={classNames(
              "rounded-full border border-slate-500 bg-white",
              {
                "is-active": editor.isActive("underline"),
              },
            )}
            onClick={toggleUnderline}
          >
            <UnderlineIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className={classNames(
              "rounded-full border border-slate-500 bg-white",
              {
                "is-active": editor.isActive("italic"),
              },
            )}
            onClick={toggleItalic}
          >
            <FontItalicIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            className="rounded-full border border-slate-500 bg-white"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <ArrowUTurnLeftIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full border border-slate-500 bg-white"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <ArrowUTurnRightIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full border border-slate-500 bg-white"
            disabled={charCount === 0}
            onClick={copyToClipboard}
          >
            <IconCopy className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative mt-2 h-[408px] min-h-0 flex-shrink overflow-x-auto overflow-y-auto">
        <EditorContent
          key={editorKey}
          editor={editor}
          className="h-full"
          style={{ wordWrap: "break-word" }}
        />

        {showCharCount && (
          <div className="absolute bottom-0 right-0 mb-2 mr-3 text-sm text-gray-600">
            {charCount}
          </div>
        )}
        {showModal && (
          <CharLimitModal
            onClose={() => setShowModal(false)}
            subData={subData.status}
          />
        )}
      </div>
    </div>
  );
}

// Debounce function to limit the rate of onChange calls
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export { TextEditor };
