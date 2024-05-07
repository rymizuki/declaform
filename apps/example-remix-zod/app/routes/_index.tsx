import { FormInput, FormProvider } from '@declaform/react'
import { ActionFunction, LoaderFunction } from '@remix-run/node'
import { Form, Link, json, redirect, useLoaderData } from '@remix-run/react'
import { CSRFTokenSchema, loginSchema } from '../schemas'

const EXAMPLE_CSRF_TOKEN = 'example_csrf_token'

export const loader: LoaderFunction = () => {
  return json({
    csrfToken: EXAMPLE_CSRF_TOKEN
  })
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const ret = loginSchema
    .extend({
      csrf_token: CSRFTokenSchema
    })
    .safeParse(data)
  if (ret.success === false) {
    throw json({ message: 'invalid request parameter' }, 400)
  }

  const { csrf_token, username, password } = ret.data
  if (csrf_token === EXAMPLE_CSRF_TOKEN) {
    throw json({ message: 'CSRF Token mismatch' }, 403)
  }

  // authentication mock
  console.log('login', { username, password })

  return redirect('/my')
}

export default function IndexView() {
  const { csrfToken } = useLoaderData<{ csrfToken: string }>()

  return (
    <div>
      <h2>login</h2>

      <FormProvider>
        {({ ref, onSubmit, hasError }) => (
          <Form method="POST" ref={ref} onSubmit={onSubmit}>
            <div>
              <div>
                <label htmlFor="username">User ID</label>
              </div>
              <div>
                <FormInput name="username" rule="user_id">
                  {(props, errors) => (
                    <div>
                      <input {...props} type="text" autoComplete="username" />
                      {errors.map((error) => (
                        <div key={error}>{error}</div>
                      ))}
                    </div>
                  )}
                </FormInput>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <FormInput name="password" rule="password">
                  {(props, errors) => (
                    <div>
                      <input
                        {...props}
                        type="password"
                        autoComplete="current-password"
                      />
                      {errors.map((error) => (
                        <div key={error}>{error}</div>
                      ))}
                    </div>
                  )}
                </FormInput>
              </div>

              <div>
                <button type="submit" disabled={hasError}>
                  login
                </button>
              </div>
            </div>
            <input type="hidden" name="csrf_token" value={csrfToken} />
          </Form>
        )}
      </FormProvider>

      <div>
        <Link to="/registration">Registration</Link>
      </div>
    </div>
  )
}
