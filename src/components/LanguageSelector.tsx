import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class LanguageSelector extends React.Component<{languages, currentLanguage, itemType, itemId}, {}> {
    render() {
        return (<ul>
            {this.props.languages.map(lang=>(
            <li key={lang.key}>
                {
                    lang.Key === this.props.currentLanguage
                    ? <Link to={`/content/${this.props.itemType}/${this.props.itemId}/${lang.Key}`}>{lang.title}</Link>
                    : <span>{lang.title}</span>
                }
            </li>))}
        </ul>);
    }
}

const ConnectedLanguageSelector = connect((state)=>({languages:state.languages}))(LanguageSelector);
export default ConnectedLanguageSelector;