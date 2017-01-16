import React from 'react'



export class EditorButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }
  onClick=(e) => {
    this.setState({
      active: !this.state.active
    })
  // this.props.onClick
  }
  render() {
    let className = this.state.active ? "RichEditor-activeButton RichEditor-styleButton" : "RichEditor-styleButton"
    let {name} = this.props;
    return (<div onClick={this.onClick} className={className}>name</div>)
  }

}




export function EditorControls(props) {
  return (<div className="RichEditor-controls">
  {props.children}
  </div>)
}
