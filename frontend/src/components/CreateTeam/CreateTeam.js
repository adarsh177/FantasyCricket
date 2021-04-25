import React from 'react';
import BackIc from '../../resources/back.png';
import Progress from '../Progress';
import './CreateTeam.css';
import SearchIc from '../../resources/ic_search.png';
import { withRouter } from 'react-router';
import PlayerSelectEntry from './Entries/PlayerSelectEntry';
import C_VC_SelectEntry from './Entries/C_VC_SelectEntry';
import { connect } from 'react-redux';
import { GetMatchJSON } from '../../utils/UtilFunctions';
import MatchManager from '../../utils/MatchManager';
import firebase from 'firebase';

class CreateTeam extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            players: {},
            t1Image: '',
            t2Image: '',
            selectedPlayers: {},
            capt: "",
            viceCapt: "",
            totalCredit: 0,
            teamError: false,
            mode: "playerSelect", // roleSelect
        }
    }

    componentDidMount(){
        if(Object.keys(this.state.players).length === 0)
            this.loadData();
    }

    async loadData(){
        if(this.props.currentMatchIdSelected === null){
            this.props.history.push('/');
            return;
        }

        var matchData = await GetMatchJSON(this.props.currentMatchIdSelected);
        this.matchManager = new MatchManager(matchData);

        // check if players are all 22
        if(Object.keys(this.matchManager.Players).length < 22){
            Object.keys(this.props.configData.availablePlayers).forEach(plr => {
                if(!Object.keys(this.matchManager.Players).includes(plr) && Object.keys(this.matchManager.Players).length < 22){
                    this.matchManager.Players[plr] = (Math.floor(Math.random() * 10) < 5) ? this.matchManager.firstTeam : this.matchManager.secondTeam;
                }
            });
        }

        this.setState({
            t1Image: this.props.configData.imageUrls[this.matchManager.firstTeam],
            t2Image: this.props.configData.imageUrls[this.matchManager.secondTeam],
        });

        this.sortByCredits(this.matchManager.Players);
        
        console.log('Players', this.matchManager.Players);
    }

    render(){
        return(
            <div className="TeamMainContainer">
                <div className="HeaderSection">
                    <button className="BackBtn" onClick={() => this.backPressed()}><img src={BackIc} alt=""/> Back</button>
                    <div className="TeamContainer">
                        <img src={this.state.t1Image} alt="" />
                        <div className="VirticalRule"></div>
                        <img src={this.state.t2Image} alt="" />
                    </div>
                    <Progress value={this.state.totalCredit} />
                    <p className="CreditLeft" style={{marginBottom: "0", marginTop: "5px"}}>Credit left: {Math.max(0, 100 - this.state.totalCredit)}</p>
                    <p className="CreditLeft" style={{marginTop: "5px"}}>Players Selected: {this.getSelectedPlayerCount()}</p>
                </div>

                {/* <div className="SearchBarDiv">
                    <img src={SearchIc} />
                    <input placeholder="Search Player here..." type="text" />
                </div> */}

                <div className="TableLegend">
                    <p className="name" style={{flex: 3}}>PLAYER</p>
                    {this.state.mode === "playerSelect" ? <p onClick={() => this.sortByCredits()} className="name" style={{flex: 3}}>CREDITS</p>: null}
                </div>

                <div className="MiddleSection">
                    <div className="ListWrapper">
                        {this.state.mode === "playerSelect" ? 
                            this.getUiOfPlayerSelectMode()
                            :
                            this.getUiOfCaptSelectMode()
                        }
                    </div>
                </div>

                {(this.state.mode === "playerSelect" && this.state.teamError) ? 
                <p className="TeamError">
                    Please Select exact 11 players with credit sum equal to or under 100
                </p>: null}

                {(this.state.mode !== "playerSelect" && this.state.teamError) ? 
                <p className="TeamError">
                    Please select your captain and Vice captain
                </p>: null}
                
                <button className="BottomActionBtn" onClick={() => this.nextPressed()}>
                    Next
                </button>
            </div>
        );
    }

    getUiOfPlayerSelectMode(){
        return Object.keys(this.state.players).map(element => {
            return(
            <PlayerSelectEntry
                key={element}
                image={this.state.players[element] === this.matchManager.firstTeam ? this.state.t1Image : this.state.t2Image} 
                playerName={element}
                playerCredit={this.props.configData !== null ? this.props.configData.availablePlayers[element] : "-"}
                onPlayerSelected={(selected) => this.onPlayerSelected(element, selected)}
                isPlayerSelected={this.state.selectedPlayers[element]}
            />
            );
        });
    }

    getUiOfCaptSelectMode(){
        var selectedPlayers = [];
        Object.keys(this.state.selectedPlayers).forEach((plr) => {
            if(this.state.selectedPlayers[plr])
                selectedPlayers.push(plr);
        })

        return selectedPlayers.map(element => {
            return(
            <C_VC_SelectEntry
                key={element}
                image={this.state.players[element] === this.matchManager.firstTeam ? this.state.t1Image : this.state.t2Image} 
                playerName={element}
                onCaptainSelected={() => this.onCaptainSelected(element)}
                onViceCaptainSelected={() => this.onViceCaptainSelected(element)}
                captain={this.state.capt}
                viceCaptain={this.state.viceCapt}
            />
            );
        });
    }

    onCaptainSelected(playerName){
        if(this.state.capt === playerName){
            console.log('Set captain', "nill");
            this.setState({
                capt: ""
            });
        }else{
            if(this.state.viceCapt !== playerName){
                console.log('Set captain', playerName);
                this.setState({
                    capt: playerName
                });
            }
        }
    }

    onViceCaptainSelected(playerName){
        if(this.state.viceCapt === playerName){
            console.log('SET VC', "nill");
            this.setState({
                viceCapt: ""
            });
        }else{
            if(this.state.capt !== playerName){
                console.log('SET VC', playerName);
                this.setState({
                    viceCapt: playerName
                });
            }
        }
    }

    onPlayerSelected(playerName, isSelected){
        this.state.selectedPlayers[playerName] = isSelected;
        if(isSelected){
            this.state.totalCredit += this.props.configData.availablePlayers[playerName];
        }else{
            this.state.totalCredit -= this.props.configData.availablePlayers[playerName];
        }
        this.runCheck();
        this.forceUpdate();
    }

    sortByCredits(players){
        var playerArray = [];

        Object.keys(players).forEach(plr => {
            playerArray.push({
                name: plr,
                credit: this.props.configData.availablePlayers[plr]
            })
        });

        playerArray.sort((a, b) => b.credit - a.credit);

        var finalObj = {};
        playerArray.forEach((element) => {
            finalObj[element.name] = players[element.name];
        });

        this.state.players = finalObj;
        this.forceUpdate();
    }

    getSelectedPlayerCount(){
        var selected = 0;
        Object.keys(this.state.selectedPlayers).forEach(plr => {
            if(this.state.selectedPlayers[plr])
                selected++;
        });
        return selected;
    }

    runCheck(){
        if(this.state.totalCredit >= 100){
            this.state.teamError = true;
        }else if(this.getSelectedPlayerCount() > 11){
            this.state.teamError = true;
        }else{
            this.state.teamError = false;
        }
    }

    nextPressed(){
        if(!this.state.teamError){
            if(this.state.mode === "playerSelect"){
                this.setState({
                    mode: "roleSelect"
                });
            }else{
                if(this.state.capt !== '' && this.state.viceCapt !== ''){
                    this.saveTeamToServer();
                }else{
                    this.setState({
                        teamError: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            teamError: false,
                        }); 
                    }, 2500);
                }
            }
        }
    }

    saveTeamToServer(){
        // todo
        var players = [];

        Object.keys(this.state.selectedPlayers).forEach((plr) => {
            if(this.state.selectedPlayers[plr])
                players.push(plr);
        })

        var objToSave = {
            balls: this.matchManager.firstInningLength + this.matchManager.secondInningLength,
            id: this.props.currentMatchIdSelected,
            start: new Date().getTime(),
            team: {
                captain: this.state.capt,
                viceCaptain: this.state.viceCapt,
                players: players
            }
        };

         firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/matches/`)
            .push(objToSave, (err) => {
                if(err == null){
                    this.props.saveTeam(objToSave.team);
                    this.props.history.push('/Live');
                }else{
                    alert('Error Starting match!');
                    console.log('Error starting match', err);
                }
            })
    }

    backPressed(){
        if(this.state.mode === "playerSelect")
            this.props.history.push('/Dashboard');
        else{
            this.setState({
                mode: "playerSelect"
            });
        }
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveTeam: (team) => dispatch({type: "SAVE_TEAM", data: team}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(CreateTeam)
);
