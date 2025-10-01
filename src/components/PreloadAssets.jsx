import React, { useEffect } from "react";

const PreloadAssets = ({ images = [], video }) => {
  useEffect(() => {
    const links = [];

    // Preload critical images
    images.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      links.push(link);
    });

    // Preload video
    if (video) {
      const videoLink = document.createElement("link");
      videoLink.rel = "preload";
      videoLink.as = "video";
      videoLink.href = video;
      document.head.appendChild(videoLink);
      links.push(videoLink);
    }

    return () => {
      // Cleanup
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [images, video]);

  return null;
};

export default PreloadAssets;
