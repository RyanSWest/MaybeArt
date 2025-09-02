import React from 'react'

function Testes(){

const jwt = import.meta.env.VITE_PINATA_JWT;
  const gateway = import.meta.env.VITE_PINATA_GATEWAY;
  
  console.log('JWT:', jwt);
  console.log('Gateway:', gateway);}

  Testes()