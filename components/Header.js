import { Box, Button, Text } from '@skynexui/components';

export default function Header() {
  
  function onLogout(){
    localStorage.removeItem('username');
  }
  
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant='heading5'>CHAT</Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href='/'
          onClick={()=> onLogout()}
        />
      </Box>
    </>
  );
}