/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-01 03:55:47
 * @modify date 2024-12-01 03:55:47
 * @desc [description]
 */
import React, { Children, cloneElement, isValidElement, useEffect, useState } from "react";
import { View } from "react-native";
import Tag, { ITagProps } from "./Tag";
import GeneratedTag from "./GeneratedTag";
import { FlashList } from "@shopify/flash-list";

interface ITagGroupProps {
  multiselect?: boolean;
  onTagChange?: Function;
  children: React.ReactElement<ITagProps> | React.ReactElement<ITagProps>[];
}

interface IFlashListProps {
  renderItem: ({ item }: any) => React.ReactElement<ITagProps>;
  data: any[];
}

export default function TagGroup({ multiselect = false, onTagChange, children }: ITagGroupProps) {
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: Record<string, any> }>({});

  useEffect(() => {
    if (onTagChange && selectedTags.constructor === Object) {
      onTagChange({ selectedTags });
    }
  }, [selectedTags, onTagChange]);

  /**
   * Handles the press event on a tag, updating the selected tags and their metadata.
   *
   * @param {string} text - The text of the tag that was pressed.
   * @param {Record<string, any>} meta - The metadata associated with the tag.
   *
   * If `multiselect` is false, only one tag can be selected at a time. If the tag is already selected,
   * it will be deselected. Otherwise, it will be the only selected tag.
   *
   * If `multiselect` is true, multiple tags can be selected. If the tag is already selected,
   * it will be removed from the selection. Otherwise, it will be added to the selection.
   */
  function handleTagPress(text: string, meta: Record<string, any>) {
    const isAlreadySelected = selectedTags[text];
    if (!multiselect) {
      setSelectedTags((prev) => (isAlreadySelected ? {} : { [text]: meta }));
    } else {
      setSelectedTags((prev) => {
        const { [text]: toBeRemoved, ...rest } = prev;
        return isAlreadySelected ? rest : { ...rest, [text]: meta };
      });
    }
  }

  function isOfTypeFlashList(
    child: React.ReactElement<ITagProps> | React.ReactElement<IFlashListProps>,
  ): child is React.ReactElement<IFlashListProps> {
    return child.type === FlashList && "renderItem" in child.props;
  }
  return (
    <View style={{ flexDirection: "row" }}>
      {Children.map(children, (child: React.ReactElement<ITagProps>) => {
        if (isValidElement(child) && (child.type === Tag || child.type === GeneratedTag)) {
          const isSelected = !!selectedTags[child.props.text];
          return cloneElement(child, {
            onTagPress: () => handleTagPress(child.props.text, child.props.meta || {}),
            isSelected,
          });
        } else if (isValidElement(child) && isOfTypeFlashList(child)) {
          return cloneElement(child, {
            ...child.props,
            extraData: selectedTags,
            renderItem: (info: { item: any }) => {
              const tagelement = child.props.renderItem(info);
              console.log("Original Tag", tagelement);
              return cloneElement(tagelement, {
                ...info,
                ...tagelement.props,
                onTagPress: () => handleTagPress(tagelement.props.text, tagelement.props.meta || {}),
                isSelected: !!selectedTags[tagelement.props.text],
              });
            },
          });
        } else {
          console.warn("Non <Tag/> Element Passed inside <TagGroup />", child.type);
          return null;
        }
      })}
    </View>
  );
}
