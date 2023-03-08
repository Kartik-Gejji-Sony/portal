import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { activeIcon } from './Reducers/activeIcon'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { projectReducers } from './Reducers/projectReducers'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  activeIcon: activeIcon,
  projectReducers: projectReducers
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export const persistor = persistStore(configStore)