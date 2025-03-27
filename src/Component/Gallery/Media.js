import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos"; // Make sure this is the correct import path
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import banner1 from "../../Theme/banner1.png";
import { useTranslation } from "react-i18next";

function Media() {
  // language
  const { i18n, t } = useTranslation();
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
    <>
 <section className="relative bg-cover bg-center h-72" 
 style={{ backgroundImage: `url(${banner1})` }}>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="container relative">
    <div className="text-center">
      <h4 className="text-white text-3xl pt-24">{t("mediablbums.MediaAlbumstitle")}</h4>
    </div>
  </div>
</section>
    <section className="gallery-area">
      <Gallery photos={photos} onClick={openLightbox} />
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

    </section>
    </>
  );
}

export default Media;