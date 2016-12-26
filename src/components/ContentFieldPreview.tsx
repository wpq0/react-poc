import * as React from 'react';
import LanguageSelector from './LanguageSelector';
import { Language, LanguageKeys } from '../types';
class ContentFieldPreview extends React.Component<{ data:{}, language:LanguageKeys, languages:Language[] }, { language:LanguageKeys }> {

  state = { language: this.props.language };

  render() {
    const data = this.props.data[this.state.language];
    return (<div className='col-md-4 preview'>
      {LanguageSelector(this.props.languages, this.state.language, lang=>this.setState({language: lang}))}
      <div>{ renderFieldPreview(data) }</div>
    </div>);
  }
}

export function renderFieldPreview(data) {
  return data instanceof Array
            ? <ul>{data.map( (datum, index) => (<li key={index}>{datum}</li>))}</ul>
            : <span>{data}</span>
}

export default ContentFieldPreview;