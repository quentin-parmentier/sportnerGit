<template>
  
  <div>
    
    <v-layout row wrap>

      <v-flex xs8>

        <v-card>
          <v-container v-bind="{ [`grid-list-sm`]: true }" fluid>
            <v-layout row wrap>
            <v-flex v-for="event in events" xs4 >

              <v-card flat tile :to="`/event/${event.id}`" :data-lat="event.lat" :data-long="event.long">

                <v-img :src="`https://unsplash.it/150/300?image=${event.id}`" height="150px">
                  
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

        <div class="map blank" id="js_map">

        </div>

      </v-flex>

    </v-layout>

  </div>

</template>


<script src="./js/leaflet/leaflet.js"></script>
<script src="./js/map_js.js"></script>


<script>

  import axios from 'axios'

  export default {

    data: vm => ({

      events : [

          {id:"0" ,title : "Sport 1 ICI", date : "27 Nov", hour : "14h" , NbPart : "3" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"1" ,title : "Sport 2 ICI", date : "28 Nov", hour : "15h" , NbPart : "4" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"2" ,title : "Sport 3 ICI", date : "29 Nov", hour : "16h" , NbPart : "5" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"3" ,title : "Sport 4 ICI", date : "30 Nov", hour : "17h" , NbPart : "6" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"4" ,title : "Sport 5 ICI", date : "30 Nov", hour : "18h" , NbPart : "7" , text : " Lorem IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"5" ,title : "Sport 6 ICI", date : "31 Nov", hour : "19h" , NbPart : "8" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"6" ,title : "Sport 7 ICI", date : "31 Nov", hour : "20h" , NbPart : "9" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"7" ,title : "Sport 8 ICI", date : "27 Nov", hour : "14h" , NbPart : "3" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"8" ,title : "Sport 9 ICI", date : "28 Nov", hour : "15h" , NbPart : "4" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"9" ,title : "Sport 10 ICI", date : "29 Nov", hour : "16h" , NbPart : "5" , text : " Lorem IpsumLorem IpsumLorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"10" ,title : "Sport 11 ICI", date : "30 Nov", hour : "17h" , NbPart : "6" , text : "Lorem IpsumLorem Ipsum Lorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"11" ,title : "Sport 12 ICI", date : "30 Nov", hour : "18h" , NbPart : "7" , text : "Lorem IpsumLorem Ipsum Lorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"12" ,title : "Sport 13 ICI", date : "31 Nov", hour : "19h" , NbPart : "8" , text : "Lorem IpsumLorem Ipsum Lorem Ipsum", lat: "48.70", long: "6.10"},
          {id:"13" ,title : "Sport 17 ICI", date : "31 Nov", hour : "20h" , NbPart : "9" , text : "Lorem IpsumLorem Ipsum Lorem Ipsum", lat: "48.70", long: "6.10"},

      ]
    }),

    computed: {
      
    },
    
    methods: {
    
    }
  }

</script>
