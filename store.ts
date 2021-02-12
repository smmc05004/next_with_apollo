import { createStore, applyMiddleware, Store, compose, AnyAction } from "redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import createSagaMiddleware, { Task } from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { RootStateInterface } from "./interfaces/rootState";

export interface SagaStore extends Store<RootStateInterface, AnyAction> {
  sagaTask?: Task;
}

const makeStore: MakeStore<RootStateInterface> = (context: Context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, logger];

  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  // 2: Add an extra parameter for applying middleware:
  const store = createStore(rootReducer, enhancer);

  // 3: Run your sagas on server
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

const wrapper = createWrapper<RootStateInterface>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
