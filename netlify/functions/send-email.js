import { Resend } from 'resend'


const resend = new Resend(
  process.env.RESEND_API_KEY
)


export async function handler(event) {


  if(event.httpMethod !== 'POST'){

    return {

      statusCode:405,

      body:JSON.stringify({

        success:false,

        message:'Method not allowed'

      })

    }

  }





  try {


    const body =
      JSON.parse(event.body)





    const {

      name,

      email,

      message

    } = body






    const result =
      await resend.emails.send({


        from:
          'Genulux <onboarding@resend.dev>',


        to:
          [
            'danilop.webdev@gmail.com'
          ],


        subject:
          'Nuova richiesta Genulux',


        html:


`
<h2>Nuova richiesta dal configuratore</h2>


<p>
<strong>Nome:</strong>
${name}
</p>


<p>
<strong>Email:</strong>
${email}
</p>


<p>
<strong>Messaggio:</strong>
</p>

<p>
${message}
</p>
`


      })






    return {


      statusCode:200,


      body:JSON.stringify({

        success:true,

        data:result


      })


    }





  } catch(error){


    return {


      statusCode:500,


      body:JSON.stringify({

        success:false,

        error:error.message


      })


    }


  }


}