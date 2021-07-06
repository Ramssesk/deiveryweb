import React, {useContext, useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Alerta from '../ui/Alerta';

import ProductoContext from '../../context/productos/productoContext'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            width: '95%',
            marginLeft: '-2.5%',
            flexShrink: 0,
        },
        [theme.breakpoints.up('sm')]: {
            width: '450px',
            flexShrink: 0,
        },
        [theme.breakpoints.up('md')]: {
            width: '90%',
            flexShrink: 0,
        },
        [theme.breakpoints.up('lg')]: {
            width: '720px',
            flexShrink: 0,
        },
        width: '400px',
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
        '& label': {
            color: '#000',
            // fontSize: '15px'
        },
    },
    input: {
        display: 'none'
    },
    btn: {
        backgroundColor: '#3f51b5',
        color: '#fff',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor:'#414f9e',
        },
        '&:active': {
            backgroundColor:'#414f9e',
        },
        width:'100%'
    },
    error: {
        backgroundColor: '#fdecea',
        borderRadius: '2px',
        color: '#de736d',
        padding: theme.spacing(3)
    },
    titulo: {
      color: '#3f51b5',
      textAlign: 'center'
    }
}));

const categorias = [
    {tipo:'desayuno',nombre:'Desayduo'},
    {tipo:'comida',nombre:'Comida'},
    {tipo:'cena', nombre:'Cena'},
    {tipo:'bebida', nombre:'Bebida'},
    {tipo:'postre', nombre:'Postre'},
    {tipo:'ensalada', nombre:'Ensalada'}
]

const NuevoProducto = () => {

    const classes = useStyles()
    
    const {addProducto} = useContext(ProductoContext)

    const formik = useFormik({
        initialValues: {
            existencia: true,
            nombre: 'Orden tacos de bistek',
            precio: '70.50',
            categoria: 'desayuno',
            imagen: null,
            descripcion: 'Orden de 5 tacos de bistek con cebolla asada y una papa'
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(5, 'El nombre de tener 5 caracteres')
                .max(30, 'El nombre debe tener maximo 30 caracteres'),
            precio: Yup.number()
                .min(1, 'Debes agregar un precio')
                .max(1000000,'El precio debe ser maximo 1,000,000')
                .required('El precio es requerido'),
            categoria: Yup.string()
                .required('La categoria es requerida'),
            imagen: Yup.mixed()
            .required('Una imagen es requerida'),
            descripcion: Yup.string()
                .min(10, 'La descripcion de tener 10 caracteres')
                .max(100,'La descripcion debe tener maximo 100 caracteres'),
        }),
        onSubmit: producto => {
            addProducto(producto)
        }
    })

    return (      
        <>
        <form 
            onSubmit={formik.handleSubmit}
            className={classes.root}>
            <Typography className={classes.titulo} variant="h4" component="h1">
                Nuevo Producto
            </Typography>
            <TextField 
                id="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Nombre del Producto" 
                variant="outlined" 
            />
            {formik.errors.nombre && formik.touched.nombre ? 
            (<Alerta msg={formik.errors.nombre} />) : null}
            <TextField 
                id="precio"
                value={formik.values.precio}
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                type="number" 
                label="Precio" 
                variant="outlined"     
            />
            {formik.errors.precio && formik.touched.precio ? 
            (<Alerta msg={formik.errors.precio} />) : null}
            <TextField
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                select
                label="Categoria"
                helperText="Selecciona una categoria"
                variant="outlined"
            >
            {categorias.map((cat) => (
                <MenuItem key={cat.tipo} value={cat.tipo}>
                {cat.nombre}
                </MenuItem>
            ))}
            </TextField>
            <FormControl>
                <input
                    accept="image/*"
                    name="imagen"
                    onChange={e => 
                        formik.setFieldValue("imagen",
                        Object.values(e.target.files).map(item => (item)
                    ))}                 
                    onBlur={formik.handleBlur}
                    className={classes.input}
                    id="imagen"
                    type="file"
                    // multiple
                />
                <label htmlFor="imagen">
                    <Button 
                        variant="contained" 
                        className={classes.btn} 
                        startIcon={<PhotoCamera />}
                        component="span">
                    Imagen
                    </Button>
                </label>
            </FormControl>
            {formik.errors.imagen && formik.touched.imagen ? 
            (<Alerta msg={formik.errors.imagen} />) : null}
            <TextField
                id="descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Descricpcion"
                multiline
                rows={5}
                defaultValue=""
                variant="outlined"
                InputLabelProps={{ shrink: true }} 
            />
            {formik.errors.descripcion && formik.touched.descripcion ? 
            (<Alerta msg={formik.errors.descripcion} />) : null}
            <FormControl>
                <Button 
                    variant="contained" 
                    className={classes.btn}
                    endIcon={<SaveIcon />}
                    type="submit">
                    Guardar
                </Button>
            </FormControl>
            {formik.errors.nombre ? console.log(formik.errors.nombre) : null}
        </form>
        </>
     );
}
 
export default NuevoProducto