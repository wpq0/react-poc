import * as React from 'react';
import { connect, MapDispatchToPropsObject } from 'react-redux';
import Form from 'react-jsonschema-form';
import HtmlEditorWidget from './HtmlEditorWidget';
import actions from '../actions';
import ContentFieldPreview, { renderFieldPreview } from './ContentFieldPreview';
import LanguageSelector from './LanguageSelector';
import { FieldMetadata, Language, State } from '../types'

const log = (type) => console.log.bind(console, type);

function CustomFieldTemplate(props: {id, classNames, label, help, required, description, errors, children}) {
  return (<div className={props.classNames}>
    {props.children}
    {props.errors}
  </div>);
}

class ContentField extends React.Component<{field:string, languages: Language[]} & FieldMetadata & typeof actions, {}> {
  render() {
    const data = this.props.data[this.props.language];
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
            onClick={() => this.props.toggleFieldEdit(this.props.field)}>Edit</a>
        </div>
        <div className='col-md-5 edit'>
          {LanguageSelector(this.props.languages, this.props.language, lang=>this.props.changeFieldLanguage(lang, this.props.field))}
          <Form schema={this.props.schema}
            uiSchema={this.props.uiSchema}
            formData={data}
            widgets={{ html: HtmlEditorWidget }}
            FieldTemplate={CustomFieldTemplate}
            onChange={log("changed")}
            onSubmit={log('submitted')}
            onError={log("errors")}>
            <span></span>
          </Form>
        </div>
        <ContentFieldPreview languages={this.props.languages} language={this.props.language} data={this.props.data} />
      </div>);
    }
    else {
      return (<div className='row'>
        <div className='col-md-2'>
          <strong>{this.props.schema.title}</strong>
        </div>
        <div className='col-md-1'>
          <a className={`btn btn-xs btn-default`}
            onClick={() => this.props.toggleFieldEdit(this.props.field)}>Edit</a>
        </div>
        <div className='col-md-9'>{renderFieldPreview(data)}</div>
      </div>);
    }
  }
}

const states2Props = (state:State, ownProps) => ({
  ...ownProps,
  languages: state.languages,
});
export default connect(states2Props, actions)(ContentField);