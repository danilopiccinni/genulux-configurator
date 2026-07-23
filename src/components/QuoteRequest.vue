<template>

  <div class="quote-card">


    <h2>
      {{ locales[config.currentLang].quoteRequestTitle }}
    </h2>



    <div class="form">

      <input
        v-model="form.name"
        :placeholder="locales[config.currentLang].quoteNamePlaceholder"
      />

      <input
        v-model="form.company"
        :placeholder=locales[config.currentLang].quoteCompanyPlaceholder
      />

      <input
        v-model="form.email"
        type="email"
        :placeholder=locales[config.currentLang].quoteEmailPlaceholder
      />

      <input
        v-model="form.phone"
        :placeholder=locales[config.currentLang].quotePhonePlaceholder
      />

      <input
        v-model="form.country"
        :placeholder=locales[config.currentLang].quoteCountryPlaceholder
      />

      <input
        v-model="form.city"
        :placeholder=locales[config.currentLang].quoteCityPlaceholder
      />

      <textarea
        v-model="form.message"
        :placeholder=locales[config.currentLang].quoteMessagePlaceholder
      ></textarea>

      <button
        :disabled="sending"
        @click="sendRequest"
      >
        {{ sending ? locales[config.currentLang].quoteSending : locales[config.currentLang].quoteSendButton }}
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


import { reactive, ref } from 'vue'

import { config } from '../config.js'

import { locales } from '../locales.js'



const props = defineProps({

  printRef:Object

})




const form = reactive({

  name: '',

  company: '',

  email: '',

  phone: '',

  country: '',

  city: '',

  message: ''

})




const sending = ref(false)

const successMessage = ref('')

const errorMessage = ref('')





function blobToBase64(blob){


  return new Promise((resolve,reject)=>{


    const reader =
      new FileReader()



    reader.onloadend = ()=>{


      resolve(
        reader.result
      )


    }



    reader.onerror = ()=>{


      reject(
        new Error('Errore conversione PDF')
      )


    }



    reader.readAsDataURL(blob)



  })


}





async function sendRequest(){


  if(sending.value){

    return

  }




  successMessage.value = ''

  errorMessage.value = ''





  if(
    !form.name ||
    !form.email ||
    !form.message
  ){


    errorMessage.value =
      locales[config.currentLang].quoteFormRequiredFields


    return

  }






  sending.value = true






  try {



    const pdfBlob =
      await props.printRef.getPdfBlob()





    const pdfBase64 =
      await blobToBase64(pdfBlob)






    const response =
      await fetch(

        '/.netlify/functions/send-email',

        {


          method:'POST',


          headers:{

            'Content-Type':'application/json'

          },


          body: JSON.stringify({

            name: form.name,

            company: form.company,

            email: form.email,

            phone: form.phone,

            country: form.country,

            city: form.city,

            message: form.message,

            pdf: pdfBase64

          })


        }

      )







    const result =
      await response.json()






    if(!result.success){


      throw new Error(
        locales[config.currentLang].quoteErrorMessage
      )


    }






    successMessage.value =
      locales[config.currentLang].quoteSuccessMessage





    form.name = ''

    form.email = ''

    form.message = ''






  }catch(error){



    errorMessage.value =
      locales[config.currentLang].quoteErrorMessage



    console.error(
      error
    )



  }finally{


    sending.value = false


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