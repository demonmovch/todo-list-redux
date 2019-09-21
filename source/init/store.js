import { createStore } from 'redux';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { enhancedStore, sagaMiddleware } from './core';

export const store = createStore(rootReducer, enhancedStore);

sagaMiddleware.run(rootSaga);
