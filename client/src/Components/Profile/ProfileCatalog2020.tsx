import React, {FC} from 'react';
import {getImg} from "../../helpers/helpers";
import {NavLink} from "react-router-dom";
import s from './profile.module.sass'

const catalogs: CatalogItem[] = [
    {label: 'Milino Regular Kitchen Catalog (November 2026)', link: 'd/1Bah6YSrfrLMTXo1jAoBd--H0LWbGJbYr/view', img: 'Regular.jpg'},
    {label: 'Milino Handleless Kitchen Catalog (November 2026)', link: 'd/1ssMH_jbxJrLnRG9GMGyq9yn1irPVbWbP/view', img: 'Handle Less.jpg'},
    {label: 'Milino Standard White Shaker Catalog (July 2026)', link: '', img: 'Standard Shaker.jpg'},
    {label: 'Milino WALK IN Closets Catalog (July 2026)', link: '', img: 'WIC Closet.jpg'},
    {label: 'Milino RTA Closet Catalog (July 2026)', link: '', img: 'RTA Closet.jpg'},
    {label: 'Cabinet System Closet Catalog (July 2026)', link: '', img: 'Cabinet_System_Closet.jpg'},
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
                        const img_src = getImg('2020catalogs', img);
                        const has_link = !!link;
                        if (!has_link) {
                            return (
                                <div className={[s.catalogItem, s.catalogItemEmpty].join(' ')} key={index}>
                                    <img src={img_src} alt={label}/>
                                    <span>{label}</span>
                                    <span>Will be available soon</span>
                                </div>
                            )
                        }
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