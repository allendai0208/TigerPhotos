import React from 'react'
import {fstore, storage, database} from './firebase/config';
 
 
export class NewUpload extends React.Component {
 constructor(props){
   super(props)
   this.state = {
     netid: this.props.netid,
     file: null,
     url: null,
     images: []
   }
   this.handleChange = this.handleChange.bind(this)
   this.storePhoto = this.storePhoto.bind(this)
  this.deletePhoto = this.deletePhoto.bind(this)
 }
 handleChange(e) {
   this.setState({
     file: e.target.files[0],
     url: URL.createObjectURL(e.target.files[0])
   })
 }
 
 
 storePhoto() {/* storage.ref('images').child(files.item(i).name).getDownloadURL().then(url => {
   console.log(url);
   const isUploading = false;
   this.setState({isUploading})
   //const image = {url: url, added: new Date()}
   //fstore.collection(this.props.netid).add(image).then(res =>{});*/
   const key = this.state.file.name
   const img = storage.ref(`imagesxoy/${key}`)
   img.put(this.state.file).then((snap) => {
       storage.ref(`imagesxoy`).child(key).getDownloadURL().then(url => {
       const image = {key, url};
       fstore.collection(this.state.netid).doc(key).set(image)
       let images = this.state.images.slice()
       images.push({
         key: key,
         url: url
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
 
   this.setState({
     file: null,
     url: null,
   })
  
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
 
   /*ref.on('child_removed', (child) => {
     let images = this.state.images.filter((image) => {
       return image.key != child.key
     })
     this.setState({images})
   }) */
 }
 
 /*componentDidMount() {
   /*const ref = database.ref('images/' + this.state.netid).child(this.state.netid)*/
   /*const ref = storage.ref('profpic').child(`${this.state.image.name}`)
 
   ref.on('child_added', (child) => {
     let images = this.state.images.slice()
     images.push({
       key: child.key,
       url: child.val().url
     })
     this.setState({images})
   })
   ref.on('child_removed', (child) => {
     let images = this.state.images.filter((image) => {
       return image.url != child.val().url
     })
     this.setState({images})
   })
 } */
 render() {
   const previewStyle = {
     maxHeight: "100px",
     maxWidth: "100px"
   }
   const imgStyle = {
     maxHeight: "400px",
     maxWidth: "400px"
   }
   return (
     <div>
       <input id="input" type="file" onChange={this.handleChange}/>
       <img src={this.state.url} style={previewStyle}/>
       <button onClick={this.storePhoto}>upload</button>
       {this.state.images.map((image) =>
         <div key={image.key}>
           <img src={image.url} style={imgStyle}/>
           <button
              name={image.key} onClick ={this.deletePhoto}>remove</button>
         </div>
       )}
     </div>
   );
 }
}
