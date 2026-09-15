import React, {FC} from 'react';


const ProfileCatalog2020: FC = () => {
    const m = `Updating files \n
                Will be available for download soon`
    return (
        <>
            <h1>2020 Catalogs</h1>
            <div style={{marginTop: '30px', whiteSpace: 'pre-line'}}>{m}</div>
        </>
    );
};

export default ProfileCatalog2020;