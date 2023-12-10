# React + TypeScript + Vite

# Use the Microsoft Graph Toolkit with React

https://learn.microsoft.com/en-us/graph/toolkit/get-started/use-toolkit-with-react?pivots=mgt-react

# Single-page application: Acquire a token to call an API

https://learn.microsoft.com/en-us/entra/identity-platform/scenario-spa-acquire-token?tabs=react

# Microsoft Graph TypeScript Types

https://github.com/microsoftgraph/msgraph-typescript-typings

# Graph Explorer

https://developer.microsoft.com/en-us/graph/graph-explorer/?request=me%2Fevents&version=v1.0

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
