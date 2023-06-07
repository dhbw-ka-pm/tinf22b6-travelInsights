import * as React from 'react';
import { useContext } from 'react';
import { PageState, PageStateContext } from '../App';

const Welcome = (): React.ReactElement => {
  const { setState } = useContext(PageStateContext);
  return (
    <>
      Welcome
      <button
        onClick={() => {
          setState(PageState.MAP);
        }}
      >
        to Map
      </button>
    </>
  );
};

export default Welcome;
