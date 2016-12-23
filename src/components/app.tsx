import * as React from 'react';
import { connect } from 'react-redux';
import ContentForm from './ContentForm';
import ContentTree from './ContentTree';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <header className='container-fluid'>
          <h4>React POC</h4>
        </header>
        <div className='container-fluid'>
          <div className="row">
            <aside className="col-sm-3 col-md-2">
              <ContentTree></ContentTree>
            </aside>
            <main className="col-sm-9 col-md-10">
              {this.props.children}
            </main>
          </div>
        </div>
        <footer className='container-fluid'>~</footer>
      </div>
    );
  }
}

const ConnectedApp = connect(state => state)(App)
export default ConnectedApp;