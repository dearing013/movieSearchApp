

import React, { useState } from 'react';

const StoreContext = React.createContext([{}, () => {}]);

const StoreProvider = (props) => {
  const [state, setState] = useState({
    myFavouritesShown: false,
  });
  return (
    <StoreContext.Provider value={[state, setState]}>
      {props.children}
    </StoreContext.Provider>
  );
}
export { StoreContext, StoreProvider };