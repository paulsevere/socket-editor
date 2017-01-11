import { CompositeDecorator, Entity } from 'draft-js'
import esp from 'esprima'
import React from 'react'

const strategy = (contentBlock, callback) => {
  // console.log(contentBlock)
  window.block = contentBlock;
  const text = contentBlock.getText();
  let tokens = esp.tokenize(text, {
    range: true,
    tolerant: true
  });
  // console.log(tokens)






  tokens.slice(-1).forEach(e => callback(e.range[0], e.range[1]));



}


const ColorComponent = (props) => {
  // console.log(props)
  return (
    <span style={{
      color: props.decoratedText
    }}>{props.children}</span>
    );
};

export const decorators = new CompositeDecorator([{
  strategy,
  component: ColorComponent
}])

// export
