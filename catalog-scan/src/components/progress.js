import React from 'react';

const Progress = ({percent}) => {
  return <div className='progress' style={{width: percent*100 + "vw", height: percent===1 ? 0 : null}}/>}

export default Progress