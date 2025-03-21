import { FC, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTextEditor } from "@/hooks/text-editor";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import Img from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import { ChevronLeft, ChevronRight } from "lucide-react";

const spectrum = [250, 325, 400, 475, 550, 625, 700, 775, 850];

const ImageNodeView: FC<NodeViewProps> = ({
  node,
  updateAttributes,
  getPos,
}) => {
  const { editor } = useTextEditor();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(node.attrs.imageWidth);

  const initialXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const labelRef = useRef<HTMLInputElement>(null);
  const imageWidthRef = useRef<number>(node.attrs.imageWidth);

  useEffect(() => {
    if (labelRef.current && node.attrs.label) {
      labelRef.current.value = node.attrs.label;
    }
  }, [node.attrs.label]);

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

  const startDragging = (initialX: number, direction: "left" | "right") => {
    isDraggingRef.current = true;
    initialXRef.current = initialX;

    setIsDragging(true);
    editor?.commands.blur();
    changeCursor("ew-resize");

    document.addEventListener("mouseup", stopDragging);
    if (direction === "left") {
      document.addEventListener("mousemove", dragLeft);
    } else if (direction === "right") {
      document.addEventListener("mousemove", dragRight);
    }
  };

  const stopDragging = () => {
    isDraggingRef.current = false;

    changeCursor("auto");
    setIsDragging(false);
    updateAttributes({ imageWidth: imageWidthRef.current });

    document.removeEventListener("mousemove", dragRight);
    document.removeEventListener("mousemove", dragLeft);
    document.removeEventListener("mouseUp", stopDragging);
  };

  const dragRight = (event: MouseEvent) => {
    if (isDraggingRef.current && initialXRef.current) {
      changeWidth(width + (event.clientX - initialXRef.current));
    }
  };

  const dragLeft = (event: MouseEvent) => {
    if (isDraggingRef.current && initialXRef.current) {
      changeWidth(width + (initialXRef.current - event.clientX));
    }
  };

  const changeWidth = (stretch: number) => {
    if (stretch < 250 || stretch > 900) return;

    let currentMax = spectrum[0];
    for (const max of spectrum) {
      if (stretch >= max) {
        currentMax = max;
      }
    }

    if (currentMax !== imageWidthRef.current) {
      setWidth(currentMax);
      imageWidthRef.current = currentMax;
    }
  };

  const changeCursor = (cursor: string) => {
    document.body.style.cursor = cursor;
    const imageNodeView = document.getElementById("ImageNodeViewSection");
    if (imageNodeView) imageNodeView.style.cursor = cursor;
  };

  const changeLabel = () => {
    if (!labelRef.current) return;

    const label = labelRef.current.value;
    updateAttributes({ label });
  };

  return (
    <NodeViewWrapper>
      <Container className="w-full my-4">
        <Container
          id="ImageNodeViewSection"
          className={cn(
            node.attrs.className,
            "flex justify-center mb-0 rounded-lg"
          )}
        >
          <Container className="flex flex-col cursor-pointer">
            <Container className="flex items-center gap-x-1">
              <Container
                onMouseDown={(e) => startDragging(e.clientX, "left")}
                className="h-1/5 flex items-center bg-muted-foreground/20 mx-0 rounded cursor-ew-resize hover:bg-muted-foreground/40 transition-all duration-300"
              >
                <ChevronLeft size={16} />
              </Container>
              <Img
                src={node.attrs.src}
                width={width}
                className={cn(
                  "select-none h-auto rounded-lg transition-all duration-300",
                  (isSelected || isDragging) && "shadow-lg shadow-purple-500"
                )}
              />
              <Container
                onMouseDown={(e) => startDragging(e.clientX, "right")}
                className="h-1/5 flex items-center bg-muted-foreground/20 mx-0 rounded cursor-ew-resize hover:bg-muted-foreground/40 transition-all duration-300"
              >
                <ChevronRight size={16} />
              </Container>
            </Container>
            <Input
              placeholder="Image Label"
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

export default ImageNodeView;
