import './LiveScreen.css';
import React from 'react';
import IcBat from '../../resources/ic_bat.png';
import IcBall from '../../resources/ic_ball.svg';
import LiveEventEntry from './LiveEventEntry';
import IcUp from '../../resources/ic_up.svg';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class LiveScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showUpBtn: false,
        }

        if(!this.props.startedFromStart){
            this.props.history.push('/');
            console.log('redirecting to home');
        }
    }

    ScrollToTop(){
        window.scrollTo(0, 0);
    }

    componentDidMount(){
        window.addEventListener('scroll', (ev) => {
            this.setState({
                showUpBtn: window.scrollY > 200,
            });
        });
    }

    render(){
        return(
            <div id="LiveMainContainerId" className="LiveMainContainer">
                <div className="UpperPart">
                    <div className="TeamDetailsContainer">
                        <img src={IcBall} className="BatBall" alt="" />
                        <img src="https://static.toiimg.com/thumb/msid-67150433,width-1200,height-900,resizemode-4/.jpg" className="TeamImage" alt="" />
                        <div className="virticalRule" />
                        <img src="https://static.toiimg.com/thumb/msid-67150433,width-1200,height-900,resizemode-4/.jpg" className="TeamImage" alt="" />
                        <img src={IcBat} className="BatBall" alt="" />
                    </div>

                    <div className="TeamDetailsContainer" style={{marginTop: "25px"}}>
                        <div className="VerticalDetail">
                            <h1>2</h1>
                            <p>WICKETS</p>
                        </div>

                        <div className="VerticalDetail">
                            <h1>300</h1>
                            <p>POINTS</p>
                        </div>

                        <div className="VerticalDetail">
                            <h1>250</h1>
                            <p>RUNS</p>
                        </div>
                    </div>
                    
                    <br /><br />

                    <p className="SubDetails">1st Inning: 2 overs, 3 balls</p>
                    <p className="SubDetails">(S)Virat KohlI, (NS) David Warner, (B) Alzarri Joseph</p>

                    <a href="#" className="BtnFastForward">Fast forward to end</a>
                    
                    <p className="LastUpdated">Last Updated: {new Date().toLocaleTimeString()}</p>
                </div>

                <div className="LiveTableLegend">
                    <p style={{flex: 1, margin: "10px"}}>R</p>
                    <p style={{flex: 1, margin: "10px"}}>W</p>
                    <p style={{flex: 6, margin: "10px", textAlign: "start"}}>DETAILS</p>
                    <p style={{flex: 2, margin: "10px"}}>POINT</p>
                </div>

                <div className="EventListWrapper">
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                    <LiveEventEntry runs={6} wickets={0} details="Virat K hits a 6. Ball player" points={6} />
                </div>

                {this.state.showUpBtn ? 
                <img src={IcUp} className="JumpUpBtn" onClick={() => this.ScrollToTop()} />
                : null
                }
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(LiveScreen)
);
