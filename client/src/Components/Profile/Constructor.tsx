import React, {FC, RefObject, useEffect, useRef} from 'react';
import {UserType} from "../../api/apiTypes";
import {IFrameRenderer} from "../../common/IFrameRenderer";
import {useIsIFrameLoaded} from "../../helpers/helpers";


const signIn = (token:string, frame:RefObject<HTMLIFrameElement>) => {
    if (!frame.current) return null;
    frame.current.contentWindow?.postMessage(
        { command: 'sign-in', payload: { token: token } },
        'https://planner.prodboard.com');
};

const Constructor: FC<{ user: UserType }> = () => {
    const site_src = process.env.REACT_APP_CONSTRUCTOR_ENV;
    const token = process.env.REACT_APP_CONSTRUCTOR_TOKEN;

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const isIFrameLoaded = useIsIFrameLoaded(iframeRef);
    if (isIFrameLoaded) {
        // getConstructorCustomers().then((customers) => {
        //     console.log(customers)
        // })
    }
    const prodboardRef = useRef(null)
    // useEffect(() => {
        // prodboard(prodboardRef.current, {
        //     company: "milino",
        //     instance: "closet",
        //     host: "https://milinocabinets.com",
        //     environment: "https://planner.prodboard.com"
        // });
    // },[])

    console.log(site_src)
    console.log(token)
    if (!site_src || !token) return null;
    return (
        <div style={{height: '100%'}}>
            {iframeRef.current && <button onClick={() => signIn(token, iframeRef)}>Sign in</button>}
            {/*<iframe src={process.env.REACT_APP_CONSTRUCTOR_ENV} style={{width: '100%', height: '100%',padding:0,margin:0}} />*/}
            <IFrameRenderer src={site_src} iframeRef={iframeRef}/>

            {/*<input id="token" type="text" placeholder="token" />*/}
            {/*<button type="submit" onClick={inst.signIn(document.getElementById('token').value)}>Send token</button>*/}
            {/*<button type="submit" onClick="inst.signOut()">signOut</button>*/}
            {/*<div ref={prodboardRef} id="prodboard" style={{width: '100%', height: '98vh'}}></div>*/}

        </div>

    );
};

export default Constructor;