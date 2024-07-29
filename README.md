# npm i

# npm run dev

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: [
            "./tsconfig.json",
            "./tsconfig.node.json",
            "./tsconfig.app.json",
        ],
        tsconfigRootDir: __dirname,
    },
};
```
