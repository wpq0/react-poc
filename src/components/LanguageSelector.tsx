import * as React from 'react';
import { Language, LanguageKeys } from '../types';

export default function LanguageSelector(languages: Language[], currentlanguage: LanguageKeys, onClick: (lang:LanguageKeys)=>any) {
  return (<div className='btn-group language-selector'>{
    languages.map(language =>
      <a key={language.key}
        className={`btn btn-xs btn-default ${(language.key === currentlanguage ? 'active' : '')}`}
        onClick={()=>onClick(language.key)}
        title={language.title}>
        <span className={`flag flag-${language.key}`}></span>
      </a>)
  }</div>);
}