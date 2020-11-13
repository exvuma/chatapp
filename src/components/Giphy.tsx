import React, { useState, useEffect, useContext } from 'react';
import {
  Grid as GiphyGrid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Popover, Button, TextField, Box } from '@material-ui/core';
import GifIcon from '@material-ui/icons/Gif';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { ChangeEvent } from 'react';
// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const webSDKKey = process.env.REACT_APP_GIPHY_KEY || '';
const gf = new GiphyFetch(webSDKKey);

// define the components in a separate function so we can
// use the context hook. You could also use the render props pattern
const GiphyComponents = () => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  return (
    <>
      <SearchBar />
      <SuggestionBar />
      <GiphyGrid
        key={searchKey}
        columns={3}
        width={800}
        fetchGifs={fetchGifs}
      />
    </>
  );
};
// the search experience consists of the manager and its child components that use SearchContext
const SearchExperience = () => (
  <SearchContextManager apiKey={webSDKKey}>
    <GiphyComponents />
  </SearchContextManager>
);

// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
const fetchGifs = () =>
  //  (term: string) => {
  // console.log('getch', term);
  // return (offset: number) =>
  gf.search('dogs', {
    sort: 'relevant',
    lang: 'es',
    limit: 10,
    type: 'stickers',
  });
// };

export const GiphySearch = (props: any) => {
  const { searchTerm } = props;
  useEffect(() => {
    fetchGifs(searchTerm);
  }, [searchTerm]);
  return <GiphyGrid width={800} columns={3} fetchGifs={fetchGifs} />;
};
export const CreateGiphyPopover = (props: any) => {
  // const { setRooms, author, members } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [merrors, setErrors] = useState([]);
  const [isPostingRoom, setIsPostingRoom] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('blah');
  // const { fetchGifs, searchTerm } = useContext(SearchContext);
  const setForm = async (arg: any) => {
    console.log(merrors);
    console.log('isposting gip', isPostingRoom);
    // if there aren't errors close the modal
    if (!merrors.find(err => err !== '')) {
      console.log('closing modal');
      setAnchorEl(null);
    }
    console.log(merrors);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('hanlding giph click');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log('closing popover');
  };
  const handleSearchInputChange = (event: React.ChangeEvent) => {
    setSearchTerm(event.target.value);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Box
          style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}
        >
          {/* <TextField
            value={searchTerm}
            onChange={handleSearchInputChange}
            label={'Giphy Search'}
          /> */}
          <SearchExperience />
          {/* <SearchBar />
          <SuggestionBar />
          <GiphyGrid
            key={searchTerm}
            columns={3}
            width={800}
            fetchGifs={fetchGifs}
          /> */}

          {/* <GiphySearch style={{}} term={searchTerm} /> */}
          {/* <SearchBar /> */}
        </Box>
      </Popover>
      <Button onClick={handleClick}>
        <GifIcon />
      </Button>
    </>
  );
};
