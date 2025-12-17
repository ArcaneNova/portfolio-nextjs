"use client"

import { useRef } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Link } from "@tiptap/extension-link"
import { Image } from "@tiptap/extension-image"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Highlight } from "@tiptap/extension-highlight"
import { TextAlign } from "@tiptap/extension-text-align"
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Redo,
  Undo,
  Loader,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface RichEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageUploadRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:")
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }

  const uploadImageToCloudinary = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio")

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      if (!cloudName) {
        throw new Error("Cloudinary cloud name is not configured")
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "Failed to upload image")
      }

      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error("Image upload error:", error)
      throw error
    }
  }

  const addImage = () => {
    imageUploadRef.current?.click()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const url = await uploadImageToCloudinary(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch (error) {
      alert("Failed to upload image. Please try again.")
    }

    // Reset input
    if (imageUploadRef.current) {
      imageUploadRef.current.value = ""
    }
  }

  const ToolbarButton = ({ onClick, isActive, icon: Icon, title }: any) => {
    return (
      <Button
        type="button"
        variant={isActive ? "default" : "outline"}
        size="sm"
        onClick={onClick}
        title={title}
        className="h-9 w-9 p-0"
      >
        <Icon className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="w-full border rounded-lg bg-white overflow-hidden">
      <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          icon={Bold}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          icon={Italic}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          icon={Strikethrough}
          title="Strikethrough"
        />
        <div className="w-px bg-border" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          icon={Heading1}
          title="Heading 1"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          icon={Heading2}
          title="Heading 2"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          icon={Heading3}
          title="Heading 3"
        />
        <div className="w-px bg-border" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          icon={List}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          icon={ListOrdered}
          title="Ordered List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          icon={Quote}
          title="Blockquote"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          icon={Code}
          title="Code Block"
        />
        <div className="w-px bg-border" />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          icon={AlignLeft}
          title="Align Left"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          icon={AlignCenter}
          title="Align Center"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          icon={AlignRight}
          title="Align Right"
        />
        <div className="w-px bg-border" />
        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive("link")}
          icon={LinkIcon}
          title="Add Link"
        />
        <ToolbarButton
          onClick={addImage}
          icon={ImageIcon}
          title="Add Image"
        />
        <div className="w-px bg-border" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={Undo}
          title="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={Redo}
          title="Redo"
        />
      </div>
      <div
        className="w-full bg-white text-black overflow-y-auto"
        style={{
          height: "400px",
        }}
      >
        <EditorContent
          editor={editor}
          className="p-4"
          style={{
            minHeight: "400px",
          }}
        />
      </div>
      <style jsx>{`
        :global(.tiptap) {
          color: #000 !important;
          background: white !important;
        }
        :global(.tiptap p) {
          color: #000 !important;
          margin: 1rem 0 !important;
          line-height: 1.75 !important;
        }
        :global(.tiptap h1) {
          color: #000 !important;
          font-size: 2.25rem !important;
          font-weight: 900 !important;
          margin: 2rem 0 1.5rem 0 !important;
          line-height: 1.2 !important;
        }
        :global(.tiptap h2) {
          color: #000 !important;
          font-size: 1.875rem !important;
          font-weight: 800 !important;
          margin: 1.75rem 0 1.25rem 0 !important;
          line-height: 1.25 !important;
          padding-top: 1rem !important;
          border-top: 1px solid #e5e7eb !important;
        }
        :global(.tiptap h3) {
          color: #000 !important;
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          margin: 1.5rem 0 1rem 0 !important;
          line-height: 1.3 !important;
        }
        :global(.tiptap h4) {
          color: #000 !important;
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          margin: 1.25rem 0 0.75rem 0 !important;
          line-height: 1.35 !important;
        }
        :global(.tiptap h5) {
          color: #000 !important;
          font-size: 1.125rem !important;
          font-weight: 700 !important;
          margin: 1rem 0 0.75rem 0 !important;
          line-height: 1.4 !important;
        }
        :global(.tiptap h6) {
          color: #000 !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          margin: 0.75rem 0 0.5rem 0 !important;
          line-height: 1.4 !important;
        }
        :global(.tiptap ul),
        :global(.tiptap ol) {
          color: #000 !important;
          margin: 1rem 0 !important;
          padding-left: 2rem !important;
        }
        :global(.tiptap li) {
          color: #000 !important;
          margin: 0.5rem 0 !important;
          line-height: 1.75 !important;
        }
        :global(.tiptap blockquote) {
          color: #666 !important;
          border-left: 4px solid #ddd !important;
          background: #f5f5f5 !important;
          margin: 1.5rem 0 !important;
          padding: 1rem 1.5rem !important;
          line-height: 1.75 !important;
        }
        :global(.tiptap code) {
          color: #d63384 !important;
          background: #f4f4f4 !important;
          padding: 0.25rem 0.5rem !important;
          border-radius: 4px !important;
        }
        :global(.tiptap pre) {
          background: #1f1f1f !important;
          color: #e0e0e0 !important;
          padding: 1rem !important;
          border-radius: 6px !important;
          overflow-x: auto !important;
          margin: 1.5rem 0 !important;
        }
        :global(.tiptap pre code) {
          background: transparent !important;
          color: inherit !important;
          padding: 0 !important;
          font-size: 14px !important;
          font-family: "Monaco", "Courier New", monospace !important;
        }
        :global(.tiptap img) {
          max-width: 100% !important;
          height: auto !important;
          margin: 1.5rem 0 !important;
          border-radius: 8px !important;
        }
        :global(.tiptap a) {
          color: #0066cc !important;
          text-decoration: underline !important;
        }
      `}</style>
      <input
        ref={imageUploadRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  )
}
