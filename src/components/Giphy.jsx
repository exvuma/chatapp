import React, { useState, useEffect } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const gf = new GiphyFetch('RFq4RPD1OvDrXpIncdLiqhhOIAnuyxuH');
// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
const fetchGifs = offset =>
  gf.search('dogs', {
    sort: 'relevant',
    lang: 'es',
    limit: 10,
    type: 'stickers',
  });

export const GiphySearch = () => {
  return <Grid width={800} columns={3} fetchGifs={fetchGifs} />;
};
