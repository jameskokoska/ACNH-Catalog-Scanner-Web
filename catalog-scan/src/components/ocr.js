import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Progress from './progress';
import LandingPage from './landing';
import ItemsList from './items';

const VideoOCR = () => {
  const [frames, setFrames] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [waitTime, setWaitTime] = useState(10);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);

      const videoElement = document.createElement('video');
      videoElement.preload = 'auto';
      videoElement.onloadedmetadata = async () => {
        const { videoWidth, videoHeight, duration } = videoElement;

        const cropWidth = videoWidth - videoWidth / 6 - videoWidth / 2.03;
        const cropHeight = videoHeight - videoHeight / 10 - videoHeight / 6;

        const framesPromises = [];
        const frameInterval = 1 / 30;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = cropWidth;
        canvas.height = cropHeight;

        for (let currentTime = 0; currentTime < duration; currentTime += frameInterval) {
          videoElement.currentTime = currentTime;

          await new Promise((resolve) => {
            videoElement.onseeked = () => {
              // Crop the image
              context.drawImage(
                videoElement,
                videoWidth / 2.03,
                videoHeight / 6,
                cropWidth,
                cropHeight,
                0,
                0,
                cropWidth,
                cropHeight
              );

              const imageData = context.getImageData(0, 0, cropWidth, cropHeight);
              const filteredImageData = removeArtifacts(imageData, 100);

              // Convert the image to black and white
              const { data } = filteredImageData;

              for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                const color = avg < 128 ? 0 : 255;
                data[i] = data[i + 1] = data[i + 2] = color;
              }

              context.putImageData(filteredImageData, 0, 0);


              canvas.toBlob((blob) => {
                const imageURL = URL.createObjectURL(blob);

                framesPromises.push(
                  Tesseract.recognize(imageURL, 'eng').then((result) => {
                    setFrames((prevFrames) => [...prevFrames, result]);
                    imageURL && URL.revokeObjectURL(imageURL);
                    result.dataURL && URL.revokeObjectURL(result.dataURL);
                  })
                );

                setCurrentFrame(imageURL);
                setProgress(currentTime / duration);
                resolve();
              }, 'image/jpeg');
            };
          });

          await new Promise((resolve) => {
            setTimeout(resolve, waitTime);
          });
        }

        Promise.all(framesPromises)
          .then(() => {
            setLoading(false);
            setProgress(1)
          })
          .catch((error) => {
            console.error('OCR processing error:', error);
            setLoading(false);
          });
      };

      videoElement.src = URL.createObjectURL(file);
    }
  };

  return (
    <div>
      {isLoading === false && frames.length<=0 ? 
        <LandingPage setWaitTime={setWaitTime} waitTime={waitTime} handleVideoUpload={handleVideoUpload}/>
      : <></>}
      {isLoading === false && frames.length <= 0 ? <></> :
        <>
          <div className='half-width-flex'>
            <div className='half-width'>
              <div className='item-list'>
                <ItemsList frames={frames} isLoading={isLoading} progress={progress}/>
              </div>
            </div>
            <div className='half-width frame-display'>
              {currentFrame && <img src={currentFrame} alt="Current Frame" className='current-frame'/>}
            </div>
          </div>
          <Progress percent={progress}/>
        </>
      }
    </div>
  );
};

export default VideoOCR;

const removeArtifacts = (imageData, threshold) => {
  const { data, width, height } = imageData;
  const filteredData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const rValues = [];
    const gValues = [];
    const bValues = [];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const pixelIndex = i + dx * 4 + dy * width * 4;

        if (pixelIndex >= 0 && pixelIndex < data.length) {
          rValues.push(data[pixelIndex]);
          gValues.push(data[pixelIndex + 1]);
          bValues.push(data[pixelIndex + 2]);
        }
      }
    }

    rValues.sort();
    gValues.sort();
    bValues.sort();

    const medianIndex = Math.floor(rValues.length / 2);

    const rMedian = rValues[medianIndex];
    const gMedian = gValues[medianIndex];
    const bMedian = bValues[medianIndex];

    // Apply threshold to determine whether to use the median value or original value
    filteredData[i] = Math.abs(data[i] - rMedian) <= threshold ? rMedian : data[i];
    filteredData[i + 1] = Math.abs(data[i + 1] - gMedian) <= threshold ? gMedian : data[i + 1];
    filteredData[i + 2] = Math.abs(data[i + 2] - bMedian) <= threshold ? bMedian : data[i + 2];
    filteredData[i + 3] = data[i + 3];
  }

  return new ImageData(filteredData, width, height);
};
