import axios from 'axios';

import {ALL_FAQS_REQUEST,
    ALL_FAQS_SUCCESS,
    ALL_FAQS_FAIL,
    CLEAR_ERRORS} from '../constants/faqConstants'

export const getFaqs = (category) => async (dispatch) => {
    try {
        dispatch({type:ALL_FAQS_REQUEST})
  
        const {data} = await axios.get('/api/v1/faqs')

        dispatch({
            type:ALL_FAQS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_FAQS_FAIL,
            payload:error.response.data.message
        })
    }
}    

// export const getProductDetails = (id) => async (dispatch) => {
//     try {
//         dispatch({type:PRODUCT_DETAILS_REQUEST})
//         const {data} = await axios.get(`/api/v1/product/${id}`)
//         console.log(data);

//         dispatch({
//             type:PRODUCT_DETAILS_SUCCESS,
//             payload:data.product
//         })
//     } catch (error) {
//         dispatch({
//             type:PRODUCT_DETAILS_FAIL,
//             payload:error.response.data.message
//         })
//     }
// }  

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}