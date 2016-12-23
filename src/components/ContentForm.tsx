import * as React from 'react';
import { connect } from 'react-redux';
import { loadItem, loadLanguage, saveItem } from '../actions';
import ContentFormField from './ContentFormField';

class ContentForm extends React.Component<{ fields:[{key, data, schema, uiSchema, editing}], id, type, dispatch }, {}> {
  render() {
    if (this.props.fields == null || this.props.fields.length == 0) {
      return (<span>Empty</span>);
    }
    return (
      <ul className='list-unstyled'>
      { Object.keys(this.props.fields).map(key=>(<li key={key}><ContentFormField {...this.props.fields[key] } field={key} /></li>))}
    </ul>);
  }
}
const states2Props = (state, ownProps) => ({
  fields: state.currentItem,
  id: ownProps.params.id,
  type: ownProps.params.type,
});
export default connect(states2Props)(ContentForm);