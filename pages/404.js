import { Box, Icon  } from '@skynexui/components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PageNotFound(){
  
  const router = useRouter()
  useEffect(()=>{
    setTimeout(()=>{
      router.back();
    }, 5000)
  })

  return(
    <>
      <Box
        styleSheet={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Icon name="FaRegSadTear" size={80}/>
        <h1 style={{margin: 10}}>Página não encontrada!</h1>
        <h6>Você será redirecionado para a página anterior em instantes</h6>
      </Box>
    </>
  )
}