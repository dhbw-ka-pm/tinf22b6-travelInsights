import { createContext, useEffect, useState } from 'react';
import './App.css';
import Impressum from './page/Impressum';
import LeafletMap from './page/LeafletMap';
import Welcome from './page/Welcome';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export enum PageState {
  WELCOME,
  MAP,
  IMPRESSUM
}

export const PageStateContext = createContext<{state: PageState, setState: Function}>({state: PageState.MAP, setState: () => {}});

function App() {
  const [stateProvider, setCurrentState] = useState<PageState>(PageState.MAP);
  const [content, setContent] = useState<JSX.Element>(<></>)

  useEffect(() => {
    switch (stateProvider) {
      case PageState.WELCOME:
        setContent(<Welcome />)
        break;
      case PageState.MAP:
        setContent(<LeafletMap />)
        break;
      case PageState.IMPRESSUM:
        setContent(<Impressum />)
        break;
    }
  }, [stateProvider]);

  return (
    <PageStateContext.Provider value={{ state: stateProvider, setState: setCurrentState }}>
      {content}
    </PageStateContext.Provider>
  );
}
export default App;
