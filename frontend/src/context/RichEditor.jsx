import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Pilcrow,
  Highlighter,
  Minus,
  Code,
  Eye,
  Edit3,
  Sparkles
} from "lucide-react";

const RichTextEditor = ({ content, onChange, placeholder = "Write your insight here..." }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, isActive = false, children, title }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded transition-all duration-200 hover:scale-110 ${
        isActive 
          ? 'bg-[#194C63] text-white shadow-md' 
          : 'hover:bg-[#F5FAFD] text-[#3C637B]'
      }`}
    >
      {children}
    </button>
  );

  const Divider = () => (
    <div className="w-px h-6 bg-[#D0DDEE] mx-1" />
  );

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: "#D0DDEE" }}>
      {/* Toolbar */}
      <div className="bg-[#F5FAFD] border-b p-2 flex flex-wrap gap-1 items-center" style={{ borderColor: "#D0DDEE" }}>
        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Special Elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          title="Highlight"
        >
          <Highlighter className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Horizontal Rule */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Line"
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <div className="flex-1" />

        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        {/* Character Count */}
        <div className="flex items-center gap-1 ml-2 px-3 py-1 rounded-full bg-white border" style={{ borderColor: "#D0DDEE" }}>
          <Pilcrow className="w-3 h-3" style={{ color: "#748DB0" }} />
          <span className="text-xs font-medium" style={{ color: "#3C637B" }}>
            {editor.storage.characterCount?.characters() || 0}
          </span>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <EditorContent editor={editor} />
        
        {/* Floating Preview Toggle (Optional) */}
        <div className="absolute bottom-4 right-4">
          <button
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-110 group"
            style={{ border: "1px solid #D0DDEE" }}
            title="Preview"
          >
            <Eye className="w-4 h-4 text-[#3C637B] group-hover:text-[#194C63]" />
          </button>
        </div>
      </div>

      {/* Word Count Footer */}
      <div className="bg-[#F5FAFD] border-t px-4 py-2 flex justify-between items-center text-xs" style={{ borderColor: "#D0DDEE" }}>
        <div className="flex items-center gap-4">
          <span style={{ color: "#748DB0" }}>
            Words: {editor.storage.characterCount?.words() || 0}
          </span>
          <span style={{ color: "#748DB0" }}>
            Characters: {editor.storage.characterCount?.characters() || 0}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3" style={{ color: "#B3785A" }} />
          <span style={{ color: "#3C637B" }}>Rich text formatting</span>
        </div>
      </div>

      <style jsx global>{`
        /* TipTap Editor Styles */
        .ProseMirror {
          min-height: 300px;
          padding: 1rem;
          outline: none;
          color: #0C0D14;
        }
        
        .ProseMirror p {
          margin: 0.5em 0;
        }
        
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: 700;
          margin: 0.5em 0;
          color: #194C63;
        }
        
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 0.5em 0;
          color: #194C63;
        }
        
        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: 600;
          margin: 0.5em 0;
          color: #194C63;
        }
        
        .ProseMirror ul, 
        .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .ProseMirror li {
          margin: 0.2em 0;
        }
        
        .ProseMirror blockquote {
          border-left: 3px solid #B3785A;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #3C637B;
        }
        
        .ProseMirror code {
          background: #F5FAFD;
          border: 1px solid #D0DDEE;
          border-radius: 4px;
          padding: 0.2em 0.4em;
          font-family: monospace;
          font-size: 0.9em;
        }
        
        .ProseMirror pre {
          background: #0C0D14;
          color: #F5FAFD;
          border-radius: 8px;
          padding: 1em;
          overflow-x: auto;
        }
        
        .ProseMirror pre code {
          background: none;
          border: none;
          color: inherit;
          padding: 0;
        }
        
        .ProseMirror hr {
          border: none;
          border-top: 2px solid #D0DDEE;
          margin: 2em 0;
        }
        
        .ProseMirror mark {
          background: rgba(179, 120, 90, 0.2);
          color: inherit;
        }
        
        .ProseMirror .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #AAB6CB;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        
        .ProseMirror:focus {
          outline: none;
        }
        
        /* Selected text styling */
        .ProseMirror ::selection {
          background: rgba(179, 120, 90, 0.2);
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;