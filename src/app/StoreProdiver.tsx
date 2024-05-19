'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './configureStore'
import PersistCombineReducers from 'redux-persist/lib/persistCombineReducers'
import { PersistGate } from 'redux-persist/integration/react'

const StoreProdiver = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default StoreProdiver