const teams =[   
{
id: "153995",
image: "arsenal.png"
},
{
id: "164959",
image: "astonVilla.png"
},
{
id: "159149",
image: "bournemouth.png"
},
{
id: "172049",
image: "brentford.png"
},
{
id: "172401",
image: "brighton.png"
},
{
id: "166449",
image: "burnley.png"
},
{
id: "172343",
image: "chelsea.png"
},
{
id: "158744",
image: "crystalPalace.png"
},
{
id: "172780",
image: "everton.png"
},
{
id: "176928",
image: "fulham.png"
},
{
id: "164575",
image: "liverpool.png"
},
{
id: "174195",
image: "lutonTown.png"
},
{
id: "170087",
image: "manCity.png"
},
{
id: "154064",
image: "manU.png"
},
{
id: "169487",
image: "newcastle.png"
},
{
id: "174440",
image: "nottinghamForest.png"
},
{
id: "154536",
image: "sheffieldUnited.png"
},
{
id: "157033",
image: "tottenham.png"
},
{
id: "163963",
image: "westHam.png"
},
{
id: "165690",
image: "wolves.png"
},
 
  ]

function openGuessTab(){
  const modal = document.querySelector("#modal")
  modal.showModal()

}

async function searchPlayer(){
    const search = document.getElementById("guess").value
    const response = await fetch(`https://api.sports-reference.com/v1/fb/players?search=${search}`)
    let playerData = await response.json()
    const modal = document.querySelector("#modal")
    document.getElementById("guess").value = ""
    modal.close()
    console.log(playerData)
    for(let i = 0; i < playerData.players.length; i++){
      addOption(playerData.players[i])
    }
    const resultModal = document.querySelector("#results")
    resultModal.showModal()

}

function addOption(player){
  var x = document.getElementById("search-results")
  var option = document.createElement("option")
  option.text = player.name
  x.add(option) 
}

function submitGuess(){
  const answer = document.getElementById("search-results").value
  document.getElementById("search-results").innerHTML = ""
  const modal = document.querySelector("#results")
  modal.close()

}

function selectRandomImage(){
  var teamNames = ["arsenal.png", "astonVilla.png", "bournemouth.png", "brentford.png", "brighton.png", "burnley.png", "chelsea.png", "crystalPalace.png", "everton.png", "fulham.png", "liverpool.png", "lutonTown.png", "manCity.png", "manU.png", "newcastle.png", "nottinghamForest.png", "sheffieldUnited.png", "tottenham.png", "westHam.png", "wolves.png"]
    for(let i=1; i<7; i++){
      temp = Math.floor(Math.random()*teams.length);
      if(teamNames[temp] != "")
      {
       document.getElementById(`team-logo${i}`).src = "images/logos/" + teams[temp].image;
        teamNames[temp] = "";
      } else {
        i--;
     }
    }
}