import React, {FC} from 'react';
import { useParams} from "react-router-dom";

const ProfileCatalogItem: FC = () => {
    const {catalogName} = useParams();
    return (
        <>
            {catalogName}
        </>
    );
};

export default ProfileCatalogItem;