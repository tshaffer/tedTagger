import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import clsx from 'clsx';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Typography from '@mui/material/Typography';
import {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from '@mui/x-tree-view/TreeItem';
import Checkbox from '@mui/material/Checkbox';

import { Keyword, KeywordNode, KeywordNodeDeep, KeywordTreeDeep, MediaItem, StringToKeywordLUT, StringToKeywordNodeLUT, StringToStringArrayLUT } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getKeywordNodesByNodeId, getKeywordRootNodeId, getKeywordsAsTree, getKeywordsById, getMediaItemById, getSelectedMediaItemIds } from '../selectors';

import AddKeywordDialog from './AddKeywordDialog';
import { addKeyword } from '../controllers';
import { isNil } from 'lodash';

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
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
    const assignKeywordToItem: boolean = (event.target as HTMLInputElement).checked;
    (props as any).onEatPizza();
  };

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
        checked={false}
        onChange={handleToggleAssignKeywordToItem}
      />
    </div>
  );
});

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  // props: TreeItemProps,
  props: any,
  ref: React.Ref<HTMLLIElement>,
) {
  // props: nodeId, label (children sometimes). need to include isAssignedToMediaItem somehow. how to encode it? 
  // I think node needs to be a custom interface and includes information about the selected media item 
  // required props for the treeItem node
  //    isSelectedMediaItemAssignedToKeyword
  //    toggleIsSelectedMediaItemAssignedToKeyword
  // what information is necessary to assign the props properly?
  //    mapping of media item id to keyword id
  //    mapping of keyword id to media item id
  return <TreeItem
    ContentComponent={CustomContent}
    ContentProps={ { 
      onEatPizza: () => props.onEatPizza(),
    } }
    {...props}
    ref={ref}
  />;
});

export interface KeywordsProps {
  appInitialized: boolean;
  keywordRootNodeId: string;
  keywordsAsTree: KeywordTreeDeep | undefined;
  keywordsById: StringToKeywordLUT;
  selectedMediaItemIds: string[],
  onAddKeyword: (
    parentNodeId: string,
    keywordLabel: string,
    keywordType: string,
  ) => void;
}

const Keywords = (props: KeywordsProps) => {

  const [showAddKeywordDialog, setShowAddKeywordDialog] = React.useState(false);

  if (!props.appInitialized) {
    return null;
  }

  const handleCloseAddKeywordDialog = () => {
    setShowAddKeywordDialog(false);
  };

  const handleAddKeyword = (keywordLabel: string, parentKeywordNodeId: string): void => {
    props.onAddKeyword(parentKeywordNodeId, keywordLabel, 'user');
  };

  const renderTreeViewItems = (keywordNode: KeywordNodeDeep): JSX.Element => {

    if (keywordNode.childNodes.length === 0) {
      const keyword: Keyword = props.keywordsById[keywordNode.keywordId];
      const keywordLabel: string = keyword.label;
      return (
        <CustomTreeItem
          key={keywordNode.nodeId}
          nodeId={keywordNode.nodeId}
          label={keywordLabel}
          onEatPizza={() => console.log('eat pizza - 0')}
        />
      );
    }
    const keywordNodes = keywordNode.childNodes.map((childNode: KeywordNodeDeep) => {
      return renderTreeViewItems(childNode);
    });

    return (
      <CustomTreeItem
        key={keywordNode.nodeId}
        nodeId={keywordNode.nodeId}
        label={props.keywordsById[keywordNode.keywordId].label}
        onEatPizza={() => console.log('eat pizza - 1')}
      >
        {keywordNodes}
      </CustomTreeItem>
    );
  };

  const handleNodeFocus = (param1: any, param2: any) => {
    // console.log('handleNodeFocus');
    // console.log(param1);
    // console.log(param2);
  };

  const handleNodeSelect = (param1: any, param2: any) => {
    // console.log('handleNodeSelected');
    // console.log(param1);
    // console.log(param2);
  };

  const handleNodeToggle = (param1: any, param2: any) => {
    // console.log('handleNodeToggle');
    // console.log(param1);
    // console.log(param2);
  };

  const renderTreeViewContents = (): JSX.Element => {
    const treeViewItems: JSX.Element = renderTreeViewItems(props.keywordsAsTree!.root);
    return (
      <div>
        <Button onClick={() => setShowAddKeywordDialog(true)}>Add Keyword</Button>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeFocus={handleNodeFocus}
          onNodeSelect={handleNodeSelect}
          onNodeToggle={handleNodeToggle}
        >
          {treeViewItems}
        </TreeView>
      </div >
    );
  };

  const treeViewContents: JSX.Element = renderTreeViewContents();

  return (
    <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
      <AddKeywordDialog
        open={showAddKeywordDialog}
        onAddKeyword={handleAddKeyword}
        onClose={handleCloseAddKeywordDialog}
      />
      {treeViewContents}
    </Box>
  );
};

const generatePropData = (state: any): any => {

  // required mappings
  //    for each keywordNodeId,
  //        mediaItems (ids) that include this keyword
  //            map keywordNodeId to array of mediaItemIds
  //    for each selectedMediaItem(id)
  //        list of keywords associated with this media item
  //            map mediaItemId to array of keywordNodeIds

  const keywordNodesByNodeId: StringToKeywordNodeLUT = getKeywordNodesByNodeId(state);
  const selectedMediaItemIds: string[] = getSelectedMediaItemIds(state);

  const mapKeywordNodeIdToSelectedMediaItemIds: StringToStringArrayLUT = {};
  const mapSelectedMediaItemIdToKeywordNodeIds: StringToStringArrayLUT = {};

  for (const keywordNodeId in keywordNodesByNodeId) {
    for (const selectedMediaItemId of selectedMediaItemIds) {
      const selectedMediaItem: MediaItem | null = getMediaItemById(state, selectedMediaItemId);
      if (!isNil(selectedMediaItem) && !isNil(selectedMediaItem.keywordNodeIds)) {
        const keywordNodeIdsForSelectedMediaItem: string[] = selectedMediaItem.keywordNodeIds;
        if (keywordNodeIdsForSelectedMediaItem.includes(keywordNodeId)) {
          if (Object.prototype.hasOwnProperty.call(mapKeywordNodeIdToSelectedMediaItemIds, keywordNodeId)) {
            mapKeywordNodeIdToSelectedMediaItemIds[keywordNodeId].push(selectedMediaItemId);
          } else {
            mapKeywordNodeIdToSelectedMediaItemIds[keywordNodeId] = [selectedMediaItemId];
          }
        }
      }
    }
  }

  for (const selectedMediaItemId of selectedMediaItemIds) {
    const selectedMediaItem: MediaItem | null = getMediaItemById(state, selectedMediaItemId);
    if (!isNil(selectedMediaItem) && !isNil(selectedMediaItem.keywordNodeIds)) {
      const keywordNodeIdsForSelectedMediaItem: string[] = selectedMediaItem.keywordNodeIds;
      for (const keywordNodeId in keywordNodesByNodeId) {
        if (keywordNodeIdsForSelectedMediaItem.includes(keywordNodeId)) {
          if (Object.prototype.hasOwnProperty.call(mapSelectedMediaItemIdToKeywordNodeIds, keywordNodeId)) {
            mapSelectedMediaItemIdToKeywordNodeIds[selectedMediaItemId].push(keywordNodeId);
          } else {
            mapSelectedMediaItemIdToKeywordNodeIds[selectedMediaItemId] = [keywordNodeId];
          }
        }
      }
    }
  }

  // console.log('generatePropData');
  // console.log(mapKeywordNodeIdToSelectedMediaItemIds);
  // console.log(mapSelectedMediaItemIdToKeywordNodeIds);

};

function mapStateToProps(state: any) {
  // console.log('mapStateToProps');
  if (getAppInitialized(state)) {
    // console.log('keywordRootNodeId', getKeywordRootNodeId(state));
    // console.log('keywordsAsTree');
    // console.log(getKeywordsAsTree(state));
    // console.log('keywordsById');
    // console.log(getKeywordsById(state));
    // console.log('selectedMediaItemIds');
    // console.log(getSelectedMediaItemIds(state));
    generatePropData(state);
  }
  return {
    appInitialized: getAppInitialized(state),
    keywordRootNodeId: getKeywordRootNodeId(state),
    keywordsAsTree: getKeywordsAsTree(state),
    keywordsById: getKeywordsById(state),
    selectedMediaItemIds: getSelectedMediaItemIds(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddKeyword: addKeyword,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Keywords);

