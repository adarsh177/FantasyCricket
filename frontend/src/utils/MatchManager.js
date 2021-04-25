class MatchManager{

    BowlerEventData = {
        "caught": 25,
        "bowled": 33,
        "run out": 25,
        "lbw": 33,
        "retired hurt": 0,
        "stumped": 25,
        "caught and bowled": 40,
        "hit wicket": 25,
    };

    PlayerScores= {};

    Players = {}; //playername: teamname

    Outcome = {
        team: "",
        desc: "",
    };

    constructor(jsonData){
        if(typeof jsonData == "string")
            this.json = JSON.parse(jsonData);
        else
            this.json = jsonData;

            console.log("Json got", this.json);

        this.seeker = 0;
        this.totalLength = 0;
        this.firstInningLength = 0;
        this.secondInningLength = 0;
        this.firstTeam = "";
        this.secondTeam = "";
        this.totalRuns = 0;
        this.totalWickets = 0;
        this.totalPoints = 0;
        this.loadConfig();
    }

    loadConfig(){
        this.firstInningLength = this.json.innings[0]['1st innings'].deliveries.length;
        this.secondInningLength = this.json.innings[1]['2nd innings'].deliveries.length;
        this.totalLength = this.firstInningLength + this.secondInningLength;
        this.firstTeam = this.json.innings[0]['1st innings'].team;
        this.secondTeam = this.json.innings[1]['2nd innings'].team;

        if(this.json.info.outcome.by.runs && this.json.info.outcome.by.wickets){
            this.Outcome.desc = `won by ${this.json.info.outcome.by.wickets} (${this.json.info.outcome.by.runs} runs)`
        }else if(this.json.info.outcome.by.runs){
            this.Outcome.desc = `won by ${this.json.info.outcome.by.runs} runs`;
        }else{
            this.Outcome.desc = `won by ${this.json.info.outcome.by.wickets} wickets`;
        }
        this.Outcome.team = this.json.info.outcome.winner;

        this.loadPlayers();
    }

    loadPlayers(){
        this.json.innings[0]['1st innings'].deliveries.forEach(element => {
            var key = Object.keys(element)[0];
            var batsman = element[key].batsman;
            var bowler = element[key].bowler;
            var non_striker  = element[key].non_striker;

            if(this.Players[batsman] === undefined)
                this.Players[batsman] = this.firstTeam;
            
            if(this.Players[non_striker] === undefined)
                this.Players[non_striker] = this.firstTeam;
            
            if(this.Players[bowler] === undefined)
                this.Players[bowler] = this.secondTeam;
        });
    }

    getNext(){
        var ballData = {
            inning: 0,
            currentOver: 0,
            currentBall: 0,
            raw: {}
        };

        if(this.seeker < this.firstInningLength){
            // first inning
            var data = this.json.innings[0]['1st innings'].deliveries[this.seeker];
            if(data == null) return null;
            var key = Object.keys(data)[0];

            ballData.inning = 1;
            ballData.currentOver = parseInt(key.split('.')[0], 10);
            ballData.currentBall = parseInt(key.split('.')[1], 10);
            ballData.raw = data[key];

            // adding player scores
            if(data[key].runs.total > 0){
                if(!Object.keys(this.PlayerScores).includes(data[key].batsman)){
                    this.PlayerScores[data[key].batsman] = 0;
                }
                this.PlayerScores[data[key].batsman] += data[key].runs.total;
            }

            //incrementing runs
            this.totalRuns += data[key].runs.total;

            // imcr... wickets
            if(data[key].wicket){
                this.totalWickets += 1;
            }

        }else if(this.seeker < (this.firstInningLength + this.secondInningLength)){
            // second inning
            var data = this.json.innings[1]['2nd innings'].deliveries[this.seeker];
            if(data == null) return null;
            var key = Object.keys(data)[0];

            ballData.inning = 2;
            ballData.currentOver = parseInt(key.split('.')[0], 10);
            ballData.currentBall = parseInt(key.split('.')[1], 10);
            ballData.raw = data[key];

            // adding player scores
            if(data[key].runs.total > 0){
                if(!Object.keys(this.PlayerScores).includes(data[key].batsman)){
                    this.PlayerScores[data[key].batsman] = 0;
                }
                this.PlayerScores[data[key].batsman] += data[key].runs.total;
            }

            //incrementing runs
            this.totalRuns += data[key].runs.total;

            // imcr... wickets
            if(data[key].wicket){
                this.totalWickets += 1;
            }
        }else{
            // match over
            return null;
        }
        
        this.seeker++;
        return ballData;
    }

}

export default MatchManager;
