import React from 'react';
import './App.css';
import Restaurants from './Restaurants/Restaurants'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

/**
 * Define a new theme for the application
 */
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

/**
 * Main function of the application, where the Restaurants component is called
 */
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
