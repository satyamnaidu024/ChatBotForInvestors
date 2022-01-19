import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
// import ItemList from './ItemList';
import MetaData from '../layout/MetaData'

function Explore(){
    return (
        <Fragment>
            <MetaData title={'Explore Page'}/>

<div style={{marginTop:'2%'}}>
<Link className="waves-effect waves-light btnn third"  style={{backgroundColor:'black',display: 'inline',width:'25%',height:'10%',marginRight:'2%',marginTop:'20%'
                      }} to={'/explore/stocks'}>Stocks</Link>
<Link className="waves-effect waves-light btnn third"  style={{backgroundColor:'black',display: 'inline',width:'25%',height:'10%',marginRight:'2%'
                      }} to={'/explore/mutual-funds'}>Mutual Funds</Link>

</div>   
</Fragment>
    )
        }

export default Explore;