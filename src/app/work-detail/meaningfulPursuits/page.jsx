"use client";
import React from 'react';
import ZigzagHeader from '../components/zigzagHeader';
import ReactPlayer from 'react-player';

const MeaningfulPursuits = () => {
  return (
    <div className="w-full text-white">
      <ZigzagHeader
        title="MEANINGFUL PURSUITS"
        description="Album Visuals"
        extendedDescription="A series of live video vignettes commissioned by an electronic musician for their album as well as to be projected behind their performance. This was for an album entitled “Meaningful Pursuits” by Danny Goliger"
        time="2021 // Artist Album AV"
        role="Animator / Creative Director"
        tools={['TouchDesigner', 'Premiere Pro']}
      />
      <div className="flex justify-center items-center h-screen">
        <ReactPlayer
          url="https://youtu.be/JksvVszrUDM"
          width="90%"
          height="90%"
          controls
        />
      </div>
    </div>
  );
};

export default MeaningfulPursuits;
