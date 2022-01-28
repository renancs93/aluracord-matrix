import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import appConfig from '../config.json';

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [messageList, setMessageList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    // Set User
    const { username } = router.query;
    setCurrentUser(username);

    // Load Messages
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setIsLoading(false); // remover
        setMessageList(data);
      });
  }, []);

  function handleNewMessage() {
    // Validação
    if (message.trim() === '') return;

    const newMessage = {
      //id: messageList.length + 1,
      from: currentUser,
      text: message,
    };

    supabaseClient
      .from('messages')
      .insert([newMessage])
      .then(({ data, error }) => {
        if (!error) setMessageList([data[0], ...messageList]);
      });

    setMessage('');
  }

  function handleDeleteMessage(id) {
    const newList = messageList.filter((item) => item.id !== id);

    supabaseClient
      .from('messages')
      .delete()
      .match({ id: id })
      .then(({ data, error }) => {
        if (!error) setMessageList(newList);
      });
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '10px',
            margin: '16px',
          }}
        >
          {isLoading && (
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, .1);',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zindex: 1
              }}
            >
              <Loading />
            </div>
          )}

          <Box
            id='listContainer'
            className='scrollbar'
            styleSheet={{
              overflowY: 'auto',
              // marginBottom: '16px',
              height: '85%',
            }}
          >
            <MessageList
              messages={messageList}
              onDeleteMessage={handleDeleteMessage}
            />
          </Box>

          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleNewMessage();
                }
              }}
              placeholder='Insira sua mensagem aqui...'
              type='textarea'
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                marginRight: '12px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              label='Enviar'
              variant='primary'
              styleSheet={{
                height: '80%',
                marginBottom: '10px',
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary['700'],
                mainColorLight: appConfig.theme.colors.primary['500'],
                mainColorStrong: appConfig.theme.colors.primary['900'],
              }}
              onClick={() => handleNewMessage()}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function MessageList(props) {
  return (
    <Box
      id='listMessage'
      tag='ul'
      styleSheet={{
        // overflow: 'scroll',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        color: appConfig.theme.colors.neutrals['000'],
        height: '100%'
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag='li'
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Image
                  styleSheet={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                  }}
                  src={`https://github.com/${message.from}.png`}
                />
                <Text tag='strong'>{message.from}</Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag='span'
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Button
                label='X'
                variant='tertiary'
                onClick={(e) => {
                  //if (confirm('Deseja realmente deletar a mensagem?'))
                  props.onDeleteMessage(message.id);
                }}
              />
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}
