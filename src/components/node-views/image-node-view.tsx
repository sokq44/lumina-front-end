import { NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import { Button } from "../ui/button";

const ImageNodeView = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <NodeViewWrapper>
      <span>Everything works fine {count}</span>
      <Button onClick={() => setCount((prev) => prev + 1)}>Click</Button>
    </NodeViewWrapper>
  );
};

export default ImageNodeView;
