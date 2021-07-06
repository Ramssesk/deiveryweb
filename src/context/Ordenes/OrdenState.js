import React, {useReducer} from 'react';
import cx from '../../config/axios'
import ws from '../../config/websocket'

import OrdenContext from './OrdenContext'
import OrdenReducer from './OrdenReducer'
import {GET_ORDENES} from '../../types'

const OrdenState = (props) => {
    
    const initialState = {
        ordenes: [],
    }

    const [state, dispatch] = useReducer(OrdenReducer, initialState)
    
    ws.onopen = () => {
        console.log('lisent')
    }
    
    ws.onerror = (e) => {
        // an error occurred
       console.log(e.message);
    };
      
    ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
    };

    ws.onmessage = (e) => { 
        const json = JSON.parse(e.data)
    }

    const obtOrdenes = async () => {
        try {             
            const res = await cx.get('/api/Ordenes/')
            dispatch({
                type: GET_ORDENES,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <OrdenContext.Provider
            value={{
                ordenes: state.ordenes,
                obtOrdenes,
            }}
        >
            {props.children}
        </OrdenContext.Provider>
    )
    
}
 
export default OrdenState;