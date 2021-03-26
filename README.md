# VueRealLazy

It's a very candide component for Vue.js for realize lazy loading as easy as it possible.
- [Basic example](https://codesandbox.io/s/vue-real-lazy-ljbee)

## Dictionary

`Loader` - It's what you show when your component is loading.  
`Target` - It's your component which you want to hide and show your loader while component is loading some data.

## Installation

```bash
$ npm install vue-real-lazy
```

## Usage

Import Plugin
```js
import VueRealLazy from "vue-real-lazy";

Vue.use(VueRealLazy);
```

Use this in component like this

#### With event from child (good approach)
This is a standard case for use lazy loading.
You have only two slot section - `loader` and `target`.
Just define event in your component which will be signal when loader is needed.
Emit this loader with true of false state accordingly.

```html
<vue-real-lazy>
  <template v-slot:loader>
    Loader for test-lazy-component
  </template>
  <template v-slot:target="{showLoader}">
    <test-lazy-component @need-loader="showLoader($event)"></test-lazy-component>
  </template>
</vue-real-lazy>
```

#### Explicit passing function (bad approach)

This approach is bad, but it can be used if you want (it is not recommended to use because it's antipattern)

```html
<vue-real-lazy>
  <template v-slot:loader>
    Loader for test-lazy-component
  </template>
  <template v-slot:target="{showLoader}">
    <test-lazy-component :show-loader="showLoader"></test-lazy-component>
  </template>
</vue-real-lazy>
```
After passing this function in component as a prop you can explicit call it to show or hide loader.
```js
this.showLoader(false); // this hides loader
```

#### No restrictions
No restrictions in markup, you can use a component as a loader, also you can use regular html tag as a target.

Use a component as a loader:
```html
<vue-real-lazy>
  <template v-slot:loader>
    <custom-loader></custom-loader>
  </template>
  <template v-slot:target="{showLoader}">
    <test-lazy-component2 @need-loader="showLoader($event)"></test-lazy-component2>
  </template>
</vue-real-lazy>
```

Use a regular tag img as a target for lazy loading (this works fine and easy):
```html
<vue-real-lazy>
  <template v-slot:loader>
    My Custom loader
  </template>
  <template v-slot:target="{showLoader}">
    <img
      :src="`https://site.com/img.jpg`"
      alt="My cool image"
      @load="showLoader(false)"
    >
  </template>
</vue-real-lazy>
```