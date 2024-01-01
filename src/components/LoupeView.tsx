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

  // const loupeRef = React.useRef(null);
  // const imgRef = React.useRef(null);

  // React.useEffect(() => {
  //   console.log('LoupeView useEffect invoked');
  //   // console.log('loupeRef', loupeRef, loupeRef.current);
  //   console.log('imgRef', imgRef, imgRef.current);
  // }, []);

  if (isNil(props.mediaItem)) {
    return null;
  }

  const src = getPhotoUrl(props.mediaItem);

  // if (loupeRef && loupeRef.current) {
  //   console.log(getComputedStyle(loupeRef.current));
  // } else if (loupeRef) {
  //   console.log('loupeRef.current is null');
  // } else {
  //   console.log('loupeRef is null');
  // }

  // if (imgRef && imgRef.current) {
  //   console.log(getComputedStyle(imgRef.current));
  // } else if (imgRef) {
  //   console.log('imgRef.current is null');
  // } else {
  //   console.log('imgRef is null');
  // }

  // const outputHeight = (ref: React.MutableRefObject<null>) => {
  //   if (ref && ref.current) {
  //     const ele: HTMLElement = ref.current;
  //     console.log('offsetHeight');
  //     console.log(ele.offsetHeight);
  //   }
  // };

  const handleLoupe = React.useCallback((node: any) => {
    console.log('handleLoupe');
    console.log(node);
    // setElementRect(node?.getBoundingClientRect());
    console.log(node.offsetHeight);
  }, []);

  const handleImg = React.useCallback((node: any) => {
    console.log('handleImg');
    console.log(node);
    console.log(node.offsetHeight);

    // setElementRect(node?.getBoundingClientRect());
  }, []);


  //     <div ref={handleLoupe} className='loupeView' onClick={() => { console.log('loupeView onClick'); outputHeight(loupeRef); }}>
  //         onClick={() => { console.log('imgView onClick'); outputHeight(imgRef); }}

  return (
    <div ref={handleLoupe} className='loupeView'>
      <img
        className='imgView'
        style={{ width: '100%', objectFit: 'contain' }}
        src={src}
        ref={handleImg}
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
