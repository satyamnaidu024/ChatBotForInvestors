import React,{Fragment, useEffect} from 'react';
import MetaData from '../layout/MetaData'
import {useDispatch,useSelector} from 'react-redux';
import {getFaqs} from '../../actions/faqActions'
import Faq from '../product/Faq'
const StockFaq = ()=>{
  const dispatch =useDispatch();
  const  {faqs} = useSelector(state =>state.faqs)

  
  useEffect(()=>{
    dispatch(getFaqs());
  },[dispatch])

 
  return(
    <Fragment>
      <MetaData title={'Stocks Faqs Page'}/>
      <h1 id="products_heading">All Stocks Faq</h1>
    <section id="products" className="container mt-5">
    <div className="row">
     
      {faqs && faqs.map(faq => (
         faq.category==='Stocks' && <Faq key={faq._id} faq={faq}/>
      
      ))}
      
      
    </div>
  </section>
  <div className="d-flex justify-content-center mt-5">
   
  </div>
  </Fragment>
    ) 
}


export default StockFaq