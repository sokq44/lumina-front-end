import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageNodeView from "@/components/node-views/image-node-view";

export interface ImageExtensionAttributes {
  src?: string;
  label?: string;
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
      className: {
        default: "my-4 mr-auto w-[480px] h-[320px]",
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
