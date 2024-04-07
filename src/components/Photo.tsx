import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Card, CardMedia, GridSize } from '@mui/material';

import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux, setPhotoLayoutRedux } from '../models';
import { selectPhoto } from '../controllers';
import { getAllAppTagAvatars, getAllUserTagAvatars, getTagsLUT, getNumGridColumns, isMediaItemSelected } from '../selectors';
import { AppTagAvatar, MediaItem, PhotoLayout, StringToTagLUT, Tag, UserTagAvatar } from '../types';

import TagAvatar from './TagAvatar';
import { isNil } from 'lodash';
import { getPhotoUrl } from '../utilities';
import { parse } from 'path';

const gridItemStyle = {
  // paddingLeft: '8px',
  // paddingTop: '8px',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px',
};

const selectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'red',
};

const unselectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'orange',
  height: '1080px',
  // paddingLeft: '8px',
  backgroundColor: 'purple',
};

const imgStyle = {
  height: '100%',
  backgroundColor: 'green',
  display: 'block',
  margin: '0 auto',
};

// value is css property value
type CSSValues = {
  [snakeCaseKey: string]: string;
}

type CSSMatchedProperties = {
  [className: string]: CSSValues;
}

// value is camelCaseKey
type CSSPropertyKeys = {
  [snakeCaseKey: string]: string;
}

type CSSParseSpec = {
  [className: string]: CSSPropertyKeys[];
}



export interface PhotoPropsFromParent {
  mediaItem: MediaItem;
}

export interface PhotoProps extends PhotoPropsFromParent {
  numGridColumns: number;
  appTagAvatars: AppTagAvatar[];
  userTagAvatars: UserTagAvatar[];
  tagsLUT: StringToTagLUT;
  isSelected: boolean;
  onClickPhoto: (id: string, commandKey: boolean, shiftKey: boolean) => any;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
}

function Photo(props: PhotoProps) {

  const [clickTimeout, setClickTimeout] = React.useState<NodeJS.Timeout | null>(null);

  const getTagAvatar = (photoTag: Tag): JSX.Element => {
    if (isNil(photoTag.avatarId) || isNil(photoTag.avatarType)) {
      debugger;
    }
    return (
      <TagAvatar
        key={props.mediaItem.googleId + photoTag.id}
        googleId={props.mediaItem.googleId}
        photoTag={photoTag}
        avatarType={photoTag.avatarType}
        avatarId={photoTag.avatarId}
      />
    );
  };

  const getTagAvatars = (photoTags: Tag[]): JSX.Element => {

    const photoTagImages: JSX.Element[] = photoTags.map((photoTag: Tag) => {
      return getTagAvatar(photoTag);
    });

    return (
      <div>
        {photoTagImages}
      </div>
    );
  };

  const handleDoubleClick = () => {
    props.onSetLoupeViewMediaItemId(props.mediaItem.googleId);
    props.onSetPhotoLayoutRedux(PhotoLayout.Loupe);
  };

  const handleClickPhoto = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    props.onClickPhoto(props.mediaItem.googleId, e.metaKey, e.shiftKey);
  };

  const handleClicks = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (clickTimeout !== null) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleDoubleClick();
    } else {
      const clickTimeout = setTimeout(() => {
        clearTimeout(clickTimeout);
        setClickTimeout(null);
        handleClickPhoto(e);
      }, 200);
      setClickTimeout(clickTimeout);
    }
  };

  const getDimensions = () => {

    // window.innerWidth = 1902, which appears to come from
    // from default-stylesheet.js
    //   body {
    //     display: block;
    //     margin: 8px
    // }
    const innerWidth: number = 1902 - 16;

    // .leftColumStyle.width
    // .rightColumnStyle.width
    const centerPanel = innerWidth - 256 - 240;

    const numColumns: number = props.numGridColumns;

    // .gridItemStyle
    const gridItemWidth = centerPanel / numColumns;

    // .cardStyle
    const cardWidth = gridItemWidth - 16;

    // .cardMediaStyle
    const cardMediaWidth = cardWidth - 8;

    return {
      gridItemWidth,
      cardWidth,
      cardMediaWidth,
    };
  };

  const stringIsNumber = (value: string): boolean => {
    return (!Number.isNaN(value));
  };

  const parseCss = (cssParseSpec: CSSParseSpec): CSSMatchedProperties => {

    const cssMatchedProperties: CSSMatchedProperties = {};

    // Get the stylesheets
    const stylesheets = document.styleSheets as unknown as CSSStyleSheet[];

    const cssClassNames = Object.keys(cssParseSpec);

    // Loop through each stylesheet
    for (let i = 0; i < stylesheets.length; i++) {
      const stylesheet = stylesheets[i];

      // Loop through each rule in the stylesheet
      let rules: CSSRuleList | null = null;

      try {
        rules = stylesheet.cssRules;
      } catch (error) {
        try {
          rules = stylesheet.rules;
        } catch (error) {
          console.log('error getting rules');
        }
      }
      if (!isNil(rules)) {
        for (let j = 0; j < rules.length; j++) {

          const rule = rules[j] as CSSStyleRule;
          const className: string = rule.selectorText;
          const cssClassNameIndex: number = cssClassNames.indexOf(className);

          if (cssClassNameIndex >= 0) {

            // Access the properties defined in the rule
            const styles: CSSStyleDeclaration = rule.style;

            let index: number = 0;
            while (index < Object.keys(styles).length) {
              if (Object.keys(styles).length >= index) {
                const styleKey: string = Object.keys(styles)[index];

                // only proceed if styleKey represents a number
                if (!stringIsNumber(styleKey)) {
                  break;
                }

                const styleName: string = Object.values(styles)[index];
                console.log('styleKey: ', styleKey);
                console.log('styleName: ', styleName);
                console.log(cssParseSpec);
                console.log(cssParseSpec[className]);
                const propertyKeys: CSSPropertyKeys[] = cssParseSpec[className];
                console.log('propertyToMatch: ', propertyKeys);

                for (let piIndex = 0; piIndex < propertyKeys.length; piIndex++) {
                  const propertyKey: CSSPropertyKeys = propertyKeys[piIndex];
                  console.log('propertyKey: ', propertyKey);
                  const snakeCaseKey: string = Object.keys(propertyKey)[0];       // flex-basis
                  if (snakeCaseKey === styleName) {
                    console.log('found it');
                    const camelCaseKey: string = Object.values(propertyKey)[0];   // flexBasis
                    const indexOfStyleValue = Object.keys(styles).indexOf(camelCaseKey);
                    const propertyValue: string = Object.values(styles)[indexOfStyleValue];
                    console.log('propertyValue: ', propertyValue);  // 256px
                    if (isNil(cssMatchedProperties[className])) {
                      cssMatchedProperties[className] = {};
                    }
                    cssMatchedProperties[className][camelCaseKey] = propertyValue;
                  }
                }
              }
              index++;
            }
            if (!isNil(Object.keys(styles)[0])) {
              index++;
              const i: number = 0;
              const iAsStr: string = i.toString();

              // if (!isNil(Object.keys(iAsStr))) {
              //   const propertyName = Object.values(styles)[0];
              //   console.log('propertyName: ', propertyName);
              // }
            }
          }
        }

      }

      // if (!isNil(stylesheet.cssRules) || (!isNil(stylesheet.rules))) {

      //   const rules = stylesheet.cssRules || stylesheet.rules; // Handling browser compatibility
      //   for (let j = 0; j < rules.length; j++) {
      //     const rule = rules[j] as CSSStyleRule;

      //     // Check if the rule is a class selector
      //     if (rule.selectorText === '.myClass') {
      //       // Access the properties defined in the rule
      //       const color = rule.style.color;
      //       const fontSize = rule.style.fontSize;

      //       console.log('Color: ' + color + ', Font size: ' + fontSize);
      //     }
      //   }
      // }

    }

    return cssMatchedProperties;
  };

  const photoTags: Tag[] = [];
  // props.mediaItem.tagIds.forEach((tagId: string) => {
  //   const tag: Tag = props.tagsLUT[tagId];
  //   photoTags.push(tag);
  // });

  const photoUrl = getPhotoUrl(props.mediaItem);

  const tagAvatars = getTagAvatars(photoTags);

  const numColumns: number = props.numGridColumns;
  const gridItemSize: GridSize = 12 / numColumns;

  let imageHeight: string = '';
  let cardMediaHeight: number = 0;

  switch (numColumns) {
    case 2: {
      cardMediaHeight = 410;
      imageHeight = '406px';
      break;
    }
    case 3: {
      cardMediaHeight = 264;
      imageHeight = '264px';
      break;
    }
    case 4: {
      cardMediaHeight = 206;
      imageHeight = '202px';
      break;
    }
    case 5: {
      cardMediaHeight = 162;
      imageHeight = '158px';
      break;
    }
    default:
      cardMediaHeight = 134;
      imageHeight = '130px';
      break;
  }

  unselectedCardMediaStyle.height = cardMediaHeight.toString() + 'px';

  const cardMediaClassName: string = props.isSelected ? 'selectedCardMediaStyle' : 'unselectedCardMediaStyle';
  const cardMediaStyle = props.isSelected ? selectedCardMediaStyle : unselectedCardMediaStyle;

  const cssParseSpec: CSSParseSpec = {
    '.leftColumnStyle': [
      {
        'flex-basis': 'flexBasis',
      }
    ],
    '.rightColumnStyle': [
      {
        'flex-basis': 'flexBasis',
      }
    ],
  };

  const cssMatchedProperties: CSSMatchedProperties = parseCss(cssParseSpec);
  console.log('cssMatchedProperties');
  console.log(cssMatchedProperties);

  /*
      gridItemWidth,
      cardWidth,
      cardMediaWidth,
  */
  const dimensions = getDimensions();
  // console.log('dimensions');
  // console.log(dimensions);

  console.log('photo dimensions: ', props.mediaItem.width, props.mediaItem.height);

  console.log('maximum image dimensions:');
  console.log(dimensions.cardMediaWidth);
  console.log(cardMediaHeight);


  // scale the image to fit into the maximum dimensions
  const xScale = props.mediaItem.width! / dimensions.cardMediaWidth;
  const yScale = props.mediaItem.height! / cardMediaHeight;
  const scale = Math.max(xScale, yScale);
  const scaledWidth = Math.round(props.mediaItem.width! / scale);
  const scaledHeight = Math.round(props.mediaItem.height! / scale);
  console.log('scaled dimensions:');
  console.log(scaledWidth);
  console.log(scaledHeight);

  const imageStyle = {
    ...imgStyle,
    width: scaledWidth,
    height: scaledHeight,
  };




  return (
    <Grid item lg={gridItemSize} style={gridItemStyle}>
      <Card
        sx={cardStyle}
      >
        <CardMedia
          id={props.mediaItem.googleId}
          className={cardMediaClassName}
          title={photoUrl}
          sx={cardMediaStyle}
          onClick={handleClicks}
        >
          <img
            src={photoUrl}
            alt={props.mediaItem.fileName}
            style={imageStyle}
            loading='lazy'
          />
        </CardMedia>
        {tagAvatars}
      </Card>
    </Grid>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
    numGridColumns: getNumGridColumns(state),
    appTagAvatars: getAllAppTagAvatars(state),
    userTagAvatars: getAllUserTagAvatars(state),
    tagsLUT: getTagsLUT(state),
    isSelected: isMediaItemSelected(state, ownProps.mediaItem),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onClickPhoto: selectPhoto,
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
    onSetPhotoLayoutRedux: setPhotoLayoutRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
