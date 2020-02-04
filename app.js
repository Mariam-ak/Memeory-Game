/*
 * Create a list that holds all of your cards
 */
const stars = document.querySelectorAll('.stars');
const movesCounter = document.querySelector('.moves');
const cards = document.querySelectorAll('.card');

let cardsOpened=[];
let cardsIcons = [];
let movesNumb = 0;
let starsNumb = 3;
let sec = 0;
let min = 0;
let stopWatch;

function memoryGame(){
  cards.forEach(card => {
    card.addEventListener('click', cardClicked);
    let child = card.children[0];
    cardsIcons.push(child.className);
  });
  document.querySelector('#btn-play-again').addEventListener('click', rePlay);
  document.querySelector('#btn-cancel').addEventListener('click',closeDialog);
  document.querySelector('.restart').addEventListener('click', restartGame);
}


function flipCardsDown (){
  cards.forEach(card =>{
    card.classList.remove('open');
    card.classList.remove('match');
    card.classList.remove('show');

  });
}

function restartGame(){
  closeDialogBox();
  second =0;
  min =0;
  moves = 0;
  starsNumb = 3;
  updateScore ();
  shuffle();
  flipCardsDown();
  startTimer();
}

function closeDialogBox (){
  document.querySelector('#dialog-box').close();
}

function startTimer(){
  if (!stopWatch){
    stopWatch = setInterval(()=> {
      second +=1;
      if(second>59){
        second =0;
        min +=1
      }
      document.querySelector('.timer').innerText = `${min}:${second}`
    }, 1000);
  }
}

function stopTimer(){
  clearInterval(stopWatch);
  stopWatch = null;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function cardClicked(){
  if (cardsOpened.length<2){
    this.classList.toggle('show');
    this.classList.toggle('open');
    cardsOpened.push(this);
    if (cardsOpened.length == 2){
      setTimeout(matchCards, 1000);
    }
  }
}

function matchCards(){
  if(cardsOpened.length==2){
    let firstCard = cardsOpened[0];
    let secondCard = cardsOpened[1];
    let firstChildClass = firstCard.children[0].className;
    let secondChildClass = secondCard.children[0].className;
    if (firstChildClass == secondChildClass){
      firstCard.classList.add('match');
      secondCard.classList.add('match');
    } else {
      firstCard.className = 'card';
      secondCard.className = 'card';
    }
    cardsOpened = [];
    incrementMove();
  }
  const remainingUncardsOpened = document.querySelectorAll('.card:not(.match)');
  if (remainingUncardsOpened.length == 0){
    congratsMsg();
  }
}

function incrementMove(){
  movesNumb +=1;
  if(movesNumb<15){
    starsNumb =3;
  } else if (movesNumb<20){
    starsNumb=2;
  } else {
    starsNumb=1;
  }
  updateScore();
}

function updateScore(){
  const moveElement = document.querySelector('.moves');
  moveElement.innerText=movesNumb;
  const starElement = document.querySelector('.stars')
  starElement.innerHTML='';
  for(let i=0; i<starsNumb; i++){
    let star="<li> <i class='fa fa-star'></i></li>";
  }
}

function congratsMsg(){
  let dialog=document.querySelector('.popupmsg');
  document.querySelector('.moving').innerText=movesNumb;
  dialog.showModal();
  stopTimer();
}

function shuffleAndAppend(){
  cardcardsIcons=shuffle(cardcardsIcons);
  currentIndex=0;
  for (card of myCards){
    let firstElement=card.children[0];
    firstElement.className=cardcardsIcons[currentIndex]
    currentIndex++;
  }
}

function clickedMyCard(){
  if(chosenCard.length<2){
    this.classList.toggle('show');
    this.classList.toggle('open');
    chosenCard.push(this);
  }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

memoryGame();
restartGame();


// popup massage
const cardPopup = document.querySelector('.popupmsg');
const timeUsed = document.querySelector('.timming');
const starsRated = document.querySelector('.rating');
const movesUsed = document.querySelector('.moving');
const resetGame = document.querySelector('.again');
