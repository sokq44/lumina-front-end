import { Editor } from "@tiptap/react";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  BetweenHorizontalEnd,
  BetweenHorizontalStart,
  BetweenVerticalEnd,
  BetweenVerticalStart,
  Bold,
  CodeXml,
  Grid2X2Plus,
  Grid2x2X,
  Italic,
  Link,
  List,
  ListChecks,
  ListOrdered,
  LucideIcon,
  Minus,
  Sheet,
  SquareSplitHorizontal,
  TableCellsMerge,
  TableCellsSplit,
  TableColumnsSplit,
  TableProperties,
  TableRowsSplit,
  TextQuote,
  Underline,
  Unlink,
  WrapText,
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

export class BoldMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Bold, "Bold");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBold().run();
  }
}

export class UnderlineMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Underline, "Underline");
  }

  public override toggle() {
    this.editor.chain().focus().toggleUnderline().run();
  }
}

export class ItalicMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Italic, "Italic");
  }

  public override toggle() {
    this.editor.chain().focus().toggleItalic().run();
  }
}

export class CodeBlockMenuItem extends MenuItem {
  constructor(editor: Editor) {
    super(editor, CodeXml, "Code Block");
  }

  public override toggle() {
    this.editor.chain().focus().toggleCodeBlock().run();
  }
}

export class BlockQuote extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TextQuote, "Block Quote");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBlockquote().run();
  }
}

export class BulletList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, List, "Bullet List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBulletList().run();
  }
}

export class OrderedList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ListOrdered, "Ordered List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleOrderedList().run();
  }
}

export class TaskList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ListChecks, "Task List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleTaskList().run();
  }
}

export class HorizontalRule extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Minus, "Horizontal Rule");
  }

  public override toggle() {
    this.editor.chain().focus().setHorizontalRule().run();
  }
}

export class HardBreak extends MenuItem {
  constructor(editor: Editor) {
    super(editor, WrapText, "Hard Break");
  }

  public override toggle() {
    this.editor.chain().setHardBreak().run();
  }
}

export class InsertTable extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Grid2X2Plus, "Insert Table");
  }

  public override toggle() {
    this.editor
      .chain()
      .focus()
      .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
      .run();
  }
}

export class DeleteTable extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Grid2x2X, "Delete Table");
  }

  public override toggle() {
    this.editor.chain().focus().deleteTable().run();
  }
}

export class InsertColumnBefore extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BetweenHorizontalStart, "Insert Column Before");
  }

  public override toggle() {
    this.editor.chain().focus().addColumnBefore().run();
  }
}

export class InsertColumnAfter extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BetweenHorizontalEnd, "Insert Column After");
  }

  public override toggle() {
    this.editor.chain().focus().addColumnAfter().run();
  }
}

export class DeleteColumn extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableColumnsSplit, "Delete Column");
  }

  public override toggle() {
    this.editor.chain().focus().deleteColumn().run();
  }
}

export class InsertRowBefore extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BetweenVerticalStart, "Insert Row Before");
  }

  public override toggle() {
    this.editor.chain().focus().addRowBefore().run();
  }
}

export class InsertRowAfter extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BetweenVerticalEnd, "Insert Row After");
  }

  public override toggle() {
    this.editor.chain().focus().addRowAfter().run();
  }
}

export class DeleteRow extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableRowsSplit, "Delete Row");
  }

  public override toggle() {
    this.editor.chain().focus().deleteRow().run();
  }
}

export class MergeTableCells extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableCellsSplit, "Merge Cells");
  }

  public override toggle() {
    this.editor.chain().focus().mergeCells().run();
  }
}

export class SplitTableCell extends MenuItem {
  constructor(editor: Editor) {
    super(editor, SquareSplitHorizontal, "Split Cell");
  }

  public override toggle() {
    this.editor.chain().focus().splitCell().run();
  }
}

export class ToggleHeaderColumn extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableProperties, "Toogle Header Column");
  }

  public override toggle() {
    this.editor.chain().focus().toggleHeaderColumn().run();
  }
}

export class ToggleHeaderRow extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Sheet, "Toogle Header Row");
  }

  public override toggle() {
    this.editor.chain().focus().toggleHeaderRow().run();
  }
}

export class ToggleHeaderCell extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableCellsMerge, "Toogle Header Row");
  }

  public override toggle() {
    this.editor.chain().focus().toggleHeaderCell().run();
  }
}

export class GoToNextCell extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ArrowBigRightDash, "Go To Next Cell");
  }

  public override toggle() {
    this.editor.chain().focus().goToNextCell().run();
  }
}

export class GoToPreviousCell extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ArrowBigLeftDash, "Go To Previous Cell");
  }

  public override toggle() {
    this.editor.chain().focus().goToPreviousCell().run();
  }
}

export class SetLink extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Link, "Set Link");
  }

  public override toggle() {
    const previousUrl = this.editor.getAttributes("link").href;

    const url = window.prompt("URL for the link:", previousUrl);

    if (url === null) return;

    if (url === "") {
      this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    this.editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank" })
      .run();
  }
}

export class UnsetLink extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Unlink, "Unset Link");
  }

  public override toggle() {
    this.editor.chain().focus().unsetLink().run();
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
    case "horizontal-rule":
      return new HorizontalRule(editor);
    case "hard-break":
      return new HardBreak(editor);
    case "insert-table":
      return new InsertTable(editor);
    case "delete-table":
      return new DeleteTable(editor);
    case "insert-column-before":
      return new InsertColumnBefore(editor);
    case "insert-column-after":
      return new InsertColumnAfter(editor);
    case "delete-column":
      return new DeleteColumn(editor);
    case "insert-row-before":
      return new InsertRowBefore(editor);
    case "insert-row-after":
      return new InsertRowAfter(editor);
    case "delete-row":
      return new DeleteRow(editor);
    case "merge-table-cells":
      return new MergeTableCells(editor);
    case "split-table-cell":
      return new SplitTableCell(editor);
    case "toggle-header-column":
      return new ToggleHeaderColumn(editor);
    case "toggle-header-row":
      return new ToggleHeaderRow(editor);
    case "toggle-header-cell":
      return new ToggleHeaderCell(editor);
    case "go-to-next-cell":
      return new GoToNextCell(editor);
    case "go-to-previous-cell":
      return new GoToPreviousCell(editor);
    case "set-link":
      return new SetLink(editor);
    case "unset-link":
      return new UnsetLink(editor);
    default:
      return null;
  }
}
