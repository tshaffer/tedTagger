import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export interface LazilyLoadedImageProps {
  // image: HTMLImageElement;
  imageUrl: string
}
const LazilyLoadedImage = (props: LazilyLoadedImageProps) => (

  <div>
    <LazyLoadImage
      alt={props.imageUrl}
      height={430}
      src={props.imageUrl} // use normal <img> attributes as props
      width={325}
    />
  </div>
);

export default LazilyLoadedImage;