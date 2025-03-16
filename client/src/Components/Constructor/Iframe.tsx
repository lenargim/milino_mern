import React, {FC, RefObject, useEffect, useRef, useState} from 'react';
import {MaybeNull} from "../../helpers/productTypes";
import {UserType} from "../../api/apiTypes";
import {constructorLogin} from "../../api/apiFunctions";

const Iframe: FC<{ user: UserType }> = ({user}) => {
    const frame_src = process.env.REACT_APP_CONSTRUCTOR_ENV;
    const api_url = process.env.REACT_APP_CONSTRUCTOR_URL;
    const iframeRef = useRef<MaybeNull<HTMLIFrameElement>>(null);
    const customer_token = localStorage.getItem('customer_token');
    const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false);

    const signIn = (frame: RefObject<HTMLIFrameElement>, api_url: string) => {
        if (!frame.current) return null;
        if (customer_token) {
            frame.current.contentWindow?.postMessage(
                {command: 'sign-in', payload: {token: customer_token}},
                api_url);
        } else {
            constructorLogin(user)
        }
    };

    useEffect(() => {
        iframeRef.current?.addEventListener('load', () => setIsIFrameLoaded(true));
        return () => {
            iframeRef.current?.removeEventListener('load', () => setIsIFrameLoaded(true));
        };
    }, [iframeRef]);


    useEffect(() => {
        if (isIFrameLoaded && api_url) signIn(iframeRef, api_url);
    }, [isIFrameLoaded,customer_token])

    return (
        <iframe
            src={frame_src}
            ref={iframeRef}
            style={{width: '100%', height: '100%', padding: 0, margin: 0, border: 'none'}}
            allowFullScreen={true}
            allow={'clipboard-read; clipboard-write'}
        />
    );
};

export default Iframe;