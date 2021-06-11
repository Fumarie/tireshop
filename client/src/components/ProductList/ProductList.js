import React, { useEffect } from 'react';
import classes from "../../App.module.css";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/products";
import Loader from "../Loader/Loader";

const ProductList = () => {
    const dispatch = useDispatch()
    const {products, currentPage, perPage, loading} = useSelector(state => state.products)
    console.log(products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, []);

    return (
        <div className={classes.CardWrap}>
            {!loading ? products.map((elem, index) => {
                    if (index < currentPage * perPage && index >= (currentPage - 1) * perPage)
                        return <Product id={elem.id} description={elem.description} price={elem.price} tire={{name: elem.tireMakerName, country: elem.tireCountry}} disc={{name: elem.discMakerName, country: elem.discCountry}} key={index} />
                }
            ):
              <Loader />
            }
        </div>
    );
};

export default ProductList;
