import React, {Component} from 'react';
import {storage} from './firebase/config';
import Dropzone from 'react-dropzone';
import Progress from './Progress';

export class DragDrop extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      isUploading: null,
      photo_list : []
    }
  }
    
///Applications/Python\ 3.6/Install\ Certificates.command
      handleUpload(files){
        for (let i = 0; i < files.length; i++){
          const uploadTask = storage.ref(`images/${files.item(i).name}`).put(files.item(i));
          uploadTask.on('state_changed', 
          (snapshot) => {
            // progrss function ....
            const isUploading = true;
            this.setState({isUploading});
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
          }, 
          (error) => {
               // error function ....
            console.log(error);
          }, 
          () => {
            // complete function ....
            storage.ref('images').child(files.item(i).name).getDownloadURL().then(url => {
                const isUploading = false;
                this.setState({isUploading})
                //const image = {url: url, added: new Date()}
                //fstore.collection(this.props.netid).add(image).then(res =>{});
                let photograph = {netid:this.props.netid, url:url}
                fetch('/api/createPortfolio', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(photograph)
              });
            });
          });
        }
      }

    render() {
      // This is commented out because it's not being used, whoever wrote this please determine if we need it or not and delete if we don't - Keith
      /*const style = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      };
      */
      return (
        <div className="mt-5 text-center form-group">
  
        {this.state.isUploading ? (
        
        <Progress percentage={this.state.progress} />
        
        ) : ""}
        <Dropzone>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} onDrop={files => this.handleUpload(files)} onChange={(e)=>this.handleUpload(e.target.files)}/>
                <div className="custom-file">
          <input  className="custom-file-input" id="customFile"/>
          <label className="custom-file-label" htmlFor="customFile">Drag and drop or choose a files</label>
        </div>
              </div>
            </section>
          )}
        </Dropzone>
        
        </div>
        
      )
    }
  }



