import * as React from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import { loadItem, loadLanguage, saveItem } from '../actions';
import HtmlEditorWidget from './HtmlEditorWidget';

const log = (type) => console.log.bind(console, type);

const LanguageSelector = (language, currentKey, handleClick) => (
  <li key={language.key}>
    <a className={'btn btn-sm' + (language.key !== currentKey ? ' btn-default' : ' disabled')} 
       onClick={()=>handleClick(language.key)}>{language.title}</a>
  </li>);

const LanguageSelectors = (languages, currentKey, handleClick) =>(
  <ul className={'list-inline'}>
    {languages.map(language=>LanguageSelector(language, currentKey, handleClick))}
  </ul>
);

class ContentForm extends React.Component<{ schema, data, language, params, dispatch,languages }, {}> {
  render() {
    if (this.props.schema == null || this.props.data == null) {
      return <span>Empty</span>;
    }
    return (
      <div>
        <div>
          {LanguageSelectors(this.props.languages, this.props.language, this.switchLanguage.bind(this))}
        </div>
        <Form 
          schema={this.props.schema.schema} 
          uiSchema={this.props.schema.uiSchema} 
          formData={this.props.data}
          widgets={{
            html: HtmlEditorWidget
          }}
          onChange={log("changed")}
          onSubmit={({formData})=>this.props.dispatch(saveItem(this.props.params.id, this.props.params.type, this.props.params.lang, formData))}
          onError={log("errors")}/>
      </div>
    );
  }

  switchLanguage(language) {
    if(language !== this.props.language) {
      this.props.dispatch(loadLanguage(this.props.params.type, this.props.params.id, language));
    }
  }
}

const ConnectedContentForm = connect(state => ({...state.currentItem, languages: state.languages}) )(ContentForm);
export default ConnectedContentForm;