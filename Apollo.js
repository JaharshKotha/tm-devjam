import React, { Component } from 'react';
//import exec from 'exec';


class Apollo_Service extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            boxes : "10"
        };
    }

    componentWillMount() {


//var exec = require('exec');


// exec('aws ec2 --profile tm-prod-ReadOnly-Techops describe-instances --region us-east-1 --filters Name=tag:ProductCode,Values=PRD00000154 Name=tag:Environment,Values=prod1 Name=tag:Name,Values=PRD00000154.prod1.bb-veyron-asg-instance | grep -c InstanceId ',
//   function (error, stdout, stderr) {
   
//     // this.setState({
//     //     boxes: stdout
//     //   });
  
// });
    

    }

    render() {

        const divStyle = {
            padding: '0px 00px 0px 00px'


        };

        return (





            <div className="oc-section-header" >
                <div className="oc-section-header">Apollo</div>
                <div className="oc-section-header" style={divStyle}>BOXES: {this.state.boxes}/{this.state.boxes}<br /> another  </div>
            </div>





        );
    }
}

export default Apollo_Service;
