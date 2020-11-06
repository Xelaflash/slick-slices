import React from 'react';
import SEO from '../components/SEO';

export default function HomePage() {
  return (
    // the below is a react fragment (ghost element). It's needed to return various elements
    <>
      <SEO title="Home" />
      <p>Hello from the home Page of my first Gatsby website</p>
    </>
  );
}
