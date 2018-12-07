$( document ).ready(function() {
    
    alert("ok");
    
	class leafletMap{

		constructor(){

			this.map = null;

		}

		async load(element,pos_user){

			return new Promise((resolve,reject) => {


				this.map = L.map(element).setView(pos_user,13);

				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				    maxZoom: 17,
				    minZoom:13,
				    id: 'mapbox.streets',
				    accessToken: 'pk.eyJ1Ijoic2Vva3V5bWkiLCJhIjoiY2pscDVlYmc1MXY3MjNrcGJ6anBrcWJydSJ9.CwS7tQsy-GzvIZpkVw9qBw'
				}).addTo(this.map);

				this.map.on('zoomend', () => {

					POPreload(this);

				});

				this.map.on('moveend', () => {

					POPreload(this);

				});

				this.map.on('click', function() {

					if(activeMarker !== null){

						activeMarker.resetContent();

					}

				});

				resolve();

			});

		}

		addMarker(lat,lng,text){

			let point = [lat,lng];
			let marker = new leafletMarker(point,text,this.map);

			return marker;
		}

		getCenter(){

			return this.map.getCenter();

		}

		cleanMap(){

			this.map.eachLayer(function(layer){
				if(layer.options.className == "marker"){
					layer.remove();
				}
			});

			return true;

		}
	
	}

	//Class des les pop-up
	class leafletMarker{

		constructor(point,text,map){

			this.text = text;

			this.popup = L.popup({

				autoClose: false,
				closeOnEscapeKey: false,
				closeOnClick: false,
				closeButton: false,
				className: 'marker',
				maxWidth: 400
			})
				.setLatLng(point)
				.setContent(text)
				.openOn(map)

		}

		setActive(boolean){

			if(boolean){
				this.popup.getElement().classList.add('is-active');
			}else{
				this.popup.getElement().classList.remove('is-active');
			}
		}
		
		setContent(text){

			this.popup.getElement().classList.add('is-open');
			this.popup.setContent(text);
			this.popup.update();

		}

		resetContent(){

			this.popup.getElement().classList.remove('is-open');
			this.popup.setContent(this.text);
			this.popup.update();

		}

		addEventListener(event,cb){

			this.popup.getElement().addEventListener(event,cb);

		}

	}

	//Permet de récupérer la position de l'utilisateur
	//Localisation => Position "de base"
	//@return [lat,lng]
	const getPosUser = function(){

		lat = 48.692054;
		lng = 6.184417;

		return {"lat":lat,"lng":lng};

	}


	//Vide et génère les Items (plus tard call depuis la BDD)
	//On prend du coup la moitié pour trouver les limites (g-d)
	const generateItems = function(pos_user){

		$('#js-list_items').empty();

		for (var i = 0; i < 30; i++) {
			
			lat = pos_user['lat']+Math.random() * (0.0525283809 - (-0.0525283809)) + (-0.0525283809);
			lng = pos_user['lng']+Math.random() * (0.06086336166 - (-0.06086336166)) + (-0.06086336166);

			sport = "";

			switch (i%5){

				case 0:
					sport = '<i class="fas fa-futbol"></i>';
					break;

				case 1:
					sport = '<i class="fas fa-basketball-ball"></i>';
					break;

				case 2:
					sport = '<i class="fas fa-swimmer"></i>';
					break;

				case 3:
					sport = '<i class="fas fa-volleyball-ball"></i>';
					break;

				case 4:
					sport = '<i class="fas fa-bowling-ball"></i>';
					break;

			}

			$('#js-list_items').append("<div data-id_event='"+i+"' class='item js-marker' data-lat='"+lat+"' data-lng='"+lng+"' data-price='"+sport+"'><img src='https://via.placeholder.com/400x260' alt=''><h4>Le sport c'est génial !</h4><p>Ici une petite description qui explique pourquoi c'est mieux ici</p></div>");
			
		}

		$('.item').click(function(){

			document.location.href="./event/"+this.dataset.id_event+".html";
		});
	}

	//Fonction assyncrone remplissant la carte de chaque item présent
	const initMap = async function(){

		let map = new leafletMap();
		await map.load($map,pos_user);

		creatingPoint(map);
	}

	const creatingPoint = function(map){

		Array.from(document.querySelectorAll('.js-marker')).forEach((item) => {

			let marker = map.addMarker(item.dataset.lat,item.dataset.lng,item.dataset.price);

			item.addEventListener('mouseover', function(){

				marker.setActive(true);

			});

			item.addEventListener('mouseout', function(){

				marker.setActive(false);

			});

			marker.addEventListener('click',function(){


				if(activeMarker !== null){

					activeMarker.resetContent();

				}

				if(activeMarker !== marker){

					activeMarker = marker;
					marker.setContent(item);

				}else{
					
					marker.setActive(false);

				}

			});

		});

		pos_actu = map.getCenter();
		$('#js-reload').remove();

	}

	const POPreload = function(map){
		
		exist = document.getElementById('js-reload');

		if(exist == null && isPosChanged(map.map)){

			$('#js_map').append('<div id="js-reload" class="floating-reload"> <p class="text_float"> Relancer la recherche ici <i class="fas fa-redo-alt"></i> </p> </div>');

			$("#js-reload").click(function(){

				map.cleanMap();

				generateItems(pos_actu);
				creatingPoint(map);

			});
		}
	}

	const isPosChanged = function(map){ //On regarde si la position a beaucoup changé ou pas si oui on considère de reload

		return_var = false;

		new_center = map.getCenter();

		if(Math.abs(new_center['lng']-pos_actu['lng']) > 0.1 || Math.abs(new_center['lat']-pos_actu['lat']) > 0.1){

			pos_actu = new_center;
			return_var = true;
			
		}

		return return_var;
	}

	const redirect = function(obj){

		console.log(this);

	}

	let $map = document.querySelector("#js_map"); //Get de la div faite pour la carte

	var pos_user = getPosUser(); //Soit une position de base soit on demande l'accès à l'utilisateur

	var pos_actu = null;

	let activeMarker = null;
	generateItems(pos_user);

	if($map !== null){

		initMap();

	}

});


