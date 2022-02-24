# dynamic-css-link

Dynamically load and operate css links

## Installation
```bash
npm i dynamic-css-link
```
## Getting Started  
It's easy to load a css link.
```js
import DynamicCssLink from 'dynamic-css-link';

const dcl = new DynamicCssLink();

const [light] = dcl.use({ src: './light.css' })

// dcl.hide(light) 
// dcl.teardown(light)
```


This example show how to load two css link and operate them.
```js
import DynamicCssLink from 'dynamic-css-link';

const dcl = new DynamicCssLink();

const [light, dark] = dcl.use([
  { src: './light.css' },
  { src: './dark.css', alternative: true }  // Applied by default, but disabled.
]);

setTimeout(() => {
  dcl.show(dark).hide(light);
}, 4000);
```

<img src="./example.gif" style="width:100%;height:auto"/>