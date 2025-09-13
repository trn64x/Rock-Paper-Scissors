function LogicOfGame(value){
/* Definitions */
let PlayerContainer = document.getElementById("player");
let BotContainer = document.getElementById("bot");
let PlayerContainerPick = document.getElementById("playerPick");
let BotContainerPick = document.getElementById("botPick");
const wynik = document.getElementById("wynik");
/* Essentials */
const chooseables = ["Paper","Rock","Scissors"];
const emoji = ["✋","✊","✌️"];
let random = Math.floor(Math.random() * 3);
/* Choosing Move */
const PlayerChoosed = value;
const BotChoosed = chooseables[random];
let chooseableIndex = chooseables.indexOf(value);
/* UI */
PlayerContainer.innerHTML = `Player's Pick: ${value}`;
PlayerContainerPick.innerHTML = emoji[chooseableIndex];
BotContainer.innerHTML = `Bot's Pick: ${BotChoosed}`;
BotContainerPick.innerHTML = emoji[random];
/* Board */
const combinations = [
    [0,1,-1],
    [-1,0,1],
    [1,-1,0]
];
/* Points Logic */
if(value == BotChoosed){
    wynik.innerHTML = "tie: " + value + " vs. " + BotChoosed; 
    document.body.style.background = "aliceblue";
    document.body.style.transition = "0.3s";
    return; 
}


if(combinations[chooseableIndex][random] == 1){
    let PlayersWins = document.getElementById("playerStats");
    let PlayerWinNumber = parseInt(PlayersWins.innerHTML)
    PlayerWinNumber++;
    PlayersWins.innerHTML = PlayerWinNumber.toString();
    document.body.style.background = "rgb(195, 255, 171)";
    document.body.style.transition = "0.3s";
    wynik.innerHTML = "Player Wins: " + value + " vs. " + BotChoosed;
}
else{
    let BotWins = document.getElementById("botStats");
    let BotWinNumber = parseInt(BotWins.innerHTML)
    BotWinNumber++;
    BotWins.innerHTML = BotWinNumber.toString();
    document.body.style.background = "rgb(255, 138, 138)";
    document.body.style.transition = "0.3s";
    wynik.innerHTML = "Player Lose: " + value + " vs. " + BotChoosed;
}}

/* Game Count */
let gameCountValue = document.getElementById("GameCount");
let gameCount = 1;
for(let i= 0; i < 3; i++){
    let button = document.querySelectorAll(".option")[i];
    button.addEventListener("click",()=>{
        gameCount++;
        gameCountValue.innerHTML = `Game #${gameCount}`;
    })
}