<template>

  <div class="summary">


    <div class="card">


      <h2>
        {{ locales[config.currentLang].privacyTitle }}
      </h2>





      <!-- ========================================
           INTRODUCTION
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacySubtitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyIntroText }}
        </p>


      </section>







      <!-- ========================================
           GENERAL CONDITIONS
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyGeneralTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyGeneralText }}
        </p>


      </section>








      <!-- ========================================
           AUTOMATIC DATA
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyAutomaticDataTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyAutomaticDataText }}
        </p>


      </section>








      <!-- ========================================
           DATA CONTROLLER
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyDataControllerTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyDataControllerText }}
        </p>


      </section>








      <!-- ========================================
           CONTACT FORM
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyContactFormTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyContactFormFields }}
        </p>


        <p>
          {{ locales[config.currentLang].privacyContactFormText }}
        </p>


      </section>








      <!-- ========================================
           EXTENDED CONTACT FORM
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyContactFormExtendedTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyContactFormExtendedText }}
        </p>


      </section>








      <!-- ========================================
           COOKIES
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyCookiesTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyCookiesText }}
        </p>


        <h3>
          {{ locales[config.currentLang].privacyCookiesSettingsTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyCookiesSettingsText }}
        </p>


      </section>








      <!-- ========================================
           MATOMO
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyMatomoTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyMatomoText }}
        </p>


      </section>








      <!-- ========================================
           SERVER LOG FILE
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyServerLogTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyServerLogText }}
        </p>



        <ul>


          <li>
            {{ locales[config.currentLang].privacyServerLogDownloaded }}
          </li>


          <li>
            {{ locales[config.currentLang].privacyServerLogRequestTime }}
          </li>


          <li>
            {{ locales[config.currentLang].privacyServerLogBrowser }}
          </li>


          <li>
            {{ locales[config.currentLang].privacyServerLogSystem }}
          </li>


          <li>
            {{ locales[config.currentLang].privacyServerLogReferer }}
          </li>


          <li>
            {{ locales[config.currentLang].privacyServerLogIp }}
          </li>


          <li>
            {{ locales[config.currentLang].privacyServerLogHost }}
          </li>


        </ul>



        <p>
          {{ locales[config.currentLang].privacyServerLogIpAnonymous }}
        </p>


      </section>








      <!-- ========================================
           SECURITY
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacySecurityTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacySecurityText }}
        </p>


      </section>








      <!-- ========================================
           DATA SUBJECTS
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyDataSubjectsTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyDataSubjectsText }}
        </p>


        <p>
          {{ locales[config.currentLang].privacyAuthorityText }}
        </p>


      </section>








      <!-- ========================================
           LINKS
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyLinksTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyLinksText }}
        </p>


      </section>








      <!-- ========================================
           CHANGES
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].privacyChangesTitle }}
        </h3>


        <p>
          {{ locales[config.currentLang].privacyChangesText }}
        </p>


        <p class="copyright">
          {{ locales[config.currentLang].privacyStatus }}
        </p>


      </section>




    </div>






    <div class="actions">


      <button
        @click="$router.push('/')"
      >

        {{ locales[config.currentLang].impressumBackButton }}

      </button>


    </div>


  </div>


</template>






<script setup>


import { locales } from '../locales'

import { ConfigData } from '../configData'



const props = defineProps({

  config:Object,

  data:Object

})


const config = props.config

const data = props.data



</script>







<style scoped>


.summary {


  max-width:800px;

  margin:auto;

  text-align:center;

}





.card {


  background:

    v-bind('ConfigData.colors.cardBg');


  padding:35px;


  border-radius:

    v-bind('ConfigData.colors.radiusXL');


  box-shadow:

    v-bind('ConfigData.colors.cardShadow');


}







h2 {


  margin-bottom:35px;


  color:

    v-bind('ConfigData.colors.primary');


}







.section {


  margin-bottom:35px;


  padding-bottom:25px;


  border-bottom:

    1px solid

    v-bind('ConfigData.colors.borderLight');


}







.section:last-child {


  border-bottom:none;


}







h3 {


  color:

    v-bind('ConfigData.colors.primary');


  margin-bottom:15px;


}







p {


  font-size:1rem;


  line-height:1.7;


  color:

    v-bind('ConfigData.colors.text');


}







ul {


  text-align:left;

  margin:20px auto;

  max-width:500px;

}







li {


  margin-bottom:8px;


  color:

    v-bind('ConfigData.colors.text');


}







.copyright {


  font-weight:700;


}







.actions {


  display:flex;

  justify-content:center;

  margin-top:30px;


}







.actions button {


  padding:12px 30px;


  border:none;


  border-radius:

    v-bind('ConfigData.colors.radius');


  background:

    v-bind('ConfigData.colors.buttonActive');


  color:

    v-bind('ConfigData.colors.buttonActiveText');


  font-weight:700;


  cursor:pointer;


  transition:.25s;


}







.actions button:hover {


  transform:translateY(-3px);


  box-shadow:

    0 10px 25px rgba(140,29,64,.25);


}



</style>