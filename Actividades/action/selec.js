var n_bisonte = 0;//rojo/0
var n_tortuga = 0;//azul/2
var n_ave = 0;//verde/1
var	n_aguila = 0;//verde/1
var	n_tiburon = 0;//azul/2
var	n_oso = 0;//rojo/0
var result = 0;
function evaluar() {
	if (n_bisonte != 0 & n_ave != 0 & n_tortuga != 0 & n_aguila != 0 & n_tiburon != 0 & n_oso != 0) {
		if (n_bisonte == 1 & n_oso == 1) {
			if (n_ave == 2 & n_aguila == 2) {
				if (n_tortuga == 3 & n_tiburon == 3) {
					result = 4;
				} else {
					result = 3;
				}
			} else {
				result = 2;
			}
		} else {
			result = 1;
		}
	} else {
		result = 0
	}
	return result;
}

var acto = 1;

AFRAME.registerComponent('cursor-listener', {
	init: function () {	

		var lastIndex = -1;
		var COLORS = ['red', 'green', 'blue'];

		this.el.addEventListener('click', function (evt) {

			if (this.getAttribute("id") == "Tim") {

				if (acto == 1) {
					console.log("acto: 1-"+acto);
					var audio = document.querySelector('#hola'); 
					audio.components.sound.playSound();
					acto++;
				} else if (acto == 2) {
					console.log("acto: 2-"+acto);
					var audio = document.querySelector('#inst'); 
					audio.components.sound.playSound();
					var tex = document.getElementById("tex");
					setTimeout(function(){ 
				    	tex.setAttribute("src", "models/json_Tim/frases/text(2).png");
				    	setTimeout(function(){
				    		tex.setAttribute("src", "models/json_Tim/frases/text(3).png");
				    		setTimeout(function(){
					    		tex.setAttribute("src", "models/json_Tim/frases/text(4).png"); 
					    		setTimeout(function(){
						    		tex.setAttribute("src", "models/json_Tim/frases/text(5).png"); 
						    		setTimeout(function(){
							    		tex.setAttribute("src", "models/json_Tim/frases/text(6).png"); 
							    	}, 5000);
						    	}, 3000); 
					    	}, 2000);  
				    	}, 2000); 
				    }, 500);
					this.setAttribute("animation-mixer", "clip: quieto");
					acto++;
				} else if (acto == 3) {
					console.log("acto: 3-"+acto);
					var val = evaluar();
					console.log(val);
					if (val == 4) {
						this.setAttribute("animation-mixer", "clip: saltar");
						var tex = document.getElementById("tex");
						tex.setAttribute("src", "models/json_Tim/frases/text(7).png");
						acto++;
					} else {
						this.setAttribute("animation-mixer", "clip: error");
						var tex = document.getElementById("tex");
						tex.setAttribute("src", "models/json_Tim/frases/text(8).png");
					}
					var audio = document.querySelector('#val'+val); 
					audio.components.sound.playSound();

				} else if (acto == 4) {
					var audio = document.querySelector('#fin'); 
					audio.components.sound.playSound();
					this.setAttribute("animation-mixer", "clip: preguntar; loop: pingpong");
					var tex = document.getElementById("tex");
					tex.setAttribute("src", "models/json_Tim/frases/text(9).png");
					setTimeout(function(){
						var option1 = document.getElementById("si");
						option1.setAttribute("visible", "true");
						var option1 = document.getElementById("no");
						option1.setAttribute("visible", "true"); 
					}, 7500);
				}
				
			} else if (this.getAttribute("id") == "no") {
				console.log("no");
				history.back(1);
			} else if (this.getAttribute("id") == "si") {
				console.log("si");
				location.reload();
			} else {
				console.clear();
				lastIndex = (lastIndex + 1) % COLORS.length;
				this.setAttribute('material', 'color', COLORS[lastIndex]);

				var entity=this.getAttribute("id");
				switch (entity) {
					case "bisonte":
						n_bisonte = lastIndex+1;
					break;
					case "tortuga":
							n_tortuga = lastIndex+1;
						break;
					case "ave":
							n_ave = lastIndex+1;
						break;
					case "aguila":
						n_aguila = lastIndex+1;
					break;
					case "tiburon":
							n_tiburon = lastIndex+1;
						break;
					case "oso":
							n_oso = lastIndex+1;
						break;
				}
				console.log("bisonte"+n_bisonte);
				console.log("tortuga"+n_tortuga);
				console.log("ave"+n_ave);
				console.log("aguila"+n_aguila);
				console.log("tiburon"+n_tiburon);
				console.log("oso"+n_oso);
			}

		});
	}
});