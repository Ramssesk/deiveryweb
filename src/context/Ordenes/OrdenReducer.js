import { 
    GET_ORDENES
} from '../../types';
import _ from 'lodash'

export default (state, action) => {
    switch(action.type) {
        case GET_ORDENES:
            return {
                ...state,
                ordenes: action.payload
            }
        default:
            return state;
    }
}