# @declaform/core

The form validation library for declaration

## Installation

```
npm install @declaform/core
```

## Usage

### Define validation rule types

```ts
declare module '@declaform/core' {
  interface ValidatorDefineRules {
    username: {}
    password: {}
    passwordConfirm: {
      ruleReferenceInputName: string
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

### Execute field validation

```ts
import { validator } form '@declaform/core'

const validate = () => {
  const ret = validator.validateField('username', 'input user name value', {}, {
    name: 'username'
  })
  if (ret.success === false) {
    alert(`validation error: ${ret.error.join(', ')}`)
  }
  console.log('success')
}
```
