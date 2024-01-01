import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { TedTaggerDispatch } from '../models';
import { getMediaItemById } from '../selectors';
import { MediaItem } from '../types';
import { getPhotoUrl } from '../utilities';
import { isNil } from 'lodash';

export interface LoupeViewPropsFromParent {
  mediaItemId: string;
}

export interface LoupeViewProps extends LoupeViewPropsFromParent {
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

  const maxHeightInPixels = windowDimensions.height - 222;
  const maxHeightProperty = maxHeightInPixels.toString() + 'px';

  console.log('maxHeightProperty: ' + maxHeightProperty);

  return (
    <div className='loupeView'>
      <img
        className='imgView'
        style={{ width: '100%', objectFit: 'contain', maxHeight: maxHeightProperty }}
        src={src}
      />
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: getMediaItemById(state, ownProps.mediaItemId),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoupeView);
