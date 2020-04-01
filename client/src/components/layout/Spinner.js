import React, { Fragment } from 'react';
import spinner from './spinner.gif'; //https://giphy.com/stickers/game-love-5t7ZjPj6xH7fhO1YPn

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Ładowanie...'
    />
  </Fragment>
);
