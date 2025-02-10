import { useEffect, useState } from "react";
import { useTextEditor } from "@/hooks/text-editor";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import Informative from "@/components/inform-badge/informative";

type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const HeadingMenuItem = () => {
  const textEditor = useTextEditor();
  const [selectedHeading, setSelectedHeading] = useState<Level>(0);

  useEffect(() => {
    const updateSelectedLevel = () => {
      if (!textEditor.editor) return;

      const headingLevel = [1, 2, 3, 4, 5, 6].find((level) =>
        textEditor.editor?.isActive("heading", { level })
      );

      setSelectedHeading(headingLevel ? (headingLevel as Level) : 0);
    };

    updateSelectedLevel();
    textEditor.editor?.on("update", updateSelectedLevel);

    return () => {
      textEditor.editor?.off("update", updateSelectedLevel);
    };
  }, [textEditor.editor]);

  const handleSelection = (level: Level) => {
    if (!textEditor.editor || level === 0) return;
    textEditor.editor.chain().focus().toggleHeading({ level }).run();
    setSelectedHeading(level);
  };

  return (
    <Select
      onValueChange={(value) => handleSelection(parseInt(value) as Level)}
      value={selectedHeading.toString()}
    >
      <Informative label="Heading" className="w-full">
        <SelectTrigger className="ring-none h-auto outline-none transition-all duration-300">
          <SelectValue placeholder="Heading" />
        </SelectTrigger>
      </Informative>
      <SelectContent className="font-funnel">
        <SelectItem value="1" className="text-4xl">
          Heading 1
        </SelectItem>
        <SelectItem value="2" className="text-3xl">
          Heading 2
        </SelectItem>
        <SelectItem value="3" className="text-2xl">
          Heading 3
        </SelectItem>
        <SelectItem value="4" className="text-xl">
          Heading 4
        </SelectItem>
        <SelectItem value="5" className="text-lg">
          Heading 5
        </SelectItem>
        <SelectItem value="6" className="text-md">
          Heading 6
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default HeadingMenuItem;
