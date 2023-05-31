import { PageState } from "../App";

const Impressum = (props: any): JSX.Element => {
    return (<>Impressum <button onClick={props(PageState.WELCOME)}>Test</button></>);
}

export default Impressum;