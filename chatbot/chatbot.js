'use strict'
var dialogflow = require('dialogflow');
var structjson = require('./structjson.js');
var config = require('../config/keys');
var mongoose = require("mongoose");

var projectID = config.googleProjectID;
var sessionID = config.dialogFlowSessionID;


var credentials = {
    client_email : config.googleClientEmail,
    private_key : config.googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({projectID : projectID,credentials : credentials});
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
 
const Contact = mongoose.model('contact');

module.exports = {
    textQuery: async function(text,userID, parameters = {}) {
        let sessionPath = sessionClient.sessionPath(projectID,sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    eventQuery: async function(event,userID, parameters = {}) {
        let sessionPath = sessionClient.sessionPath(projectID,sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters : structjson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;



    },




    handleAction: function(responses){
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'Topics-yes':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveContactInfo(queryResult.parameters.fields);
                }
                break;
        }

    

        return responses;
    },

    saveContactInfo: async function(fields){
        const contact = new Contact({
            name: fields.name.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        });
        try{
            let reg = await contact.save();
            console.log(reg);
        } catch (err){
            console.log(err);
        }
    }
}
