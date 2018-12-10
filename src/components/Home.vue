<template>
  
  <div>
    
    <v-layout row wrap>

      <v-flex xs8>

        <v-card>
          <v-container v-bind="{ [`grid-list-sm`]: true }" fluid>
            <v-layout row wrap>
            <v-flex v-for="event in events" xs4 >

              <v-card flat tile :to="`/event/${event.id}`" :data-lat="event.lat" :data-lng="event.lng" :data-sport="event.sport" class="js-marker">

                <v-img :src="`https://unsplash.it/150/300?image=${event.id}`" max-height="300px">
                  
                </v-img>

                <v-card-title primary-title>
                  <div>
                    <div>{{event.text}}</div>
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

            <v-btn color="error" class="floating-reload" ref="floatbutton" @click="reload" v-if="isReload">Relancer la recherche ici <v-icon>refresh</v-icon></v-btn>

        </div>

      </v-flex>

    </v-layout>

  </div>

</template>


<style scoped>

  .item {
      cursor: pointer;
      margin-bottom: 2rem;
      transition: box-shadow .3s;
      padding: 0 20px
  }

  .item:hover {
      box-shadow: 0 0 10px rgba(0,0,0,.1);
      background-color: #fff
  }

  .item h4 {
      margin: 1rem 0 .5rem
  }

  .item p {
      margin: 0 0 1rem
  }

  .item img {
      width: calc(100% + 40px);
      margin-left: -20px;
      display: block;
  }

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

    z-index: 300;
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

    margin-left: 10%;
    z-index: 50000;     

  }

  .map {
    
    height: 90vh;
    position: sticky!important;
    top : 64px;
  }

</style>

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

          {id:"0" ,title : "Sport 1 ICI", date : "27 Nov", hour : "14h" , NbPart : "3" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.75", lng: "6.10", sport:"Basketball"},
          {id:"1" ,title : "Sport 2 ICI", date : "28 Nov", hour : "15h" , NbPart : "4" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"2" ,title : "Sport 3 ICI", date : "29 Nov", hour : "16h" , NbPart : "5" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"3" ,title : "Sport 4 ICI", date : "30 Nov", hour : "17h" , NbPart : "6" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"4" ,title : "Sport 5 ICI", date : "30 Nov", hour : "18h" , NbPart : "7" , text : " Lorem IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"5" ,title : "Sport 6 ICI", date : "31 Nov", hour : "19h" , NbPart : "8" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"6" ,title : "Sport 7 ICI", date : "31 Nov", hour : "20h" , NbPart : "9" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"7" ,title : "Sport 8 ICI", date : "27 Nov", hour : "14h" , NbPart : "3" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"8" ,title : "Sport 9 ICI", date : "28 Nov", hour : "15h" , NbPart : "4" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"9" ,title : "Sport 10 ICI", date : "29 Nov", hour : "16h" , NbPart : "5" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"10" ,title : "Sport 11 ICI", date : "30 Nov", hour : "17h" , NbPart : "6" , text : "Lorem IpsumLorem Ipsum Lorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"11" ,title : "Sport 12 ICI", date : "30 Nov", hour : "18h" , NbPart : "7" , text : "Lorem IpsumLorem Ipsum Lorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"12" ,title : "Sport 13 ICI", date : "31 Nov", hour : "19h" , NbPart : "8" , text : "Lorem IpsumLorem Ipsum Lorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},
          {id:"13" ,title : "Sport 17 ICI", date : "31 Nov", hour : "20h" , NbPart : "9" , text : "Lorem IpsumLorem Ipsum Lorem Ipsum", lat: "48.70", lng: "6.10", sport:"football"},

      ],

      user : {name : "Paul", lat : "48.692054", lng : "6.184417"},

      map : null,

      pos_actu : null,

      activeMarker : null,

      exist : null,

      isReload : false

    }),

    mounted: function () {

      this.initMap();

    },
    
    methods: {

      initMap(){

        this.map = new leafletMap();
        this.pos_user = {"lat":this.user.lat,"lng":this.user.lng};
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

        if(Math.abs(new_center.lng-this.pos_actu.lng) > 0.05 || Math.abs(new_center.lat-this.pos_actu.lat) > 0.04){

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

      }

    }

  }

</script>