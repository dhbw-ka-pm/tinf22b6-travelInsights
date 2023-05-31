import { useContext } from "react";
import { PageState, PageStateContext } from "../App";

const Welcome = (): JSX.Element => {
    const { setState } = useContext(PageStateContext);
    return (
        <>
            Welcome
            <button onClick={() => setState(PageState.MAP)}>to Map</button>
        </>
    )
}

export default Welcome;