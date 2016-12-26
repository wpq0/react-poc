import * as React from 'react';
import { connect } from 'react-redux';
import ContentField from './ContentField';
import { State, FieldsMetadata } from '../types';

class ContentForm extends React.Component<{ fields: FieldsMetadata, }, {}> {
  render() {
    const fieldNames = Object.keys(this.props.fields);
    if (fieldNames.length == 0) {
      return (<span>Empty</span>);
    }
    return (<ul className='list-unstyled'>
      {fieldNames.map(key => (
      <li className='field-container' key={key}>
        <ContentField { ...this.props.fields[key]} field={key} />
      </li>))}
    </ul>);
  }
}

const states2Props = (state: State, ownProps) => ({
  fields: state.fields
});

export default connect(states2Props)(ContentForm);