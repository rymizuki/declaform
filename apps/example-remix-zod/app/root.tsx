import { Links, Meta, Outlet, Scripts } from '@remix-run/react'
import './define-validator'

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Example for @declaform</h1>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
