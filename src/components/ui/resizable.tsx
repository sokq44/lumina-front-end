import Container from "./container";
import { GripVertical } from "lucide-react";
import { FC, ReactNode, useRef, useState } from "react";

interface ResizableProps {
  children: ReactNode;
  initialWidth: number;
  heightModifier?: number;
  onStartDragging?: () => void;
  onChangeWidth?: (width: number) => void;
  onStopDragging?: () => void;
}

const spectrum = [250, 325, 400, 475, 550, 625, 700, 775, 850];

const Resizable: FC<ResizableProps> = ({
  children,
  initialWidth,
  heightModifier,
  onStartDragging,
  onChangeWidth,
  onStopDragging,
}) => {
  const [width, setWidth] = useState<number>(initialWidth);
  const initialXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  const startDragging = (initialX: number, direction: "left" | "right") => {
    isDraggingRef.current = true;
    initialXRef.current = initialX;

    console.log("Should change cursor to ew-resize");

    changeCursor("ew-resize");
    if (onStartDragging) onStartDragging();

    document.addEventListener("mouseup", stopDragging);
    if (direction === "left") {
      document.addEventListener("mousemove", dragLeft);
    } else if (direction === "right") {
      document.addEventListener("mousemove", dragRight);
    }
  };

  const stopDragging = () => {
    isDraggingRef.current = false;

    changeCursor("grab");
    if (onStopDragging) onStopDragging();

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

    setWidth(currentMax);
    if (onChangeWidth) onChangeWidth(currentMax);
  };

  const changeCursor = (cursor: string) => {
    const grabLeft = document.getElementById("grab-left");
    const grabRight = document.getElementById("grab-right");
    if (grabLeft) grabLeft.style.cursor = cursor;
    if (grabRight) grabRight.style.cursor = cursor;
  };

  return (
    <Container className="flex items-center gap-x-1">
      <Container
        id="grab-left"
        onMouseDown={(e) => startDragging(e.clientX, "left")}
        className="h-1/5 flex items-center bg-muted-foreground/20 mx-0 rounded cursor-grab hover:bg-muted-foreground/40 transition-all duration-300"
      >
        <GripVertical size={16} />
      </Container>
      <Container
        style={{
          width: `${width}px`,
          height: heightModifier ? `${width * heightModifier}px` : "auto",
        }}
        className="transition-all duration-200"
      >
        {children}
      </Container>
      <Container
        id="grab-right"
        onMouseDown={(e) => startDragging(e.clientX, "right")}
        className="h-1/5 flex items-center bg-muted-foreground/20 mx-0 rounded cursor-grab hover:bg-muted-foreground/40 transition-all duration-300"
      >
        <GripVertical size={16} />
      </Container>
    </Container>
  );
};

export default Resizable;
