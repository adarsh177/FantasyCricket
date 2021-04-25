import React from 'react';
import BackIc from '../../resources/back.png';
import Progress from '../Progress';
import './CreateTeam.css';
import SearchIc from '../../resources/ic_search.png';
import { withRouter } from 'react-router';
import PlayerSelectEntry from './Entries/PlayerSelectEntry';
import C_VC_SelectEntry from './Entries/C_VC_SelectEntry';

class CreateTeam extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="TeamMainContainer">
                <div className="HeaderSection">
                    <button className="BackBtn" onClick={() => this.backPressed()}><img src={BackIc} alt=""/> Back</button>
                    <div className="TeamContainer">
                        <img src="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" alt="" />
                        <div className="VirticalRule"></div>
                        <img src="https://static.toiimg.com/thumb/msid-67150433,width-1200,height-900,resizemode-4/.jpg" alt="" />
                    </div>
                    <Progress value={50} />
                    <p className="CreditLeft">Credit left: 502</p>
                </div>

                <div className="SearchBarDiv">
                    <img src={SearchIc} />
                    <input placeholder="Search Player here..." type="text" />
                </div>
                <div className="TableLegend">
                    <p className="name" style={{flex: 3}}>PLAYER</p>
                    <p className="name" style={{flex: 3}}>CREDITS</p>
                </div>

                <div className="MiddleSection">
                    <div className="ListWrapper">
                        <C_VC_SelectEntry playerName=" Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                        <C_VC_SelectEntry playerName="Adarsh Shrivastava" image="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" />
                    </div>
                </div>
                
                <button className="BottomActionBtn">
                    Next
                </button>
            </div>
        );
    }

    backPressed(){
        this.props.history.push('/Dashboard');
    }
}

export default withRouter(CreateTeam);
