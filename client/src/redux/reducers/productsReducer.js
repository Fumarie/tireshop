import { GET_ALL_PRODUCTS, GET_PRODUCT, SET_CURRENTPAGE, SET_LOADING } from "../types";

const initialState = {
    products: [],
    productsCount: 36,
    product: {},
    loading: false,
    currentPage: 1,
    perPage: 36,
}

const handlers = {
    [SET_LOADING]: state => ({...state, loading: true}),
    [SET_CURRENTPAGE]: (state, action) => ({...state, currentPage: action.payload}),
    [GET_ALL_PRODUCTS]: (state, action) => ({...state, products: action.payload.tires, productsCount: action.payload.productsCount, loading: false}),
    [GET_PRODUCT]: (state, action) => ({...state, product: action.payload, loading: false}),
    DEFAULT: state => state
}

export const productsReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}