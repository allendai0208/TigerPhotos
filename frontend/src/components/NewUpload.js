// This component was absorbed into profileform.js
// This is no longer being used

import React from 'react'
import {fstore, storage, database} from './firebase/config';
import {Button} from 'semantic-ui-react';

export class NewUpload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    netid: this.props.netid,
    images: []
    }
    this.storePhoto = this.storePhoto.bind(this)
    this.deletePhoto = this.deletePhoto.bind(this)
  }
 
  storePhoto(e) {/* storage.ref('images').child(files.item(i).name).getDownloadURL().then(url => {
    console.log(url);
    const isUploading = false;
    this.setState({isUploading})
    //const image = {url: url, added: new Date()}
    //fstore.collection(this.props.netid).add(image).then(res =>{});*/
    console.log(e.target.files[0])
    console.log(URL.createObjectURL(e.target.files[0]))
    const key = e.target.files[0].name
    const img = storage.ref(`imagesxoy/${key}`)
    img.put(e.target.files[0]).then((snap) => {
      storage.ref(`imagesxoy`).child(key).getDownloadURL().then(url => {
      const image = {key, url};
      fstore.collection(this.state.netid).doc(key).set(image)
      let images = this.state.images.slice()
      images.push({
        key: key,
        url: url,
        photographer_netid: this.props.netid
      })
      this.setState({images})
      console.log(this.state.images)
      })
    }, 
    (error) => {    
      // error function ....
      console.log(error);
    },
    () => {
    } );
  }

  deletePhoto(event) {
    let uid = this.state.netid
    let current_image_name = event.target.name
    console.log(event.target.name)
    storage.ref(`imagesxoy`).child(current_image_name).delete()
    let images = this.state.images.filter((imag) => {
      return imag.key != current_image_name
    })
    this.setState({images})

  }
 
  // Not working, have to change the models for portfolio - currently only stored as firebase url, but this program relies on file name
  componentDidMount() {

    fetch("/api/getPortfolio", {
      method: "POST",
      headers: {
          "content_type" : "application/json"
      },
      body:JSON.stringify(this.props.netid)
    }).then(response => response.json())
    .then(result => this.setState({
      images: result
    }))
    .catch(e => console.log(e))
  }
  
  render() {
    return (
      <div>
        <input id="input" type="file" onChange={this.storePhoto}/>
        <br/>
        {this.state.images.map((image) =>
          <div key={image.key} className = "createGallery" style={{backgroundImage:'url('+image.url +')'}}/>
        )}
        <Button color='blue' size='large' onClick={(images) => this.props.handler(images)}>
          submit
        </Button>
      </div>
    );
  }
}
