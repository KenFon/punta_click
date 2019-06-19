//definition des tableaux de couleurs et de forme
var couleur=["red","red", "red","red", "green","green","yellow"];
var forme=["carre", "rond"];
var score=0;
var _difficult="";
var _timer=null;

function init(){
	var divInit = document.createElement("section");
	divInit.classList.add("start");
	var titreJeu = document.createElement("h1");
	titreJeu.textContent ="Punta Click";
	var regle = document.createElement("aside");
	regle.classList.add("regle");
	regle.innerHTML="Voici les régles : </br>Vous devez cliquer sur toutes les formes dans le temps impartie. Chaque elimination vous rapporte des points. </br>ATTENTION, les formes noires sont dangereuse ! Elle vous ferons perdre instantanément.</br>Si toute les formes de couleurs sont eliminer, vous remporter la partie !"
	var leaderboard = document.createElement("aside");
	leaderboard.classList.add("leaderboard");
	//creation de la navBar
	var nav=document.createElement("nav");
	var buttonNoob=document.createElement("button");
	var buttonHard=document.createElement("button");
	var buttonUltra=document.createElement("button");
	buttonNoob.textContent="Niveau Noob";
	buttonHard.textContent="Niveau Difficile";
	buttonUltra.textContent="Prepared to Loose";
	//constitution de la page d'accueil
	document.body.appendChild(divInit);
	var start = document.body.querySelector(".start");
	start.appendChild(titreJeu);
	start.appendChild(regle);
	start.appendChild(nav);
	start.appendChild(leaderboard);
	var navBar = document.body.querySelector("nav")
	navBar.appendChild(buttonNoob);
	navBar.appendChild(buttonHard);
	navBar.appendChild(buttonUltra);
	var allButton = document.querySelectorAll("button");
	allButton[0].addEventListener("click", function(){
		_difficult="Noob";
		game(20,3,60000);
	});

	allButton[1].addEventListener("click",function(){
		_difficult="Difficile"
		game(80,20,45000);

	});
	allButton[2].addEventListener("click",function(){
		_difficult="Hardcore"
		game(200,70,30000);
	});
}

//fonction pour les positionnements des formes
function randomPosition() {
	var randomX = Math.floor((Math.random()*75)+15);
	var randomY = Math.floor(Math.random()*90);
	return [randomX,randomY];
}

// fonction quand il n'y a plus de temps.
function timeOut(){
	loose();
}

//Effacer les enfant de element.
function removeAllChild(element){
	if (element.childElementCount == 0){
		element.remove;
	}
	while (element.firstChild) {
   	element.removeChild(element.firstChild);
		element.classList.remove("start", "game", "end", ...couleur, ...forme);
}
}

//fonction qui gére la barre du timer pdt le jeu.
function timer(sec){
	var intervalId="";
	intervalId=setInterval(degress, (sec/100));

	function degress(){
		if(document.querySelector("progress") === null){
			clearInterval(intervalId);
		}else{
			var timer=document.querySelector("progress").value;
	      if( timer== 0 ){
				clearInterval(intervalId);
	         return;
	      }else{
	         timer=timer-1;
	         document.querySelector("progress").value=timer;
	      }
	}
}

}

//creation de div en fonction de la difficulté.
function createDiv(difficult){
	//creation des div en fonction de la difficulté
	var nbDiv = 0;
	while(nbDiv != difficult){
		var div = document.createElement("div");
		document.body.querySelector(".divJeu").appendChild(div);
		nbDiv++;
	}
	nbDiv=0;
}

function gameplay(black){
	var tabDiv=document.querySelectorAll("div");
	var aleacouleur=0;
	var aleaforme=0;
	//gestion des formes noires
	for(i=0;i<black;i++){
		var intervalId="";
		intervalId=setInterval(randomPosition(tabDiv[i]),1000);
		var xy = randomPosition(tabDiv[i]);
		tabDiv[i].classList.remove(...couleur,...forme);
		tabDiv[i].classList.add("noir",forme[Math.floor((Math.random()*forme.length))]);
		tabDiv[i].style.top = xy[0] + 'vh';
		tabDiv[i].style.left = xy[1] + 'vw';
		tabDiv[i].addEventListener("click", function(){
			clearTimeout(_timer);
			loose();
		});
	}
	//gestion des formes de couleurs
	for(i=black;i<tabDiv.length;i++){
		aleacouleur=Math.floor((Math.random()*couleur.length));
		aleaforme=Math.floor((Math.random()*forme.length));
		tabDiv[i].classList.remove(...couleur);
		tabDiv[i].classList.remove(...forme);
		tabDiv[i].classList.add(couleur[aleacouleur],forme[aleaforme]);
		//Je met les elements à un endroit aléatoire
		xy = randomPosition(tabDiv[i]);
		tabDiv[i].style.top = xy[0] + 'vh';
		tabDiv[i].style.left = xy[1] + 'vw';
		//Disparition des div lors du click et deplacement
		disapear(black);
}
}


//fonction a faire. Appeler lors de la defaite
function loose(){
	removeAllChild(document.querySelector(".game"));
	document.body.textContent="YOU LOOSE";
	var button = document.createElement("button");
	console.log(button);
	button.textContent ="Retour au debut";
	document.body.appendChild(button)
	button.addEventListener("click",function(){
		removeAllChild(document.body)
		init()})

}

//fonction a faire. Appeler lors de la victoire
function win(){
	clearTimeout(_timer);
	removeAllChild(document.querySelector(".game"));
	document.body.textContent="YOU WIN";
	var button = document.createElement("button");
	console.log(button);
	button.textContent ="Retour au debut";
	document.body.appendChild(button)
	button.addEventListener("click",function(){
		removeAllChild(document.body)
		init()})
}

//fonction a faire. Pour calculer le score
function calculScore(div){
	     if (div.classList.contains("red")){
	        score=score+1;
	    }else if(div.classList.contains("green")){
	        score=score+2;
	    }else if(div.classList.contains("yellow")){
	        score=score+3;
	    }else{
	        score=score+1;
	    }
	}

//fonction a faire. Appeler lorsque la personne click sur une div de couleur.
//faire disparaitre la div + ajouter un au compteur + changement de position + gestion des pts en fonction des couleurs.
function disapear(black){
	var tabDiv=document.querySelectorAll("div");
	tabDiv[i].addEventListener("click", function(){

		calculScore(this);
		var tabDiv=document.querySelectorAll("div");
		document.querySelector(".divJeu").removeChild(this);
		for(i=0;i<tabDiv.length;i++){;
			if((tabDiv.length-black) == 1){
				win();
			}
			xy = randomPosition(tabDiv[i]);
			tabDiv[i].style.top = xy[0] + 'vh';
			tabDiv[i].style.left = xy[1] + 'vw';
			document.querySelector(".score").textContent=score;
	}
	});
}

function desingGame(){
	//creation des elements html pour le jeu
	var secGame=document.createElement("section");
	var divGame=document.createElement("aside");
	var divScoring=document.createElement("aside");
	var divDifficult=document.createElement("aside");
	var divTimer=document.createElement("aside");
	var divScore=document.createElement("aside");

	//assignation des class pour la mise en page
	secGame.classList.add("game");
	//removeAllChild(document.querySelector(".game"));
	divGame.classList.add("divJeu");
	divScoring.classList.add("scoring");
	divDifficult.classList.add("difficult");
	divTimer.classList.add("timer");
	divScore.classList.add("score");

	//injecte le html dans le body
	document.body.appendChild(secGame);
	secGame.appendChild(divScoring);
	secGame.appendChild(divGame);
	divScoring.appendChild(divDifficult);
	divScoring.appendChild(divTimer);
	divScoring.appendChild(divScore);

	//rajoute les truc dans le html
	console.log(_difficult);
	divDifficult.textContent=_difficult;
	divTimer.innerHTML="<progress value='100' min='0' max='100'></progress>"
	divScore.textContent=score;
	}

function game(difficult, black, sec){
	score=0;
	removeAllChild(document.querySelector("section"));
	desingGame();
	_timer = setTimeout(timeOut, sec);
	timer(sec);
	createDiv(difficult);
	gameplay(black);
}


init();
