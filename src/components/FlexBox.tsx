import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TedTaggerDispatch } from '../models';

import '../styles/TedTagger.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlexBoxProps {
}

const FlexBox = (props: FlexBoxProps) => {

  const getRow0 = (): JSX.Element => {
    return (
      <div style={{
        display: 'flex',
        height: '240px'
      }}>
        <div style={{
          flex: 100,
          backgroundColor: 'lightgreen'
        }}>
          Item 1
        </div>
        <div style={{
          flex: 200,
          backgroundColor: 'lightblue'
        }}>
          Item 2
        </div>
      </div>
    );
  };

  const getRow1 = (): JSX.Element => {
    return (
      <div style={{
        display: 'flex',
        height: '200px'
      }}>
        <div style={{
          flex: 400,
          backgroundColor: 'lightgreen'
        }}>
          Item 1
        </div>
        <div style={{
          flex: 200,
          backgroundColor: 'lightblue'
        }}>
          Item 2
        </div>
        <div style={{
          flex: 300,
          backgroundColor: 'navajowhite'
        }}>
          Item 2
        </div>
      </div>
    );
  };

  const getRow3 = (): JSX.Element => {
    return (
      <div style={{
        display: 'flex',
        height: '500px'
      }}>
        <div style={{
          flex: 600,
          backgroundColor: 'lightgray'
        }}>
          Item 1
        </div>
        <div style={{
          flex: 300,
          backgroundColor: 'cyan'
        }}>
          Item 2
        </div>
        <div style={{
          flex: 200,
          backgroundColor: 'brown'
        }}>
          Item 2
        </div>
      </div>
    );
  };

  const row0: JSX.Element = getRow0();
  const row1: JSX.Element = getRow1();
  const row3: JSX.Element = getRow3();

  return (
    <React.Fragment>
      {row0}
      {row1}
      {row3}
    </React.Fragment>
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
