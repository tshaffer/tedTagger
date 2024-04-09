import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';

export interface SurveyViewProps {
  mediaItems: MediaItem[];
}

const SurveyView = (props: SurveyViewProps) => {
  return (
    <div>pizza</div>
  );
};

function mapStateToProps(state: any) {
  return {
    mediaItems: [],
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyView);
