import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

/* class ImageGallery extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            currentImage: 0,
            viewerIsOpen: false,
            photos: [],
            page: null
        }
        this.openLightBox = this.openLightBox.bind(this)
        this.closeLightBox = this.closeLightBox.bind(this)
    }

    openLightBox(event, {photo, index}) {
        this.setState({
            currentImage: index,
            viewerIsOpen: true
        })
    }

    closeLightBox() {
        this.setState({
            currentImage: 0,
            viewerIsOpen: false
        })
    }


    componentDidUpdate() {
        console.log("updated")
    }

    render() {
        const photos = [
            {
              src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
              width: 3,
              height: 3
            },
            {
              src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
              width: 1,
              height: 1
            },
            {
              src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
              width: 3,
              height: 4
            },
            {
              src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
              width: 3,
              height: 4
            },
            {
              src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
              width: 3,
              height: 4
            },
            {
              src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
              width: 4,
              height: 3
            },
            {
              src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
              width: 3,
              height: 4
            },
            {
              src: "https://source.unsplash.com/PpOHJezOalU/800x599",
              width: 4,
              height: 3
            },
            {
              src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
              width: 4,
              height: 3
            }
          ];

        return (
            <div>
                <Gallery style={{margin: 10}} photos={photos} onClick={this.openLightbox} /> 
                {console.log("here12132")}
                <ModalGateway>
                {this.state.viewerIsOpen ? (
                    <Modal onClose={this.closeLightbox}>
                    <Carousel
                        currentIndex={this.state.currentImage}
                        views={photos.map(x => ({
                        ...x,
                        srcset: x.srcSet,
                        caption: ""
                        }))}
                    />
                    </Modal>
                ) : null}
                </ModalGateway>
          </div> 
        )
    }
}

export default ImageGallery */

/*     componentDidMount() {
        console.log("mounted")
        if(this.props.photos) {
            let photos = this.state.photos.slice()
            this.props.photos.map(function(urlImage) {
                let img = new Image();
                img.src = urlImage;
                img.onload = () => {photos.push({src: urlImage, width: img.width, height: img.height})}
           })
           this.setState({photos:photos})
        }
    } */ 


function ImageGallery(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 3,
      height: 3
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1
    },
    {
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/PpOHJezOalU/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
      width: 4,
      height: 3
    }
  ];

  return (
    <div>
        {console.log(props.photos)}
      <Gallery photos={props.photos} onClick={openLightbox} /> 
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={props.photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: ""
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default ImageGallery 