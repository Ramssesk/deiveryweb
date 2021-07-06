import { 
    ADD_PRODUCTO,
    GET_PRODUCTOS,
    ACTUALIZAR_EXISTENCIA,
    SET_ORDEN
} from '../../types';
import _ from 'lodash'

export default (state, action) => {
    switch(action.type) {
        case ACTUALIZAR_EXISTENCIA:
            return {
                ...state,
                productos: state.productos.map(pdto => pdto._id === action.payload._id ? action.payload : pdto )
            }
        case ADD_PRODUCTO:
            return {
                ...state,
                productos:[...state.productos, action.payload],
            }
        case GET_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }
        case SET_ORDEN:
            return {
                ...state,
                ordenes: [...state.ordenes, action.payload]
            }
        default:
            return state;
    }
}