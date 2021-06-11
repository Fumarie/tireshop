import React from 'react';
import ProductList from "../ProductList/ProductList";
import PaginationComp from "../Pagination/Pagination";

const Catalog = () => {
    return (
        <>
            <PaginationComp/>
                <ProductList/>
            <PaginationComp />
        </>
    );
};

export default Catalog;
