import React from 'react';
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const Opcion = () => {
    return (
        <>
        <h1 className="text-3xl font-ligh mb-4">Opcion</h1>
        
        <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddCircleOutlineIcon />}>
            <Link to="/nuevo-platillo">Agregar Platillo</Link>
        </Button>
    </>
     );
}
 
export default Opcion;