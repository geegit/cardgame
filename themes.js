var themes = {
	
}

function Theme(won,sounds,image){
	this.won = won;
	this.sounds = sounds;
	this.image = image;

	return this;
}

function playThemeSound(theme,index){

	console.log("Loading sound theme " + theme + " and sound at index " + index); 
	
	sound = themes[theme].sounds[index];

	playSound(sound);

}

function youWon(themeName){

	playYouWonSound(themeName);

	//Do some image stuff
	image = themes[themeName].image
}

function playYouWonSound(themeName){
	
	sound = themes[themeName].won;
	
	playSound(sound);

}