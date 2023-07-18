import React from 'react';

const LandingPage = ({ setWaitTime, waitTime, handleVideoUpload, setFramesToSkip, framesToSkip }) => {
  return <div style={{width:"100vw", height:"100vh"}}>
    <div className='flex-center'>
      <div className='landing'>
        <div style={{height:"5px"}}/>
        <h1>ACNH Catalog Scanner</h1>
        <p>A simple program for scanning your Animal Crossing catalog items from recorded videos. This application is an alternative to <a href="https://play.google.com/store/apps/details?id=com.acnh.catalog_scanner" target='_blank'>ACNH Pocket Guide Catalog Scanner</a>.</p>
        <p>To scan your catalog, you must follow all instructions closely. All data is processed on-device and not uploaded. Use Google Chrome for full support.</p>
        <p>
          <ol>
            <li>Currently only <a href="https://acnh-pocket.web.app/" target='_blank'>ACNH Pocket Guide</a> is supported. Other applications are welcome to enable copy and paste item names to import and use this tool.</li>
            <li>Navigate to Nook Shopping (ATM or phone app)</li>
            <li>Select the desired catalog, and optionally a subsection</li>
            <li>Scroll to the bottom by holding down the right analog stick</li>
            <li>Hold the "Capture" button (left joycon) to record the last 30s</li>
            <li>Open Switch's Album gallery and select your video</li>
            <li>Press [ A ] Sharing and Editing</li>
            <li>[ Trim ] the video to the start & end of the scrolling</li>
            <li>Press [ A ] Sharing and Editing</li>
            <li>Select [ Send to Smartphone ]</li>
            <li>Follow on screen instructions and transfer + save the file to your device</li>
            <li>Select the video file using the button below and wait for your video to process</li>
            <li>Copy and paste your scanned catalog entries into [ <a href="https://acnh-pocket.web.app/" target='_blank'>ACNH Pocket Guide</a> ] on the [ Catalog Scanning ] page, or any other supporting application.</li>
          </ol>
        </p>
        <div className='flex-center' style={{paddingTop:"15px"}}>
          <input type="file" id="file" accept="video/*" onChange={handleVideoUpload} style={{display:"none"}}/>
          <label htmlFor="file" className='button'>Select Video File</label>
        </div>
        <div style={{height:"15px"}}/>
        <div className='center'>
          <a href="https://github.com/jameskokoska/ACNH-Catalog-Scanner-Web/raw/main/test.mp4"><button type="button" className='button button-secondary'>Try Sample Video (466 items)</button></a>
        </div>
        <div style={{height:"5px"}}/>
        <p style={{textAlign:"center", marginBottom:"-10px"}}>
          Created by <a href="https://play.google.com/store/apps/developer?id=Dapper+App+Developer" target='_blank'>DapperAppDeveloper</a>. Source code available on <a href="https://github.com/jameskokoska/ACNH-Catalog-Scanner-Web" target='_blank'>GitHub</a>.
        </p>
        <p style={{textAlign:"center"}}>
          This application is inspired by <a href="http://nook.lol" target='_blank'>nook.lol</a>, the original catalog scanner. 
        </p>
        <div style={{height:"20px"}}/>
        <div className='suggestions-bugs-concerns'>
          <p>Suggestions, bugs or concerns?</p>
          <p>Send me an email!</p>
          <p><a href="mailto:dapperappdeveloper@gmail.com">dapperappdeveloper@gmail.com</a></p>
        </div>
        <div style={{height:"30px"}}/>
        <h2>Extra Settings</h2>
        <p style={{margin:"10px 0px",}}>Processing Time. If this application crashes while scanning or freezes, consider increasing its processing time to a higher number: <b>{waitTime.toString()}ms</b></p>
        <div style={{height:"10px"}}/>
        <input type="range" min={1} max={2000} value={waitTime} className="slider" onChange={(event)=>{setWaitTime(parseInt(event.target.value))}}></input>
        <div style={{height:"20px"}}/>
        <p style={{margin:"10px 0px",}}>Scanning Precision. Increase the frames skipped in the video to decrease the precision, but increase the scanning speed. Not recommended higher than 2 skipped frames, as a higher number will significantly cause items to be missed. It will skip this many frames per 30 FPS video: <b>{framesToSkip.toString()} frames skipped</b></p>
        <input type="range" min={0} max={10} value={framesToSkip} className="slider" onChange={(event)=>{setFramesToSkip(parseInt(event.target.value))}}></input>
        <p style={{margin:"10px 0px",}}>Note: Using a computer over a mobile phone may increase scanning speed and success, as processing speed is dependant and processed only by the device you are using.</p>
      </div>
    </div>
  </div>
}
export default LandingPage
