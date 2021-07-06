import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import FormControl from '@material-ui/core/FormControl';

const Alerta = (props) => {

    return (
      <FormControl 
         style={{
            width:'100%',
            backgroundColor: '#fdecea',
            borderRadius: '2px',
            color: '#de736d',
            padding: '5px',
            fontSize: '12px',
            display: 'inline-block',
            borderRadius: '5px'
         }}
         color="secondary" 
         aria-label="add an alarm">
         <ErrorOutlineIcon style={{marginRight: '5px'}}/> {props.msg}
      </FormControl>
     );
}
 
export default Alerta;