import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getMediaItems } from '../selectors';
import { getPhotoUrl } from '../utilities';

export interface SurveyViewProps {
  mediaItems: MediaItem[];
}

const SurveyView = (props: SurveyViewProps) => {

  const [selectedPhotos, setSelectedPhotos] = React.useState<number[]>([]);

  const toggleSelection = (photoId: number) => {
    setSelectedPhotos(prevSelected => {
      if (prevSelected.includes(photoId)) {
        return prevSelected.filter(id => id !== photoId);
      } else {
        return [...prevSelected, photoId];
      }
    });
  };

  console.log('mediaItems');
  console.log(props.mediaItems);

  if (props.mediaItems.length === 0) {
    return null;
  }

  // const photos = props.mediaItems.map(mediaItem:z => ({
  //   id: mediaItem.id,
  //   src: mediaItem.url,
  // }));

  // const photos: any[] = props.mediaItems.map((mediaItem: MediaItem) => ({
  //   id: mediaItem.googleId,
  //   src: getPhotoUrl(mediaItem),
  // }));

  const photos: any[] = [];
  for (let mediaItemIndex = 0; mediaItemIndex < 5; mediaItemIndex++) {
    const mediaItem = props.mediaItems[mediaItemIndex];
    photos.push({
      id: mediaItemIndex,
      src: getPhotoUrl(mediaItem),
    });
  }

  // return (
  //   <div id='surveyRoot'>
  //     <div className="survey-view">
  //       {photos.map(photo => (
  //         <div
  //           key={photo.id}
  //           className={`photo ${selectedPhotos.includes(photo.id) ? 'selected' : ''}`}
  //           onClick={() => toggleSelection(photo.id)}
  //         >
  //           <img src={photo.src} alt={`Photo ${photo.id}`} />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  const cardMediaStyle = {
    objectFit: 'contain',
    // border: 4,
    // borderColor: 'orange',
    height: '300px',
    // paddingLeft: '8px',
    backgroundColor: 'purple',
  };


  return (
    <div id='surveyRoot'>
      <div className='survey-view'>
        {photos.map(photo => (
          <div className='survey-grid-item-style'
            key={photo.id}>
            <div id="survey-card-style"
              key={photo.id}>
              <div
                key={photo.id}
                className='survey-image-container'
              >
                <img
                  src={photo.src}
                />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

function mapStateToProps(state: any) {
  return {
    mediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyView);
