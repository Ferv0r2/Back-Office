# Admin Dashboard Theme

---

```
npm install --legacy-peer-deps
```

## Flow

---

### import caver-js & web3

- npm i caver-js web3 @ethersproject/providers @web3-react/core @web3-react/injected-connector
- Add `/src/app/modules/blockchain/*`

### add favicon.ico

- Add `/public/favicon.ico`
- Add `/public/media/logos/favicon.ico`

### test CustomPage

- Add `/src/app/pages/AddProjectPage.tsx`
- Add `/src/app/routing/PrivateRoutes.tsx` -> `import & <Route>`
- Add `/src/_metronic/layout/aside/AsideMenuMain.tsx` -> `<AsideMenuItemWithSub>`
- Add `/src/_metronic/layout/header/MenuInner.tsx` -> `<MenuInnerWithSub>`

### testNFT Object

- Add `/src/app/pages/AddProjectPage.tsx`
- Add `/src/app/routing/PrivateRoutes.tsx`
- Add `/src/layout/components/aside/AsideMenuMain.tsx`

### Custom colors

- Modify `src/assets/sass/core/components/_variables.scss`

### Webpack config overrides

- Install `npm install -D react-app-rewired`
- Add `config-overrides.js`
- Modify `scripts`

```js
"scripts" {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test
}
```

[Link](https://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469)
