import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {blue} from '@material-ui/core/colors';
import { Grid, Typography, Card, CardHeader, CardMedia, 
    CardContent, CardActions, Avatar, IconButton, Switch,
} from '@material-ui/core'
import ProductoContext from '../../context/productos/productoContext'
import FormControl from '@material-ui/core/FormControl';

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
formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
},
selectEmpty: {
    marginTop: theme.spacing(2),
},
titulo: {
    color: '#3f51b5',
    textAlign: 'center'
},
subCategoria:{
    textAlign: 'right',
},
categoria: {
    textAlign: 'right',
    fontWeight: 'bold',
},
card: {
    maxWidth: '90%',
    marginLeft: '5%',
    // maxHeight: '400px'
},
mediaParent: {
    
},
media: {
    
    // height: 0,
    // paddingTop: '56.25%', // 16:9
},
expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
},
expandOpen: {
    transform: 'rotate(180deg)',
},
avatar: {
    backgroundColor: blue[500],
},
}));

const MenuCard = props => {
    
    const {_id, nombre, precio, existencia, categoria, imagen, mobile, descripcion} = props
    const {existenciaProducto} = useContext(ProductoContext)
    const [disponible, setDisponible] = useState(existencia)
    
    const handleChange = (e) => {
        setDisponible(e.target.value)
        existenciaProducto({_id:_id, existe:e.target.value})
    }
    
    const classes = useStyles()
    
    return (
        <>
        <Card className={classes.card}>
            <CardHeader 
                avatar={
                    <Avatar 
                        aria-label="recipe" 
                        className={classes.avatar}>
                        {nombre.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={nombre}
                subheader={`Precio ${precio.$numberDecimal}`}
            />
            <div className={classes.mediaParent}>
                <CardMedia
                    component="img"
                    className={classes.media}
                    src={mobile}
                    title="Paella dish"
                />
            </div>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {descripcion}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container direction="row" alignItems="center" >
                    <Grid item xs={9}>
                    <FormControl className={classes.formControl}>
                        <label>Existencia</label>
                        <select value={disponible} onChange={(e) => handleChange(e)}>
                            <option value={true}>Disponible</option>
                            <option value={false}>No disponible</option>
                        </select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={classes.categoria}variant="h7">{categoria}</Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
        </>
    );
}
 
export default MenuCard;