import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { TedTaggerDispatch } from '../models';
// import { getMediaItemById, getMediaItems, getSelectedMediaItemIds } from '../selectors';
import { getLoupeViewMediaItemId, getMediaItemById } from '../selectors';
import { MediaItem } from '../types';
import { getPhotoUrl } from '../utilities';
import { isNil } from 'lodash';
import { bodyMargins, footerHeight, toolbarHeight } from '../constants';

export interface LoupeViewProps {
  mediaItem: MediaItem | null;
}

const LoupeView = (props: LoupeViewProps) => {

  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isNil(props.mediaItem)) {
    return null;
  }

  const src = getPhotoUrl(props.mediaItem);

  const maxHeightInPixels = windowDimensions.height - (toolbarHeight + footerHeight + bodyMargins);
  const maxHeightProperty = maxHeightInPixels.toString() + 'px';

  return (
    <div id='loupeViewImage'>
      <img
        style={{ width: '100%', objectFit: 'contain', maxHeight: maxHeightProperty }}
        src={src}
      />
    </div>
  );
};

function mapStateToProps(state: any) {
  const loupeViewMediaItemId = getLoupeViewMediaItemId(state);
  return {
    mediaItem: getMediaItemById(state, loupeViewMediaItemId),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoupeView);
