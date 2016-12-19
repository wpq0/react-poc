import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class LanguageSelector extends React.Component<{languages}, {}> {
    render() {
        return (<ul>
            {this.props.languages.map(lang=>(
            <li key={lang.key}>
                {
                    <span>{lang.title}</span>
                }
            </li>))}
        </ul>);
    }
}

const ConnectedLanguageSelector = connect((state, ownProps)=>({languages:state.languages}))(LanguageSelector);
export default ConnectedLanguageSelector;