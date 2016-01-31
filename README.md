# Angular2 Pagination
Pagination component for [Angular2](https://angular.io).

## How to run demo?
In root directory run:

- `npm install` to install Angular2 and other dependencies (including dev dependencies for running demo).
- `grunt demo`
- run `./demo/index.html` in your browser with running server

**How to run server?**

If you have installed Python you can use `python -m SimpleHTTPServer 8000` in you root directory and then
http://0.0.0.0:8000/demo/.

## How to use?
Import component and make it as directive dependency for your application
    
```ts
import {Pagination} from '../../src/pagination';

@View({
    directives: [
        Pagination
    ],
    ...
})
```

Use it in HTML template:
    
```html
<span>
    Selected page: {{myActivePage}}
</span>
    
<pagination
    <!-- required properties -->

    [active-page]="myActivePage" <-- here is your app variable with current active page
    [item-count]="463" 
    [items-per-page]="11"
    [visible-pages]="4" <-- how many pages visible on sides
    
    <!-- optional properties -->
    
    [show-next-prev]="true"
    [show-boundaries]="true"
    (pageChanged)="onPageChange($event)"
    text-left-boundary="&laquo;"
    text-right-boundary="&raquo;"
    text-next="Next page"
    text-prev="Previous page"></pagination>
```
