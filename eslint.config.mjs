import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

// Physical-direction Tailwind utilities (ml-*, pr-*, left-*, text-left, border-r, rounded-l…).
// Use the logical equivalents instead: ms/me, ps/pe, start/end, text-start/end, border-s/e, rounded-s/e.
const PHYSICAL_CLASS =
  "(^|\\s)([\\w-]+:)*-?(m[lr]|p[lr]|left|right|border-[lr]|rounded-[lr]|rounded-[tb][lr]|scroll-[mp][lr])-|(^|\\s)([\\w-]+:)*(text-left|text-right|float-left|float-right|border-[lr]|rounded-[lr]|rounded-[tb][lr])(\\s|$)"
const PHYSICAL_MESSAGE =
  "Physical direction utilities are banned; use logical ones (ms/me, ps/pe, start/end, text-start/end, border-s/e, rounded-s/e)."

// Only class strings are checked, so prose like "right-to-left" isn't flagged.
const CLASS_CONTEXTS = [
  'JSXAttribute[name.name="className"]',
  "CallExpression[callee.name=/^(cn|cva|clsx)$/]"
]

const eslintConfig = [
  { ignores: [".next/**", ".claude/**", "node_modules/**", "public/sw.js"] },
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...CLASS_CONTEXTS.flatMap(context => [
          { selector: `${context} Literal[value=/${PHYSICAL_CLASS}/]`, message: PHYSICAL_MESSAGE },
          {
            selector: `${context} TemplateElement[value.raw=/${PHYSICAL_CLASS}/]`,
            message: PHYSICAL_MESSAGE
          }
        ])
      ]
    }
  }
]

export default eslintConfig
