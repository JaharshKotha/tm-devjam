'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.20efbf6d-1f33-4f5d-bd3e-acf7062c5cb0";

var SKILL_NAME = "Second Brain";
var GET_FACT_MESSAGE = "";
var HELP_REPROMPT = "I'm your AI";
var STOP_MESSAGE = "Goodbye!";
var new_session = "t";

var states = {
    STARTMODE: '_STARTMODE',                // Prompt the user to start or restart the game.
    QMODE: '_QMODE', 
    FMODE: '_FMODE', // Alexa is asking user the questions.
    DESCRIPTIONMODE: '_DESCRIPTIONMODE'     // Alexa is describing the final choice and prompting to start again or quit
};


//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================


//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers,descriptionHandlers,finishHandlers);
    alexa.execute();
};

var finishHandlers = Alexa.CreateStateHandler(states.STARTMODE, {

    'Unhandled': function () {
        this.handler.state = null;
        var movieSlot = this.event.request.intent.slots.logical_unit_name.value;
       this.emit(':ask'," the same"+movieSlot);
    }
});


var descriptionHandlers = Alexa.CreateStateHandler(states.QMODE, {
    'solve': function () {
            this.handler.state = null;
            this.emit(':ask',"What is your question","I didn't get ,could you repeat");
    },
    'Unhandled': function () {
        this.handler.state = null;
        var movieSlot = this.event.request.intent.slots.logical_unit_name.value;
       this.emit(':ask',"I can keep asking the same"+movieSlot);
       
    }
});

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'What would you like to do?', 'Please say that again?');
        //this.emit('setAlarm');
    },
    'setAlarm': function () {
        var randomFact = "Good night  , Lets wake up back at ";
       
       var date = new Date();
       date.setHours(date.getHours() + 1)
       var d = date.toString();
       var res = d.split(" ");
       var tem = res[4].toString();
       var f_res = tem.split(":");
       randomFact = randomFact + f_res[0].toString()+":"+f_res[1].toString()+"pm";
       
     


        this.emit(':tellWithCard',  randomFact)
    },
    'vegan_chef': function () {
        var facts = [
    "Vegetable Biriyani",
    "Vegetable Pulav",
    "Brocolli and tomato salad",
    
    ];
    
    var factArr = facts;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tell', speechOutput, SKILL_NAME, randomFact)

    },
    
    'non_vegan_chef': function () {
        var facts = [
    "Grilled Chicken Escalope with Fresh Salsai",
    "Mutton Korma",
    "Pina Colada Pork Ribs",
    
    ];
    
    var factArr = facts;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tell', speechOutput, SKILL_NAME, randomFact)

    },
    
    'assignment': function () {
        console.log("I came in !");
        var u_id="";var cid="";var d_date="";
        var AWS = require('aws-sdk');
        var dynamodb = new AWS.DynamoDB();
         var tableName = "Schedule";
    dynamodb.scan({
        TableName : tableName,
        Limit : 10
    }, function(err, data) {
        console.log("Check for this");
        if (err) {
            this.emit(':tell',"Error reading the database");
        }
        for (var i in data.Items) {
             console.log("THis is data"+data);
            if(data.Items[i].userId == "AZ1343")
            {
                u_id = data.Items[i].userId;
                cid = data.Items[i].courseId;
                d_date = data.Items[i].dueDate;
                this.emit(':tell',"success database");
            }
           
        }
    });

        this.emit(':tell',"You have your next assignment on pac man project for CSE542  due september 13");
        
    },
    'randomFact': function () {
        var facts = [
    "There are over 300 palm trees on campus",
    "The pope visited campus back in 1987",
    "ASU has changed its name five times",
    "Some ASU buildings may be haunted",
    "The first ever class on campus was composed of just 33 people",
    "ASU and UA annually compete for the oldest trophy in NCAA history",
    "Sun Devil Stadium is the only football stadium between two mountains",
    "Cows once moo-ved about campus"
   
    ];
    
    var factArr = facts;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tell', speechOutput, SKILL_NAME, randomFact)

        
        
    },
    'solve': function () {
            this.handler.state = states.QMODE;
            this.emit(':ask',"What is your question","I didn't get ,could you repeat");
    },
    'AMAZON.HelpIntent': function () {
       
        this.emit(':ask', "Second brain", "I'm still in the developmental stages , contact the admin");
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'Unhandled': function () {
        
       this.emit(':tell',"Sorry , I didn't get you");
    }
};

