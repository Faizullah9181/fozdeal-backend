export class Utils {
    static addParamsToUrl(url: string, value: object) {
        url = url + (url && url.includes('?') ? '&' : '?');
        Object.entries(value).forEach(([key, val], idx, arr) => {
            url += `${key}=${val}`;
            if (idx < arr.length - 1) {
                url += '&';
            }
        });

        return url;
    }
}
