import * as React from 'react';

import { connect } from 'react-redux';
import { AppTagAvatar, Tag, UserTagAvatar } from '../types';
import { getAllAppTagAvatars, getAllUserTagAvatars } from '../selectors';
import path from 'path-browserify';
import { Tooltip } from '@mui/material';

export interface TagAvatarPropsFromParent {
  googleId: string;
  photoTag: Tag;
  avatarType: string,
  avatarId: string
}

export interface TagAvatarProps extends TagAvatarPropsFromParent {
  appTagAvatars: AppTagAvatar[];
  userTagAvatars: UserTagAvatar[];
}

const TagAvatar = (props: TagAvatarProps) => {

  const getTagAvatarUrl = (avatarType: string, avatarId: string): string => {

    let tagAvatarUrl = '';

    if (avatarType === 'app') {
      let appTagAvatarPath = '';
      for (const appTagAvatar of props.appTagAvatars) {
        if (appTagAvatar.id === avatarId) {
          appTagAvatarPath = appTagAvatar.path;
          break;
        }
      }
      if (appTagAvatarPath === '') {
        debugger;
        throw new Error('appTagAvatarPath is empty');
      }
      tagAvatarUrl = path.join('appAvatars', appTagAvatarPath);
    } else {
      let userTagAvatarPath = '';
      for (const userTagAvatar of props.userTagAvatars) {
        if (userTagAvatar.id === avatarId) {
          userTagAvatarPath = userTagAvatar.path;
          break;
        }
      }
      if (userTagAvatarPath === '') {
        debugger;
        throw new Error('userTagAvatarPath is empty');
      }
      tagAvatarUrl = path.join('userAvatars', userTagAvatarPath);
    }

    return tagAvatarUrl;
  };
  const url: string = getTagAvatarUrl(props.avatarType, props.avatarId);

  return (
    <Tooltip title={props.photoTag.label} key={props.photoTag.id + '::' + props.googleId}>
      <img src={url} />
    </Tooltip>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    googleId: ownProps.googleId,
    photoTag: ownProps.photoTag,
    avatarId: ownProps.avatarId,
    appTagAvatars: getAllAppTagAvatars(state),
    userTagAvatars: getAllUserTagAvatars(state),
  };
}

export default connect(mapStateToProps)(TagAvatar);
