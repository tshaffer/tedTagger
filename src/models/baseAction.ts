import {
  Action,
  AnyAction,
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TedTaggerState } from '../types';

export interface TedTaggerBaseAction extends Action {
  type: string;   // override Any - must be a string
  payload: {} | null;
}

export interface TedTaggerModelBaseAction<T> extends Action {
  type: string;   // override Any - must be a string
  payload: T;
  // error?: boolean;
  // meta?: {};
}

