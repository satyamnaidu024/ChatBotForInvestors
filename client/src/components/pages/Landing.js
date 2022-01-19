import React,{Fragment, useEffect,useState} from 'react';
import MetaData from '../layout/MetaData'
import {useDispatch,useSelector} from 'react-redux';
import {getProducts} from '../../actions/productActions'
import Product from '../product/Product'
import Pagination from 'react-js-pagination'
const Landing = ()=>{
  const [currentPage,setCurrentPage] = useState(1)
  const dispatch =useDispatch();
  const  {products,productsCount,resPerPage} = useSelector(state =>state.products)
  const [category,setCategory] =useState('')

  const categories = [
    'Stocks',
    'Mutual Funds'
  ]
  useEffect(()=>{
    dispatch(getProducts(currentPage,category));
  },[dispatch,currentPage,category])

  function setCurrentPageNo(pageNumber)
  {
    setCurrentPage(pageNumber)
  }
  return(
    <Fragment>
      <MetaData title={'Home Page'}/>
      <h1 id="products_heading">All Products</h1>
      <span>
      <hr className="my-5"/>
      <div className="mt-5">
        <h4 className="mb-3">
          Categories
        </h4>
        <div className="pl-0">
          {categories.map(category=>(
            <button class="btnn third"
               style={{backgroundColor:'black',display: 'inline',width:'25%',height:'30%',marginRight:'2%'
                      }}
                    key={category}
                    onClick={() =>setCategory(category)}  >
                      {category}
                    </button>
          ))
          }

        </div>
      </div>
      </span>
    <section id="products" className="container mt-5">
    <div className="row">
     
      {products && products.map(product => (
        <Product key={product._id} product={product} />
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


export default Landing