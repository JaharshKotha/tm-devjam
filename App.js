import React, { Component } from 'react';
import './App.css';
import ApolloService from '../Components/ApolloService';
import Datepicker from '../Components/Datepicker';
import ChironService from '../Components/ChironService';
import GatekeeperService from '../Components/GatekeeperService';
import RaptorService from '../Components/RaptorService';
import RoadrunnerService from '../Components/RoadrunnerService';
import VeyronService from '../Components/VeyronService';
import VenueContainer from '../containers/VenueContainer';
import VenuesContainer from '../containers/VenuesContainer';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class App extends Component {

    componentDidMount() {
         document.body.className ='tm360 oc-page'; 
    }

    renderContent() {

    }

    render() {
          const divStyle = {
  color: 'blue',
  padding: '0px 0px 0px 300px' 

  
};

        return (
          <BrowserRouter>
            <div className="tm-content-main scrollable">
                 <div className="oc-section-header">
                     
                         <div className="oc-section-header tab-own" style={divStyle}>
                              <ApolloService />
                              <RaptorService /> 
                              <ChironService />
                              <VeyronService />
                              <GatekeeperService />
                              <RoadrunnerService />
                         </div>
                   
                  </div>
                  <Datepicker dispatch={this.props.dispatch} />
              <div className="presenceTitle"> </div>
             <Switch>
                <Route exact path="/"  component={VenuesContainer}/>
                <Route exact path="/venueDetails/:venueName" component={VenueContainer} />
            </Switch>

                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = state => {
const {dispatch,date} = state
return { dispatch,
date} 
}
export default connect(mapStateToProps)(App);

