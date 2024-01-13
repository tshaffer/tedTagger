import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';



import clsx from 'clsx';
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
}

const Keywords = (props: KeywordsProps) => {

  if (!props.appInitialized) {
    return null;
  }

  const buildTreeViewItems = (keywordNode: KeywordNodeDeep): JSX.Element => {

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
      return buildTreeViewItems(childNode);
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

  const buildTreeViewContents = (): JSX.Element => {
    const treeViewItems: JSX.Element = buildTreeViewItems(props.keywordsAsTree!.root);
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {treeViewItems}
      </TreeView>
    );
  };

  const treeViewContents: JSX.Element = buildTreeViewContents();

  return (
    <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Keywords);

