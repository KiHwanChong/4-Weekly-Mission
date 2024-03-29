import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <meta charSet='utf-8' />
        {/* <meta name='viewport' content='width=device-width, initial-scale=1' /> */}
        <link
          href='https://webfontworld.github.io/pretendard/Pretendard.css'
          rel='stylesheet'
        />
        <script
          async
          src='https://developers.kakao.com/sdk/js/kakao.js'></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
