import React from 'react';
import s from './profile.module.sass';

const ProfileDoorTypes = () => {
    const images = require.context(
        '../../assets/img/door_types',
        true,
        /\.(png|jpe?g|gif|webp|svg)$/
    );
    const folders: Record<string, string[]> = {};
    images.keys().forEach(key => {
        const [, folder, file] = key.match(/^\.\/([^/]+)\/(.+)$/)!;

        if (!folders[folder]) {
            folders[folder] = [];
        }

        folders[folder].push(images(key));
    });

    return (
        <div>
            <h1>Door Types</h1>
            <div>
                {Object.entries(folders).map(([folderName, images]) => (
                    <div key={folderName} className={s.imageBlock}>
                        <h2>{folderName}</h2>
                        <div className={s.list}>
                            {images.map((src) => (
                                <img
                                    className={s.item}
                                    key={src}
                                    src={src}
                                    alt={`${folderName}@${src}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileDoorTypes;