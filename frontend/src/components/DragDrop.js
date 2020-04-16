import React, {Component} from 'react';
import {storage, fstore} from './firebase/config';
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
        console.log(this.props.netid)
        let photographs = []
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
                console.log(url);
                const isUploading = false;
                this.setState({isUploading})
                //const image = {url: url, added: new Date()}
                //fstore.collection(this.props.netid).add(image).then(res =>{});
                let newPhoto = {"netid":this.props.netid, "url":url};
                photographs.push(newPhoto)
            });
          });
        }
        console.log(photographs)

        const response = fetch('/api/createPortfolio', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }, 
          body: JSON.stringify(photographs)
        });
      }


    render() {
      const style = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      };
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

/*render() {
    return (

 <div class="container">
	<div class="row">
	  <div class="col-md-6">
	      <form method="post" action="#" id="#"/>
              <div class="form-group files">
                <label>Upload Your File </label>
                <input type="file" class="form-control" multiple=""/>
              </div>
              <button type="button" class="btn btn-primary btn-block" onClick={files => this.handleUpload(files)}>Upload</button> 
            </div>
          
	</div>
</div>
    )
}*/

