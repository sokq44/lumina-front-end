import { Editor } from "@tiptap/react";
import { Bold, Italic, LucideIcon, Underline } from "lucide-react";

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

  public toggle() {
    toggleBold(this.editor);
  }
}

class UnderlineMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Underline, "Underline");
  }

  public toggle() {
    toggleUnderline(this.editor);
  }
}

class ItalicMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Italic, "Italic");
  }

  public toggle() {
    toggleItalic(this.editor);
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
    default:
      return null;
  }
}

export function toggleBold(editor: Editor) {
  editor.chain().focus().toggleBold().run();
}

export function toggleUnderline(editor: Editor) {
  editor.chain().focus().toggleUnderline().run();
}

export function toggleItalic(editor: Editor) {
  editor.chain().focus().toggleItalic().run();
}
