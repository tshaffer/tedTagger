import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TedTaggerDispatch } from '../models';

import '../styles/TedTagger.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DivBoxProps {
}

const DivBox = (props: DivBoxProps) => {

  const getRow0 = (): JSX.Element => {
    return (
      <div style={{
        height: '240px'
      }}>
        <div style={{
          display: 'inline-block',
          width: '100px',
          height: '240px',
          backgroundColor: 'lightgreen'
        }}>
          Item 1
        </div>
        <div style={{
          display: 'inline-block',
          width: '200px',
          height: '240px',
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
        height: '200px'
      }}>
        <div style={{
          display: 'inline-block',
          width: '400px',
          height: '200px',
          backgroundColor: 'lightgreen'
        }}>
          Item 1
        </div>
        <div style={{
          display: 'inline-block',
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue'
        }}>
          Item 2
        </div>
        <div style={{
          display: 'inline-block',
          width: '300px',
          height: '200px',
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
        height: '500px',
      }}>
        <div style={{
          display: 'inline-block',
          width: '600px',
          height: '500px',
          backgroundColor: 'lightgray'
        }}>
          Item 1
        </div>
        <div style={{
          display: 'inline-block',
          width: '300px',
          height: '500px',
          backgroundColor: 'cyan'
        }}>
          Item 2
        </div>
        <div style={{
          display: 'inline-block',
          width: '200px',
          height: '500px',
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

export default connect(mapStateToProps, mapDispatchToProps)(DivBox);
