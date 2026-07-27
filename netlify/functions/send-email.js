// netlify/functions/send-email.js


import { Resend } from 'resend'

import { quoteFields } from './quoteFields.js'





const resend = new Resend(
  process.env.RESEND_API_KEY
)









/*
============================================================
SECURITY HELPERS
============================================================
*/


function escapeHtml(value=''){


  return String(value)

    .replace(/&/g,'&amp;')

    .replace(/</g,'&lt;')

    .replace(/>/g,'&gt;')

    .replace(/"/g,'&quot;')

    .replace(/'/g,'&#039;')


}








function sanitizeText(value=''){


  return String(value)

    .trim()

    .replace(/\s+/g,' ')


}








function validateEmail(email){


  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    .test(email)


}








function validatePhone(phone){


  return /^[0-9+\s().-]+$/.test(phone)


}









/*
============================================================
VALIDATION
============================================================
*/


function validateFields(data){


  for(const field of quoteFields){



    const value =
      data[field.key]





    /*
    REQUIRED
    */

    if(

      field.required &&

      !value?.toString().trim()

    ){

      return `${field.key} is required`

    }





    /*
    MAX LENGTH
    */

    if(

      value &&

      field.maxLength &&

      value.length > field.maxLength

    ){

      return `${field.key} exceeds maximum length`

    }





    /*
    FORMAT VALIDATION
    */

    if(

      value &&

      field.validation === 'email'

    ){

      if(!validateEmail(value)){


        return 'Invalid email format'


      }

    }





    if(

      value &&

      field.validation === 'phone'

    ){

      if(!validatePhone(value)){


        return 'Invalid phone format'


      }

    }



  }





  return null


}









/*
============================================================
EMAIL TABLE GENERATOR
============================================================
*/


function generateEmailRows(data){



  return quoteFields

    .map(field=>{


      const value =
        data[field.key]



      if(
        !value
      ){

        return ''

      }





      return `

<tr>

<td style="
padding:8px 0;
width:180px;
vertical-align:top;
">

<strong>

${escapeHtml(field.emailLabel)}

</strong>

</td>


<td style="
padding:8px 0;
">

${escapeHtml(value).replace(/\n/g,'<br>')}

</td>


</tr>

`

    })

    .join('')

}









/*
============================================================
PDF VALIDATION
============================================================
*/


function extractPdf(pdf){


  if(
    !pdf ||
    typeof pdf !== 'string'
  ){

    return null

  }




  const parts =
    pdf.split(',')



  if(parts.length !== 2){

    return null

  }



  return parts[1]


}









/*
============================================================
NETLIFY FUNCTION
============================================================
*/


export async function handler(event){



  if(event.httpMethod !== 'POST'){


    return {


      statusCode:405,


      body:JSON.stringify({

        success:false,

        error:'Method not allowed'

      })


    }


  }






  try{



    const body =
      JSON.parse(event.body)






    const pdfContent =
      extractPdf(body.pdf)






    if(!pdfContent){


      return {


        statusCode:400,


        body:JSON.stringify({

          success:false,

          error:'Missing PDF attachment'

        })


      }


    }








    /*
    NORMALIZE DATA
    */


    const data = {}



    quoteFields.forEach(field=>{


      data[field.key] =
        sanitizeText(
          body[field.key] || ''
        )


    })








    /*
    VALIDATE
    */


    const validationError =
      validateFields(data)






    if(validationError){


      return {


        statusCode:400,


        body:JSON.stringify({

          success:false,

          error:validationError

        })


      }


    }









    /*
    SEND EMAIL
    */


    const emailRows =
      generateEmailRows(data)







    const result =
      await resend.emails.send({



        from:

          'Genulux <onboarding@resend.dev>',




        to:[

          'danilop.webdev@gmail.com'

        ],




        subject:

          'Neue Angebotsanfrage - Genulux Konfigurator',





        html:

`

<div

style="
font-family:Arial,Helvetica,sans-serif;
max-width:700px;
margin:auto;
line-height:1.6;
color:#222;
"

>


<h2>

Neue Angebotsanfrage

</h2>



<p>

Es wurde eine neue Anfrage über den

<strong>

Genulux-Konfigurator

</strong>

eingereicht.

</p>



<p>

Die vollständige Konfiguration befindet sich

im angehängten PDF.

</p>




<hr style="margin:30px 0;">



<h3>

Kundendaten

</h3>



<table

style="
width:100%;
border-collapse:collapse;
"

>


${emailRows}


</table>





<hr style="margin:30px 0;">



<p

style="
font-size:13px;
color:#666;
"

>


Diese E-Mail wurde automatisch vom

Genulux-Konfigurator generiert.


</p>



</div>

`,







        attachments:[

          {

            filename:

              'Genulux-Konfiguration.pdf',


            content:

              pdfContent


          }

        ]



      })









    return {


      statusCode:200,


      body:JSON.stringify({


        success:true,


        data:result


      })


    }





  }

  catch(error){



    console.error(error)





    return {


      statusCode:500,


      body:JSON.stringify({


        success:false,


        error:error.message || 'Server error'


      })


    }



  }



}