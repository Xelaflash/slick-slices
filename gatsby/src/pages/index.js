import React from 'react';
import SEO from '../components/SEO';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import useLatestData from '../utils/useLatestData';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="tilt mark">Slicemasters On</span>
      </h2>
      <p>Standing by to serve you</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="tilt mark">Pizzas of the day</span>
      </h2>
      <p>Come on & buy the slice</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>No specials today!</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
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
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}
