import * as React from 'react';

import { isNil } from 'lodash';

import clsx from 'clsx';

import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Typography from '@mui/material/Typography';
import {
  useTreeItem,
  TreeItemContentProps,
} from '@mui/x-tree-view/TreeItem';
import Checkbox from '@mui/material/Checkbox';

import { StringToStringArrayLUT } from '../types';

interface KeywordTreeItemProps extends TreeItemContentProps {
  onToggleAssignKeywordToMediaItems: (nodeId: string) => void;
  selectedMediaItemIds: string[];
  mapKeywordNodeIdToSelectedMediaItemIds: StringToStringArrayLUT;
}

const CustomContent = React.forwardRef(function CustomContent(
  props: KeywordTreeItemProps,
  ref,
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    mapKeywordNodeIdToSelectedMediaItemIds,
    selectedMediaItemIds,
    onToggleAssignKeywordToMediaItems,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const getIsDisabled = (): boolean => {
    return isNil(selectedMediaItemIds) || selectedMediaItemIds.length === 0;
  };

  // required mappings
  //    for each keywordNodeId,
  //        mediaItems (ids) that include this keyword
  //            map keywordNodeId to array of mediaItemIds
  //    for each selectedMediaItem(id)
  //        list of keywords associated with this media item
  //            map mediaItemId to array of keywordNodeIds
  const getIsChecked = (): boolean => {
    if (Object.prototype.hasOwnProperty.call(mapKeywordNodeIdToSelectedMediaItemIds, nodeId)) {
      // const selectedMediaItemIdsWithThisKeyword: string[] = mapKeywordNodeIdToSelectedMediaItemIds[nodeId];
      // at this point, two possible cases:
      //    case 0: selectedMediaItemIdsWithThisKeyword.length === selectedMediaItemIds.length
      //    case 1: selectedMediaItemIdsWithThisKeyword.length < selectedMediaItemIds.length

      // for now, assume case 0
      return true;
    }
    return false;
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleSelection(event);
  };

  const handleToggleAssignKeywordToItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleAssignKeywordToMediaItems(nodeId);
  };

  const isChecked = getIsChecked();
  const isDisabled = getIsDisabled();

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
      <Checkbox
        checked={isChecked}
        onChange={handleToggleAssignKeywordToItem}
        disabled={isDisabled}
      />
    </div>
  );
});

export const KeywordTreeItem = React.forwardRef(function KeywordTreeItem(
  // props: TreeItemProps,
  // props: KeywordTreeItemProps,
  props: any,
  ref: React.Ref<HTMLLIElement>,
) {
  return <TreeItem
    ContentComponent={CustomContent}
    ContentProps={{
      onToggleAssignKeywordToMediaItems: (nodeId: string) => props.onToggleAssignKeywordToMediaItems(nodeId),
      selectedMediaItemIds: props.selectedMediaItemIds,
      mapKeywordNodeIdToSelectedMediaItemIds: props.mapKeywordNodeIdToSelectedMediaItemIds,
    }}
    {...props}
    ref={ref}
  />;
});

