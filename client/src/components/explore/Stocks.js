import React,{Fragment, useEffect,useState} from 'react';
import MetaData from '../layout/MetaData'
import {useDispatch,useSelector} from 'react-redux';
import {getProducts} from '../../actions/productActions'
import Product from '../product/Product'
import Pagination from 'react-js-pagination'
const Stocks = ()=>{
  const [currentPage,setCurrentPage] = useState(1)
  const dispatch =useDispatch();
  const  {products,productsCount,resPerPage} = useSelector(state =>state.products)
  const [category] =useState('')

  
  useEffect(()=>{
    dispatch(getProducts(currentPage,category));
  },[dispatch,currentPage,category])

  function setCurrentPageNo(pageNumber)
  {
    setCurrentPage(pageNumber)
  }
  return(
    <Fragment>
      <MetaData title={'Stocks Page'}/>
      <h1 id="products_heading">All Stocks</h1>
    <section id="products" className="container mt-5">
    <div className="row">
     
      {products && products.map(product => (
         product.category==='Stocks' && <Product key={product._id} product={product}/>
      
      ))}
      
      
    </div>
  </section>
  <div className="d-flex justify-content-center mt-5">
    <Pagination 
        activePage={currentPage}
        itemsCountPerPage={resPerPage}
        totalItemsCount={productsCount}
        onChange={setCurrentPageNo}
        nextPageText={'Next'}
        prevPageText={'Prev'}
        firstPageText={'First'}
        lastPageText={'Last'}
        itemClass=  "page-item"
        linkClass="page-link"
        />
  </div>
  </Fragment>
    ) 
}


export default Stocks