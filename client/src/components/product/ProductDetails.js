import React,{Fragment,useEffect,useState} from 'react';
import MetaData from '../layout/MetaData'
import {useDispatch,useSelector} from 'react-redux'
import {getProductDetails,clearErrors} from '../../actions/productActions'
import {addItemToCart} from '../../actions/cartActions'


const ProductDetails = ({match}) => {
    const dispatch = useDispatch();
   
     const [quantity,setQuantity] = useState(1);
    const {error,product} = useSelector(state=>state.productDetails)


    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        if(error)
        {
            dispatch(clearErrors())
        }

    },[dispatch,error,match.params.id])

    const increaseQty = () =>{
        const count = document.querySelector('.count')
        if(count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber+1;
        setQuantity(qty);
    }

    const decreaseQty = () =>{
        const count = document.querySelector('.count')
        if(count.valueAsNumber <=1) return;

        const qty = count.valueAsNumber-1;
        setQuantity(qty);
        
    }

    const addToCart = () =>{
        dispatch(addItemToCart(match.params.id,quantity));
        alert('Item addes to Cart')
    }
    return(
        <Fragment>
            <MetaData title={product.name}/>
        <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image" style={{marginTop:"30px"}}>
            <img src={product.imageurl} alt="sdf"  height="500" width="500"/>
        </div>

        <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product Id - {product._id}</p>

            <hr/>

            <div className="rating-outer">
                <div className="rating-inner"></div>
            </div>
         <h3>   <span id="no_of_reviews">{product.category}</span> </h3>

            <hr/>
            <p id="product_price">{product.category==='Stocks' ? `Price is Rs. ${product.price}/stock` : 'You can invest through SIP or a One time Lump Sum Amount'} </p>

           
            <div className="stockCounter d-inline">{product.category==='Stocks' ? <div>
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div> : <p></p>}
            </div>
             <button style={{marginTop:'20px'}}type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock===0} onClick={addToCart}>Add to Cart</button>

            <hr/>

          <div>{product.category==='Stocks' ? <p>Status: <span id="stock_status" className={product.stock>0 ? 'greenColor':'redColor'}>{product.stock>0 ?'In Stock' : 'Out of Stock'}</span></p> :
                <p></p>}
          </div>
            <hr/>

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>  <hr/>
            
            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                        Submit Your Review
            </button>
            
            <div className="row mt-2 mb-5">
                <div className="rating w-50">

                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <ul className="stars" >
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                    </ul>

                                    <textarea name="review" id="review" className="form-control mt-3">

                                    </textarea>

                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                    
        </div>
        </div>
    </div>
    </Fragment>
    )
   
}


export default ProductDetails