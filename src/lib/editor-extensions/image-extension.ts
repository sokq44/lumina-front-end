import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageNodeView from "@/components/node-views/image/image-node-view";

export interface ImageExtensionAttributes {
  src?: string;
  label?: string;
  width: number;
  height: number;
  className?: string;
}

const ImageExtension = Node.create({
  name: "imageExtension",
  group: "block",
  atom: true,

  parseHTML() {
    return [
      {
        tag: "image-extension",
      },
    ];
  },

  addAttributes() {
    return {
      src: {
        default: "",
      },
      label: {
        default: "",
      },
      imageWidth: {
        default: 100,
      },
      className: {
        default: "h-auto mx-auto",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["image-extension", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export function insertImage(editor: Editor, attrs: ImageExtensionAttributes) {
  editor.chain().focus().insertContent({ type: "imageExtension", attrs }).run();
}

export default ImageExtension;
