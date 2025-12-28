import React, {FC} from 'react';
import {getImg} from "../../helpers/helpers";
import {NavLink} from "react-router-dom";
import s from './profile.module.sass'

const catalogs: CatalogItem[] = [
    {label: 'Milino Regular Kitchen Catalog', link: 'd/1OdFrzEoMCP2wmR_k2HeIJMBPcnlD6xbv/view?usp=drive_link', img: 'Regular.jpg'},
    {label: 'Milino Handleless Kitchen Catalog', link: 'd/18KmiCoVUZ1BcEpXfwVAAZJzTnrBbBGTo/view?usp=drive_link', img: 'Handle Less.jpg'},
    {label: 'Milino Standard White Shaker Catalog', link: 'd/1uroDfI3LcrovATHqbQBA4_-EnWxljJ92/view?usp=drive_link', img: 'Standard Shaker.jpg'},
    {label: 'Milino Walkin Closets Catalog', link: 'd/1ZZdgH3mBsA_GPZ-UgEKLFlT3Um8iFAuX/view?usp=drive_link', img: 'WIC Closet.jpg'},
    {label: 'Milino Simple Closet Catalog', link: 'd/1-6o1V-uAu5u6b7qPUy4ej2_PLlAKw3rL/view?usp=drive_link', img: 'RTA Closet.jpg'},
    // {label: 'Instructions', link: 'd/17yZavWeO3LPSR-A4BN9LGqMc5fkNMFwz/view?usp=drive_link', img: ''}
];

type CatalogItem = {
    label: string,
    link: string,
    img: string
}

const ProfileCatalog2020: FC = () => {
    const drive = 'https://drive.google.com/file/';
    return (
        <>
            <h1>2020 Catalogs</h1>
            <div className={s.catalogBlock}>
                <NavLink to={drive+'d/17yZavWeO3LPSR-A4BN9LGqMc5fkNMFwz/view?usp=drive_link'} className={s.instructions} target="_blank">Instructions</NavLink>
                <div className={s.catalogWrap}>
                    {catalogs.map((catalog, index) => {
                        const {label, link, img} = catalog
                        const img_src = getImg('2020catalogs', img)
                        return (
                            <NavLink to={drive+link} className={s.catalogItem} key={index} target="_blank">
                                <img src={img_src} alt={label}/>
                                <span>{label}</span>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default ProfileCatalog2020;