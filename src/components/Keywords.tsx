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

import { Keyword, KeywordNodeDeep, KeywordTreeDeep, StringToKeywordLUT } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getKeywordRootNodeId, getKeywordsAsTree, getKeywordsById } from '../selectors';

import AddKeywordDialog from './AddKeywordDialog';
import { addKeyword } from '../controllers';

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
      <Checkbox />
    </div>
  );
});

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: TreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});

export interface KeywordsProps {
  appInitialized: boolean;
  keywordRootNodeId: string;
  keywordsAsTree: KeywordTreeDeep | undefined;
  keywordsById: StringToKeywordLUT;
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

  const handleAddKeyword = (keywordLabel: string): void => {
    props.onAddKeyword(props.keywordRootNodeId, keywordLabel, 'user');
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
      >
        {keywordNodes}
      </CustomTreeItem>
    );
  };

  const renderTreeViewContents = (): JSX.Element => {
    const treeViewItems: JSX.Element = renderTreeViewItems(props.keywordsAsTree!.root);
    return (
      <div>
        <Button onClick={() => setShowAddKeywordDialog(true)}>Add Keyword</Button>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {treeViewItems}
        </TreeView>
      </div>
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

function mapStateToProps(state: any) {
  return {
    appInitialized: getAppInitialized(state),
    keywordRootNodeId: getKeywordRootNodeId(state),
    keywordsAsTree: getKeywordsAsTree(state),
    keywordsById: getKeywordsById(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddKeyword: addKeyword,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Keywords);

