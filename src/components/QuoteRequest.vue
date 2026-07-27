<template>

  <div class="quote-card">


    <h2>
      {{ locales[config.currentLang].quoteRequestTitle }}
    </h2>




    <div class="form">


      <div
        v-for="field in quoteFields"
        :key="field.key"
        class="field-wrapper"
      >



        <label class="field-label">


          {{
            locales[config.currentLang][field.label]
            ||
            field.emailLabel
          }}


          <span
            v-if="field.required"
            class="required-star"
          >
            *
          </span>


        </label>






        <!-- INPUT -->

        <input

          v-if="field.type !== 'textarea'"

          :ref="el => setFieldRef(field.key, el)"

          v-model="form[field.key]"

          :type="field.type"

          :autocomplete="field.autocomplete"

          :maxlength="field.maxLength"

          :placeholder="
            locales[config.currentLang][field.placeholder]
          "

          :class="{
            error: errors[field.key]
          }"

          @input="validateField(field)"

          @blur="validateField(field)"

        />







        <!-- TEXTAREA -->

        <textarea

          v-else

          :ref="el => setFieldRef(field.key, el)"

          v-model="form[field.key]"

          :maxlength="field.maxLength"

          :rows="field.rows"

          :placeholder="
            locales[config.currentLang][field.placeholder]
          "

          :class="{
            error: errors[field.key]
          }"

          @input="validateField(field)"

          @blur="validateField(field)"

        />









        <!-- ERROR -->

        <small

          v-if="errors[field.key]"

          class="field-error"

        >

          {{
            getErrorMessage(errors[field.key])
          }}

        </small>



      </div>









      <button

        :disabled="sending"

        @click="sendRequest"

      >


        {{
          sending
          ?
          locales[config.currentLang].quoteSending
          :
          locales[config.currentLang].quoteSendButton
        }}


      </button>








      <p

        v-if="successMessage"

        class="success-message"

      >

        {{ successMessage }}

      </p>








      <p

        v-if="errorMessage"

        class="error-message"

      >

        {{ errorMessage }}

      </p>



    </div>


  </div>


</template>









<script setup>


import {
  reactive,
  ref
} from 'vue'


import { config } from '../config.js'

import { locales } from '../locales.js'


import { quoteFields } from '../../shared/quoteFields.js'







const props = defineProps({

  printRef:Object

})









/*
========================================
FORM
========================================
*/


const form = reactive({})


quoteFields.forEach(field=>{

  form[field.key]=''

})









/*
========================================
ERROR STATE
========================================
*/


const errors = reactive({})


quoteFields.forEach(field=>{

  errors[field.key]=''

})









/*
========================================
FIELD REFERENCES
========================================
*/


const fieldRefs={}



function setFieldRef(key,el){

  if(el){

    fieldRefs[key]=el

  }

}









const sending = ref(false)

const successMessage = ref('')

const errorMessage = ref('')









/*
========================================
VALIDATORS
========================================
*/


function validateEmail(value){


  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)


}






function validatePhone(value){


  return /^[0-9+\s().-]+$/.test(value)


}









/*
========================================
SINGLE FIELD VALIDATION
========================================
*/


function validateField(field){



  const value =
    form[field.key]?.trim() || ''





  errors[field.key]=''






  if(

    field.required &&
    !value

  ){

    errors[field.key]='required'

    return false

  }








  if(

    value &&
    field.maxLength &&
    value.length > field.maxLength

  ){

    errors[field.key]='maxlength'

    return false

  }








  if(

    field.validation === 'email' &&
    value &&
    !validateEmail(value)

  ){

    errors[field.key]='email'

    return false

  }








  if(

    field.validation === 'phone' &&
    value &&
    !validatePhone(value)

  ){

    errors[field.key]='phone'

    return false

  }






  return true


}









/*
========================================
FORM VALIDATION
========================================
*/


function validateForm(){


  let firstInvalid=null



  quoteFields.forEach(field=>{


    const valid =
      validateField(field)



    if(

      !valid &&
      !firstInvalid

    ){

      firstInvalid=field.key

    }


  })






  if(firstInvalid){


    fieldRefs[firstInvalid]?.focus()


    return false

  }




  return true


}









function getErrorMessage(type){



  const lang =
    locales[config.currentLang]




  switch(type){


    case 'required':

      return lang.quoteFieldRequired



    case 'email':

      return lang.quoteEmailInvalid



    case 'phone':

      return lang.quotePhoneInvalid



    case 'maxlength':

      return lang.quoteFieldTooLong



    default:

      return ''

  }


}









/*
========================================
PDF
========================================
*/


function blobToBase64(blob){


  return new Promise((resolve,reject)=>{


    const reader =
      new FileReader()



    reader.onloadend=()=>{


      resolve(reader.result)


    }



    reader.onerror=()=>{


      reject(
        new Error('Errore conversione PDF')
      )


    }



    reader.readAsDataURL(blob)


  })

}









/*
========================================
RESET
========================================
*/


function resetForm(){


  quoteFields.forEach(field=>{


    form[field.key]=''


    errors[field.key]=''


  })


}









/*
========================================
SEND
========================================
*/


async function sendRequest(){



  if(sending.value){

    return

  }






  successMessage.value=''

  errorMessage.value=''








  if(!validateForm()){


    errorMessage.value =
      locales[config.currentLang]
      .quoteFormRequiredFields



    return

  }







  sending.value=true







  try{



    const pdfBlob =
      await props.printRef.getPdfBlob()






    const pdfBase64 =
      await blobToBase64(pdfBlob)







    const cleanData={}



    quoteFields.forEach(field=>{


      cleanData[field.key] =
        form[field.key]?.trim() || ''


    })









    const response =
      await fetch(

        '/.netlify/functions/send-email',

        {

          method:'POST',


          headers:{

            'Content-Type':'application/json'

          },


          body:JSON.stringify({

            ...cleanData,

            pdf:pdfBase64

          })


        }

      )









    const result =
      await response.json()







    if(!result.success){


      throw new Error()

    }








    successMessage.value =

      locales[config.currentLang]
      .quoteSuccessMessage







    resetForm()






  }
  catch(error){



    errorMessage.value =

      locales[config.currentLang]
      .quoteErrorMessage



    console.error(error)



  }
  finally{


    sending.value=false


  }



}





</script>









<style scoped>


.quote-card{

  margin-top:30px;

  padding:25px;

  background:white;

  border-radius:12px;

  box-shadow:
    0 10px 30px rgba(0,0,0,.08);

}



.form{

  display:flex;

  flex-direction:column;

  gap:15px;

}



.field-wrapper{

  display:flex;

  flex-direction:column;

  gap:6px;

}



.field-label{

  text-align:left;

  font-size:.9rem;

  font-weight:600;

  color:#333;

}



.required-star{

  color:#dc2626;

  margin-left:3px;

}



input,
textarea{

  padding:12px;

  border:1px solid #ddd;

  border-radius:8px;

  font-size:1rem;

}



textarea{

  min-height:120px;

  resize:vertical;

}



.error{

  border-color:#dc2626 !important;

  background:#fff5f5;

}



.field-error{

  color:#dc2626;

  font-size:.85rem;

  text-align:left;

}



button{

  padding:12px 25px;

  border:none;

  border-radius:8px;

  background:#8c1d40;

  color:white;

  cursor:pointer;

  font-weight:600;

}



button:hover{

  opacity:.9;

}



button:disabled{

  opacity:.6;

  cursor:not-allowed;

}



.success-message{

  margin-top:10px;

  color:#16a34a;

  font-weight:600;

  text-align:center;

}



.error-message{

  margin-top:10px;

  color:#dc2626;

  font-weight:600;

  text-align:center;

}



</style>