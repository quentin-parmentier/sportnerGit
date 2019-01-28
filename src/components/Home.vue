<style>

  .marker.leaflet-popup {
    margin-bottom: 16px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    padding: 5px 10px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    background-color: #fff; 
  }
  .marker.leaflet-popup::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #FFF;
  }
  .marker .leaflet-popup-content-wrapper{
    background: transparent;
    color: inherit;
    box-shadow: none;
    text-align: inherit;
  }
  .marker .leaflet-popup-content{
    text-align: inherit;
    color: inherit;
    margin: 0;
  }
  .marker .leaflet-popup-tip-container{
    display: none;
  }
  .marker.is-active, .marker:hover{
    z-index: 3000;
    background-color: #5069ff;
    color: #FFF;
  }
  .marker.is-active::after, .marker:hover::after{
    border-top-color: #5069ff;
  }
  .marker.is-open{
    z-index: 301;
    background-color: #fff!important;
    text-align: left;
    color: inherit!important;
  }
  .marker.is-open::after{
    border-top-color: #fff;
  }
  .floating-reload{
    margin-left: 15%;
    z-index: 50000;     
  }
  .map {
    height: 90vh;
    position: sticky!important;
    top : 64px;
  }

</style>

<template>
  
  <div>

    <v-layout row wrap>
      <v-alert
    :value="alertI"
    type="info"
    transition="scale-transition"
    class="alerte"
    >

      {{alerte}}
    </v-alert>

      <v-flex xs8>
        <v-card>
          <v-container v-bind="{ [`grid-list-sm`]: true }" fluid>
            <v-layout row wrap>
            <v-flex v-for="event in events" xs4 >
              <v-card flat tile :to="`/event/${event.id_event}`" :data-lat="event.lat" :data-lng="event.lng" :data-sport="event.sport" class="js-marker">
                <v-img :src="`https://unsplash.it/150/300?image=`+event.id_event" max-height="200px"> <!--${event.id_event}-->
                  
                </v-img>

                <div>
                  <b class="titre">{{event.titre}}</b>
                </div>

                <v-card-title primary-title class="mtn15">

                  <div>
                    <div>{{event.description}}</div>
                  </div>

                </v-card-title>
              </v-card>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <div class="map blank" id="js_map" ref="mamap">
            <v-btn color="error" class="floating-reload" ref="floatbutton" @click="eventmaj" v-if="isReload">Relancer la recherche ici <v-icon>refresh</v-icon></v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  import axios from 'axios'

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
    getBounds(){
      return this.map.getBounds();
    }
    cleanMap(){
      this.map.eachLayer((layer)=>{
        if(layer.options.className == "marker"){
          layer.remove();
        }
      });
      return true;
    }
  }
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
  export default {
    data: vm => ({
      events : [
          
      ],
      map : null,
      pos_actu : null,
      activeMarker : null,
      exist : null,
      isReload : false,
      pagelaunched: false,
      heureHome : "",
      alertI : false,
      alerte: "",
      globallatuser : 0,
      globalnguser : 0,


    }),
    mounted: function () {

      this.globallatuser = localStorage.lat;
      this.globalnguser = localStorage.lng;

      this.initMap();

      //this.eventlaunch();

      this.$root.$on('Home', () => {

          this.eventmaj();

      });

      this.eventmaj();

    },
    methods: {
      initMap(){
        this.map = new leafletMap();
        this.pos_user = {"lat":this.globallatuser,"lng":this.globalnguser};
        this.pos_actu = this.pos_user;
        this.map.load('js_map',this.pos_user);
        this.map.map.addEventListener('click',()=>{
          if(this.activeMarker !== null){
            this.activeMarker.resetContent();
            this.activeMarker = null;
          }
        });
        this.map.map.on('zoomend', () => {
          this.isPosChanged(this.map);
        });
        this.map.map.on('moveend', () => {
          this.isPosChanged(this.map);
          this.pagelaunched = true;
        });
        this.creatingPoint(this.map);
      },
      creatingPoint(map){
        Array.from(document.querySelectorAll('.js-marker')).forEach((item) => {
          let marker = map.addMarker(item.dataset.lat,item.dataset.lng,item.dataset.sport);
          item.addEventListener('mouseover', function(){
            marker.setActive(true);
          });
          item.addEventListener('mouseout', function(){
            marker.setActive(false);
          });
          marker.addEventListener('click',()=>{
            if(this.activeMarker !== null){
              this.activeMarker.resetContent();
            }
            if(this.activeMarker !== marker){
              console.log(item.outerHTML);
              this.activeMarker = marker;
              marker.setContent(item.outerHTML);
            }else{
              
              marker.setActive(false);
              this.activeMarker = null;
            }
          });
        });
        this.pos_actu = map.getCenter();
        
        this.isReload = false;
      },
      isPosChanged(map){ //On regarde si la position a beaucoup changé ou pas si oui on considère de reload
        let new_center = map.getCenter();
        if((Math.abs(new_center.lng-this.pos_actu.lng) > 0.04 || Math.abs(new_center.lat-this.pos_actu.lat) > 0.04) && this.pagelaunched){
          this.pos_actu = new_center;
          this.isReload = true;
        }
      },
      reload(){
        //Je récupère les nouveaux points extremes
        //Je vais chercher des nouveaux events
        this.map.cleanMap();
        this.creatingPoint(this.map);
        this.isReload = false;
        
      },
      eventmaj(){

        let bounds = this.map.getBounds();

        axios.get('http://api.test/api/events',
         {

          params:{
            sport: this.$root.$data.choixsport,
            dateevent : this.$root.$data.choixdate,
            heure: this.$root.$data.choixheure,
            search: this.$root.$data.choixsearch,
            lat1: bounds["_southWest"]["lat"],
            lat2: bounds["_northEast"]["lat"],
            lng1: bounds["_southWest"]["lng"],
            lng2: bounds["_northEast"]["lng"],

          }

        }).then(response => {

          this.events = response.data.events;


          if(response.data.events.length == 0){

            this.alerte = "Impossible de trouver un événement";
            this.alertI = true;
            setTimeout(()=>{ this.alertI=false}, 3000);
          }


        }).then(response => {

          this.reload();

        });

      },

      getLocation() {

        if (navigator.geolocation) {
          console.log(navigator.geolocation);
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          alert('Geolocation non supportée');
        }

      },

      showPosition(position) {

        this.globallatuser = position.coords.latitude;
        this.globalnguser = position.coords.longitude;

        console.log(this.globalnguser);
      }
    }
  }
</script>

