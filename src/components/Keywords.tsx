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

  console.log(props.keywordsAsTree);

  const buildTreeViewItems = (keywordNode: KeywordNodeDeep): JSX.Element => {

    console.log('invoke buildTreeViewItem: ', props.keywordsById[keywordNode.keywordId].label);

    if (keywordNode.childNodes.length === 0) {
      const keyword: Keyword = props.keywordsById[keywordNode.keywordId];
      const keywordLabel: string = keyword.label;
      console.log(keywordLabel + ' has no children');
      return (
        <TreeItem
          key={keywordNode.nodeId}
          nodeId={keywordNode.nodeId}
          label={keywordLabel}
        />
      );
    }
    const keywordNodes = keywordNode.childNodes.map((childNode: KeywordNodeDeep) => {
      console.log('recursively invoke buildTreeViewItem with child: ', props.keywordsById[childNode.keywordId].label);
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

  /*
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="MUI">
            <TreeItem nodeId="8" label="index.js" />
          </TreeItem>
        </TreeItem>
      </TreeView>
  */
  return (
    <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
      {treeViewContents}
    </Box>
  );
};

function mapStateToProps(state: any) {
  console.log('mapStateToProps');
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
