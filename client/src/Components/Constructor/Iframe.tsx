import React, {FC, RefObject, useEffect, useRef, useState} from 'react';
import {MaybeNull} from "../../helpers/productTypes";
import {getCustomerToken} from "../../api/apiFunctions";

const Iframe: FC<{ email: string }> = ({email}) => {
    const frame_src = process.env.REACT_APP_CONSTRUCTOR_ENV;
    const api_url = process.env.REACT_APP_CONSTRUCTOR_URL;
    const iframeRef = useRef<MaybeNull<HTMLIFrameElement>>(null);
    const customer_token = localStorage.getItem('customer_token');
    const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false);


    const signIn = (frame: RefObject<HTMLIFrameElement>, api_url: string) => {
        if (!frame.current) return null;
        frame.current.contentWindow?.postMessage(
            {command: 'sign-in', payload: {token: customer_token}},
            api_url);
    };

    useEffect(() => {
        !customer_token && getCustomerToken(email).then(data => {
            data && localStorage.setItem('customer_token', data)
        })
    }, []);


    useEffect(() => {
        iframeRef.current?.addEventListener('load', () => setIsIFrameLoaded(true));
        return () => {
            iframeRef.current?.removeEventListener('load', () => setIsIFrameLoaded(true));
        };
    }, [iframeRef]);


    useEffect(() => {
        if (isIFrameLoaded && api_url && customer_token) signIn(iframeRef, api_url);

    }, [isIFrameLoaded])

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