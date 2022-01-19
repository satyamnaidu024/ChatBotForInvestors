import React from 'react';

const Faq = ({faq}) =>{
    return(
        <div className="col-sm-12 col-md-6 col-lg-12 my-3">
        <div className="card p-3 rounded">
         
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <p>{faq.question}</p>
            </h5>
            <h5 className="card-title">
              <p>{faq.answer}</p>
            </h5>
            </div>
             </div>
        </div>
     
    )
   
}


export default Faq