import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageNodeView from "@/components/node-views/image-node-view";

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

  renderHTML({ HTMLAttributes }) {
    return ["image-extension", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export default ImageExtension;
