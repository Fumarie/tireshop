import React, { useEffect } from 'react';
import './ProductPage.css'
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/actions/products";
import Loader from "../../components/Loader/Loader";

const url = 'https://kolesa-asb.ru/upload/robotyre/section_4683_800.jpg'

const ProductPage = (props) => {
    const id = props.match.params.id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct(id))
    }, []);

    const {product, loading} = useSelector(state => state.products)
    console.log(product)

    return (
            <div className="container bootdey" style={{marginTop: 200}}>
                {!loading ?
                <div className="col-md-12">
                    <section className="panel">
                        <div className="panel-body d-flex">
                            <div className="col-md-6" style={{paddingLeft: 150}}>
                                <div className="pro-img-details">
                                    <img src={url} style={{width: 350}} alt="" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className="pro-d-title">
                                    <a href="#" className="">
                                        Leopard Shirt Dress
                                    </a>
                                </h4>
                                <p>
                                    Praesent ac condimentum felis. Nulla at nisl orci, at dignissim dolor, The best
                                    product descriptions address your ideal buyer directly and personally. The best
                                    product descriptions address your ideal buyer directly and personally.
                                </p>
                                <div className="product_meta">
                                    <span className="posted_in"> <strong>Categories:</strong> <a rel="tag"
                                                                                                 href="#">Jackets</a>, <a
                                        rel="tag" href="#">Men</a>, <a rel="tag" href="#">Shirts</a>, <a rel="tag"
                                                                                                         href="#">T-shirt</a>.</span>
                                    <span className="tagged_as"><strong>Tags:</strong> <a rel="tag"
                                                                                          href="#">mens</a>, <a
                                        rel="tag" href="#">womens</a>.</span>
                                </div>
                                <div className="m-bot15"><strong>Price : </strong> <span
                                    className="amount-old">$544</span> <span className="pro-price"> $300.00</span></div>
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="quantiy" placeholder="1" className="form-control quantity" />
                                </div>
                                <p>
                                    <button className="btn btn-round btn-danger" type="button"><i
                                        className="fa fa-shopping-cart"></i> Add to Cart
                                    </button>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
                    : <Loader />
                }
            </div>
    );
};

export default ProductPage;
