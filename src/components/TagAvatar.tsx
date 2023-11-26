import * as React from 'react';

import { connect } from 'react-redux';
import { AppTagAvatar, Tag, UserTagAvatar } from '../types';
import { getAllAppTagAvatars, getAllUserTagAvatars, getTagById } from '../selectors';
import { getTagAvatarUrl } from '../utilities';

export interface TagAvatarPropsFromParent {
  tagId: string;
  avatarId: string
}

export interface TagAvatarProps extends TagAvatarPropsFromParent {
  tag: Tag;
  appTagAvatars: AppTagAvatar[];
  userTagAvatars: UserTagAvatar[];
}

const TagAvatar = (props: TagAvatarProps) => {
  
  const url: string = getTagAvatarUrl(props.avatarId, props.tag, props.appTagAvatars, props.userTagAvatars);

  return (
    <img src={url} key={props.tag.id} alt={props.tag.label} />
  );
};

function mapStateToProps(state: any, ownProps: any) {
  const tagId = ownProps.tagId;
  const tag = getTagById(state, tagId)!;
  return {
    avatarId: tag.avatarId,
    tag: getTagById(state, ownProps.tagId)!,
    appTagAvatars: getAllAppTagAvatars(state),
    userTagAvatars: getAllUserTagAvatars(state),
  };
}

export default connect(mapStateToProps)(TagAvatar);
