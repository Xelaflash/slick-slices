import { useEffect, useState } from 'react';

export default function useLatestData() {
  // we need to pull the data directly from sanity
  // hotSlices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();
  // use a side effect to fetch data from graphql endpoint
  useEffect(function () {
    // when component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            StoreSettings(id: "downtownStore") {
              name
              slicemaster {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
              hotSlices {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        // check for errors
        // set the data to state
        setHotSlices(response.data.StoreSettings.hotSlices);
        setSlicemasters(response.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}

// ! if pb avec jSON parse pensez a restart serveur si .env var ont été modif
// ! si pb de CORS mettre le localhost en wild card ds sanity.io project
