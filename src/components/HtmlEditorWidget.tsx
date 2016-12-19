import * as React from "react";
import RichTextEditor from 'react-rte';

const HtmlEditorWidget = (props) => {
  var value = RichTextEditor.createValueFromString(props.value || '', 'html');
  return (
    <RichTextEditor value={value} onChange={val=>props.onChange(val.toString('html'))} />
  );
}

export default HtmlEditorWidget;