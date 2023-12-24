import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import path from 'path-browserify';

import { MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getMediaItem, getFullScreenMediaItemId } from '../selectors';


export interface FullScreenPhotoProps {
  mediaItem: MediaItem | null;
}

function FullScreenPhoto(props: FullScreenPhotoProps) {

  const [aspectRatio, setAspectRatio] = React.useState<number | null>(null);

  const getPhotoUrl = (): string => {
    const basename: string = path.basename(props.mediaItem!.filePath!);
    const numChars = basename.length;
    const photoUrl = path.join(
      '/images',
      basename.charAt(numChars - 6),
      basename.charAt(numChars - 5),
      basename,
    );
    return photoUrl;
  };


  React.useEffect(() => {
    const updateAspectRatio = () => {
      const img = new Image();
      img.src = getPhotoUrl();

      img.onload = () => {
        console.log('img dimensions', img.width, img.height);
        const ratio = img.width / img.height;
        setAspectRatio(ratio);
      };
    };

    updateAspectRatio();
  }, [getPhotoUrl()]);

  const src = getPhotoUrl();

  // const leftSideDrawerWidth = 256;
  // //   const appBarWidth = rightDrawerOpen ? `calc(100% - ${leftSideDrawerWidth + rightSideDrawerWidth}px)` : `calc(100% - ${leftSideDrawerWidth}px)`;

  // const photoWidth = `calc(100% - ${leftSideDrawerWidth}px)`;
  // console.log('photoWidth', photoWidth);

  // return (
  //   <div style={{ maxWidth: 1450, maxHeight: 748, margin: '0 auto', overflow: 'hidden' }}>
  //     {aspectRatio !== null && (
  //       <div
  //         style={{
  //           position: 'relative',
  //           width: '100%',
  //           paddingBottom: `${(1 / aspectRatio) * 100}%`,
  //         }}
  //       >
  //         <img
  //           src={src}
  //           alt="Image"
  //           style={{
  //             position: 'absolute',
  //             top: 0,
  //             left: 0,
  //             width: '100%',
  //             height: '100%',
  //             objectFit: 'contain',
  //           }}
  //         />
  //       </div>
  //     )}
  //   </div>
  // )

  //     <div style={{ width: '1450px', height: '748px', maxWidth: '1450px', maxHeight: '748px' }}>

  //         style={{ objectFit: 'contain', }}

  return (
    <div style={{ width: '997px', height: '748px' }}>
      <img
        style={{ width: '997px', height: '748px' }}
        src={src}
      />
      pizza
    </div>
  );
}


function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: getMediaItem(state, getFullScreenMediaItemId(state)),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenPhoto);
