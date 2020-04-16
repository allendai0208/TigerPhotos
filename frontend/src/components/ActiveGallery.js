import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./pictures/photos";

/*function ActiveGallery() {
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

  return (
    <div>
      <Gallery photos={photos}  />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway> 
    </div>
  );
}  
export default ActiveGallery */ 


import ImageViewer from 'react-simple-image-viewer';
 
function ActiveGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    'http://placeimg.com/1200/800/nature',
    
    'http://placeimg.com/1920/1080/nature',
    'http://placeimg.com/1500/500/nature',
  ];
 
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
 
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
 
  return (
    <div>
      {images.map((src, index) => (
        <img
          src={ src }
          onClick={ () => openImageViewer(index) }
          width="300"
          key={ index }
          style={{ margin: '2px' }}
          alt=""/>
      ))}
 
      {isViewerOpen && (
        <ImageViewer
          src={ images }
          currentIndex={ currentImage }
          onClose={ closeImageViewer }
        />
      )}
    </div>
  );
}

export default ActiveGallery




