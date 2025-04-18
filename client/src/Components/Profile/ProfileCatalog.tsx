import React, {FC, useState} from 'react';
import s from "./profile.module.sass";
import MyPDFViewer from "../../common/PDFViewer";
import PDFRegular from './../../assets/pdf/catalog/Regular.pdf'
import PDFShaker from './../../assets/pdf/catalog/White Shaker.pdf';


const states = ['Regular', 'White Shaker'] as const;
export type statesType = typeof states[number];
const ProfileCatalog: FC = () => {
    const [state, setState] = useState<statesType>('Regular');
    let pdfLink;
    switch (state) {
        case "Regular":
            pdfLink = PDFRegular;
            break
        case "White Shaker":
            pdfLink = PDFShaker;
            break
    }
    return (
        <>
            <h1>Catalog</h1>
            <div className={s.nav}>
                {states.map((el, index) => {
                    return <ProfileCatalogRadio key={index} value={el} state={state} setState={setState}/>
                })}
            </div>
            <MyPDFViewer link={pdfLink}/>
        </>
    );
};

export default ProfileCatalog;

const ProfileCatalogRadio: FC<{ value: statesType, state: statesType, setState: (value: statesType) => void }> = ({
                                                                                                                      value,
                                                                                                                      state,
                                                                                                                      setState
                                                                                                                  }) => {
    return (
        <div>
            <input type={"radio"} value={value} name="catalog" id={value} onClick={() => setState(value)}/>
            <label
                className={[s.navItem, value === state ? s.linkActive : ''].join(' ')}
                htmlFor={value}>{value}</label>
        </div>
    )
}