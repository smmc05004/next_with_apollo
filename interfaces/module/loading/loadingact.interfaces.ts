export enum loadingActionTypes {
  LOADING_START = "LOADING_START",
  LOADING_END = "LOADING_END",
}

export type LoadingActionCreators = Loading_start | Loading_end;

export interface Loading_start {
  type: loadingActionTypes.LOADING_START;
}

export interface Loading_end {
  type: loadingActionTypes.LOADING_END;
}
