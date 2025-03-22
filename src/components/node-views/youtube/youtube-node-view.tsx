import { FC, useEffect, useRef, useState } from "react";
import { cn, getEmbedUrl } from "@/lib/utils";
import { useTextEditor } from "@/hooks/text-editor";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import Resizable from "@/components/ui/resizable";

const YoutubeNodeView: FC<NodeViewProps> = ({
  node,
  getPos,
  updateAttributes,
}) => {
  const { src, label, iframeWidth, className } = node.attrs;

  const { editor } = useTextEditor();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const labelRef = useRef<HTMLInputElement>(null);
  const iframeWidthRef = useRef<number>(iframeWidth);

  useEffect(() => {
    if (labelRef.current && label) {
      labelRef.current.value = label;
    }
  }, [label]);

  useEffect(() => {
    if (!editor) return;

    const handleSelectionChange = () => {
      const { from, to } = editor.state.selection;
      const nodePos = getPos();

      setIsSelected(from <= nodePos && to >= nodePos);
    };

    editor.on("selectionUpdate", handleSelectionChange);
    return () => {
      editor.off("selectionUpdate", handleSelectionChange);
    };
  }, [editor, getPos]);

  const changeCursor = (cursor: string) => {
    const nodeViewSection = document.getElementById("node-view-section");
    const resizableSection = document.getElementById("resizable-section");
    if (nodeViewSection) nodeViewSection.style.cursor = cursor;
    if (resizableSection) resizableSection.style.cursor = cursor;
    document.body.style.cursor = cursor;
  };

  const changeLabel = () => {
    if (labelRef.current) {
      const label = labelRef.current.value;
      updateAttributes({ label });
    }
  };

  const startDragging = () => {
    setIsDragging(true);
    editor?.commands.blur();
    changeCursor("ew-resize");
  };

  const stopDragging = () => {
    setIsDragging(false);
    changeCursor("auto");
    updateAttributes({ iframeWidth: iframeWidthRef.current });
  };

  const changeWidth = (w: number) => {
    iframeWidthRef.current = w;
  };

  return (
    <NodeViewWrapper>
      <Container className="w-full my-4">
        <Container
          id="node-view-section"
          className={cn(className, "flex justify-center mb-0 rounded-lg")}
        >
          <Container id="resizable-section" className="flex flex-col">
            <Resizable
              initialWidth={iframeWidth}
              heightModifier={2 / 3}
              onStartDragging={startDragging}
              onChangeWidth={changeWidth}
              onStopDragging={stopDragging}
            >
              <iframe
                allowFullScreen
                src={getEmbedUrl(src)}
                className={cn(
                  "w-full h-full select-none rounded-lg transition-all duration-300",
                  (isSelected || isDragging) && "shadow-md shadow-purple-500"
                )}
              />
            </Resizable>
            <Input
              placeholder="Label"
              ref={labelRef}
              onBlur={changeLabel}
              className="ml-4 text-sm text-muted-foreground focus:outline-none bg-transparent border-none"
            />
          </Container>
        </Container>
      </Container>
    </NodeViewWrapper>
  );
};

export default YoutubeNodeView;
