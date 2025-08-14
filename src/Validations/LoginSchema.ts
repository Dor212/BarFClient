// Validations/LoginSchema.ts
import joi from "joi";

export const LoginSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email is invalid",
      "any.required": "Email is required",
    }),

  password: joi
    .string()
    // אות גדולה, אות קטנה, מספר, תו מיוחד, אורך 7–20
    .ruleset.pattern(/((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*-]).{7,20})/)
    .rule({
      message:
        "password must be 7–20 chars and include upper, lower, number and !@#$%^&*-",
    })
    .required(),

  // ✅ זה מה שחסר וגרם לשגיאה "object.unknown"
  rememberMe: joi.boolean().default(true),
});
