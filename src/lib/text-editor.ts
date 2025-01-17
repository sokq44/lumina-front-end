import { Editor } from "@tiptap/react";
import {
  Bold,
  CodeXml,
  Italic,
  List,
  ListChecks,
  ListOrdered,
  LucideIcon,
  TextQuote,
  Underline,
} from "lucide-react";

abstract class MenuItem {
  public icon: LucideIcon;
  public label: string;
  protected editor: Editor;

  constructor(editor: Editor, icon: LucideIcon, label: string) {
    this.editor = editor;
    this.icon = icon;
    this.label = label;
  }

  public abstract toggle(): void;
}

class BoldMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Bold, "Bold");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBold().run();
  }
}

class UnderlineMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Underline, "Underline");
  }

  public override toggle() {
    this.editor.chain().focus().toggleUnderline().run();
  }
}

class ItalicMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Italic, "Italic");
  }

  public override toggle() {
    this.editor.chain().focus().toggleItalic().run();
  }
}

class CodeBlockMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, CodeXml, "Code Block");
  }

  public override toggle() {
    this.editor.chain().focus().toggleCodeBlock().run();
  }
}

class BlockQuote extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TextQuote, "Block Quote");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBlockquote().run();
  }
}

class BulletList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, List, "Bullet List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBulletList().run();
  }
}

class OrderedList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ListOrdered, "Ordered List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleOrderedList().run();
  }
}

class TaskList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ListChecks, "Task List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleTaskList().run();
  }
}

export function getMenuItem(variant: string, editor: Editor): MenuItem | null {
  switch (variant) {
    case "bold":
      return new BoldMenuItem(editor);
    case "underline":
      return new UnderlineMenuItem(editor);
    case "italic":
      return new ItalicMenuItem(editor);
    case "code-block":
      return new CodeBlockMenuItem(editor);
    case "block-quote":
      return new BlockQuote(editor);
    case "bullet-list":
      return new BulletList(editor);
    case "ordered-list":
      return new OrderedList(editor);
    case "task-list":
      return new TaskList(editor);
    default:
      return null;
  }
}
