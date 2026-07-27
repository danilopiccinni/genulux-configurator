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

          :aria-invalid="!!errors[field.key]"

          :aria-describedby="`${field.key}-error`"

          @input="onFieldInput(field)"

          @blur="onFieldBlur(field)"

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

          :aria-invalid="!!errors[field.key]"

          :aria-describedby="`${field.key}-error`"

          @input="onFieldInput(field)"

          @blur="onFieldBlur(field)"

        ></textarea>





        <!-- ERROR -->

        <small

          v-if="errors[field.key]"

          :id="`${field.key}-error`"

          class="field-error"

        >

          {{ getErrorMessage(errors[field.key]) }}

        </small>

      </div>




      <button
        :disabled="sending"
        @click="sendRequest"
      >

        <template v-if="sending">

          <span class="spinner"></span>

          {{ locales[config.currentLang].quoteSending }}

        </template>

        <template v-else>

          {{ locales[config.currentLang].quoteSendButton }}

        </template>

      </button>





      <p

        v-if="successMessage"

        ref="successRef"

        class="success-message"

        tabindex="-1"

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
  ref,
  nextTick
} from 'vue'

import { config } from '../config.js'
import { locales } from '../locales.js'
import { quoteFields } from '../../shared/quoteFields.js'

const props = defineProps({
  printRef: Object
})

/*
========================================
FORM
========================================
*/

const form = reactive({})
quoteFields.forEach(field => {
  form[field.key] = ''
})

/*
========================================
ERROR STATE
========================================
*/

const errors = reactive({})
quoteFields.forEach(field => {
  errors[field.key] = ''
})

/*
========================================
TOUCHED FIELDS
========================================
*/

const touched = reactive({})
quoteFields.forEach(field => {
  touched[field.key] = false
})

/*
========================================
SUBMITTED
========================================
*/

const submitted = ref(false)

/*
========================================
FIELD REFERENCES
========================================
*/

const fieldRefs = {}

function setFieldRef(key, el) {

  if (el) {

    fieldRefs[key] = el

  }

}

/*
========================================
STATE
========================================
*/

const successRef = ref(null)
const sending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

/*
========================================
HELPERS
========================================
*/

function getFieldValue(key) {

  return form[key]?.trim() || ''

}

/*
========================================
VALIDATORS
========================================
*/

function validateEmail(value) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

}

function validatePhone(value) {

  return /^[0-9+\s().-]+$/.test(value)

}

/*
========================================
FIELD EVENTS
========================================
*/

function onFieldInput(field) {

  touched[field.key] = true

  if (
    submitted.value ||
    errors[field.key]
  ) {

    validateField(field)

  }

}

function onFieldBlur(field) {

  touched[field.key] = true

  validateField(field)

}

/*
========================================
SINGLE FIELD VALIDATION
========================================
*/

function validateField(field) {

  const value = getFieldValue(field.key)

  errors[field.key] = ''

  /*
  REQUIRED

  Lo mostriamo solo se:
  - il form è stato inviato
  - oppure il campo è già stato toccato
  */

  if (
    field.required &&
    !value &&
    (
      submitted.value ||
      touched[field.key]
    )
  ) {

    errors[field.key] = 'required'

    return false

  }

  /*
  MAX LENGTH
  */

  if (
    value &&
    field.maxLength &&
    value.length > field.maxLength
  ) {

    errors[field.key] = 'maxlength'

    return false

  }

  /*
  EMAIL
  */

  if (
    field.validation === 'email' &&
    value &&
    !validateEmail(value)
  ) {

    errors[field.key] = 'email'

    return false

  }

  /*
  PHONE
  */

  if (
    field.validation === 'phone' &&
    value &&
    !validatePhone(value)
  ) {

    errors[field.key] = 'phone'

    return false

  }

  return true

}

/*
========================================
FORM VALIDATION
========================================
*/

function validateForm() {

  submitted.value = true

  let firstInvalid = null

  quoteFields.forEach(field => {

    const valid = validateField(field)

    if (
      !valid &&
      !firstInvalid
    ) {

      firstInvalid = field.key

    }

  })

  if (firstInvalid) {

    const element = fieldRefs[firstInvalid]

    element?.focus()

    element?.scrollIntoView({

      behavior: 'smooth',

      block: 'center'

    })

    return false

  }

  return true

}

/*
========================================
ERROR MESSAGES
========================================
*/

function getErrorMessage(type) {

  const lang = locales[config.currentLang]

  switch (type) {

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

function blobToBase64(blob) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader()

    reader.onloadend = () => {

      resolve(reader.result)

    }

    reader.onerror = () => {

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

function resetForm() {

  quoteFields.forEach(field => {

    form[field.key] = ''

    errors[field.key] = ''

    touched[field.key] = false

  })

  submitted.value = false

}

/*
========================================
SEND
========================================
*/

async function sendRequest() {

  if (sending.value) {

    return

  }

  successMessage.value = ''
  errorMessage.value = ''

  if (!validateForm()) {

    errorMessage.value =
      locales[config.currentLang]
        .quoteFormRequiredFields

    return

  }

  sending.value = true

  try {

    const pdfBlob =
      await props.printRef.getPdfBlob()

    const pdfBase64 =
      await blobToBase64(pdfBlob)

    const cleanData = {}

    quoteFields.forEach(field => {

      cleanData[field.key] =
        getFieldValue(field.key)

    })

    const response =
      await fetch(
        '/.netlify/functions/send-email',
        {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },

          body: JSON.stringify({

            ...cleanData,

            pdf: pdfBase64

          })

        }
      )

    const result =
      await response.json()

    if (!result.success) {

      throw new Error(result.error)

    }

    successMessage.value =
      locales[config.currentLang]
        .quoteSuccessMessage

    resetForm()

    await nextTick()

      successRef.value?.focus()

      successRef.value?.scrollIntoView({

        behavior:'smooth',

        block:'center'

      })

  }
  catch (error) {

    errorMessage.value =
      locales[config.currentLang]
        .quoteErrorMessage

    console.error(error)

  }
  finally {

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

  transition:
    border-color .2s ease,
    box-shadow .2s ease,
    background .2s ease;

}

input:focus,
textarea:focus{

  outline:none;

  border-color:#8c1d40;

  box-shadow:
    0 0 0 4px rgba(140,29,64,.12);

}

textarea{

  min-height:120px;
  resize:vertical;

}

.error{

  border-color:#dc2626 !important;

  background:#fff5f5;

  box-shadow:
    0 0 0 4px rgba(220,38,38,.10);

}

.field-error{

  margin-top:2px;

  color:#dc2626;

  font-size:.85rem;

  text-align:left;

  animation:fadeIn .18s ease;

}

button{

  display:flex;

  justify-content:center;

  align-items:center;

  gap:10px;

  min-height:48px;

  padding:12px 25px;

  border:none;

  border-radius:8px;

  background:#8c1d40;

  color:white;

  cursor:pointer;

  font-weight:600;

  transition:
    opacity .2s,
    transform .15s;

}

button:hover:not(:disabled){

  transform:translateY(-1px);

}

button:disabled{

  opacity:.7;

  cursor:not-allowed;

}

.spinner{

  width:18px;

  height:18px;

  border:2px solid rgba(255,255,255,.35);

  border-top-color:white;

  border-radius:50%;

  animation:spin .8s linear infinite;

}

.success-message,
.error-message{

  margin-top:10px;

  font-weight:600;

  text-align:center;

  animation:fadeIn .25s ease;

}

.success-message{

  color:#16a34a;

}

.error-message{

  color:#dc2626;

}

@keyframes spin{

  to{

    transform:rotate(360deg);

  }

}

@keyframes fadeIn{

  from{

    opacity:0;

    transform:translateY(-4px);

  }

  to{

    opacity:1;

    transform:translateY(0);

  }

}

</style>