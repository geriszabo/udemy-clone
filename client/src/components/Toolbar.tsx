import { courseCategories } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { useState } from "react";
import { SelectGroup } from "./ui/select";

export const Toolbar = ({ onCategoryChange, onSearch }: ToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(value: string) {
    setSearchTerm(value);
    onSearch(value);
  }

  return (
    <div className="toolbar" >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search courses"
        className="toolbar__search"
      />
      <div className="flex flex-col">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="toolbar__select">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent position="popper"  className="bg-customgreys-primarybg hover:bg-customgreys-primarybg w-[180px] mt-2 rounded-sm ">
            <SelectGroup className="toolbar__select-group" >
            <SelectItem value="all" className="toolbar__select-item">
              All Categories
            </SelectItem>
            {courseCategories.map((category) => (
              <SelectItem
              key={category.value}
              value={category.value}
              className="toolbar__select-item"
              >
                {category.label}
              </SelectItem>
            ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
