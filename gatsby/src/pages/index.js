import React from 'react';
import SEO from '../components/SEO';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>CurrentlySlicing</p>
    </div>
  );
}

function HotSlices() {
  return (
    <div>
      <p>HotSlices</p>
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    // the below is a react fragment (ghost element). It's needed to return various elements
    <>
      <SEO title="Home" />
      <div className="center">
        <h1>The best pizza downtown!</h1>
        <p>Open from 11am to 11pm every day</p>
        <div>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </div>
      </div>
    </>
  );
}
