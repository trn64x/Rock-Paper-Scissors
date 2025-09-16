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
    document.getElementById("GameCount").style.color = "aliceblue";
    document.body.style.transition = "0.3s";
    return; 
}


if(combinations[chooseableIndex][random] == 1){
    let PlayersWins = document.getElementById("playerStats");
    let PlayerWinNumber = parseInt(PlayersWins.innerHTML)
    PlayerWinNumber++;
    PlayersWins.innerHTML = PlayerWinNumber.toString();
    document.body.style.background = "rgb(195, 255, 171)";
    document.getElementById("GameCount").style.color = "rgb(195, 255, 171)";
    document.body.style.transition = "0.3s";
    wynik.innerHTML = "Player Wins: " + value + " vs. " + BotChoosed;
}
else{
    let BotWins = document.getElementById("botStats");
    let BotWinNumber = parseInt(BotWins.innerHTML)
    BotWinNumber++;
    BotWins.innerHTML = BotWinNumber.toString();
    document.body.style.background = "rgb(255, 138, 138)";
    document.getElementById("GameCount").style.color = "rgb(255, 138, 138)";
    document.body.style.transition = "0.3s";
    wynik.innerHTML = "Player Lose: " + value + " vs. " + BotChoosed;
}}

/* Game Count */
let gameCountValue = document.getElementById("GameCount");
let gameCount = 1;
for(let i= 0; i < 3; i++){
    let button = document.querySelectorAll(".option")[i];
    button.addEventListener("click",()=>{
    let credits = document.getElementById("credits");
    let storagedData = JSON.parse(window.localStorage.getItem("Stats"));
    let PlayersWins = document.getElementById("playerStats");
    let BotWins = document.getElementById("botStats");
        gameCount++;
        gameCountValue.innerHTML = `Game #${gameCount}`;
        if(PlayersWins.innerHTML >= storagedData.Rounds){
        let betWon = storagedData.Bet;
        let money = parseInt(credits.innerHTML);
        storagedData.Credits = money + (parseInt(betWon) * 2);
        credits.innerHTML = storagedData.Credits;
        storagedData.Rounds = null;
        storagedData.Bet = null;
        gameCount = 1;
        gameCountValue.innerHTML = `Game #${gameCount}`;
        storagedData.BotWins = 0;
        storagedData.PlayersWins = 0;
    localStorage.setItem("Stats", JSON.stringify(storagedData));
            const buttons = document.querySelectorAll(".option");
for(let i = 0; i < 3;i++){
    buttons[i].disabled = true;
}
setTimeout(()=>{
    document.querySelector(".chooseUI").style.display = "none";
    document.getElementById("GameCount").style.display = "none";

    StartGame();
    alert(`You have won: ${betWon} dollars!`);
},2000); // 2 sekundy
        
        return
    }
        if(BotWins.innerHTML >= storagedData.Rounds){

        let betWon = storagedData.Bet;
        storagedData.Rounds = null;
        storagedData.Bet = null;
        gameCount = 1;
        gameCountValue.innerHTML = `Game #${gameCount}`;
        storagedData.BotWins = 0;
        storagedData.PlayersWins = 0;
    localStorage.setItem("Stats", JSON.stringify(storagedData));
        if(parseInt(storagedData.Credits) <= 0 && credits.innerHTML <= 0){
            localStorage.clear("Stats");
            document.getElementById('wynik').innerHTML = "You have lost all your money!"
            return
        }
        const buttons = document.querySelectorAll(".option");
for(let i = 0; i < 3;i++){
    buttons[i].disabled = true;
}
setTimeout(()=>{
    document.querySelector(".chooseUI").style.display = "none";
    document.getElementById("GameCount").style.display = "none";

    StartGame();
    alert(`You have lost: ${betWon} dollars...`);
},2000);
        
        return
    }
    })
}
window.addEventListener("beforeunload",()=> {
    let PlayersWins = document.getElementById("playerStats");
    let StatsLocalStorage = JSON.parse(window.localStorage.getItem("Stats"));
    let BotWins = document.getElementById("botStats");
    let BotWinNumber = parseInt(BotWins.innerHTML);
    const stats = {
        Username: username.innerHTML,
        Credits: StatsLocalStorage.Credits,
        Bet: StatsLocalStorage.Bet,
        Rounds: StatsLocalStorage.Rounds,
        BotWins: StatsLocalStorage.BotWins,
        PlayersWins: StatsLocalStorage.PlayersWins
    }
    localStorage.setItem('Stats',JSON.stringify(stats));
})
window.addEventListener("DOMContentLoaded",()=> {
    let StatsLocalStorage = JSON.parse(window.localStorage.getItem("Stats"));
    let username = document.getElementById("username");
    let credits = document.getElementById("credits");
    let PlayersWins = document.getElementById("playerStats");
    let BotWins = document.getElementById("botStats");
    let rand = Math.floor(Math.random() * 10000);
    
    if(!StatsLocalStorage){
           const stats = {
        Username: `Guest${rand}`,
        Rounds: null,
        Bet: null,
        Credits: 100,
        BotWins: 0,
        PlayersWins: 0
    }
    localStorage.setItem('Stats',JSON.stringify(stats));
    StatsLocalStorage = JSON.parse(window.localStorage.getItem("Stats"));
    }else{
        StartGame();
    }
    credits.innerHTML = StatsLocalStorage.Credits
    username.innerHTML = StatsLocalStorage.Username
    PlayersWins.innerHTML = StatsLocalStorage.PlayersWins;
    BotWins.innerHTML = StatsLocalStorage.BotWins;
})
function slideChange(value){
    const amount = document.getElementById("amount");
    const slideItems = document.querySelectorAll(".SlideItem");
    slideItems.forEach(item => item.style.display = "none");
    const index = parseInt(value);
    if(slideItems[index]){
        slideItems[index].style.display = "flex";
        amount.innerHTML = `${index + 1}/5`;
    }
    if(index == 4){
        const closeSlides = document.getElementById("closeSlides");

        amount.style.display = "none";
        closeSlides.style.display = "flex";
    }
}
function StartGame(){
    let storagedData = JSON.parse(window.localStorage.getItem("Stats"));
    document.getElementById('MoreMoney').innerHTML = "";
    document.getElementById("credits").innerHTML = storagedData.Credits;
    document.getElementById("FastGuide").style.display="none";
    document.querySelector(".slider").style.display="none";
    document.getElementById("Bet").style.display="none";
            const buttons = document.querySelectorAll(".option");
for(let i = 0; i < 3;i++){
    buttons[i].disabled = false;
}
    if(storagedData.Rounds != null && storagedData.PlayersWins < storagedData.Rounds && storagedData.BotWins < storagedData.Rounds){
        document.getElementById("GameCount").style.display = "flex";
        document.querySelector(".chooseUI").style.display = "flex";
    document.getElementById("playerStats").innerHTML = 0;
    document.getElementById("botStats").innerHTML = 0;
    }
    if(storagedData.Rounds == null){
        document.getElementById("Bet").style.display = "flex";
        return
    }
}
function LockInBets(){
    let RoundsInput = document.getElementById("RoundsInput").value;
    let BetInput = document.getElementById("BetInput").value;
    let username = document.getElementById('username');
    let credits = document.getElementById("credits");
    let PlayersWins = document.getElementById("playerStats");
    let BotWins = document.getElementById("botStats");
    let storagedData = JSON.parse(localStorage.getItem("Stats"));
    if(parseInt(BetInput) > storagedData.Credits){
        let moneyAnnouc = document.getElementById('MoreMoney');
        moneyAnnouc.style.display = "flex";
        moneyAnnouc.style.color = "red";
        moneyAnnouc.innerHTML = "Not enough money to bet."
        return;
    }
    const stats = {
        Username: username.innerHTML,
        Rounds: RoundsInput,
        Bet: BetInput,
        Credits: parseInt(storagedData.Credits) - parseInt(BetInput),
        BotWins: 0,
        PlayersWins: 0
    }
    
    localStorage.setItem('Stats',JSON.stringify(stats));
    StartGame();
}
function OpenShop(){
const shopButton = document.getElementById("ShopButton");
const storeImg = document.getElementById("StoreImg");
const valueDiv = document.getElementById("value");
const ContainerShop = document.getElementById("ShopContainer");
console.log("Clicked but no if")
if(value.innerHTML == `Store`){
    console.log("something happens")
    ContainerShop.style.animation = "1s Opening forwards"
    ContainerShop.style.display = "flex";
    value.innerHTML = "Close Store";
    return;
}if(value.innerHTML == "Close Store"){
    ContainerShop.style.animation = "1s Closing forwards"
    value.innerHTML = "Store";
    setTimeout(()=>{
ContainerShop.style.display = "none";
    },1000)
return;
}
}