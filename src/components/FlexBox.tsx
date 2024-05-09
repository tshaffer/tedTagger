import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TedTaggerDispatch } from '../models';

import '../styles/TedTagger.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlexBoxProps {
}

const FlexBox = (props: FlexBoxProps) => {

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>Item 1</div>
      <div style={{ flex: 1 }}>Item 2</div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FlexBox);
