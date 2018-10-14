import config from '../config';

export class NewsAPI {
    constructor() {
        this.baseUrl = config.baseUrl;
    }

    async getTopHeadlines() {
        try {
            const headlines = await fetch(`${this.baseUrl}/top-headlines?country=in&apiKey=${config.API_KEY}`).then(res => res.json());
            return headlines;
        } catch(error) {
            return {
                "error": error
            };
        }
    }
}
