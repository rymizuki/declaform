import { FormInput, FormProvider } from '@declaform/react'
import { FormEvent } from 'react'
import './define-validator'

export const App = () => {
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    console.log('submit', ev)
  }

  return (
    <div>
      <h2>Example form by React with Zod</h2>

      <section>
        <h3>Registration form</h3>
        <FormProvider onSubmit={handleSubmit}>
          {({ ref, onSubmit }) => (
            <form ref={ref} onSubmit={onSubmit}>
              <div>
                <label>User ID</label>
                <FormInput name="user_id" rule="user_id" required>
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
              <div>
                <label>Password</label>
                <FormInput name="password" rule="password" required>
                  {(props, errors) => (
                    <div>
                      <input
                        {...props}
                        type="password"
                        autoComplete="new-password"
                      />
                      {errors.map((error) => (
                        <div key={error}>{error}</div>
                      ))}
                    </div>
                  )}
                </FormInput>
              </div>
              <div>
                <label>Password (confirm)</label>
                <FormInput
                  name="password_confirm"
                  rule="password_confirm"
                  ruleTargetPropName="password"
                  required
                >
                  {(props, errors) => (
                    <div>
                      <input
                        {...props}
                        type="password"
                        autoComplete="new-password"
                      />
                      {errors.map((error) => (
                        <div key={error}>{error}</div>
                      ))}
                    </div>
                  )}
                </FormInput>
              </div>
              <div>
                <label>E-Mail</label>
                <FormInput name="email" rule="email" required>
                  {(props, errors) => (
                    <div>
                      <input {...props} type="email" autoComplete="email" />
                      {errors.map((error) => (
                        <div key={error}>{error}</div>
                      ))}
                    </div>
                  )}
                </FormInput>
              </div>
              <div>
                <label>Name</label>
                <FormInput name="user_name" rule="user_name" required>
                  {(props, errors) => (
                    <div>
                      <input
                        {...props}
                        type="user_name"
                        autoComplete="user_name"
                      />
                      {errors.map((error) => (
                        <div key={error}>{error}</div>
                      ))}
                    </div>
                  )}
                </FormInput>
              </div>
              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          )}
        </FormProvider>
      </section>
    </div>
  )
}
