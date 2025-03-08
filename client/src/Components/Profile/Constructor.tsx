import React, {FC, RefObject, useRef} from 'react';
import {UserType} from "../../api/apiTypes";
import {IFrameRenderer} from "../../common/IFrameRenderer";
import {MaybeNull} from "../../helpers/productTypes";

const REACT_APP_CONSTRUCTOR_URL = process.env.REACT_APP_CONSTRUCTOR_URL || null

const signIn = (token: MaybeNull<string>, frame: RefObject<HTMLIFrameElement>) => {
    if (!frame.current || !token || !REACT_APP_CONSTRUCTOR_URL) return null;
    frame.current.contentWindow?.postMessage(
        {command: 'sign-in', payload: {token: token}},
        REACT_APP_CONSTRUCTOR_URL);
};

const signOut = (frame: RefObject<HTMLIFrameElement>) => {
    if (!REACT_APP_CONSTRUCTOR_URL) return null;
    frame.current?.contentWindow?.postMessage(
        {command: 'sign-out'},
        REACT_APP_CONSTRUCTOR_URL);
}

const Constructor: FC<{ user: UserType }> = () => {
    const site_src = process.env.REACT_APP_CONSTRUCTOR_ENV;
    const token = localStorage.getItem('constructor_token');

    const iframeRef = useRef<HTMLIFrameElement>(null);
    // const isIFrameLoaded = useIsIFrameLoaded(iframeRef);
    // if (isIFrameLoaded) {
    //     getConstructorCustomers().then((customers) => {
    //         console.log(customers)
    //     })
    // }
    // const prodboardRef = useRef(null)
    // useEffect(() => {
    // prodboard(prodboardRef.current, {
    //     company: "milino",
    //     instance: "closet",
    //     host: "https://milinocabinets.com",
    //     environment: "https://planner.prodboard.com"
    // });
    // },[])

    if (!site_src || iframeRef.current) return null;
    return (
        <div style={{height: '100%'}}>
            {<button onClick={() => signIn(token, iframeRef)}>Sign in</button>}
            {<button onClick={() => signOut(iframeRef)}>Sign Out</button>}
            <IFrameRenderer src={site_src} iframeRef={iframeRef}/>

            {/*<input id="token" type="text" placeholder="token" />*/}
            {/*<button type="submit" onClick={inst.signIn(document.getElementById('token').value)}>Send token</button>*/}
            {/*<button type="submit" onClick="inst.signOut()">signOut</button>*/}
            {/*<div ref={prodboardRef} id="prodboard" style={{width: '100%', height: '98vh'}}></div>*/}

        </div>

    );
};

export default Constructor;