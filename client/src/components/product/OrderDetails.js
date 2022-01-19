import React from 'react';

const OrderDetails = ({order}) =>{
    return(
        <div className="col-sm-12 col-md-6 col-lg-12 my-3">
        <div className="card p-3 rounded">
         
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <p>Order ID-{order._id}</p>
            </h5>
            <h5 className="card-title">
        
            {order.orderItems.map(orderItem =>(
            <div>
              <p>Product ID- {orderItem.product}</p>
              <p>Product name- {orderItem.name}</p>
              <p>Product Quantity- {orderItem.quantity}</p>
              <p>Product Image- <img alt="Not Found" src={orderItem.imageurl} /></p>
              </div>  
            ))}
            </h5>
            <h5 className="card-title">
              <p>Ordered by user with Id- {order.user}</p>
            </h5>
            </div>
             </div>
        </div>
     
    )
   
}


export default OrderDetails