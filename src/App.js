import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Ordenes from './components/paginas/Ordenes'
import Menu from './components/paginas/Menu'
import NuevoProducto from './components/paginas/NuevoProducto'
import Opcion from './components/paginas/Opcion'
import Sidebar from './components/ui/Sidebar'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ProductoState from './context/productos/productoState'
import OrdenState from './context/Ordenes/OrdenState'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    alignItems: 'center',
    justify:"center"
            
  },
}));

const App = () => {
  const classes = useStyles();

  return (
  <ProductoState>
    <OrdenState>
     <div className={classes.root}>
      <Router>
          <Sidebar />
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                >
              <Switch> 
                <Route exact path="/" component={Ordenes} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/nuevo-producto" component={NuevoProducto} />
                <Route exact path="/otra-opcion" component={Opcion} />
              </Switch>
            </Grid>
      </Router>
     </div>
    </OrdenState>
  </ProductoState>
  );
}

export default App;
