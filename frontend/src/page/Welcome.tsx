/*import {ReactElement, useContext} from "react";
import { PageState, PageStateContext } from "../App";

const Welcome = (): ReactElement => {
    const { setState } = useContext(PageStateContext);
    return (
        <>
            Welcome
            <button onClick={() => setState(PageState.MAP)}>to Map</button>
        </>
    )
}

export default Welcome;
*/
import React, { ReactElement, useContext, useState } from "react";
import { PageState, PageStateContext } from "../App";

const Welcome = (): ReactElement => {
  const { setState } = useContext(PageStateContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Hier kannst du die Logik für die Suchfunktion implementieren
    // Verwende die Variable searchTerm für die Suchabfrage
    console.log("Search term:", searchTerm);
    // Führe hier den entsprechenden Code aus, um die Suche durchzuführen
  };

  return (
    <>
      Welcome
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Wohin geht es als nächstes?"/>
      <button onClick={handleSearch} >Search</button>
      <button onClick={() => setState(PageState.MAP)}>to Map</button>
    </>
  );
};

export default Welcome;
