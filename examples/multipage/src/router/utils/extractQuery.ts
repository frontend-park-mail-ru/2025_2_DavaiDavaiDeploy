export function extractQuery(href: string){
    const queryIndex = href.indexOf('?');
    if (queryIndex === -1) return {};
    const queryString = href.slice(queryIndex + 1);
    return Object.fromEntries(new URLSearchParams(queryString));
}