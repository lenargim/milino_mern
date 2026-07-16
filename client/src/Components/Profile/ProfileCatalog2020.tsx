import React, {FC} from 'react';
import {getImg} from "../../helpers/helpers";
import {NavLink} from "react-router-dom";
import s from './profile.module.sass'

const catalogs: CatalogItem[] = [
    {label: 'Milino Regular Kitchen Catalog (July 2026)', link: 'd/1-EJelvKI0iBkGUEYzprJVAVhlJeVeo5E/view', img: 'Regular.jpg'},
    {label: 'Milino Handleless Kitchen Catalog (July 2026)', link: 'd/1jw7yixDpRsYV1BlQV7PigsuAdvnxD73o/view', img: 'Handle Less.jpg'},
    {label: 'Milino Standard White Shaker Catalog (July 2026)', link: 'd/1y2O8QpekCK44nwaaGoY8e_FwZXM2_ZLp/view', img: 'Standard Shaker.jpg'},
    {label: 'Milino WALK IN Closets Catalog (July 2026)', link: 'd/1orM41J2V39AVTbBwqWsaMC9KcBpdF3YJ/view', img: 'WIC Closet.jpg'},
    {label: 'Milino RTA Closet Catalog (July 2026)', link: 'd/1UypvbN7WtDZaTXJ0rk4CfnJ-KNvrewUM/view', img: 'RTA Closet.jpg'},
    {label: 'Cabinet System Closet Catalog (July 2026)', link: 'd/1LdOWQiz293WW2APSA2gsjQUAOlN5x181/view', img: 'Cabinet_System_Closet.jpg'},
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