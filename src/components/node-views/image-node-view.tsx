import { FC, useEffect, useRef } from "react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import Img from "@/components/ui/image";

const ImageNodeView: FC<NodeViewProps> = ({ node, updateAttributes }) => {
  // const [className, setClassname] = useState<string>(node.attrs.className);
  const labelRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (labelRef.current && node.attrs.label) {
      labelRef.current.value = node.attrs.label;
    }
  }, [node.attrs.label]);

  const onLabelChange = () => {
    if (!labelRef.current) return;
    const label = labelRef.current.value;

    updateAttributes({ label });
    console.log(node.attrs);
  };

  return (
    <NodeViewWrapper>
      <Container className={cn(/*className*/ "", "w-full")}>
        <Img src={node.attrs.src} className="w-[320px] h-[320px]" />
        <input
          placeholder="Image Label"
          ref={labelRef}
          onBlur={onLabelChange}
          className="text-sm text-muted-foreground focus:outline-none"
        />
      </Container>
    </NodeViewWrapper>
  );
};

export default ImageNodeView;
