# declaform

The form validation library for declaration

# Usage

## steps

1. declare rules
2. implement form inputs

## declare rules

use for zod

```ts
import { z } from 'zod'

defineValidationRule('username', {
  validate(value) {
    return z.string().min(1).max(32).safeParse(value)
  }
})

defineValidationRule('password', {
  validate(value) {
    return z
      .string()
      .min(1)
      .max(64)
      .regex(/^[a-zA-Z0-9.?/-]+$/)
      .safeParse(value)
  }
})

defineValidationRule('password_confirm', {
  validate(value, data, { name, ruleTargetPropName }) {
    const ret = z
      .object({
        [ruleTargetPropName]: passwordSchema,
        [name]: passwordSchema
      })
      .refine((context) => context[name] === context[ruleTargetPropName])
      .safeParse({
        ...data,
        [name]: value
      })
    if (ret.success === false) {
      return ret
    }
    return {
      success: ret.success,
      value: ret.data[name]
    }
  }
})
```

## implement form inputs

for react

```tsx
import { FormProvider, FormInput } from '@declaform/react'

const RegistrationForm = () => {
  return (
    <FormProvider>
      {({ ref, onSubmit }) => (
        <form ref={ref} onSubmit={onSubmit}>
          <fieldset>
            <div>
              <label>User ID</label>
              <FormInput name="user_id" rule="user_id">
                {(props) => (
                  <input {...props} type="text" autoComplete="username" />
                )}
              </FormInput>
            </div>
            <div>
              <label>Password</label>
              <FormInput name="password" rule="password">
                {(props) => (
                  <input
                    {...props}
                    type="password"
                    autoComplete="new-password"
                  />
                )}
              </FormInput>
            </div>
            <div>
              <label>Password (confirm)</label>
              <FormInput name="password_confirm" rule="password_confirm">
                {(props) => (
                  <input
                    {...props}
                    type="password"
                    autoComplete="new-password"
                  />
                )}
              </FormInput>
            </div>
          </fieldset>
          <div>
            <button type="submit">register</button>
          </div>
        </form>
      )}
    </FormProvider>
  )
}
```

## Ideas

### Independent schema validation

For example, when considering login and registration, IDs and passwords can be operated using common rules.

However, when considered on a screen-by-screen basis, they are expressed as different UI parts, making it difficult to abstract them.

Considering the UI called Form, it should be possible to reuse independent rules as components for each input item.

### Create your own rule schema

There are many ways to check input values.

Each person should have their own optimal means to achieve their desired work.

Therefore, I would like to leave it to you to decide how to express that model.

### What I want is validation of the input value

ype checking used in an application and checking whether the value entered by the user is valid have completely different contexts.

They should be considered separately and fed back.

Therefore, this mechanism only provides closed validation for input from the form.

### Wrap it yourself

UI Components should be declarative.

But, form inspection is often written procedurally.

This library helps you write forms declaratively, but does not provide declarative components. It's just a help.

I want you to realize the “declaration” that suits you.

For example,

```tsx
const PasswordInput = ({ name, }: Props) => {
  return <FormInput name={name} rule="password">
    {(props, errors) => (
      <div className={controls}>
        <input {...prop} type="password" autoComplete="new-password" />
        {errors.map((error) => (
          <FormInputError content={error} />
        ))}
      <div>
    )}
  </FormInput>
}
```

## Packages

- [@declaform/core](./packages/core/README.md)
- [@declaform/react](./packages/react/README.md)
