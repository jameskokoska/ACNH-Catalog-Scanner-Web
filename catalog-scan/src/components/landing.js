import React from 'react';

const LandingPage = ({ setWaitTime, waitTime, handleVideoUpload }) => {
  return <div style={{width:"100vw", height:"100vh"}}>
    <div className='flex-center'>
      <div className='landing'>
        <h1>ACNH Catalog Scanner</h1>
        <p><i>A simple program for scanning your Animal Crossing catalog items from recorded videos. Created by <a href="https://play.google.com/store/apps/developer?id=Dapper+App+Developer">DapperAppDeveloper</a>. Source code on <a href="https://github.com/jameskokoska/ACNH-Catalog-Scanner-Web">GitHub</a>.</i></p>
        <p>To scan your catalog, you must follow all instructions closely. This application is inspired by <a href="http://nook.lol" target='_blank'>nook.lol</a>, the original catalog scanner. All data is processed on device and not uploaded.</p>
        <p>This application is an alternative to <a href="https://play.google.com/store/apps/details?id=com.acnh.catalog_scanner" target='_blank'>ACNH Pocket Guide Catalog Scanner</a>.</p>
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
            <li>Follow on screen instructions and save the file to your device</li>
            <li>Select the video file using the button below and wait for your video to process</li>
            <li>Copy and paste your scanned catalog entries into [ <a href="https://acnh-pocket.web.app/" target='_blank'>ACNH Pocket Guide</a> ] on the [ Catalog Scanning ] page, or any other supporting application.</li>
          </ol>
        </p>
        <p>If this application crashes on your device, by using the slider below consider increasing its processing time: {waitTime.toString()}ms</p>
        <input type="range" min={1} max={2000} value={waitTime} class="slider" onChange={(event)=>{setWaitTime(event.target.value)}}></input>
        <div className='flex-center' style={{paddingTop:"15px"}}>
          <input type="file" id="file" accept="video/*" onChange={handleVideoUpload} style={{display:"none"}}/>
          <label for="file" className='button'>Select Video File</label>
        </div>
      </div>
    </div>
  </div>
}
export default LandingPage
