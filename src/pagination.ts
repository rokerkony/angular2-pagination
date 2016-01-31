import {bootstrap} from 'angular2/platform/browser'
import {
    NgFor,
    NgIf,
    NgClass
} from 'angular2/common';
import {
    Component,
    View,
    Output,
    EventEmitter,
    OnInit
} from 'angular2/core';
import {Page} from './page';
import {PaginationEvent} from './paginationEvent';

@Component({
    selector: 'pagination',
    properties: [
        'activePage: active-page',
        'itemCount: item-count',
        'itemsPerPage: items-per-page',
        'visiblePages: visible-pages',
        'showBoundaries: show-boundaries',
        'showBoundaries: show-boundaries',
        'showNextPrev: show-next-prev',
        'textLeftBoundary: text-left-boundary',
        'textRightBoundary: text-right-boundary',
        'textNext: text-next',
        'textPrev: text-prev',
    ],
})
@View({
    directives: [
        NgFor,
        NgIf,
        NgClass
    ],
    // todo: this is not relative path from component but from application, related issue: https://github.com/angular/angular/issues/2383
    templateUrl: './../src/pagination.html',
    styleUrls: [
        './../src/pagination.css'
    ],
})
export class Pagination implements OnInit {
    public activePage: number;
    public pages: Page[] = [];
    public showNextPrev: boolean;
    public showBoundaries: boolean;

    private visiblePages: number;
    private itemCount: number = 0;
    private itemsPerPage: number = 20;

    @Output() private pageChanged: EventEmitter<PaginationEvent> = new EventEmitter();

    public ngOnInit (): void {
        if (undefined === this.activePage) {
            this.activePage = 1;
            this.notifyChange();
        }
        if (undefined === this.showNextPrev) {
            this.showNextPrev = false;
        }
        if (undefined === this.showBoundaries) {
            this.showBoundaries = false;
        }
        if (1 > this.itemCount) {
            console.error('Pagination: Property "itemsCount" is set to 0 therefore you will have no page items.');
        }
        this.pages = this.getPages();
    }

    public isFirst (): boolean {
        return this.activePage <= 1;
    }

    public isLast (): boolean {
        return this.activePage >= this.getPageCount();
    }

    public previousPage (): void {
        if (!this.isFirst()) {
            this.changePage(this.activePage - 1);
        }
    }

    public nextPage (): void {
        if (!this.isLast()) {
            this.changePage(this.activePage + 1);
        }
    }

    public changePage (index: number): void {
        this.activePage = index;
        this.pages = this.getPages();
        this.notifyChange();
    }

    private notifyChange (): void {
        this.pageChanged.emit(new PaginationEvent(this.activePage));
    }

    private getPageCount (): number {
        return Math.ceil(this.itemCount / this.itemsPerPage);
    }

    private getPages (): Page[] {
        let pages: Page[] = [];

        if (1 < this.visiblePages) {
            let minPage = this.activePage - this.visiblePages;
            let maxPage = this.activePage + this.visiblePages;

            for (let pageValue = minPage; pageValue <= maxPage; ++pageValue) {
                if (0 < pageValue && pageValue <= this.getPageCount()) {
                    pages.push(new Page(pageValue));
                }
            }
        } else {
            for (let pageValue = 1; pageValue <= this.getPageCount(); ++pageValue) {
                pages.push(new Page(pageValue));
            }
        }

        return pages;
    }
}
