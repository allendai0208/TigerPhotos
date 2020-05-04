import React, { useState, useCallback } from "react";

import ImageViewer from 'react-simple-image-viewer';
 
function ActiveGallery(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = props.urls
 
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
        <img className='createGallery'
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