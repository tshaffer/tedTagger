import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '@mui/material/List';

export interface DeletedMediaItemsDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface DeletedMediaItemsDialogProps extends DeletedMediaItemsDialogPropsFromParent {
  appInitialized: boolean;
}

const DeletedMediaItemsDialog = (props: DeletedMediaItemsDialogProps) => {
  return (
    <div></div>
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(DeletedMediaItemsDialog);


