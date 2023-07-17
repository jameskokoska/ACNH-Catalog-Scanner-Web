import React, { useState, useEffect } from 'react';
import dataSetTranslations from '../assets/dataSetTranslations.json'

const ItemsList = ({ frames, isLoading, progress }) => {
  const [items, setItems] = useState(new Set());

  useEffect(() => {
    for (const frame of frames) {
      for (const line of frame?.data?.text.split('\n')) {
        if (!items.has(line) && dataSetTranslations[line]!==undefined) {
          setItems((prevItems) => new Set([dataSetTranslations[line]["n"], ...prevItems]));
        }
      }
    }
  }, [frames, items]);

  return (
    <>
      {/* {frames.length > 0 && (
        <ul>
          {frames.map((frame, index) => (
            <li key={index}>{frame?.data?.text.split('\n').join(',')}</li>
          ))}
        </ul>
      )} */}
      <h1>Catalog</h1>
      <p>Copy your scanned catalog entries into <a href="https://acnh-pocket.web.app/" target='_blank'>ACNH Pocket Guide</a> on the 'Catalog Scanning' page, or any other supporting application.</p>
      {isLoading && <p>Processing video... {Math.round(progress*100).toString() + "% complete"}</p>}
      <div className='center'>
        <button type="button" onClick={() => {navigator.clipboard.writeText(Array.from(items).join('\n'))}} className='button'>Copy to Clipboard</button>
      </div>
      {items.length <= 0 ? <></> : <ul>
        {Array.from(items).map((item, index) => (
          <li key={index} style={{margin:0}}><p style={{margin:"5px 0"}}>{item}</p></li>
        ))}
      </ul>}
    </>
  );
};

export default ItemsList;
