import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import YoutubeNodeView from "@/components/node-views/youtube/youtube-node-view";

export interface YoutubeExtensionAttributes {
  src?: string;
  label?: string;
  width?: number;
  className?: string;
}

const YoutubeExtension = Node.create({
  name: "youtube-extension",
  group: "block",
  atom: true,

  parseHTML() {
    return [
      {
        tag: "youtube-extension",
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
      iframeWidth: {
        default: 550,
      },
      className: {
        default: "h-auto mx-auto",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["youtube-extension", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(YoutubeNodeView);
  },
});

export function insertYoutube(
  editor: Editor,
  attrs: YoutubeExtensionAttributes
) {
  editor
    .chain()
    .focus()
    .insertContent({ type: "youtube-extension", attrs })
    .run();
}

export default YoutubeExtension;
