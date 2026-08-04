<template>

  <footer class="footer">


    <div class="footer-content">



      <!-- ========================================
           COMPANY
      ========================================= -->

      <div class="footer-company">


        <strong>
          {{ locales[config.currentLang || 'it'].footerCompanyName }}
        </strong>


        <span>
          {{ locales[config.currentLang || 'it'].footerCompanyAddress }}
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
      LEGAL LINKS
  ========================================= -->


  <div class="footer-legal">


    <RouterLink

      to="/impressum"

      class="footer-link"

    >

      {{ locales[config.currentLang || 'it'].impressum }}

    </RouterLink>





    <span>
      |
    </span>





    <RouterLink

      to="/privacy"

      class="footer-link"

    >

      {{ locales[config.currentLang || 'it'].privacyTitle }}

    </RouterLink>


  </div>



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



  padding:

    16px 40px;



  background:

    rgba(255,255,255,.92);



  backdrop-filter:

    blur(14px);



  -webkit-backdrop-filter:

    blur(14px);



  border-top:

    1px solid rgba(255,255,255,.45);



  box-shadow:


    0 -4px 20px rgba(0,0,0,.06);



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


  align-items:center;


  justify-content:space-between;



  gap:20px;



}









/*
========================================
COMPANY
========================================
*/


.footer-company{


  display:flex;


  flex-direction:column;



  gap:2px;



}







.footer-company strong{


  color:

    v-bind('data.colors.primary');



  font-size:.9rem;


  font-weight:700;



}







.footer-company span{


  color:

    v-bind('data.colors.textSecondary');



  font-size:.78rem;



}









/*
========================================
CONTACT
========================================
*/


.footer-contact{


  display:flex;


  align-items:center;



  gap:10px;



  font-size:.82rem;



}







.footer-contact span{


  color:

    v-bind('data.colors.textLight');



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



  font-size:.85rem;



  font-weight:700;



  text-decoration:none;



  transition:.25s ease;



}







.footer-link:hover{


  color:

    v-bind('data.colors.primaryHover');



}


/*
========================================
LEGAL LINKS
========================================
*/


.footer-legal{


  display:flex;


  align-items:center;


  gap:10px;


}






/*
========================================
TABLET
========================================
*/


@media(max-width:900px){


  .footer{


    padding:

      14px 25px;



  }




  .footer-content{


    gap:

      15px;



  }



}









/*
========================================
MOBILE
========================================
*/


@media(max-width:600px){



  .footer{


    padding:

      14px 15px;



  }






  .footer-content{


    flex-direction:column;



    justify-content:center;


    text-align:center;



    gap:

      10px;



  }






  .footer-company{


    align-items:center;



  }






  .footer-contact{


    justify-content:center;


    flex-wrap:wrap;



    font-size:.78rem;



  }






  .footer-link{


    font-size:.8rem;



  }

  .footer-legal{

  justify-content:center;

}



}









/*
========================================
VERY SMALL
========================================
*/


@media(max-width:380px){



  .footer-contact{


    flex-direction:column;



    gap:

      4px;



  }




  .footer-contact span{


    display:none;



  }



}

</style>