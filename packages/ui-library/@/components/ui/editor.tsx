"use client";

import React, { useCallback, useState } from "react";
import ArrowUTurnLeftIcon from "@heroicons/react/24/outline/ArrowUturnLeftIcon";
import ArrowUTurnRightIcon from "@heroicons/react/24/outline/ArrowUturnRightIcon";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
// TODO: create button to give word count
// import CharacterCount from "@tiptap/extension-character-count";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import classNames from "classnames";

import { Button } from "./button";

function SimpleEditor({ content, onChange, className }) {
  const editor = useEditor({
    extensions: [Document, History, Paragraph, Text, Bold, Underline, Italic],
    content: content,
  }) as Editor;

  const toggleBold = useCallback(() => {
    // editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    // editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    // editor.chain().focus().toggleItalic().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-4 flex h-full w-full flex-col rounded-md px-8 py-5">
      {/* TODO add other buttons */}
      <EditorContent editor={editor} />
      <div className="z-30 m-0 flex h-[50px] w-full items-center justify-evenly gap-8 self-center py-4">
        <Button
          className="menu-button"
          // onClick={() => editor.chain().focus().undo().run()}
          // disabled={!editor.can().undo()}
        >
          <ArrowUTurnLeftIcon className="h-5 w-5 text-black" />
        </Button>
        <Button
          className="menu-button"
          // onClick={() => editor.chain().focus().redo().run()}
          // disabled={!editor.can().redo()}
        >
          <ArrowUTurnRightIcon className="h-5 w-5 text-black" />
        </Button>
        <Button
          className={classNames("menu-button", {
            // "is-active": editor.isActive("bold"),
          })}
          onClick={toggleBold}
        >
          Bold
        </Button>
        <Button
          className={classNames("menu-button", {
            // "is-active": editor.isActive("underline"),
          })}
          onClick={toggleUnderline}
        >
          Underline
        </Button>
        <Button
          className={classNames("menu-button", {
            // "is-active": editor.isActive("intalic"),
          })}
          onClick={toggleItalic}
        >
          Italic
        </Button>
      </div>
    </div>
  );
}
// const MenuBar = (editor) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="flex w-full border border-gray-400 p-2 text-black">
//       <div className="flex w-1/3 justify-evenly">
//         <Button onClick={() => editor.value.chain().focus().toggleBold().run()}>
//           Bold
//         </Button>

//         <Button
//         // onClick={() => editor.chain().focus().setUnderline().run()}
//         // disabled={editor.isActive("underline")}
//         >
//           Underline
//         </Button>

//         <Button
//         // onClick={() => editor.chain().focus().toggleItalic().run()}
//         // disabled={!editor.can().chain().focus().toggleItalic().run()}
//         // className={editor.isActive("italic") ? "is-active" : ""}
//         >
//           Italic
//         </Button>
//       </div>
//       <div className="flex w-1/5 justify-evenly">
//         <Button
//         // onClick={() => editor.chain().focus().undo().run()}
//         // disabled={!editor.can().chain().focus().undo().run()}
//         >
//           <ArrowUTurnLeftIcon className="h-5 w-5 text-black" />
//         </Button>
//         <Button
//         // onClick={() => editor.chain().focus().redo().run()}
//         // disabled={!editor.can().chain().focus().redo().run()}
//         >
//           <ArrowUTurnRightIcon className="h-5 w-5 text-black" />
//         </Button>
//       </div>
//       {/* <div>Characters:{editor.storage.characterCount.characters()}</div> */}
//     </div>
//   );
// };

// const TiptapEditor = ({ className, content, onChange }) => {
//   const editor = useEditor({
//     extensions: [
//       Document,
//       Paragraph,
//       Text,
//       CharacterCount,
//       Bold,
//       Italic,
//       Underline,
//     ],

//     content: content,

//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML()); // Use getHTML() for rich text
//     },
//     editorProps: {
//       attributes: {
//         class:
//           "outline-none ring-transparent prose h-full w-full border-collapse border-gray-400 border rounded-t-md text-black p-2",
//       },
//     },
//   });

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className={`flex flex-col ${className}`}>
//       hiii
//       <EditorContent editor={editor} className="h-5/6 w-full" />
//       <MenuBar editor={editor} />
//     </div>
//   );
// };

export { SimpleEditor };
