import { useEffect, useState } from 'react';
import './App.css';
import Impressum from './page/Impressum';

export enum PageState {
  WELCOME,
  MAP,
  IMPRESSUM
}

function App() {
  const [currentState, setCurrentState] = useState<PageState>(PageState.WELCOME);
  const [content, setContent] = useState<JSX.Element>(<></>)

  useEffect(() => {
    switch (currentState) {
      case PageState.WELCOME:
        setContent(<>Welcome
          <button onClick={() => setCurrentState(PageState.MAP)}>Show Map</button></>)
        break;
      case PageState.MAP:
        setContent(<>Map
          <button onClick={() => setCurrentState(PageState.IMPRESSUM)}>Show Impressum</button></>)
        break;
      case PageState.IMPRESSUM:
        setContent(<Impressum prop={setContent}/>)
        break;
    }
  }, [currentState]);

  return (content);
}
export default App;
