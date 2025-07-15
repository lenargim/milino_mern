import React, {FC, useLayoutEffect, useRef, useState} from 'react';
import {MaybeNull, MaybeUndefined} from "../../helpers/productTypes";
import s from "./profile.module.sass";

const links: LinkItem[] = [
    {
        name: 'Order Form Tutorial',
        type: 'link',
        frameUrl: 'https://www.youtube.com/embed/c69DY1-gqqw?si=R4T5xjTtVKZ6mPbS'
    },
    {
        name: 'Constructor Tutorial',
        type: 'folder',
        folder: [
            {
                name: 'Closet Room Settings',
                type: 'link',
                frameUrl: 'https://www.youtube.com/embed/tP34jewBz1w?si=oAfJr8qT1dbBPgn1'
            },
            {
                name: 'Custom Room Shape',
                type: 'link',
                frameUrl: 'https://www.youtube.com/embed/jwfBKLrOgvw?si=KSPlv-Nj3mbwb_Uv'
            },
            {
                name: 'Create Your Closet',
                type: 'link',
                frameUrl: 'https://www.youtube.com/embed/siPncol73Rc?si=5QNaZsJYcwf9ZtH7'
            },
        ]
    }
]
type LinkItem = {
    name: string,
    type: 'link' | 'folder',
    frameUrl?: string,
    folder?: LinkItem[]
}

const ProfileTutorial = () => {

    const [tutorialType, setTutorialType] = useState<LinkItem>(links[0]);
    const isLink = tutorialType.type === 'link';
    return (
        <div style={{height: '100%'}}>
            <h1>Tutorial</h1>
            <div className={s.nav}>
                {links.map((linkItem, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setTutorialType(linkItem);
                        }}
                        className={[s.navItem, linkItem.name === tutorialType.name ? s.linkActive : ''].join(' ')}
                    >{linkItem.name}</button>
                ))}
            </div>
            {
                isLink ? <ProfileTutorialFrame tutorialType={tutorialType}/> :
                    <ProfileTutorialFolder tutorialType={tutorialType}/>
            }
        </div>
    );
};

export default ProfileTutorial;

const ProfileTutorialFrame: FC<{ tutorialType: LinkItem }> = ({tutorialType}) => {
    const {frameUrl, name} = tutorialType
    const ref = useRef<MaybeNull<HTMLDivElement>>(null);
    const [width, setWidth] = useState<MaybeNull<number>>(0);
    useLayoutEffect(() => {
        if (ref.current) {
            const w: number = ref.current.offsetWidth;
            const h: number = ref.current.offsetHeight;
            const maxWidth = Math.min((w - 100), (16 / 9 * h - 150));
            setWidth(maxWidth)
        }
    }, []);

    if (!frameUrl) return <div>No iframe link</div>;
    return (
        <div ref={ref} style={{maxHeight: '80vh', height: '100%'}}>
            <iframe src={frameUrl}
                    title={name}
                    frameBorder="0"
                    style={{
                        aspectRatio: '16/9',
                        width: '100%',
                        maxWidth: `${width}px`
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen/>
        </div>
    )
}


const ProfileTutorialFolder: FC<{ tutorialType: LinkItem }> = ({tutorialType}) => {
    const {folder} = tutorialType;
    const [folderType, setFolderType] = useState<MaybeUndefined<LinkItem>>(folder ? folder[0] : undefined);
    if (!folder || !folderType) return <div>No iframe folder</div>;
    return (
        <>
            <div className={s.nav}>
                {folder.map((linkItem, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setFolderType(linkItem);
                        }}
                        className={[s.navItem, linkItem.name === folderType?.name ? s.linkActive : ''].join(' ')}
                    >{linkItem.name}</button>
                ))}
            </div>
            <ProfileTutorialFrame tutorialType={folderType}/>
        </>
    )
}