// @ts-ignore
import { createStore } from 'redux'
import { rootReducer } from '@/store/reducers'

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store