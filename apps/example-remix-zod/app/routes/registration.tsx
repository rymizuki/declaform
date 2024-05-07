import { FormInput, FormProvider } from '@declaform/react'
import { Form } from '@remix-run/react'

export default function RegistrationView() {
  return (
    <div>
      <h2>Registration</h2>

      <FormProvider>
        {({ ref, hasError }) => (
          <Form ref={ref} method="POST">
            <div>
              <label>User ID</label>
              <FormInput name="username" rule="user_id" required>
                {(props, errors) => (
                  <div>
                    <input {...props} autoComplete="username" />
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
                name="passwordConfirm"
                rule="password_confirm"
                ruleReferencePropName="password"
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
              <button type="submit" disabled={hasError}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </FormProvider>
    </div>
  )
}
