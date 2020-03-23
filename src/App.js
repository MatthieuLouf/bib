import React from 'react';
import './App.css';
import Restaurants from './Restaurants/Restaurants'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#FFEADE'
    },
    primary : {
      main: '#008080'
    }
  }
},
)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Restaurants></Restaurants>
        </header>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
