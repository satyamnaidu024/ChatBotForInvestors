import React, {useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getFaqs} from '../../actions/faqActions'
const Faq = () =>{

     const dispatch = useDispatch();  
     const  {faqs} = useSelector(state =>state.faqs)
  
    useEffect(()=>{
        dispatch(getFaqs());
      },[dispatch])
    

    return(

       
                     


<div className="container container-fluid">
    <span>
<a href="/faqs/stocks" class="btnn third" style={{backgroundColor:'black',display: 'inline',width:'25%',height:'30%',marginRight:'2%'
                    }}>Stocks FAQs </a>
<a href="/faqs/mf" class="btnn third" style={{backgroundColor:'black',display: 'inline',width:'25%',height:'30%',marginRight:'2%'
                    }}>Mutual Funds FAQs </a>
</span>
  <h1 id="faqs_heading" style={{marginTop:'10px'}}>All Faqs</h1>

    <section id="products" className="container mt-5">
     
          {faqs && faqs.map(faq =>(

  <div key={faq._id} className="col-sm-12 col-md-6 col-lg-12 my-3">
<div className="card p-3 rounded">
 
  <div className="card-body d-flex flex-column">
    <h5 className="card-title">
      Q.<p href=""
        >{faq.question}</p>
    </h5>
    <h5 className="card-title">
      Ans.<p href=""
        >{faq.answer}</p>
    </h5>
  </div>
</div>
</div>

          ))}
        

        
    
 
    </section>


</div>
    )
}

export default Faq