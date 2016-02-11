///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {
    Component,
    View,
} from 'angular2/core';
import {Pagination} from '../../src/pagination';
import {PaginationEvent} from '../../src/paginationEvent';

@Component({
    selector: 'my-app',
})
@View({
    directives: [
        Pagination
    ],
    templateUrl: './app/app.html',
    styleUrls: [
        './app/app.css'
    ],
})
class AppComponent {
    public myActivePage: number = 1;

    /**
     * Action called on change of pagination component.
     *
     * @param {PaginationEvent} event
     */
    public onPageChange (event: PaginationEvent): void {
        this.myActivePage = event.index;
    }
}
bootstrap(AppComponent);
