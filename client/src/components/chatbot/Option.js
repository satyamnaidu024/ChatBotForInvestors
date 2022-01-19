import React from 'react';

var Option = function(props){
    return(
<div style={{float:'left',paddingRight:30,width:170,height:50}}>
    <div className="card" style={{height:100}}>
        <div className="card-image" style={{height:80}}>
          <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue}/>
          <span className="card-title">{props.payload.fields.header.stringValue}</span>
        </div>
        <div className="card-action">
          <a href={props.payload.fields.link.stringValue} rel="noopener noreferrer">Click here for more info on {props.payload.fields.header.stringValue}</a>
        </div>
      </div>
</div>
);
};

export default Option;