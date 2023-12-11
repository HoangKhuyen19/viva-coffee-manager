import type { Metadata } from 'next'
import './globals.css'
import { open_sans } from './components/fonts/font'

export const metadata: Metadata = {
  title: 'Viva Coffee',
  authors: [{name: "Nguyễn Hoàng Khuyến"}]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body className='body'>
        <div className={`${open_sans.className}`}>
          {children}
        </div>
      </body>
    </html>
  )
}
