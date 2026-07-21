<template>

  <div class="summary">


    <div class="card">


      <h2>
        Impressum
      </h2>





      <!-- ========================================
           AZIENDA
      ========================================= -->

      <section class="section">


        <h3>
          AGS-systems GmbH
        </h3>


        <p>
          <strong>
            Geschäftssitz:
          </strong>

          Staben 47B |
          39025 Naturns |
          BZ |
          Italien
        </p>



        <p>

          <strong>
            Logistik:
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
          Kontakt
        </h3>



        <p>

          <strong>
            Telefon:
          </strong>

          +39 0473 666376

        </p>



        <p>

          <strong>
            Email:
          </strong>

          info@ags-systems.com

        </p>



        <p>

          <strong>
            Web:
          </strong>

          www.ags-systems.info

        </p>


      </section>








      <!-- ========================================
           DATI FISCALI
      ========================================= -->

      <section class="section">


        <h3>
          Unternehmensdaten
        </h3>



        <p>

          <strong>
            Gesetzlicher Vertreter:
          </strong>

          Thomas Alber

        </p>



        <p>

          <strong>
            Empfängerkodex:
          </strong>

          M5UXCR1

        </p>



        <p>

          <strong>
            MwSt.-Nr. / P.IVA:
          </strong>

          IT02509250219

        </p>


      </section>








      <!-- ========================================
           ODR
      ========================================= -->

      <section class="section">


        <h3>
          EU Online-Streitbeilegung
        </h3>



        <p>

          Pflichtinformation nach EU-Verordnung Nr. 524/2013
          des Europäischen Parlaments und Rats:

        </p>



        <p>

          Plattform zur Online-Beilegung
          verbraucherrechtlicher Streitigkeiten (ODR)
          der Europäischen Kommission:

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
          Haftungsausschluss
        </h3>



        <p>

          Die AGS-systems GmbH bemüht sich,
          nach bestem Vermögen dafür Sorge zu tragen,
          dass die in diesem Internetauftritt enthaltenen
          Informationen zutreffend sind.

        </p>



        <p>

          Eine Haftung oder Garantie für die Aktualität,
          Richtigkeit und Vollständigkeit der zur Verfügung
          gestellten Informationen ist jedoch ausgeschlossen.

        </p>



        <p>

          Ferner ist die AGS-systems GmbH für den Inhalt
          der über Hyperlink extern verbundenen Internetauftritte
          nicht verantwortlich.

        </p>



        <p>

          Die AGS-systems GmbH behält sich vor,
          ohne Ankündigung, Änderungen oder Ergänzungen
          der bereitgestellten Informationen vorzunehmen.

        </p>


      </section>








      <!-- ========================================
           DATENSCHUTZ
      ========================================= -->

      <section class="section">


        <h3>
          Verantwortlicher der Verarbeitung personenbezogener Daten
        </h3>



        <p>

          Verantwortlich für die Verarbeitung personenbezogener Daten,
          die bei Website-Zugriff und -Benutzung erhoben und verarbeitet
          werden, ist die AGS-systems GmbH, 39025 Naturns.

        </p>



        <p>

          Ansprechpartner für den Datenschutz ist
          Herr Thomas Alber.

        </p>



        <p>

          Detaillierte Informationen darüber,
          wie die personenbezogenen Daten der Website-Besucher
          verwaltet werden, finden Sie unter dem Punkt Datenschutz.

        </p>


      </section>








      <!-- ========================================
           COPYRIGHT
      ========================================= -->

      <section class="section">


        <h3>
          Bildquellen
        </h3>


        <p>
          AGS-systems GmbH © 2025
        </p>



        <h3>
          Urheberrecht
        </h3>



        <p>

          Das Layout der Homepage, die verwendeten Grafiken
          sowie die Inhalte des Internetauftritts der AGS-systems GmbH
          sind urheberrechtlich geschützt.

        </p>



        <p>

          Die Vervielfältigung von Informationen,
          insbesondere die Verwendung von Texten,
          Textteilen oder Bildmaterial bedarf der vorherigen
          schriftlichen Genehmigung der AGS-systems GmbH.

        </p>



        <p class="copyright">

          © AGS-systems GmbH 2025 -
          Alle Rechte vorbehalten.

        </p>


      </section>



    </div>






    <div class="actions">


      <button
        @click="$router.push('/')"
      >

        Zum Konfigurator

      </button>


    </div>



  </div>


</template>





<script setup>

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