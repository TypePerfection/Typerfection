import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <header>
      </header>
      <body className='block'>
        <div>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}