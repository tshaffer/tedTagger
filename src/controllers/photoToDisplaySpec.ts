import axios from 'axios';

import { TedTaggerDispatch,
  //  setPhotosToDisplaySpecRedux
   } from '../models';
import { serverUrl, apiUrlFragment, PhotosToDisplaySpec, TagSelectorType } from '../types';

export const loadPhotosToDisplaySpec = () => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'photosToDisplaySpec';

    return axios.get(path)
      .then((photosToDisplaySpecResponse: any) => {
        const photosToDisplaySpec: PhotosToDisplaySpec = (photosToDisplaySpecResponse as any).data;
        // console.log('photosToDisplaySpec', photosToDisplaySpec);
        // dispatch(setPhotosToDisplaySpecRedux(photosToDisplaySpec));
      });
  };
};

// export const setDateRangeSpecification = (specifyDateRange: boolean, startDate?: string, endDate?: string) => {
//   return (dispatch: TedTaggerDispatch, getState: any) => {

//     const path = serverUrl + apiUrlFragment + 'dateRangeSpecification';

//     const setDateRangeSpecificationBody = {
//       specifyDateRange,
//       startDate,
//       endDate,
//     };

//     return axios.post(
//       path,
//       setDateRangeSpecificationBody
//     ).then((response) => {
//       dispatch(setDateRangeSpecificationRedux(specifyDateRange, startDate, endDate));
//       return specifyDateRange;
//     }).catch((error) => {
//       console.log('error');
//       console.log(error);
//       return '';
//     });
//   };
// };

// export const setTagExistenceSpecification = (specifyTagExistence: boolean, tagSelector?: TagSelectorType) => {
//   return (dispatch: TedTaggerDispatch, getState: any) => {

//     const path = serverUrl + apiUrlFragment + 'tagExistenceSpecification';

//     const setTagExistenceSpecificationBody = {
//       specifyTagExistence,
//       tagSelector,
//     };

//     return axios.post(
//       path,
//       setTagExistenceSpecificationBody
//     ).then((response) => {
//       dispatch(setTagExistenceSpecificationRedux(specifyTagExistence, tagSelector));
//       return specifyTagExistence;
//     }).catch((error) => {
//       console.log('error');
//       console.log(error);
//       return '';
//     });
//   };
// };

