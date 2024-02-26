import { Html, Head, Main, NextScript } from 'next/document'
import NavBar from '@/components/NavBar'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <header>
      </header>
      <body className='block'>
        <NavBar/>
        <div>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}