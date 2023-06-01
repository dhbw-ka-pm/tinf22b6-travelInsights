import {ReactElement, useContext} from "react";
import { PageState, PageStateContext } from "../App";

const Impressum = (): ReactElement => {
    const { setState } = useContext(PageStateContext);
    return (
        <>Impressum
            <button onClick={() => setState(PageState.WELCOME)}>to Welcome</button>
        </>
    )
}

export default Impressum;