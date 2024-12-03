/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-01 03:55:47
 * @modify date 2024-12-01 03:55:47
 * @desc [description]
 */
import React, { Children, cloneElement, isValidElement, useState } from "react";
import { View } from "react-native";
import Tag, { ITagProps } from "./Tag";

interface ITagGroupProps {
  multiselect?: boolean;
  children: React.ReactElement<ITagProps> | React.ReactElement<ITagProps>[];
}

export default function TagGroup({
  multiselect = false,
  children,
}: ITagGroupProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {Children.map(children, (child: React.ReactElement<ITagProps>) => {
        if (isValidElement(child) && child.type === Tag) {
          const isSelected = selectedTags.includes(child.props.text);
          return cloneElement(child, {
            onTagPress: () => handleTagPress(child.props.text),
            isSelected,
          });
        } else {
          console.warn(
            "Non <Tag/> Element Passed inside <TagGroup />",
            child.type
          );
          return null;
        }
      })}
    </View>
  );
}
