import React, {FC, useState} from 'react';
import s from "./profile.module.sass";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import {SpecialZoomLevel, Viewer, Worker} from "@react-pdf-viewer/core";

const catalogs: CatalogItem[] = [
    {label: 'Regular', file: require('../../assets/pdf/catalog/Regular.pdf')},
    {label: 'White Shaker', file: require('../../assets/pdf/catalog/White Shaker.pdf')}
];

type CatalogItem = {
    label: string,
    file: any
}

const ProfileCatalog: FC = () => {
    const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem>(catalogs[0]);
    const [currentPage, setCurrentPage] = useState(0); // 0-based
    const [totalPages, setTotalPages] = useState(0);
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { jumpToPage } = pageNavigationPluginInstance;

    const handlePageChange = (e: { currentPage: number }) => {
        setCurrentPage(e.currentPage);
    };

    const goToPage = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
            jumpToPage(page);
        }
    };


    const handleDocumentLoad = (e: { doc: { numPages: number } }) => {
        setTotalPages(e.doc.numPages);
        setCurrentPage(0);
    };

    return (
        <>
            <h1>Catalog</h1>
            <div className={s.nav}>
                {catalogs.map((catalog, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedCatalog(catalog);
                            setCurrentPage(0);
                        }}
                        className={[s.navItem, selectedCatalog.label === catalog.label ? s.linkActive : ''].join(' ')}
                    >
                        {catalog.label}
                    </button>
                ))}
            </div>


            <div style={{maxHeight: `calc(100vh - 220px)`, height: '100%'}}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={selectedCatalog.file}
                            initialPage={currentPage}
                            onPageChange={handlePageChange}
                            onDocumentLoad={handleDocumentLoad}
                            defaultScale={SpecialZoomLevel.PageFit}
                            plugins={[pageNavigationPluginInstance]}
                    />
                </Worker>
            </div>
            <div className={s.pagination}>
                <button
                    onClick={() => goToPage(currentPage-1)}
                    disabled={currentPage === 0}
                    className={s.paginationItem}
                >
                    Previous
                </button>
                <span>
          Page {currentPage + 1} / {totalPages}
        </span>
                <button
                    onClick={() => goToPage(currentPage+1)}
                    disabled={currentPage === totalPages - 1}
                    className={s.paginationItem}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default ProfileCatalog;