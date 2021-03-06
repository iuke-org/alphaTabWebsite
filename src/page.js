import Collection from './collection'
import allDocs from '@docusaurus-meta/docs';


export class Page {
    constructor(pageMeta) {
        this.pageMeta = pageMeta;
    }

    prop(key, defaultValue) {
        if (key in this.pageMeta) {
            return this.pageMeta[key];
        }
        return defaultValue;
    }

    props(key) {
        const v = this.prop(key, '') || '';
        return v.split(';').filter(x => x.length > 0);
    }
}

let allPages = null;

function loadAllPages() {
    return Object.values(allDocs).map(p => new Page(p));
}

export function getPageList(baseUrl) {
    if (!allPages) {
        allPages = loadAllPages();
    }
    return new Collection(allPages.filter(p => p.prop('id', '').indexOf(baseUrl) === 0));
}

export default getPageList;