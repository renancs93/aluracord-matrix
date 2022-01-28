import Head from 'next/head';

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 

      /* For Firefox Browser */
      .scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #F1F1F1 #212931;
      }


      /* For Chrome, EDGE, Opera, Others */
      .scrollbar::-webkit-scrollbar {
        width: 5px;
      }

      .scrollbar::-webkit-scrollbar-track { 
        background: #212931;
      }

      .scrollbar::-webkit-scrollbar-thumb { 
        background: #F1F1F1;
      }

    `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AluraCord</title>
      </Head>

      <GlobalStyle/>
      <Component {...pageProps}/>
    </>
  )
}
