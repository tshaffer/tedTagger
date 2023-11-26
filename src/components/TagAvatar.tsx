import * as React from 'react';

import { connect } from 'react-redux';
import { AppTagAvatar, Tag, UserTagAvatar } from '../types';
import { getAllAppTagAvatars, getAllUserTagAvatars, getTagById } from '../selectors';
import { getTagAvatarUrl } from '../utilities';

export interface TagAvatarPropsFromParent {
  tagId: string;
}

export interface TagAvatarProps extends TagAvatarPropsFromParent {
  avatarId: string;
  tag: Tag;
  appTagAvatars: AppTagAvatar[];
  userTagAvatars: UserTagAvatar[];
  tagUrl: string;
}

const TagAvatar = (props: TagAvatarProps) => {
  
  // const url: string = getTagAvatarUrl(props.tag!, props.appTagAvatars, props.userTagAvatars);

  return (
    <img src={props.tagUrl} key={props.tag.id} alt={props.tag.label} />
  );
};

function mapStateToProps(state: any, ownProps: any) {
  const tagId = ownProps.tagId;
  const tag = getTagById(state, tagId)!;
  console.log('mapStateToProps');
  console.log(tagId);
  console.log(tag);
  console.log(getTagAvatarUrl(tag, getAllAppTagAvatars(state), getAllUserTagAvatars(state)));
  return {
    avatarId: tag.avatarId,
    tagUrl: getTagAvatarUrl(tag, getAllAppTagAvatars(state), getAllUserTagAvatars(state)),
    // tagId: ownProps.tagId,
    tag: getTagById(state, ownProps.tagId)!,
    appTagAvatars: getAllAppTagAvatars(state),
    userTagAvatars: getAllUserTagAvatars(state),
  };
}

export default connect(mapStateToProps)(TagAvatar);
