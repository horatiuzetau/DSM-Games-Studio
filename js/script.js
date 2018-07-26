//AICI SE POT MODIFICA IN FUNCTIE DE CE SE DORESTE
var nr_jocuri = 35;
var nr_poze = 10;

//mai trebuie sa fac animatia de la hero-btn
//					 animatia de la nav-btn
//					 chestia cu active la scroll

//============NAVBAR ANIMATION FOR RESPONSIVE =======================

var nav = document.getElementById("navbar");
var tabs = document.getElementById("tablist");
var oktabs = 1;
function navFunc(){
	if(oktabs){		
		tablist.style.transform ="rotateX(0deg)";
		oktabs = !oktabs;
	}else{
		tablist.style.transform ="rotateX(-90deg)";
		oktabs = !oktabs;
	}

	return true;
}

//CA SA SE INCHIDA TABUL ATUNCI CAND DAI PE UN ELEMENT SA NU
//TREBUIASCA SA INCHIZI MANUAL
$("#tablist a").click(function(){
	navFunc();
})

//============FIXED NAVBAR LA SCROLL(SCROLLED NAV)=====================
$(window).scroll(function() {
	var y = window.pageYOffset;
	if(y > 0){
		nav.classList.add("scrolled");
	}else{
		nav.classList.remove("scrolled");
	}
});

// ======================SCROLLTO ANIMATION==========================
//trebuie ca atunci cad sunt undeva sa se ia activul actual

$('#navbar a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    console.log(target);

    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 150
        }, 500);
    }
});


//========================COUNT TO ANIMATION =======================

// $( ".card-dotari" ).each(function( index ) {
// 	myMove(this);
// });

// function myMove(dh) {
// 	console.log(dh);
// 	var nrActual = dh.childNodes[3].innerHTML;
//     var pos = 1;
//     var id = setInterval(frame, 10);
//     function frame() {
//         if (pos == nrActual) {
//             clearInterval(id);
//         } else {
//             dh.childNodes[3].innerHTML = pos;
//             pos++; 
//         }
//     }
// }

//===============================IMAGINI AUTOMATE=================
loadImages();
//FUNCTIE CARE IA TOATE IMAGINILE SI LE PUNE IN DOCUMENT
function loadImages(){
	var i = 1;
	for(i = 1; i <= nr_jocuri; i++){
		x = img_create("css/img/jocuri/"+ i +".jpg", "jon", "n-avem");
		document.getElementById("jocuri-wrap").appendChild(x);	
	}
}
//FUNCTIE CARE CREAZA IMAGINEA
function img_create(src, alt, title) {
    var img = document.createElement('img');
    img.src = src;
    if ( alt != null ) img.alt = alt;
    if ( title != null ) img.title = title;
    return img;
}

//=============================VEZI MAI MULTE IMAGINI =============
$('.mini-link').click(function(){
	if(document.getElementById("jocuri-wrap").style.height != "auto"){
		document.getElementById("jocuri-wrap").style.height = "auto";
		this.innerHTML = "Vezi mai putine jocuri...";
	}else{
		document.getElementById("jocuri-wrap").style.height = "";
		this.innerHTML = "Vezi toate jocurile...";
	}
});


//=============================READ FROM JSON PRETURI ==============
var nume_prod, nume_cat, pret, cant, stoc;
var acolo = document.getElementById("preturi");
$.get('read.json', function(data) {
	var html;
	//Daca exista categorii in file json
	if(data.length > 0){
		var html1 = '<ul id="lista_cat">';
		html = html1;
		for(i = 0; i < data.length; i++){
			//Aici e fiecare categorie pe rand
			nume_cat = data[i].nume_categorie;
			var html2 = '<li class="lista_cat_li"><h3>'+ nume_cat +'</h3><ul>';
			html = html + html2;
			for(j = 0; j < data[i].produse.length; j++){
				//Aici e fiecare produs pe rand
				if(data[i].produse[j].stoc){
					nume_prod = data[i].produse[j].nume;
					pret      = data[i].produse[j].pret;
					cant      = data[i].produse[j].cantitate;
					stoc      = data[i].produse[j].stoc;
					// console.log(data[i].produse[j]);

					var html3 = '<li><div class="stanga"><span class="nume_prod">'
								+ nume_prod + '</span><span class="cant_prod">('
								+ cant + ')</span></div><span class="pret_prod dreapta">'
								+ pret + ' LEI</span></li>';

					html = html + html3;
				}

			}

			var html4 = '</ul>';
			html = html + html4;
		}

		var html5 = '</ul>';
		html = html + html5;

	}

	acolo.innerHTML = acolo.innerHTML + html;
}, 'json');



//=============================CREAZA POZE ====================
creazaPoze();
function creazaPoze(){
	for(i = 0; i < nr_poze; i++){
		var x = document.createElement("div");
		x.classList.add("image");
		if(i == 0)
    		x.classList.add("full");
		document.getElementById("images-wrap").appendChild(x);
	}
}

var pred;
//=============================GALERIE  =========================
$('.image').click(function(){
		if(pred == null){
			$('.image:nth-of-type(1)').removeClass("full");
			pred = this;
		}
		pred.classList.remove("full");
		this.classList.add("full");
		pred = this;
});
