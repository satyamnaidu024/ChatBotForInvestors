import {ALL_FAQS_REQUEST,
    ALL_FAQS_SUCCESS,
    ALL_FAQS_FAIL,
    CLEAR_ERRORS} from '../constants/faqConstants'
export const faqsReducer = (state ={faqs:[]},action)=>{
         switch(action.type){
             case ALL_FAQS_REQUEST:
                 return {
                     loading:true,
                     faqs:[]
                 }
              case ALL_FAQS_SUCCESS:
                 return {
                     loading:true,
                     faqs:action.payload.faqs,
                     faqsCount:action.payload.faqsCount,
                     resPerPage:action.payload.resPerPage
                     
                 }
            case ALL_FAQS_FAIL:
                    return {
                        loading:false,
                        error:action.payload
                    }
            case CLEAR_ERRORS:
                        return {
                            ...state,
                        error:null
                        }       

             default:
                 return state;
         }
}
