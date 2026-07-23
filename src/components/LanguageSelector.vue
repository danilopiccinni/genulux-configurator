<template>

  <div class="language-selector">


    <label
      for="lang-select"
      class="language-label"
    >

      {{ locales[config.currentLang].language }}

    </label>



    <select
      id="lang-select"
      v-model="config.currentLang"
      class="language-select"
    >

      <option
        v-for="(label, code) in availableLangs"
        :key="code"
        :value="code"
      >

        {{ label }}

      </option>


    </select>


  </div>


</template>





<script setup>

import { config } from '../config.js'

import { locales } from '../locales'



const availableLangs = {


  it:'Italiano',

  en:'English',

  de:'Deutsch',

  es:'Español',

  fr:'Français'


}


</script>







<style scoped>


/*
========================================
LANGUAGE CONTAINER
========================================
*/


.language-selector{


  display:flex;

  align-items:center;

  gap:8px;


  height:40px;


  flex-shrink:0;


}





/*
========================================
LABEL
========================================
*/


.language-label{


  color:white;


  font-size:.85rem;


  font-weight:600;


  white-space:nowrap;


}








/*
========================================
SELECT
========================================
*/


.language-select{


  height:34px;


  padding:

    0 10px;



  border-radius:8px;



  border:

    1px solid rgba(255,255,255,.35);



  background:white;



  color:#333;



  font-size:.8rem;



  font-weight:600;



  cursor:pointer;



  outline:none;



  transition:.25s ease;


}





.language-select:hover{


  border-color:white;


}





.language-select:focus{


  box-shadow:

    0 0 0 3px rgba(255,255,255,.25);


}









/*
========================================
TABLET
========================================
*/


@media(max-width:900px){


  .language-label{


    display:none;


  }



  .language-select{


    height:32px;


    font-size:.75rem;


    padding:0 8px;


  }


}








/*
========================================
MOBILE
========================================
*/


@media(max-width:500px){


  .language-selector{


    height:34px;


  }



  .language-select{


    min-width:70px;


    height:30px;


    font-size:.7rem;


    padding:0 6px;


  }


}


</style>