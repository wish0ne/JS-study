import React from 'react';
import CounterContainer from './containers/CounterContainer';
import Todos from './components/Todo';

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <Todos />
    </div>
  );
}

export default App;
