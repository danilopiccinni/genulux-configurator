<template>

  <div class="quote-card">


    <h2>
      Richiedi preventivo
    </h2>



    <div class="form">


      <input
        v-model="form.name"
        placeholder="Nome e cognome"
        autocomplete="name"
      />



      <input
        v-model="form.email"
        placeholder="Email"
        type="email"
        autocomplete="email"
      />



      <textarea
        v-model="form.message"
        placeholder="Messaggio"
      ></textarea>





      <button
        @click="sendRequest"
        :disabled="sending"
      >

        {{
          sending
            ? 'Invio in corso...'
            : 'Invia richiesta'
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


import { reactive, ref } from 'vue'



const props = defineProps({

  printRef:Object

})





const form = reactive({

  name:'',

  email:'',

  message:''

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
      'Compila tutti i campi richiesti'


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


          body:JSON.stringify({


            name:form.name,


            email:form.email,


            message:form.message,


            pdf:pdfBase64


          })


        }

      )







    const result =
      await response.json()






    if(!result.success){


      throw new Error(
        'Invio richiesta fallito'
      )


    }






    successMessage.value =
      'Richiesta inviata correttamente'





    form.name = ''

    form.email = ''

    form.message = ''






  }catch(error){



    errorMessage.value =
      'Errore durante l’invio della richiesta'



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