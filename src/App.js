import React, { Component } from 'react';
import EthTipJar from './components/EthTipJar.js';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <EthTipJar />
          </div>
        </main>
      </div>
    );
  }
}

export default App
