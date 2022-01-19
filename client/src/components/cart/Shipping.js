//not fully made at the moment
import React,{Fragment,useState} from 'react';

import MetaData from '../layout/MetaData'

import {useDispatch,useSelector} from 'react-redux'
import {saveShippingInfo} from '../../actions/cartActions'

function Shipping(){
    const {shippingInfo} = useSelector(state=>state.cart)

    const {address,setAddress} = useState(shippingInfo.address)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({address}))
        // history.pushState('/confirm')
    }

    return (
        <Fragment>
            <MetaData title={'Shipping Info'}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                required
                            />
                        </div>


                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
        
</Fragment>
    )
        }

export default Shipping;