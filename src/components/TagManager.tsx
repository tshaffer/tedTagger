import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { Tag } from '../types';
import { getAllTags } from '../selectors';

export interface TagManagerPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface TagManagerProps extends TagManagerPropsFromParent {
  tags: Tag[],
}

const TagManager = (props: TagManagerProps) => {

  return (
    <div>pizza</div>
  );
};

function mapStateToProps(state: any) {
  return {
    tags: getAllTags(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagManager);

