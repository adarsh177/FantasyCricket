

class MatchManager{

    EventData = {
        "caught": 25,
        "bowled": 33,
        "run out": 25,
        "lbw": 33,
        "retired hurt": 0,
        "stumped": 25,
        "caught and bowled": 40,
        "hit wicket": 25,
    }

    constructor(jsonData){
        if(typeof jsonData == "string")
            this.json = JSON.parse(jsonData);
        else
            this.json = jsonData;

        this.seeker = 0;
        this.totalLength = 0;
        this.firstInningLength = 0;
        this.secondInningLength = 0;
        this.firstTeam = "";
        this.secondTeam = "";
        this.loadConfig();
    }

    loadConfig(){
        this.firstInningLength = this.json.innings[0]['1st innings'].deliveries.length;
        this.secondInningLength = this.json.innings[1]['2nd innings'].deliveries.length;
        this.totalLength = this.firstInningLength + this.secondInningLength;
        this.firstTeam = this.json.innings[0]['1st innings'].team;
        this.secondTeam = this.json.innings[1]['2nd innings'].team;
    }

    getNext(){
        var ballData = {
            inning: 0,
            currentOver: 0,
            currentBall: 0,
            batsman: "",
            bowler: "",
            non_striker: "",
            runs: 0,
            wicket: {
                fielders: [
                    "DB Ravi Teja"
                ],
                kind: "",
                player_out: ""
            }
        };

        if(this.seeker < this.firstInningLength){
            // first inning
            var data = this.json.innings[0]['1st innings'].deliveries[this.seeker];
            var key = Object.keys(data)[0];

            ballData.inning = 1;
            ballData.currentOver = parseInt(key.split('.')[0], 10);
            ballData.currentBall = parseInt(key.split('.')[1], 10);
            ballData.batsman = data[key].batsman;
            ballData.bowler = data[key].bowler;
            ballData.non_striker = data[key].non_striker;
            ballData.runs = data[key].runs.total;
            ballData.wicket = data[key].wicket;

        }else if(this.seeker < (this.firstInningLength + this.secondInningLength)){
            // second inning
            var data = this.json.innings[1]['2nd innings'].deliveries[this.seeker];
            var key = Object.keys(data)[0];

            ballData.inning = 2;
            ballData.currentOver = parseInt(key.split('.')[0], 10);
            ballData.currentBall = parseInt(key.split('.')[1], 10);
            ballData.batsman = data[key].batsman;
            ballData.bowler = data[key].bowler;
            ballData.non_striker = data[key].non_striker;
            ballData.runs = data[key].runs.total;
            ballData.wicket = data[key].wicket;

        }else{
            // match over
            return null;
        }
        
        this.seeker++;
        return ballData;
    }

}

export default MatchManager;
