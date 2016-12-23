import * as React from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import HtmlEditorWidget from './HtmlEditorWidget';
import * as actions from '../actions';

const log = (type) => console.log.bind(console, type);

class PreviewField extends React.Component<{ data, language, languages }, { language }> {
  state = { language: this.props.language };

  render() {
    return (<div className='col-md-4 preview'>
      <div>{this.props.data[this.state.language]}</div>
      <div className='btn-group'>{this.renderLanguageSelectors()}</div>
    </div>);
  }

  renderLanguageSelectors() {
    return (this.props.languages.map(language =>
      <a key={language.key}
         className={`btn btn-xs btn-default ${(language.key !== this.state.language ? '' : 'disabled')}`}
         onClick={()=>this.setState({language: language.key})}>
        {language.title}
      </a>));
  }
}

function CustomFieldTemplate(props: {id, classNames, label, help, required, description, errors, children}) {
  return (
    <div className={props.classNames}>
      {props.children}
      {props.errors}
    </div>
  );
}


class ContentFormField extends React.Component<{ languages, language, data, schema, uiSchema, editing, field, dispatch }, {}> {
  renderLanguageSelectors() {
    return (this.props.languages.map(language =>
      <a key={language.key}
        className={`btn btn-xs btn-default ${(language.key !== this.props.language ? '' : 'disabled')}`}
        onClick={() => this.props.dispatch(actions.changeFieldLanguage(language.key, this.props.field))}>
        {language.title}
      </a>));
  }

  render() {
    if (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'hidden') {
      return null;
    }
    if (this.props.editing) {
      return (<div className='row'>
        <div className='col-md-2'>
          <strong>{this.props.schema.title}</strong>
        </div>
        <div className='col-md-1'>
          <a className={`btn btn-xs btn-default active`}
            onClick={() => this.props.dispatch(actions.toggleFieldEdit(this.props.field))}>Edit</a>
        </div>
        <div className='col-md-5 edit'>
          <Form schema={this.props.schema}
            uiSchema={this.props.uiSchema}
            formData={this.props.data[this.props.language]}
            widgets={{ html: HtmlEditorWidget }}
            FieldTemplate={CustomFieldTemplate}
            onChange={log("changed")}
            onSubmit={log('submitted')}
            onError={log("errors")}>
            <span></span>
          </Form>
          <div className='btn-group'>{this.renderLanguageSelectors()}</div>
        </div>
        <PreviewField languages={this.props.languages} language={this.props.language} data={this.props.data} />
      </div>);
    }
    else {
      return (<div className='row'>
        <div className='col-md-2'>
          <strong>{this.props.schema.title}</strong>
        </div>
        <div className='col-md-1'>
          <a className={`btn btn-xs btn-default`}
            onClick={() => this.props.dispatch(actions.toggleFieldEdit(this.props.field))}>Edit</a>
        </div>
        <div className='col-md-9'>
          <span>{this.props.data[this.props.language]}</span>
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