import React, {useEffect, useContext, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, Typography, CardActions, CardContent, CardMedia, Button} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import OrdenContext from '../../context/Ordenes/OrdenContext'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: '#f6f6f6',
  },
  inline: {
    display: 'inline',
  },
}));

// const useStyles = makeStyles({
//   root: {
//     display:'flex',
//     width:'95%',
//     justifyContent: 'space-around',
//     flexDirection :'row',
//     flexWrap: 'wrap'
//   },
//   card: {
//     maxWidth: 345,
//     margin:'5px',
//     minWidth: 150,
//     marginTop: '15px'
//   },
//   media: {
//     height: 10,
//   },
// });

const Orden = () =>{
  
  const {obtOrdenes, ordenes} = useContext(OrdenContext)
  const classes = useStyles();
 
  useEffect(() => {
    obtOrdenes()
  }, [])
  
  const handleOrdenLista = () => {
    console.log(ordenes)

  }

  const estilo = ordenes

  return (
    <List className={classes.root} style={{}}>
    {ordenes.map((orden, i) => {
    const  {nombre, descripcion, imagen, cantidad} = orden
   
    return (
      <>
       <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={imagen} />
        </ListItemAvatar>
        <ListItemText
          primary={nombre}
          secondary={
            <Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Cantidad: {<label style={{fontWeight:'bold'}}>15</label>}
              </Typography><br></br>
              {descripcion}
            </Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      {console.log(i, ordenes.length-1)}
    </>
    )})}
    <ListItem>
      <Button onClick={handleOrdenLista} color="secondary">Listo</Button>
    </ListItem>
    </List>


    // <div className={classes.root}>
    // {ordenes.map((orden, i) => {
    //   const {imagen, nombre, descripcion, cantidad} = orden
    //   return(
    //     <Card key={i} className={classes.card}>
    //       <CardActionArea>
    //         <CardMedia
    //           className={classes.media}
    //           image={imagen}
    //           title={nombre}
    //           />
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="h2">
    //             {nombre}
    //           </Typography>
    //           <Typography variant="body2" color="textSecondary" component="p">
    //             {descripcion}
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Button onClick={handleOrdenLista} color="secondary">Listo</Button>
    //         <Typography>Cantidad: {cantidad}</Typography>
    //       </CardActions>
    //     </Card>
    //   )})
    // }
    // </div>
  );
}

export default Orden