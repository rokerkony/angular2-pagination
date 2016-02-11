import {Page} from './page';

export class PageBuilder {
    public getPages(visiblePages: number, activePage: number, pageCount: number): Page[] {
        let pages: Page[] = [];

        if (1 < visiblePages) {
            let minPage = activePage - visiblePages;
            let maxPage = activePage + visiblePages;

            for (let pageValue = minPage; pageValue <= maxPage; ++pageValue) {
                if (0 < pageValue && pageValue <= pageCount) {
                    pages.push(new Page(pageValue));
                }
            }
        } else {
            for (let pageValue = 1; pageValue <= pageCount; ++pageValue) {
                pages.push(new Page(pageValue));
            }
        }

        return pages;
    }
}
