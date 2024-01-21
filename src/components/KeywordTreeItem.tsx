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

import { KeywordAssignedToSelectedMediaItemsStatus, StringToStringArrayLUT } from '../types';

interface KeywordTreeItemProps extends TreeItemContentProps {
  onUpdateKeywordAssignedToSelectedMediaItems: (assignKeyword: boolean) => void;
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
    onUpdateKeywordAssignedToSelectedMediaItems,
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
  //            map keywordNodeId to array of mediaItemIds (that include this keyword)
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

  const getKeywordAssignedToSelectedMediaItemsStatus = (): KeywordAssignedToSelectedMediaItemsStatus => {
    if (Object.prototype.hasOwnProperty.call(mapKeywordNodeIdToSelectedMediaItemIds, nodeId)) {
      const selectedMediaItemIdsThatIncludeThisKeyword: string[] = mapKeywordNodeIdToSelectedMediaItemIds[nodeId];
      if (selectedMediaItemIdsThatIncludeThisKeyword.length === 0) {
        debugger;
      } else if (selectedMediaItemIdsThatIncludeThisKeyword.length === selectedMediaItemIds.length) {
        return KeywordAssignedToSelectedMediaItemsStatus.AllSelectedMediaItemsIncludeThisKeyword;
      } else {
        return KeywordAssignedToSelectedMediaItemsStatus.SomeSelectedMediaItemsIncludeThisKeyword;
      }
    }
    return KeywordAssignedToSelectedMediaItemsStatus.NoSelectedMediaItemsIncludeThisKeyword;
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
  
  
  const handleClickKeywordAssign = () => {
    const keywordAssignedToSelectedMediaItemsStatus: KeywordAssignedToSelectedMediaItemsStatus = getKeywordAssignedToSelectedMediaItemsStatus();
    if (keywordAssignedToSelectedMediaItemsStatus === KeywordAssignedToSelectedMediaItemsStatus.AllSelectedMediaItemsIncludeThisKeyword) {
      console.log('all selected media items include this keyword: unassign keyword from all selected media items');
      onUpdateKeywordAssignedToSelectedMediaItems(false);
    } else if (keywordAssignedToSelectedMediaItemsStatus === KeywordAssignedToSelectedMediaItemsStatus.NoSelectedMediaItemsIncludeThisKeyword) {
      console.log('no selected media items include this keyword: assign keyword to all selected media items');
      onUpdateKeywordAssignedToSelectedMediaItems(true);
    } else {
      console.log('some selected media items include this keyword: assign keyword to all selected media items');
      onUpdateKeywordAssignedToSelectedMediaItems(true);
    }
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
        onChange={handleClickKeywordAssign}
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
      onUpdateKeywordAssignedToSelectedMediaItems: (assignKeyword: boolean) => props.onUpdateKeywordAssignedToSelectedMediaItems(assignKeyword),
      selectedMediaItemIds: props.selectedMediaItemIds,
      mapKeywordNodeIdToSelectedMediaItemIds: props.mapKeywordNodeIdToSelectedMediaItemIds,
    }}
    {...props}
    ref={ref}
  />;
});

