import {
    GET_ALL_PRODUCTS,
    GET_DISC_MAKERS,
    GET_PRODUCT,
    GET_TIRE_MAKERS,
    SET_CURRENTPAGE,
    SET_LOADING,
    SET_MODAL, SET_MODAL_LOADING, SET_MODAL_TYPE
} from "../types";

const initialState = {
    products: [],
    productsCount: 36,
    product: {},
    loading: false,
    currentPage: 1,
    perPage: 36,
    modalLoading: false,
    modal: false,
    modalId: null,
    modalType: 0,
    tireMakers: [],
    discMakers: []
}

const handlers = {
    [SET_LOADING]: state => ({...state, loading: true}),
    [SET_CURRENTPAGE]: (state, action) => ({...state, currentPage: action.payload}),
    [GET_ALL_PRODUCTS]: (state, action) => ({...state, products: action.payload.tires, productsCount: action.payload.productsCount, loading: false}),
    [GET_PRODUCT]: (state, action) => ({...state, product: action.payload, loading: false}),
    [GET_TIRE_MAKERS]: (state, action) => ({...state, tireMakers: action.payload}),
    [GET_DISC_MAKERS]: (state, action) => ({...state, discMakers: action.payload}),
    [SET_MODAL]: (state, action) => ({...state, modal: action.payload.bool, modalId: action.payload.id}),
    [SET_MODAL_LOADING]: state => ({...state, modalLoading: true}),
    [SET_MODAL_TYPE]: (state, action) => ({...state, modalType: action.payload}),
    DEFAULT: state => state
}

export const productsReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}