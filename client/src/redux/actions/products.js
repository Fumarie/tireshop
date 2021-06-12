import {
    GET_ALL_PRODUCTS, GET_DISC_MAKERS,
    GET_PRODUCT,
    GET_TIRE_MAKERS,
    SET_CURRENTPAGE,
    SET_LOADING,
    SET_MODAL,
    SET_MODAL_LOADING, SET_MODAL_TYPE
} from "../types";
import axios from "axios";

export const setLoading = () => {
    return {type: SET_LOADING}
}

export const setModal = (bool, id) => {
    return {type: SET_MODAL, payload: {bool, id}}
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
            console.log(e.message)
        }
    }
}

export const editProduct = (id, data) => {
    return async dispatch => {
        try {
            dispatch(setModalLoading())
            const newProduct = await axios.put('http://localhost:9090/api/tire/edit', {
                ...data, id
            })
        } catch (e) {
            console.log(e.message)
        }
    }
}

export const setModalLoading = () => {
    return {type: SET_MODAL_LOADING}
}

export const setModalType = (type) => {
    return {type: SET_MODAL_TYPE, payload: type}
}

export const getTireMakers = () => {
    return async dispatch => {
        try {
            dispatch(setModalLoading())
            const tireMakers = await axios.get('http://localhost:9090/api/tire/getTireMakers').then(response => response.data)
            dispatch({type: GET_TIRE_MAKERS, payload: tireMakers})
        } catch (e) {
            console.log(e.message)
        }
    }
}

export const getDiscMakers = () => {
    return async dispatch => {
        try {
            dispatch(setModalLoading())
            const discMakers = await axios.get('http://localhost:9090/api/tire/getDiscMakers').then(response => response.data)
            dispatch({type: GET_DISC_MAKERS, payload: discMakers})
        } catch (e) {
            console.log(e.message)
        }
    }
}

export const deleteProduct = (id) => {
    console.log(id)
    return async dispatch => {
        try {
            await axios.delete(`http://localhost:9090/api/tire/${id}`)
            dispatch(getAllProducts())
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const createProduct = (data) => {
    return async dispatch => {
        try {
            await axios.post(`http://localhost:9090/api/tire/create`, {...data})
            dispatch(getAllProducts())
        } catch (e) {
            console.log(e.message)
        }
    }
}