import React, {FC} from 'react';
import {getImg} from "../../helpers/helpers";
import {NavLink} from "react-router-dom";
import s from './profile.module.sass'

const catalogs: CatalogItem[] = [
    {label: 'Milino Regular Kitchen Catalog', link: 'd/1DtaIIof60RULiDkAYILcS5DuD6F6q2aG/view', img: 'Regular.jpg'},
    {label: 'Milino Handleless Kitchen Catalog', link: 'd/18KmiCoVUZ1BcEpXfwVAAZJzTnrBbBGTo/view?usp=drive_link', img: 'Handle Less.jpg'},
    {label: 'Milino Standard White Shaker Catalog', link: 'd/13MP7Ea8chVnGNyIjp8mquqbDCItcvrs_/view', img: 'Standard Shaker.jpg'},
    {label: 'Milino WALK IN Closets Catalog', link: 'd/1OUaEwqSbLZ26RJ0qGfiNLcWn7Plrjtb3/view', img: 'WIC Closet.jpg'},
    {label: 'Milino RTA Closet Catalog', link: 'd/1IR6y378298mrKPkTD7T3W3vGz9xwb35m/view', img: 'RTA Closet.jpg'},
    {label: 'Cabinet System Closet Catalog', link: 'd/1213i5V3_cG1br9tFCAzyWkvjt85WVc0W/view', img: 'Cabinet_System_Closet.jpg'},
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