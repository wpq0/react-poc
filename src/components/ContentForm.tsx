import * as React from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import LanguageSelector from './LanguageSelector';
import { loadItem, loadLanguage, saveItem } from '../actions';

class ContentForm extends React.Component<{schema, data, language}, {}> {
    componentDidMount() {
    }
    render() {
        if(this.props.schema == null || this.props.data == null) {
            return <span>Empty</span>;
        }
        return (
            <div>
                <LanguageSelector />
            </div>
        );
    }
}

const ConnectedContentForm = connect(state=>state.currentItem)(ContentForm);
export default ConnectedContentForm;