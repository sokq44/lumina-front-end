import { Editor } from "@tiptap/react";
import {
  Link,
  List,
  Minus,
  Sheet,
  Unlink,
  Pilcrow,
  CodeXml,
  Grid2x2X,
  WrapText,
  TextQuote,
  ListChecks,
  LucideIcon,
  Grid2X2Plus,
  ListOrdered,
  TableRowsSplit,
  TableCellsMerge,
  TableCellsSplit,
  TableProperties,
  Bold as BoldIcon,
  ArrowBigLeftDash,
  TableColumnsSplit,
  ArrowBigRightDash,
  BetweenVerticalEnd,
  Italic as ItalicIcon,
  BetweenVerticalStart,
  BetweenHorizontalEnd,
  SquareSplitHorizontal,
  BetweenHorizontalStart,
  Underline as UnderlineIcon,
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
  public abstract canToggle(): boolean;
}

export class Paragraph extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Pilcrow, "Paragraph");
  }

  public override toggle() {
    this.editor.chain().focus().setParagraph().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().setParagraph();
  }
}

export class Bold extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BoldIcon, "Bold");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBold().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().setBold();
  }
}

export class Underline extends MenuItem {
  constructor(editor: Editor) {
    super(editor, UnderlineIcon, "Underline");
  }

  public override toggle() {
    this.editor.chain().focus().toggleUnderline().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleUnderline();
  }
}

export class Italic extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ItalicIcon, "Italic");
  }

  public override toggle() {
    this.editor.chain().focus().toggleItalic().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleItalic();
  }
}

export class CodeBlock extends MenuItem {
  constructor(editor: Editor) {
    super(editor, CodeXml, "Code Block");
  }

  public override toggle() {
    this.editor.chain().focus().toggleCodeBlock().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleCodeBlock();
  }
}

export class BlockQuote extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TextQuote, "Block Quote");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBlockquote().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleBlockquote();
  }
}

export class BulletList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, List, "Bullet List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleBulletList().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleBulletList();
  }
}

export class OrderedList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ListOrdered, "Ordered List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleOrderedList().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleOrderedList();
  }
}

export class TaskList extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ListChecks, "Task List");
  }

  public override toggle() {
    this.editor.chain().focus().toggleTaskList().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleTaskList();
  }
}

export class HorizontalRule extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Minus, "Horizontal Rule");
  }

  public override toggle() {
    this.editor.chain().focus().setHorizontalRule().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().setHorizontalRule();
  }
}

export class HardBreak extends MenuItem {
  constructor(editor: Editor) {
    super(editor, WrapText, "Hard Break");
  }

  public override toggle() {
    this.editor.chain().setHardBreak().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().setHardBreak();
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

  public override canToggle(): boolean {
    return this.editor.can().insertTable();
  }
}

export class DeleteTable extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Grid2x2X, "Delete Table");
  }

  public override toggle() {
    this.editor.chain().focus().deleteTable().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().deleteTable();
  }
}

export class InsertColumnBefore extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BetweenHorizontalStart, "Insert Column Before");
  }

  public override toggle() {
    this.editor.chain().focus().addColumnBefore().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().addColumnBefore();
  }
}

export class InsertColumnAfter extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BetweenHorizontalEnd, "Insert Column After");
  }

  public override toggle() {
    this.editor.chain().focus().addColumnAfter().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().addColumnAfter();
  }
}

export class DeleteColumn extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableColumnsSplit, "Delete Column");
  }

  public override toggle() {
    this.editor.chain().focus().deleteColumn().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().deleteColumn();
  }
}

export class InsertRowBefore extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BetweenVerticalStart, "Insert Row Before");
  }

  public override toggle() {
    this.editor.chain().focus().addRowBefore().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().addRowBefore();
  }
}

export class InsertRowAfter extends MenuItem {
  constructor(editor: Editor) {
    super(editor, BetweenVerticalEnd, "Insert Row After");
  }

  public override toggle() {
    this.editor.chain().focus().addRowAfter().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().addRowAfter();
  }
}

export class DeleteRow extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableRowsSplit, "Delete Row");
  }

  public override toggle() {
    this.editor.chain().focus().deleteRow().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().deleteRow();
  }
}

export class MergeTableCells extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableCellsSplit, "Merge Cells");
  }

  public override toggle() {
    this.editor.chain().focus().mergeCells().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().mergeCells();
  }
}

export class SplitTableCell extends MenuItem {
  constructor(editor: Editor) {
    super(editor, SquareSplitHorizontal, "Split Cell");
  }

  public override toggle() {
    this.editor.chain().focus().splitCell().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().splitCell();
  }
}

export class ToggleHeaderColumn extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableProperties, "Toogle Header Column");
  }

  public override toggle() {
    this.editor.chain().focus().toggleHeaderColumn().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleHeaderColumn();
  }
}

export class ToggleHeaderRow extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Sheet, "Toogle Header Row");
  }

  public override toggle() {
    this.editor.chain().focus().toggleHeaderRow().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleHeaderRow();
  }
}

export class ToggleHeaderCell extends MenuItem {
  constructor(editor: Editor) {
    super(editor, TableCellsMerge, "Toogle Header Row");
  }

  public override toggle() {
    this.editor.chain().focus().toggleHeaderCell().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().toggleHeaderCell();
  }
}

export class GoToNextCell extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ArrowBigRightDash, "Go To Next Cell");
  }

  public override toggle() {
    this.editor.chain().focus().goToNextCell().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().goToNextCell();
  }
}

export class GoToPreviousCell extends MenuItem {
  constructor(editor: Editor) {
    super(editor, ArrowBigLeftDash, "Go To Previous Cell");
  }

  public override toggle() {
    this.editor.chain().focus().goToPreviousCell().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().goToPreviousCell();
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

  public override canToggle(): boolean {
    return this.editor.can().setLink({ href: "#" });
  }
}

export class UnsetLink extends MenuItem {
  constructor(editor: Editor) {
    super(editor, Unlink, "Unset Link");
  }

  public override toggle() {
    this.editor.chain().focus().unsetLink().run();
  }

  public override canToggle(): boolean {
    return this.editor.can().unsetLink();
  }
}

export function getMenuItem(variant: string, editor: Editor): MenuItem | null {
  switch (variant) {
    case "paragraph":
      return new Paragraph(editor);
    case "bold":
      return new Bold(editor);
    case "underline":
      return new Underline(editor);
    case "italic":
      return new Italic(editor);
    case "code-block":
      return new CodeBlock(editor);
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
