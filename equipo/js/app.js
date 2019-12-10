new Vue({
  el: '#app',
  data () {
    return {

      equipos: null,
      idActualizar: -1,
      formActualizar:false,


      equipoAdd : {nombre:"",estadio:"",aforo:"",presupuesto:""},
      equipoUpdate : {id: "" ,nombre:"",estadio:"",aforo:"",presupuesto:""},

      info2: {nombre:"Villareal",estadio:"Madrigal",aforo:15000,presupuesto:2.92,jugadores:[]},

    }
  },
  mounted () {


    axios
      .get('http://localhost:8082/equipo/lista')      
      .then(response => (this.equipos = response.data))
      .catch(error => console.log(error))

  },

  methods : {
    borrarEquipo: function (equipo_id) {
      // Borramos de la lista
      axios
        .delete('http://localhost:8082/equipo/lista/' + equipo_id)
  },

    actualizarEquipo: function ( equipo) {
      // Actualizamos de la lista
      axios
        .put('http://localhost:8082/equipo/lista/' + equipo.id , {nombre: equipo.nombre , estadio: equipo.estadio , aforo: equipo.aforo , presupuesto: equipo.presupuesto} )
        .then(function (response) {
          console.log(response);
      })
        .catch(error => console.log(error))

        this.formActualizar = false;

    },

    crearEquipo: function () {
      // Actualizamos de la lista
      axios
        .post('http://localhost:8082/equipo/lista/add' , this.equipoAdd )
        .then(function (response) {
          console.log(response);
      })
        .catch(error => console.log(error))
    
    },

    verFormActualizar: function (equipo) {
      // Antes de mostrar el formulario de actualizar, rellenamos sus campos
      this.equipoUpdate.id = equipo.id;
      this.equipoUpdate.nombre = equipo.nombre;
      this.equipoUpdate.estadio = equipo.estadio;
      this.equipoUpdate.aforo = equipo.aforo;
      this.equipoUpdate.presupuesto = equipo.presupuesto;

      // Mostramos el formulario
      this.formActualizar = true;
  },

  }

})