import * as React from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import HtmlEditorWidget from './HtmlEditorWidget';
import * as actions from '../actions';

const log = (type) => console.log.bind(console, type);

class ContentFormField extends React.Component<{languages, language, data, schema, uiSchema, editing, field, dispatch },{}> {
  
  renderLanguageSelectors() {
      return (this.props.languages.map(language => 
        <a key={language.key}
          className={`btn btn-xs btn-default ${(language.key !== this.props.language ? '' : 'disabled')}`}
          onClick={() => this.props.dispatch(actions.changeFieldLanguage(language.key, this.props.field))}>
          {language.title}
        </a>));
  }

  render() {
    if(this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'hidden') {
      return null;
    }
    if (this.props.editing) {
      return (<div>
        <div className='edit'>
          <Form schema    = {this.props.schema}
                uiSchema  = {this.props.uiSchema}
                formData  = {this.props.data[this.props.language]}
                widgets   = {{ html: HtmlEditorWidget }}
                onChange  = {log("changed")}
                onSubmit  = {log('submitted')}
                onError   = {log("errors")} />
          <div className='btn-group'>
            {this.renderLanguageSelectors()},
            <a className={`btn btn-xs btn-default`} 
              onClick={()=>this.props.dispatch(actions.toggleFieldEdit(this.props.field))}>Save</a>  
          </div>
        </div>
        <div className='preview'>
        </div>
      </div>);
    }
    else {
      return (<div>
        <strong>{this.props.schema.title}</strong>
        <span>{this.props.data[this.props.language]}</span>
        <div className='btn-group'>
          {this.renderLanguageSelectors()},
          <a className={`btn btn-xs btn-default`}
             onClick={()=>this.props.dispatch(actions.toggleFieldEdit(this.props.field))}>Edit</a>
        </div>
      </div>);
    }
  }
}

const states2Props = (state, ownProps) => ({
  ...ownProps,
  languages: state.languages,
});
export default connect(states2Props)(ContentFormField);