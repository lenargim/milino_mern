import React, {FC} from 'react';
import {getImg} from "../../helpers/helpers";
import {NavLink} from "react-router-dom";
import s from './profile.module.sass'

const catalogs: CatalogItem[] = [
    {label: 'Milino Regular Kitchen Catalog', link: '1WLguo3HpjDCBs15kNW9B4tjyQZIFyUb5/view?pli=1', img: 'Regular.jpg'},
    {label: 'Milino Handleless Kitchen Catalog', link: 'd/1pSY3cd5D2R_0qYnkOECQ97JqlaLOVu23/view', img: 'Handle Less.jpg'},
    {label: 'Milino Standard White Shaker Catalog', link: 'd/1EtzSQj9xPw0ykqX9-CokZ_zu1dzVKQK9/view', img: 'Standard Shaker.jpg'},
    {label: 'Milino WALK IN Closets Catalog', link: 'd/1DHfsqlh1RlPiQcGF5BztV39aT4DzbYjV/view', img: 'WIC Closet.jpg'},
    {label: 'Milino RTA Closet Catalog', link: 'd/1yt7ArteH_ANAa9i8h9NGagFTlmLrVAFo/view', img: 'RTA Closet.jpg'},
    {label: 'Cabinet System Closet Catalog', link: 'd/16zYIReRGn89HLKcL0Jmj9zA4NqqnJedF/view', img: 'Cabinet_System_Closet.jpg'},
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