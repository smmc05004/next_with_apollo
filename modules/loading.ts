import { Loading_start, Loading_end, loadingActionTypes, LoadingActionCreators } from "../interfaces/module/loading/loadingact.interfaces";
import { loadingState } from "../interfaces/module/loading/loading.interface";

export const loadingStart = (): Loading_start => ({ type: loadingActionTypes.LOADING_START });

export const loadingEnd = (): Loading_end => ({ type: loadingActionTypes.LOADING_END });

const initialState: loadingState = {
  loading: false,
};

const loading = (state = initialState, action: LoadingActionCreators): loadingState => {
  switch (action.type) {
    case loadingActionTypes.LOADING_START:
      return {
        loading: true,
      };
    case loadingActionTypes.LOADING_END:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default loading;
