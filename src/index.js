import React from 'react';
import ReactDOM from 'react-dom';

import {
  Header, Navigation
} from './components';

const App = () => {


  return (
    <>
      <Header />
      <Navigation />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);