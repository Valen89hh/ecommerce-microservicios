import '../../styles/tiptap.scss'

import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  CornerDownLeft,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Table as TableIcon,
  ChevronDown,
  PanelLeft,
  PanelRight,
  PanelLeftClose,
  PanelTop,
  PanelBottom,
  PanelTopClose,
  Grid2X2X,
  TableCellsMerge,
  TableCellsSplit,
  LayoutPanelLeft,
  LayoutPanelTop,
  LayoutDashboard,
} from "lucide-react"

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'



const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!editor) {
    return null
  }

  return (
    <div className="control-group bg-background p-2 dark:bg-dark-background border-b rounded-t-lg border-border dark:border-dark-border">
      <div className="button-group flex justify-between items-center">
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1 pr-1 border-r border-border dark:border-dark-border'>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleBold()
                  .run()
              }
              className={editor.isActive('bold') ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <Bold size={20}/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleItalic()
                  .run()
              }
              className={editor.isActive('italic') ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <Italic size={20}/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleStrike()
                  .run()
              }
              className={editor.isActive('strike') ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <Strikethrough size={20}/>
            </button>
          </div>
          <div className='flex items-center gap-1 pr-1 border-r border-border dark:border-dark-border'>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <Heading1 size={20}/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <Heading2 size={20}/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <Heading3 size={20}/>
            </button>
          </div>
          <div className='flex items-center gap-1 pr-1'>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <List size={20}/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <ListOrdered size={20}/>
            </button>
            <div className='relative' ref={ref}>
              <div className='flex items-center'>
                <button className='text-muted dark:text-dark-muted' onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                  <TableIcon size={20}/>
                </button>
                <button onClick={toggleDropdown} type='button'>
                  <ChevronDown className='text-muted dark:text-dark-muted' size={12}/>
                </button>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-1 bg-card min-w-max dark:bg-dark-card border border-border dark:border-dark-border rounded-sm z-10 shadow"
                  >
                    <li className='flex justify-between items-center'>
                      <button
                        title='Add column before'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}>
                        <PanelLeft size={20}/>
                      </button>
                      <button
                        title='Add column after'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}>
                        <PanelRight size={20}/>
                      </button>
                      <button
                        title='Delete column'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}>
                        <PanelLeftClose size={20}/>
                      </button>
                    </li>
                    <li className='flex justify-between items-center'>
                      <button
                        title='Add row before'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}>
                        <PanelTop size={20}/>
                      </button>
                      <button
                        title='Add row after'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}>
                        <PanelBottom size={20}/>
                      </button>
                      <button
                        title='Delete row'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}>
                        <PanelTopClose size={20}/>
                      </button>
                    </li>
                    <li className='flex justify-between items-center'>
                      <button
                        title='Delete table'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}>
                        <Grid2X2X size={20}/>
                      </button>
                      <button
                        title='Merge cells'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().mergeCells().run()} disabled={!editor.can().mergeCells()}>
                        <TableCellsMerge size={20}/>
                      </button>
                      <button
                        title='Split cell'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().splitCell().run()} disabled={!editor.can().splitCell()}>
                        <TableCellsSplit size={20}/>
                      </button>
                    </li>
                    <li className='flex justify-between items-center'>
                      <button
                        title='Toggle header column'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().toggleHeaderColumn().run()} disabled={!editor.can().toggleHeaderColumn()}>
                        <LayoutPanelLeft size={20}/>
                      </button>
                      <button
                        title='Toggle header row'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().toggleHeaderRow().run()} disabled={!editor.can().toggleHeaderRow()}>
                        <LayoutPanelTop size={20}/>
                      </button>
                      <button
                        title='Toggle header cell'
                        className="hover:bg-background w-full inline-flex items-center justify-center text-text dark:text-dark-text dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
                        onClick={() => editor.chain().focus().toggleHeaderCell().run()} disabled={!editor.can().toggleHeaderCell()}>
                        <LayoutDashboard size={20}/>
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'text-primary dark:text-dark-primary' : 'text-muted dark:text-dark-muted'}
            >
              <Quote size={20}/>
            </button>
            <button className='text-muted dark:text-dark-muted' onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              <Minus size={20}/>
            </button>
            <button className='text-muted dark:text-dark-muted' onClick={() => editor.chain().focus().setHardBreak().run()}>
              <CornerDownLeft size={20}/>
            </button>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
            className='text-muted dark:text-dark-muted'
          >
            <Undo size={20}/>
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
            className='text-muted dark:text-dark-muted'
          >
            <Redo size={20}/>
          </button>
        </div>
      </div>
    </div>
  )
}

const extensions = [
  TextStyle,
  ListItem,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  // Default TableCell
  // TableCell,
  // Custom TableCell with backgroundColor attribute
  CustomTableCell,

]

interface Props{
    onChange?: (value: string)=>void,
    content?: string
}

const Tiptap: React.FC<Props> = ({
  onChange,
  content
}) => {
    const [isFocus, setIsFocus] = useState(false)
    return ( 
      <div className={twMerge(
        'border transition-all rounded-lg',
        isFocus
          ? "border-primary dark:border-dark-primary"
          : "border-border dark:border-dark-border"
      )}>
        <EditorProvider 
          slotBefore={<MenuBar />} 
          extensions={extensions} 
          content={content}
          editorProps={{
            attributes: {
              class: 'outline-none px-2 min-h-20 max-h-100 overflow-y-auto', // Aplica la clase personalizada para estilos específicos
            },
          }}
          onUpdate={({editor})=>{
              if(onChange) {
                  if(!editor.getText()){
                      onChange("")
                  }else{
                      onChange(editor.getHTML())
                  } 
              }
          }}
          onFocus={()=>{
              setIsFocus(true)
          }}
          onBlur={()=>{
            setIsFocus(false)
          }}
        >
        </EditorProvider>
      </div>

    );
}
 
export default Tiptap;