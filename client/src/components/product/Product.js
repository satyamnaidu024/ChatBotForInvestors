import React from 'react';
import {Link} from 'react-router-dom'

const Product = ({product}) =>{
    return(
        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
        <div className="card p-3 rounded">
          <img alt=""
            className="card-img-top mx-auto"
            src={product.imageurl}/>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </h5>
              <span>{product.category}</span>
            </div>
            <p className="card-text">{product.category==='Stocks' ? `Price is Rs. ${product.price}/stock` : 'You can invest through SIP or a One time Lump Sum Amount'} </p>

            <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
          </div>
        </div>
     
    )
   
}


export default Product