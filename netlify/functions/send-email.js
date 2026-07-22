import { Resend } from 'resend'

const requiredFields = {

  name: true,

  company: false,

  email: true,

  phone: false,

  country: false,

  city: false,

  message: false

}

const resend = new Resend(
  process.env.RESEND_API_KEY
)

export async function handler(event){

  if(event.httpMethod !== 'POST'){

    return{

      statusCode:405,

      body:JSON.stringify({

        success:false,

        message:'Method not allowed'

      })

    }

  }

  try{

    const body = JSON.parse(event.body)

    const {

      name,

      company,

      email,

      phone,

      country,

      city,

      message,

      pdf

    } = body

    const fields = {

      name,

      company,

      email,

      phone,

      country,

      city,

      message

    }

    /*
    ============================================================
    REQUIRED FIELDS VALIDATION
    ============================================================
    */

    for(const field in requiredFields){

      if(

        requiredFields[field] &&
        !fields[field]?.toString().trim()

      ){

        return{

          statusCode:400,

          body:JSON.stringify({

            success:false,

            error:`${field} is required`

          })

        }

      }

    }

    /*
    ============================================================
    SEND EMAIL
    ============================================================
    */

    const result = await resend.emails.send({

      from:
        'Genulux <onboarding@resend.dev>',

      to:[
        'danilop.webdev@gmail.com'
      ],

      subject:
        'Neue Angebotsanfrage - Genulux Konfigurator',

      html:

`
<div style="
font-family:Arial,Helvetica,sans-serif;
max-width:700px;
margin:auto;
line-height:1.6;
color:#222;
">

<h2 style="margin-bottom:8px;">
Neue Angebotsanfrage
</h2>

<p>
Es wurde eine neue Angebotsanfrage über den
<strong>Genulux-Konfigurator</strong>
eingereicht.
</p>

<p>
Die vollständige Konfiguration befindet sich
im angehängten PDF.
</p>

<hr style="margin:30px 0;">

<h3 style="margin-bottom:15px;">
Kundendaten
</h3>

<table
style="
width:100%;
border-collapse:collapse;
">

<tr>
<td style="padding:8px 0;width:180px;">
<strong>Name</strong>
</td>

<td>
${name}
</td>
</tr>

<tr>
<td style="padding:8px 0;">
<strong>Firma</strong>
</td>

<td>
${company || '-'}
</td>
</tr>

<tr>
<td style="padding:8px 0;">
<strong>E-Mail</strong>
</td>

<td>
${email}
</td>
</tr>

<tr>
<td style="padding:8px 0;">
<strong>Telefon</strong>
</td>

<td>
${phone || '-'}
</td>
</tr>

<tr>
<td style="padding:8px 0;">
<strong>Land</strong>
</td>

<td>
${country || '-'}
</td>
</tr>

<tr>
<td style="padding:8px 0;">
<strong>Ort</strong>
</td>

<td>
${city || '-'}
</td>
</tr>

</table>

<hr style="margin:30px 0;">

<h3>
Nachricht
</h3>

<div
style="
background:#f7f7f7;
padding:15px;
border-radius:8px;
">

${message || 'Keine Nachricht angegeben.'}

</div>

<hr style="margin:30px 0;">

<p style="font-size:13px;color:#666;">

Diese E-Mail wurde automatisch vom
Genulux-Konfigurator generiert.

</p>

</div>
`,

      attachments:[

        {

          filename:'Genulux.pdf',

          content:pdf.split(',')[1]

        }

      ]

    })

    return{

      statusCode:200,

      body:JSON.stringify({

        success:true,

        data:result

      })

    }

  }catch(error){

    return{

      statusCode:500,

      body:JSON.stringify({

        success:false,

        error:error.message

      })

    }

  }

}