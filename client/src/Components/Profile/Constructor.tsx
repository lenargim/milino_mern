import React, {FC, useRef} from 'react';
import {getConstructorCustomers} from "../../api/apiFunctions";
import {UserType} from "../../api/apiTypes";
import {IFrameRenderer} from "../../common/IFrameRenderer";
import {useIsIFrameLoaded} from "../../helpers/helpers";

const Constructor: FC<{ user: UserType }> = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const isIFrameLoaded = useIsIFrameLoaded(iframeRef);

    if (isIFrameLoaded) {
        getConstructorCustomers().then((customers) => {
            console.log(customers)
        })
    }

    const site_src = process.env.REACT_APP_CONSTRUCTOR_ENV;
    if (!site_src) return null;
    return (
        <div style={{height: '100%'}}>
            {/*<iframe src={process.env.REACT_APP_CONSTRUCTOR_ENV} style={{width: '100%', height: '100%',padding:0,margin:0}} />*/}
            <IFrameRenderer src={site_src}
                            iframeRef={iframeRef}/>
        </div>
    );
};

export default Constructor;