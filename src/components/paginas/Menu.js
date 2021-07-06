import React, {useState, useEffect, useContext} from 'react';
import MenuCard from '../ui/MenuCard'
import {Typography, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import ProductoContext from '../../context/productos/productoContext'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '95%',
            flexShrink: 0,
        },
        [theme.breakpoints.up('md')]: {
            width: '95%',
            flexShrink: 0,
        },
        [theme.breakpoints.up('lg')]: {
            width: '95%',
            flexShrink: 0,
        },
        [theme.breakpoints.up('xl')]: {
            width: '95%',
            flexShrink: 0,
        },
        padding: theme.spacing(1),
    },
}));

const Menu = () => {
    
    const classes = useStyles()
    const {obtProductos, productos} = useContext(ProductoContext)

    useEffect(() => {
        obtProductos()
    }, [])

    return (
    <div className={classes.root}>
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12}>
                <Typography className={classes.titulo} variant="h4" component="h4">
                    Menu
                </Typography>
            </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={1} >
            {productos.map(producto => (
            <Grid key={producto._id} item xs={12} sm={12} md={6} lg={4}>
                <MenuCard
                    _id={producto._id}
                    existencia={producto.existencia}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    categoria={producto.categoria}
                    imagen={producto.imagen}
                    descripcion={producto.descripcion}
                    mobile={producto.mobile}
                />
            </Grid>
            ))}
        </Grid>
    </div>    
    );
}
 
export default Menu;