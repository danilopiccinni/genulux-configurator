// shared/quoteFields.js


export const quoteFields = [


  {
    key:'name',

    type:'text',

    required:true,

    order:1,

    autocomplete:'name',

    placeholder:'quoteNamePlaceholder',

    label:'quoteNameLabel',

    emailLabel:'Name',

    validation:'text',

    maxLength:80

  },




  {
    key:'company',

    type:'text',

    required:false,

    order:2,

    autocomplete:'organization',

    placeholder:'quoteCompanyPlaceholder',

    label:'quoteCompanyLabel',

    emailLabel:'Company',

    validation:'text',

    maxLength:100

  },




  {
    key:'email',

    type:'email',

    required:true,

    order:3,

    autocomplete:'email',

    placeholder:'quoteEmailPlaceholder',

    label:'quoteEmailLabel',

    emailLabel:'Email',

    validation:'email',

    maxLength:120

  },




  {
    key:'phone',

    type:'tel',

    required:false,

    order:4,

    autocomplete:'tel',

    placeholder:'quotePhonePlaceholder',

    label:'quotePhoneLabel',

    emailLabel:'Phone',

    validation:'phone',

    maxLength:30

  },




  {
    key:'country',

    type:'text',

    required:false,

    order:5,

    autocomplete:'country',

    placeholder:'quoteCountryPlaceholder',

    label:'quoteCountryLabel',

    emailLabel:'Country',

    validation:'text',

    maxLength:60

  },




  {
    key:'city',

    type:'text',

    required:false,

    order:6,

    autocomplete:'address-level2',

    placeholder:'quoteCityPlaceholder',

    label:'quoteCityLabel',

    emailLabel:'City',

    validation:'text',

    maxLength:60

  },




  {
    key:'message',

    type:'textarea',

    required:false,

    order:7,

    placeholder:'quoteMessagePlaceholder',

    label:'quoteMessageLabel',

    emailLabel:'Message',

    validation:'text',

    maxLength:1000,

    rows:5

  }


]