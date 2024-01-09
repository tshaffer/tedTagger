import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import { Keyword, KeywordNodeDeep, KeywordTreeDeep, StringToKeywordLUT } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getKeywordRootNodeId, getKeywordsAsTree, getKeywordsById } from '../selectors';

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
        <TreeItem
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
      <TreeItem
        key={keywordNode.nodeId}
        nodeId={keywordNode.nodeId}
        label={props.keywordsById[keywordNode.keywordId].label}
      >
        {keywordNodes}
      </TreeItem>
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
