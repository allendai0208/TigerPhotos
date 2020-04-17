import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import DefaultDragDrop from './pictures/DefaultDragDrop.jpg'

class MyEditor extends React.Component {
  state = {
    image: DefaultDragDrop
  }

  /*
  const canvas = this.editor.getImage().toDataURL();
  let imageURL;
  fetch(canvas)
  .then(res => res.blob())
  .then(blob => (imageURL = window.URL.createObjectURL(blob)));
  */

  handleDrop = dropped => {
    this.setState({ image: dropped[0] })
    this.props.handler(this.state.image)
  }

  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas()
    }
  }

  setEditorRef = (editor) => this.editor = editor

  render() {
    return (
      <Dropzone
        onDrop={this.handleDrop}      
        noClick
        noKeyboard
        style={{ width: '250px', height: '250px' }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <AvatarEditor width={250} height={250} image={this.state.image} />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    )
  }
}

export default MyEditor