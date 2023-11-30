function selectRandomImage() {
    let teamNames = ["arsenal.png", "astonVilla.png", "bournemouth.png", "brentford.png", "brighton.png", "burnley.png", "chelsea.png", "crystalPalace.png", "everton.png", "fulham.png", "liverpool.png", "lutonTown.png", "manCity.png", "manU.png", "newcastle.png", "nottinghamForest.png", "sheffieldUnited.png", "tottenham.png", "westHam.png", "wolves.png"]
    let selectedTeams = [];
    for (let i = 1; i < 7; i++) {
      temp = Math.floor(Math.random() * teamNames.length);
      if (teamNames[temp] != "") {
        //document.getElementById(`team-logo${i}`).src = "images/logos/" + prem_teams[temp].image;
        selectedTeams[i-1] = teamNames[temp];
        teamNames[temp] = "";
      } else {
        i--;
      }
    }
    return selectedTeams;
  }

  module.exports = selectRandomImage;