import React, { useState, useContext } from 'react';
import {
  Grid as GiphyGrid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Popover, Button, Grid, Box } from '@material-ui/core';
import GifIcon from '@material-ui/icons/Gif';
import CloseIcon from '@material-ui/icons/Close';
// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const webSDKKey =
  process.env.REACT_APP_GIPHY_KEY || 'RFq4RPD1OvDrXpIncdLiqhhOIAnuyxuH';

const EmptyResults = () => (
  <div
    style={{
      color: 'grey',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: '2rem',
    }}
  >
    <div>"No results"</div>
  </div>
);
const MockGrid: JSX.Element = React.createElement(EmptyResults, null, null);

// define the components in a separate function so we can
// use the context hook. You could also use the render props pattern
const GiphyComponents = (props: any) => {
  const { setInputGif, handleClose } = props;
  const { fetchGifs, searchKey } = useContext(SearchContext);
  return (
    <>
      <div style={{ margin: '.1rem' }}>
        <SearchBar />
      </div>
      <div style={{ margin: '.1rem' }}>
        <SuggestionBar />
      </div>
      <div style={{ margin: '.1rem' }}>
        <GiphyGrid
          key={searchKey}
          noResultsMessage={MockGrid}
          columns={3}
          width={800}
          fetchGifs={fetchGifs}
          onGifClick={(gif, e) => {
            e.preventDefault();
            setInputGif(gif);
            handleClose(e);
            console.log('gif clickedd', gif);
          }}
          onGifSeen={gif => {
            console.log('gif seen', gif);
          }}
        />
      </div>
    </>
  );
};
// the search experience consists of the manager and its child components that use SearchContext
const SearchExperience = (props: any) => {
  const { setInputGif, handleClose } = props;
  return (
    <SearchContextManager apiKey={webSDKKey}>
      <GiphyComponents setInputGif={setInputGif} handleClose={handleClose} />
    </SearchContextManager>
  );
};

export const CreateGiphyPopover = (props: any) => {
  const { setInputGif } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        marginThreshold={16}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            height: '40vh',
          }}
        >
          <Button
            style={{
              alignSelf: 'end',
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
          <SearchExperience
            setInputGif={setInputGif}
            handleClose={handleClose}
          />
        </Box>
      </Popover>
      <Button onClick={handleClick} style={{ alignSelf: 'start' }}>
        <GifIcon />
      </Button>
    </>
  );
};
