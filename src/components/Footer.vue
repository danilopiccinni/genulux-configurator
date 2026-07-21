<template>

  <footer class="footer">


    <div class="footer-content">



      <!-- ========================================
           COMPANY
      ========================================= -->

      <div class="footer-company">


        <strong>
          AGS-systems GmbH
        </strong>


        <span>
          Staben 47B · 39025 Naturns (BZ) · Italia
        </span>


      </div>






      <!-- ========================================
           CONTACT
      ========================================= -->


      <div class="footer-contact">


        <a href="tel:+390473666376">

          +39 0473 666376

        </a>



        <span>
          •
        </span>



        <a href="mailto:info@ags-systems.com">

          info@ags-systems.com

        </a>


      </div>







      <!-- ========================================
           IMPRESSUM LINK
      ========================================= -->


      <RouterLink

        to="/impressum"

        class="footer-link"

      >

        {{ locales[config.currentLang || 'it'].impressum }}


      </RouterLink>



    </div>


  </footer>


</template>





<script setup>


import { RouterLink } from 'vue-router'


import { locales } from '../locales'





const props = defineProps({

  config:Object,

  data:Object

})





const config = props.config

const data = props.data



</script>







<style scoped>


/*
========================================
FOOTER
========================================
*/


.footer{


  margin-top:auto;

  position:relative;

  z-index:5;


  padding:28px 40px;



  background:


    rgba(255,255,255,.88);



  backdrop-filter:

    blur(18px);



  -webkit-backdrop-filter:

    blur(18px);



  border-top:

    1px solid rgba(255,255,255,.35);



  box-shadow:


    0 -8px 35px rgba(0,0,0,.08);



}







/*
========================================
CONTENT
========================================
*/


.footer-content{


  max-width:1400px;


  margin:0 auto;



  display:flex;


  justify-content:space-between;


  align-items:center;



  gap:30px;



  flex-wrap:wrap;



}








/*
========================================
COMPANY
========================================
*/


.footer-company{


  display:flex;


  flex-direction:column;



  gap:5px;



}







.footer-company strong{


  color:

    v-bind('data.colors.primary');



  font-size:1rem;


  font-weight:700;



}







.footer-company span{


  color:

    v-bind('data.colors.textSecondary');



  font-size:.9rem;



}









/*
========================================
CONTACT
========================================
*/


.footer-contact{


  display:flex;


  align-items:center;



  gap:12px;



  flex-wrap:wrap;



  font-size:.9rem;



}







.footer-contact a{


  color:

    v-bind('data.colors.textSecondary');



  text-decoration:none;



  transition:.25s ease;



}







.footer-contact a:hover{


  color:

    v-bind('data.colors.primary');



}









/*
========================================
IMPRESSUM
========================================
*/


.footer-link{


  color:

    v-bind('data.colors.primary');



  font-weight:600;



  text-decoration:none;



  transition:.25s ease;



}







.footer-link:hover{


  color:

    v-bind('data.colors.primaryHover');



  transform:

    translateY(-2px);



}









/*
========================================
RESPONSIVE
========================================
*/


@media(max-width:900px){



  .footer{


    padding:25px;



  }






  .footer-content{


    flex-direction:column;



    text-align:center;



  }






  .footer-company,
  .footer-contact{


    align-items:center;



    justify-content:center;



  }



}



</style>