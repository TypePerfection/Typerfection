import { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/components/header'



const topBarHeight: string = "40";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <header>
      </header>
      <body className='block'>
        <Header/>
        <div>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}