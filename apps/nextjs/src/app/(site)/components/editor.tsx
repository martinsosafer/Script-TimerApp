"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
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
import { Document as TipTapDocument } from "@tiptap/extension-document";
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
import { Document, Paragraph as DocxParagraph, Packer, TextRun } from "docx"; // Import docx
import { jsPDF } from "jspdf";

import { Button } from "@voiceai/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@voiceai/ui/@/components/ui/dropdown-menu";
import { IconCopy } from "@voiceai/ui/@/components/ui/icons";

import type { SubscriptionData } from "~/lib/types";
import { api } from "~/utils/api";
import { CharLimitModal } from "./charlimit-modal";

interface TextEditorProps {
  className?: string;
  onChange: (content: string) => void;
  updatedContent?: string;
  scriptLoaded: boolean;
  script: string;
  richContent: string;
  setRichContent: (content: string) => void;
  isSubscriptionActive?: boolean;
  subData: SubscriptionData | null | undefined;
}

const CHAR_LIMITS: Record<string, number> = {
  FREE: 300,
  FREE_TRIAL: 1600,
  STUDENT: 2000,
  CREATOR: 5000,
  BUSINESS: 10000,
};

function TextEditor({
  onChange,
  className,
  updatedContent,
  scriptLoaded,
  script,
  subData,
  richContent,
  setRichContent,
}: TextEditorProps) {
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
  const charLimit = (subData ? CHAR_LIMITS[subData.status] : CHAR_LIMITS.FREE)!;
  const editor = useEditor({
    extensions: useMemo(
      () => [
        TipTapDocument,
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
          placeholder:
            scriptLoaded && scriptDetails?.rich_text
              ? ""
              : "1. Add your script here\n2. Choose the voice actor you like\n3. You can quickly check spelling and grammar",
        }),
      ],
      [scriptLoaded],
    ),
    content: richContent,
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

        const htmlContent = editor.getHTML();
        setRichContent(htmlContent);
        // Throttle or debounce onChange calls here
        console.log("Plain Text Content:", text);
        console.log("Rich Text Content (HTML):", htmlContent);
        const handleUpdate = () => onChange(text);
        const debounceUpdate = debounce(handleUpdate, 300); // Adjust the debounce delay as needed
        debounceUpdate();
      },
      [onChange, setRichContent],
    ),
  })!;

  useEffect(() => {
    if (editor) {
      if (scriptDetails?.rich_text) {
        console.log("Setting editor content:", scriptDetails.rich_text);
        editor.commands.setContent(scriptDetails.rich_text);
      } else {
        console.log("No script content found, setting editor to empty string");
        editor.commands.setContent(""); // Set content to empty to trigger the placeholder
      }
    }
  }, [scriptDetails, editor]);
  useEffect(() => {
    if (editor && updatedContent) {
      console.log("Updating content with updatedContent:", updatedContent);
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

  // Function to handle PDF generation
  const saveAsPDF = () => {
    if (editor) {
      const content = editor.getText();
      const pdf = new jsPDF("p", "pt", "letter");
      const margin = { top: 30, right: 30, bottom: 30, left: 30 };
      pdf.text(content, margin.left, margin.top, {
        align: "left",
        maxWidth: 500,
      });
      pdf.save("document.pdf");
    }
  };

  // Function to handle DOCX generation
  const saveAsDOCX = async () => {
    if (editor) {
      const content = editor.getText();
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new DocxParagraph({
                children: [new TextRun(content)],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.docx";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const saveAsSRT = () => {
    if (editor) {
      const content = editor.getText();
      const srtContent = convertToSRT(content);
      const blob = new Blob([srtContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "document.srt";
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  // Helper function to convert text to SRT format with time code separation
  const convertToSRT = (text) => {
    const totalDuration = 86.5; // Average of 1:23 (83 seconds) and 1:30 (90 seconds)
    const totalChars = text.length;
    const timePerChar = totalDuration / totalChars;

    const formatTime = (seconds) => {
      const date = new Date(seconds * 1000);
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const secs = String(date.getUTCSeconds()).padStart(2, "0");
      const millis = String(date.getUTCMilliseconds()).padStart(3, "0");
      return `${hours}:${minutes}:${secs},${millis}`;
    };

    let startTime = 0;
    let currentIndex = 0;
    const wordsPerSubtitle = 5; // Approximate number of words per subtitle line

    return text
      .split(" ")
      .reduce((acc, word, index, array) => {
        if (index % wordsPerSubtitle === 0 && index !== 0) {
          const subtitle = array.slice(currentIndex, index).join(" ");
          const duration = subtitle.length * timePerChar;
          const endTime = startTime + duration;
          acc.push(
            `${acc.length + 1}\n${formatTime(startTime)} --> ${formatTime(endTime)}\n${subtitle}\n`,
          );
          startTime = endTime;
          currentIndex = index;
        }
        if (index === array.length - 1) {
          const subtitle = array.slice(currentIndex).join(" ");
          const duration = subtitle.length * timePerChar;
          const endTime = startTime + duration;
          acc.push(
            `${acc.length + 1}\n${formatTime(startTime)} --> ${formatTime(endTime)}\n${subtitle}\n`,
          );
        }
        return acc;
      }, [])
      .join("\n");
  };

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
        <div className="flex gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full border border-slate-500 bg-white"
              >
                <ArrowDownOnSquareIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
              <DropdownMenuLabel>Download</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="focus:bg-slate-200">
                  <button onClick={saveAsPDF}>as .PDF</button>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-slate-200">
                  <button onClick={saveAsDOCX}>as .DOCX</button>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-slate-200">
                  <button onClick={saveAsSRT}> as .SRT</button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
            subData={subData?.status}
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
