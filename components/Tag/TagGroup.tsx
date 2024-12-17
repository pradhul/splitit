/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-01 03:55:47
 * @modify date 2024-12-01 03:55:47
 * @desc [description]
 */
import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react";
import { View } from "react-native";
import Tag, { ITagProps } from "./Tag";
import GeneratedTag from "./GeneratedTag";

interface ITagGroupProps {
  multiselect?: boolean;
  onTagChange?: Function;
  children: React.ReactElement<ITagProps> | React.ReactElement<ITagProps>[];
}

export default function TagGroup({
  multiselect = false,
  onTagChange,
  children,
}: ITagGroupProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (onTagChange && Array.isArray(selectedTags)) {
      onTagChange(selectedTags);
    }
  }, [selectedTags, onTagChange]);

  function handleTagPress(text: any) {
    if (!multiselect) {
      setSelectedTags((prev) => (prev.includes(text) ? [] : [text]));
    } else {
      setSelectedTags((prev) => {
        return prev.includes(text)
          ? prev.filter((tag) => tag !== text)
          : [...prev, text];
      });
    }
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {Children.map(children, (child: React.ReactElement<ITagProps>) => {
        if ((isValidElement(child) && child.type === Tag) || child.type === GeneratedTag) {
          const isSelected = selectedTags.includes(child.props.text);
          return cloneElement(child, {
            onTagPress: () => handleTagPress(child.props.text),
            isSelected,
          });
        } else {
          console.warn("Non <Tag/> Element Passed inside <TagGroup />", child.type);
          return null;
        }
      })}
    </View>
  );
}
