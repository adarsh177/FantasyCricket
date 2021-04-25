import firebase from 'firebase';

export async function GetDownloadLink(bucketLocation){
    return await firebase.storage().ref(bucketLocation).getDownloadURL();
}

export async function GetMatchJSON(matchId){
    var matchData = localStorage.getItem(matchId);
    if(matchData == null){
        console.log('Downloading data');
        var downloadLink = await GetDownloadLink(`/Matches/${matchId}.json`);
        console.log('Url', downloadLink);
        matchData = (await fetch(downloadLink, {
            method: "GET"
        })).json();

        // saving offline
        localStorage.setItem(matchId, JSON.stringify(matchData));
    }else{
        console.log('loading saved data');
        matchData = JSON.parse(matchData);
        console.log(matchData);
    }

    return matchData;
}