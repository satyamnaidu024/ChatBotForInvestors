import React, { Component } from 'react';
import axios from 'axios/index';
import {withRouter} from 'react-router-dom';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';
import Option from './Option';
import QuickReplies from './QuickReplies';
import {compose} from 'redux'
import {connect} from 'react-redux'

var cookies = new Cookies();

class Chatbot extends Component {
    messagesEnd;
    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
         this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.state = {
            messages: [],
            showBot:false,
            stockWelcomesent:false,
            mfWelcomesent:false,
        };
        if(cookies.get('userID')=== undefined)
        {
        cookies.set('userID',uuidv4(),{path:'/'});
    }
    console.log("Cookie User ID is- "+cookies.get('userID'));
}
    async df_text_query (queryText) {
        let says = {
            speaks: 'me',
            msg: {
                text : {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query',  {text:queryText,userID: cookies.get('userID')});
        for (let msg of res.data.fulfillmentMessages) {
            console.log(JSON.stringify(msg));
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]});
        }
    };
    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query',  {event:eventName,userID: cookies.get('userID')});
        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]});
        }
    };


    async custom_query (queryText) {
        let says = {
            speaks: 'bot',
            msg: {
                text : {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says]});
        //const res = await axios.post('/api/df_text_query',  {text:queryText,userID: cookies.get('userID')});
        // for (let msg of res.data.fulfillmentMessages) {
        //     console.log(JSON.stringify(msg));
        //     says = {
        //         speaks: 'bot',
        //         msg: msg
        //     }
        //      this.setState({ messages: [...this.state.messages, says]});
        // }
    };

     resolveAfterXSeconds(x){
        return new Promise(resolve =>{
            setTimeout(()=> {
            resolve(x);
        }, x*1000);  
        });
    }

    
 
    async componentDidMount() {

        if(window.location.pathname==='/'){
            await this.resolveAfterXSeconds(1);
            if(this.props.auth.isAuthenticated)
            {  
                this.custom_query('Hello '+this.props.auth.user.name);
                this.df_event_query('LOGIN_WELCOME_EVENT');
                this.setState({showBot:true})
            }
            else{
                console.log("this.props.auth.isAuthenticated="+this.props.auth.isAuthenticated);
          
                    this.df_event_query('welcome');
                    this.df_event_query('login');
                    this.setState({showBot:true})
            }
        }        
            
        else if(window.location.pathname==='/explore/stocks' && !this.state.stockWelcomesent){
            await this.resolveAfterXSeconds(1);
            this.df_event_query('WELCOME_STOCKS');
            this.setState({stockWelcomesent:true,showBot:true})
        }else if(window.location.pathname==='/explore/mutual-funds' && !this.state.mfWelcomesent){
            await this.resolveAfterXSeconds(1);
            this.df_event_query('WELCOME_MF');
            this.setState({mfWelcomesent:true,showBot:true})

        } 
        
        
        else if(this.props.history.location.pathname.startsWith('/product/')){
              
            await this.resolveAfterXSeconds(1);
           console.log("my order-" +this.props.myOrders.orders[0].orderItems[0].product)
this.props.myOrders.orders[0].orderItems[0].product===
           this.props.productDetails.product._id ?
           this.custom_query("You have already bought this product")
           : this.custom_query("You havent bought this product")
          
        

        this.custom_query('You are viewing the product '+this.props.productDetails.product.name+" which is of category "+this.props.productDetails.product.category);
        this.custom_query("Product ID is- "+this.props.productDetails.product._id);
        
        (this.props.productDetails.product.category==='Stocks') ?
        this.df_event_query('VIEW_FAQ_PRODUCT_STOCK')
      :  this.df_event_query('VIEW_FAQ_PRODUCT_MF');  
          
            this.setState({showBot:true})
        }

        this.props.history.listen(async() =>{
            console.log('listening');
            if(window.location.pathname==='/'){
                await this.resolveAfterXSeconds(1);
                if(this.props.auth.isAuthenticated)
                {   console.log("this.props.auth.isAuthenticated="+this.props.auth.isAuthenticated);
                  console.log("this.props.auth.user.name"+this.props.auth.user.name);
                    this.custom_query('Hello '+this.props.auth.user.name);
                    this.df_event_query('LOGIN_WELCOME_EVENT');
                    this.setState({showBot:true})
                }
                else{
                    console.log("this.props.auth.isAuthenticated="+this.props.auth.isAuthenticated);
              
                        this.df_event_query('welcome');
                        this.df_event_query('login');
                        this.setState({showBot:true})
                }
            }      
            else if (this.props.history.location.pathname==='/explore/stocks' && !this.state.stockWelcomesent)
            {
                await this.resolveAfterXSeconds(1);
                this.df_event_query('WELCOME_STOCKS');
            this.setState({stockWelcomesent:true,showBot:true})
            }else if(this.props.history.location.pathname==='/explore/mutual-funds' && !this.state.mfWelcomesent)
            {
                await this.resolveAfterXSeconds(1);
                this.df_event_query('WELCOME_MF');
            this.setState({mfWelcomesent:true,showBot:true})
            }
            else if(this.props.history.location.pathname.startsWith('/product/'))
            { 
                await this.resolveAfterXSeconds(1);
                console.log("my order-" +this.props.myOrders.orders[0].orderItems[0].product)
                this.props.myOrders.orders[0].orderItems[0].product===
                    this.props.productDetails.product._id ?
                    this.custom_query("You have already bought this product")
                    : this.custom_query("You havent bought this product")
                   
            
         
                this.custom_query('You are viewing the product '+this.props.productDetails.product.name+" which is of category "+this.props.productDetails.product.category);
                this.custom_query("Product ID is- "+this.props.productDetails.product._id); 
        
                (this.props.productDetails.product.category==='Stocks') ?
                    this.df_event_query('VIEW_FAQ_PRODUCT_STOCK')
                  :  this.df_event_query('VIEW_FAQ_PRODUCT_MF');  
                      
              
                this.setState({showBot:true})
            }
    });
}

    componentDidUpdate(){
        this.messagesEnd.scrollIntoView({behaviour: "smooth"});

    }

    show(event) {
        event.preventDefault();
        event.stopPropagation();
       
        this.setState({showBot: true});
    }

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: false});
    }

    _handleQuickReplyPayload(event,payload,text){
        event.preventDefault();
        event.stopPropagation();
        switch (payload) {
            case 'recommend_stocks_yes':
                this.df_event_query('SHOW_STOCKS_RECOMMENDATIONS');
                break;
            case 'recommend_mf_yes':
                    this.df_event_query('SHOW_MF_RECOMMENDATIONS');
                    break;
            case 'invest_yes':
               this.df_event_query('INVEST_YES');
               break;

            case 'invest_no':
                this.df_event_query('INVEST_NO');  
                break;  
            case 'apply_yes':
                    this.df_event_query('APPLY_KYC_YES');
                    break;   
            case 'apply_no':
                    this.df_event_query('APPLY_KYC_NO');
                    break;                                 
            default:
                this.df_text_query(text);
                break;
        }    
    }

  

    renderOptions(options){
        return options.map((option,i) => <Option key ={i} payload={option.structValue}/>);
    }

    renderOneMessage(message,i){
        if(message.msg && message.msg.text && message.msg.text.text){
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        }
        else if(message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.options){
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow:'hidden'}}> 
                    <div className="col s2">
                    <img src="https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots.jpg" className="btn-floating btn-large waves-effect waves-light" alt="https://bitsofco.de/content/images/2018/12/broken-1.png"/>
                    
                    </div>
                    <div style={{overflow:'auto',overflowY:'scroll'}}>
                        <div style={{height:300,width:message.msg.payload.fields.options.listValue.values.length * 270}}>
                            {this.renderOptions(message.msg.payload.fields.options.listValue.values)}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        }else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies) {
             
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
        }
    }
    

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message,i);
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        if(e.key==='Enter'){
            this.df_text_query(e.target.value);
            e.target.value='';
        }
    }
 
    render() {
        
       
        if(this.state.showBot){
        return (
              
            <div className="popup" style={{height: 500, width: 400, position: 'absolute',bottom: 0,right:0,border: '2px solid lightgrey'}}>
                <nav style={{backgroundColor:'#333a41'}} >
                    <div className="nav-wrapper">
                    <h3 className="brand-logo" style={{paddingLeft:'20%',paddingTop:'1%',marginBottom:'10%'}}><a href="#/" id="chatbothyperlink2" onClick={this.hide}>Investor Chatbot</a></h3>
                   
                    </div>
                </nav>
                <div id="chatbot" style={{height: 388, width: '100%', overflow: 'auto',backgroundColor:'lightgrey'}}>
                    {this.renderMessages(this.state.messages)}
                    <div ref = {(el) => {this.messagesEnd = el;}}
                    style={{float:'left',clear:'both'}}>

                    </div>
                </div>
                <div className="col s12" style={{backgroundColor:'white'}}>
                <input style={{backgroundColor:'white'}} placeholder="type a message" type="text" onKeyPress={this._handleInputKeyPress}/>
                </div>
            </div>
        );
    } else
    {
        return (

            <div className="popup" style={{height: 40, width: 400, position: 'absolute',bottom: 25,right:0,border: '2px solid lightgrey'}}>
                <nav style={{backgroundColor:'#333a41'}} >
                    <div className="nav-wrapper">
                    <h3 className="brand-logo" style={{paddingLeft:'20%',paddingBottom:'4px',marginBottom:'100px'}}><a href="#/" id="chatbothyperlink" onClick={this.show}>Investor Chatbot</a></h3>
                    
                
                   
                    </div>
                </nav>
                <div ref={(el) => { this.messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                    </div>
                
                </div>
            );
    }
    }
}



function mapStateToProps(state){
    return {
        auth:state.auth,
        productDetails:state.productDetails,
        myOrders:state.myOrders
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
  )(Chatbot);
