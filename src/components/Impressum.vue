<template>

  <div class="summary">


    <div class="card">


      <h2>
        {{ locales[config.currentLang].impressumTitle }}
      </h2>





      <!-- ========================================
           AZIENDA
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].impressumCompany }}
        </h3>


        <p>
          <strong>
            {{ locales[config.currentLang].impressumHeadquarters }}:
          </strong>

          Staben 47B |
          39025 Naturns |
          BZ |
          Italien
        </p>



        <p>

          <strong>
            {{ locales[config.currentLang].impressumLogistics }}:
          </strong>

          Peter Mitterhofer Str. 12 |
          39025 Naturns |
          BZ |
          Italien

        </p>


      </section>







      <!-- ========================================
           KONTAKT
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].impressumContact }}
        </h3>



        <p>

          <strong>
            {{ locales[config.currentLang].impressumPhone }}:
          </strong>

          +39 0473 666376

        </p>



        <p>

          <strong>
            {{ locales[config.currentLang].impressumEmail }}:
          </strong>

          info@ags-systems.com

        </p>



        <p>

          <strong>
            {{ locales[config.currentLang].impressumWeb }}:
          </strong>

          www.ags-systems.info

        </p>


      </section>








      <!-- ========================================
           DATI FISCALI
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].impressumCompanyData }}
        </h3>



        <p>

          <strong>
            {{ locales[config.currentLang].impressumLegalRepresentative }}:
          </strong>

          Thomas Alber

        </p>



        <p>

          <strong>
            {{ locales[config.currentLang].impressumRecipientCode }}:
          </strong>

          M5UXCR1

        </p>



        <p>

          <strong>
            {{ locales[config.currentLang].impressumVatNumber }}:
          </strong>

          IT02509250219

        </p>


      </section>








      <!-- ========================================
           ODR
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].impressumOdrTitle }}
        </h3>



        <p>

          {{ locales[config.currentLang].impressumOdrText1 }}

        </p>



        <p>

          {{ locales[config.currentLang].impressumOdrText2 }}

        </p>



        <a
          href="http://ec.europa.eu/consumers/odr/"
          target="_blank"
        >
          http://ec.europa.eu/consumers/odr/
        </a>


      </section>








      <!-- ========================================
           HAFTUNG
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].impressumDisclaimerTitle }}
        </h3>



        <p>

          {{ locales[config.currentLang].impressumDisclaimerText1 }}

        </p>



        <p>

          {{ locales[config.currentLang].impressumDisclaimerText2 }}

        </p>



        <p>

          {{ locales[config.currentLang].impressumDisclaimerText3 }}

        </p>



        <p>

          {{ locales[config.currentLang].impressumDisclaimerText4 }}

        </p>


      </section>








      <!-- ========================================
           DATENSCHUTZ
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].impressumPrivacyTitle }}
        </h3>



        <p>

          {{ locales[config.currentLang].impressumPrivacyText1 }}

        </p>



        <p>

          {{ locales[config.currentLang].impressumPrivacyText2 }}

        </p>



        <p>

          {{ locales[config.currentLang].impressumPrivacyText3 }}

        </p>


      </section>








      <!-- ========================================
           COPYRIGHT
      ========================================= -->

      <section class="section">


        <h3>
          {{ locales[config.currentLang].impressumCopyrightImages }}
        </h3>


        <p>
          {{ locales[config.currentLang].impressumCopyrightText3 }}
        </p>



        <h3>
          {{ locales[config.currentLang].impressumCopyright }}
        </h3>



        <p>

          {{ locales[config.currentLang].impressumCopyrightText1 }}

        </p>



        <p>

          {{ locales[config.currentLang].impressumCopyrightText2 }}

        </p>



        <p class="copyright">

          {{ locales[config.currentLang].impressumCopyrightText3 }}

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

import { useRouter } from 'vue-router'

import { ConfigData } from '../configData'

const props = defineProps({

  config:Object,

  data:Object

})

const config = props.config
const data = props.data


const router = useRouter()


</script>






<style scoped>


.summary {


  max-width:800px;

  margin:auto;

  text-align:center;

}





.card {


  background:v-bind('ConfigData.colors.cardBg');


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







a {


  color:

    v-bind('ConfigData.colors.primary');


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