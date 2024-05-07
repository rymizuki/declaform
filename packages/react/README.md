# @declaform/react

The form validation library for declaration

## Installation

```
npm install @declaform/core @declaform/react
```

## Usage

### Define validation rule types

```ts
declare module '@declaform/core' {
  interface ValidatorDefineConfig {
    rules: {
      username: {}
      password: {}
      passwordConfirm: {
        ruleReferenceInputName: string
      }
    }
  }
}
```

### Define rules

sample for zod

```ts
import { defineValidationRule } from '@declaform/core'

const usernameSchema = z.string().min(1).max(64)
defineValidationRule('username', {
  validate(value) {
    return usernameSchema.safeParse(value)
  }
})

const passwordSchema = z.string().min(8).max(64).regex(passwordRegex)
defineValidationRule('password', {
  validate(value) {
    return passwordSchema.safeParse(value)
  }
})
defineValidationRule('passwordCOnfirm': {
  validate(value, data, { ruleReferenceInputName }) {
    return passwordSchema
      .refine(() => {
        return value === data[ruleReferenceInputName]
      }, {
        message: 'Password mismatch'
      })
      .safeParse(value)
  }
})
```

### Define error handler [optional]

You can re-format validate error.

```ts
import { defineErrorHandler } from '@declaform/core'

declare module '@declaform/core' {
  interface ValidatorDefineConfig {
    errorType: string
  }
}

defineErrorHandler<ZodError>((error) => {
  return error.issues.map((issue) => issue.message)
})
```

### Define form inputs

```tsx
import { HTMLFormElement } from 'react'
import { FormProvider, FormInput } from '@declaform/react'

const App = () => {
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    // parse your login for form-data, ex: use qs.parse
    const formData = new FormData(ev.target)
  }

  return (
    <FormProvider onSubmit={handleSubmit}>
      {({ ref, onSubmit, hasError }) => (
        <form>
          <div>
            <label>User ID</label>
            <FormInput name="user_id" rule="username">
              {(props, errors) => (
                <div>
                  <input {...prop} type="text" autoComplete="username" />
                  {errors.map((error) => (
                    <div key={error}>{error}</div>
                  ))}
                </div>
              )}
            </FormInput>
          </div>
          <div>
            <label>Password</label>
            <FormInput name="password" rule="password">
              {(props, errors) => (
                <div>
                  <input
                    {...prop}
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
              rule="passwordConfirm"
              ruleReferenceInputName="password"
            >
              {(props, errors) => (
                <div>
                  <input
                    {...prop}
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
        </form>
      )}
    </FormProvider>
  )
}
```
