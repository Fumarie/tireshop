import { GET_ALL_PRODUCTS, GET_PRODUCT, SET_CURRENTPAGE, SET_LOADING } from "../types";
import axios from "axios";

export const setLoading = () => {
    return {type: SET_LOADING}
}

export const setCurrentPage = (page) => {
    return {type: SET_CURRENTPAGE, payload: page}
}

export const getAllProducts = () => {
    return async dispatch => {
        try {
            dispatch(setLoading())
            const tires = await axios.get('http://localhost:9090/api/tire').then(response => response.data)
            dispatch({type: GET_ALL_PRODUCTS, payload: {tires, productsCount: tires.length}})
        } catch (e) {
            console.log(e.message)
        }
    }
}

export const getProduct = (id) => {
    return async dispatch => {
        try {
            dispatch(setLoading())
            const product = await axios.get(`http://localhost:9090/api/tire/${id}`).then(response => response.data)
            dispatch({type: GET_PRODUCT, payload: product[0]})
        } catch (e) {

        }
    }
}