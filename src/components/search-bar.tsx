import { Search } from "lucide-react";
import { Input, InputProps } from "./ui/input";
import { Button } from "./ui/button";
import { FC, useState } from "react";

interface SearchBarProps extends InputProps {
  onSearch: () => void;
}

const SearchBar: FC<SearchBarProps> = (props) => {
  const [focus, setFocus] = useState<boolean>(false);

  const { onSearch, ...inputProps } = props;

  return (
    <div
      className={
        focus
          ? "flex items-center w-full rounded-md ring-2 ring-ring transition-all duration-300 lg:w-[32rem]"
          : "flex items-center w-full rounded-md transition-all duration-300 lg:w-[32rem]"
      }
    >
      <Input
        className="border border-input rounded-e-none border-e-0 shadow-sm focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-0"
        type="text"
        placeholder={"Search"}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...inputProps}
      />
      <Button
        size="icon"
        className="h-full rounded-s-none bg-foreground w-16 rounded-e-sm shadow-sm transition-all duration-300"
        onClick={onSearch}
      >
        <Search size={20} />
      </Button>
    </div>
  );
};

export default SearchBar;
