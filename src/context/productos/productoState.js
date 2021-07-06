import React, {useReducer} from 'react';
import cx from '../../config/axios'
import ws from '../../config/websocket'

import ProductoContext from './productoContext'
import productoReducer from './productoReducer'
import {ACTUALIZAR_EXISTENCIA, ADD_PRODUCTO, GET_PRODUCTOS, SET_ORDEN, GET_NEW_ORDENES} from '../../types'

const ProductoState = (props) => {
    
    const initialState = {
        productos: [],
        existe: true,
        ordenes: [],
        error: false,
        msg: ''
    }

    const [state, dispatch] = useReducer(productoReducer, initialState)
    
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
        ws.send(JSON.stringify('si'))
    };

    ws.onmessage = (e) => { 
        const json = JSON.parse(e.data)
        return console.log(json)
        switch (json.action) {
            case 'setOrden':
                dispatch({ 
                    type: SET_ORDEN, 
                    payload: json.existencia[0]
                })
                break;
        
            default:
                break;
        }
    }


    const addProducto = async producto => { 
        try{    
            const data = new FormData()
            data.append("imagen", producto.imagen[0])
            data.append("nombre", producto.nombre)
            data.append("precio", producto.precio)
            data.append("categoria", producto.categoria)
            data.append("descripcion", producto.descripcion)

            const res = await cx.post('/api/productos/', data,{
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch({
                type: ADD_PRODUCTO, 
                payload: res.data
            })
            const req = {
                type:'getNewProducto',
            }
            ws.send(JSON.stringify(req))
        } catch(error){
            console.log(error)
        }
    }
    
    const obtProductos = async () => {
        try {             
            const res = await cx.get('/api/productos/')
            dispatch({
                type: GET_PRODUCTOS,
                payload: res.data.productos
            })
        } catch (error) {
            console.log(error)
        }
    }

    const existenciaProducto = async (props) => {
        console.log(props)
        try {
            const res = await cx.put(`api/productos/${props._id}`,props)

            dispatch({
                type: ACTUALIZAR_EXISTENCIA,
                payload: res.data[0]
            })

            const req = {
                type:'existenciaProducto',
                data: {
                    id: props._id,
                    existe: props.existe,
                    device: 'principal',
                }
            }
            ws.send(JSON.stringify(req))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductoContext.Provider
            value={{
                productos: state.productos,
                error: state.error,
                msg: state.msg,
                existe: state.existe,
                idExiste: state.idExiste,
                addProducto,
                obtProductos,
                existenciaProducto
            }}
        >
            {props.children}
        </ProductoContext.Provider>
    )
    
}
 
export default ProductoState;