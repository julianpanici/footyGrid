const prem_teams = [
  {
    "id": "153995",
    "image": "arsenal.png"
  },
  {
    "id": "164959",
    "image": "astonVilla.png"
  },
  {
    "id": "159149",
    "image": "bournemouth.png"
  },
  {
    "id": "172049",
    "image": "brentford.png"
  },
  {
    "id": "172401",
    "image": "brighton.png"
  },
  {
    "id": "166449",
    "image": "burnley.png"
  },
  {
    "id": "172343",
    "image": "chelsea.png"
  },
  {
    "id": "158744",
    "image": "crystalPalace.png"
  },
  {
    "id": "172780",
    "image": "everton.png"
  },
  {
    "id": "176928",
    "image": "fulham.png"
  },
  {
    "id": "164575",
    "image": "liverpool.png"
  },
  {
    "id": "174195",
    "image": "lutonTown.png"
  },
  {
    "id": "170087",
    "image": "manCity.png"
  },
  {
    "id": "154064",
    "image": "manU.png"
  },
  {
    "id": "169487",
    "image": "newcastle.png"
  },
  {
    "id": "174440",
    "image": "nottinghamForest.png"
  },
  {
    "id": "154536",
    "image": "sheffieldUnited.png"
  },
  {
    "id": "157033",
    "image": "tottenham.png"
  },
  {
    "id": "163963",
    "image": "westHam.png"
  },
  {
    "id": "165690",
    "image": "wolves.png"
  }
]
let game_board = [
  {
    "button_id": "board_button0",
    "team_combo" : []
  },
  {
    "button_id": "board_button1",
    "team_combo" : []
  },
  {
    "button_id": "board_button2",
    "team_combo" : []
  },
  {
    "button_id": "board_button3",
    "team_combo" : []
  },
  {
    "button_id": "board_button4",
    "team_combo" : []
  },
  {
    "button_id": "board_button5",
    "team_combo" : []
  },
  {
    "button_id": "board_button6",
    "team_combo" : []
  },
  {
    "button_id": "board_button7",
    "team_combo" : []
  },
  {
    "button_id": "board_button8",
    "team_combo" : []
  }
]

let current_clicked_id = -1;
var playerData = {};
let guesses = 9;
let correctAnswers = 0;
let reset = false;


function openGuessTab(clicked_id) {
  current_clicked_id = parseInt(clicked_id.charAt(clicked_id.length-1));
  console.log(current_clicked_id);
  const modal = document.querySelector("#modal")
  modal.showModal()
}

async function searchPlayer() {
  let specialChars = `!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~`;
  let specialCharFound = false
  const search = document.getElementById("guess").value
  // Checks submitted string to see if any special characters were entered
  for( let i = 0; i < specialChars.length; i++){
    if (search.indexOf(specialChars.charAt(i)) >=0){
      specialCharFound = true
    }
  }
  //Catches special character error and allows user to keep submitting new guesses until error is fixed
  if (specialCharFound){
    document.getElementById("error_catcher").showModal();
    document.getElementById("error_catcher_button").innerHTML = "Error: Search contains special character";
  } else{
  const response = await fetch(`https://api.sports-reference.com/v1/fb/players?search=${search}`)
  playerData = await response.json()
  //Catches 0 search results error and allows user to keep submitting new guesses until error is fixed
  if (typeof playerData.players === undefined || playerData.players == null){
    document.getElementById("error_catcher").showModal();
    document.getElementById("error_catcher_button").innerHTML = "Error: Search returned 0 results";
  }else{
  const modal = document.querySelector("#modal")
  document.getElementById("guess").value = ""
  modal.close()
  for (i = 0; i < playerData.players.length; i++) {
    addOption(playerData.players[i])
  }
  const resultModal = document.querySelector("#results")
  resultModal.showModal()
  }
  }
}

function addOption(player) {
  var search_results = document.getElementById("search-results")
  var option = document.createElement("option")
  option.text = player.name
  search_results.add(option)
}

function submitGuess() {
  let found_First_Team = false;
  let found_Second_Team = false;
  var answer = document.getElementById("search-results").value
  // Iterates through our playerData from search results to match answer to the player selected
  for (let i = 0; i < playerData.players.length; i++){
    if(playerData.players[i].name == answer){
      answer = playerData.players[i]
      i = playerData.players.length
    }
  }
  // Iterates through the teams on the game board, checking their team id against the player's list of teams played for to see if the ids match.
  for(i = 0; i < answer.teams.length; i++){
    if (answer.teams[i].id == game_board[current_clicked_id].team_combo[0]){
      found_First_Team = true
    } else if (answer.teams[i].id == game_board[current_clicked_id].team_combo[1]){
      found_Second_Team = true
    }
  }
  //If both teams are found, the guess is correct and the headshot of the correct player gets displayed in the box on the game board
  // The total number of correct numbers also gets incremented by 1
  if (found_First_Team && found_Second_Team){
   document.getElementById(`button_image${current_clicked_id}`).src = answer.headshot_url;
   document.getElementById(`board_button${current_clicked_id}`).disabled = true
   correctAnswers++
   console.log("Correct")
  }
  //Decrements guess counter after a user guess is submited and updates the number displayed to the user.
  guesses--;
  document.getElementById("guess-counter").innerHTML = `Guesses: ${guesses}`;
  document.getElementById("search-results").innerHTML = ""
  const modal = document.querySelector("#results")
  modal.close()
  //End of game, number of correct answers determines whether the player wins or loses. Regardless, they may click the try again button to load 6 new teams and restart.
  if(guesses == 0){
    const End_Screen = document.getElementById("End_Screen")
    if(correctAnswers==9){
      document.getElementById("end_button").innerHTML = "You Win! <br> Try Again?"
    } else{
      document.getElementById("end_button").innerHTML = "You Lose:( <br> Try Again?"
    }
    End_Screen.showModal()
  }

}

function selectRandomImage() {
  let teamNames = ["arsenal.png", "astonVilla.png", "bournemouth.png", "brentford.png", "brighton.png", "burnley.png", "chelsea.png", "crystalPalace.png", "everton.png", "fulham.png", "liverpool.png", "lutonTown.png", "manCity.png", "manU.png", "newcastle.png", "nottinghamForest.png", "sheffieldUnited.png", "tottenham.png", "westHam.png", "wolves.png"]
  let selectedTeams = [];
  for (let i = 1; i < 7; i++) {
    temp = Math.floor(Math.random() * prem_teams.length);
    if (teamNames[temp] != "") {
      document.getElementById(`team-logo${i}`).src = "images/logos/" + prem_teams[temp].image;
      selectedTeams[i-1] = teamNames[temp];
      teamNames[temp] = "";
    } else {
      i--;
    }
  }
  return selectedTeams;
}
function createGameBoard(){ 
  let selectedTeams = selectRandomImage();
  let team_ids = [];
  guesses = 9;
  document.getElementById("guess-counter").innerHTML = `Guesses: ${guesses}`;
  correctAnswers = 0;
  
  // Collects the team_ids of the selected teams and stores them into a list to be used later
  for(let i=0; i< selectedTeams.length;i++){
    for(let j = 0; j < prem_teams.length; j++){
      if (prem_teams[j].image == selectedTeams[i]){
        team_ids[i] = prem_teams[j].id;
      }
    }
  }
  // Initializes a list containing the id combo of each square of the game board
  for(i = 0; i < 3; i++){
    game_board[i].team_combo = [team_ids[i], team_ids[3]];
    game_board[i+3].team_combo = [team_ids[i], team_ids[4]];
    game_board[i+6].team_combo = [team_ids[i], team_ids[5]];
  }
}