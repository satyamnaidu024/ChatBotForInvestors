import React from 'react';

function Message(props) {
    return (

        <div className="col col-sm-12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.speaks==='bot' &&
                    <div className="col s2">
                        <img src="https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots.jpg" className="btn-floating btn-large waves-effect waves-light" alt="https://bitsofco.de/content/images/2018/12/broken-1.png"/>
                    </div>
                    }
                    <div className="col s10">
                      <span className="black-text">
                        {props.text}
                      </span>
                    </div>
                    {props.speaks==='me' &&
                    <div className="col s2">
                        <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg" className="btn-floating btn-large waves-effect waves-light" style={{float:'right'}} alt ="https://bitsofco.de/content/images/2018/12/broken-1.png"/>
                    </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Message;