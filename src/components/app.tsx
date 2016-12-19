import * as React from 'react';
import { connect } from 'react-redux';
import ContentForm from './ContentForm';
import ContentTree from './ContentTree';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="row">
                <aside className="col-md-3">
                    <ContentTree></ContentTree>
                </aside>
                <main className="col-md-9">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const ConnectedApp = connect(state=>state)(App)
export default ConnectedApp;