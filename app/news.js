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

    async getArticlesForSource(sourceID) {
        try {
            const articles = await fetch(`${this.baseUrl}/everything?sources=${sourceID}&apiKey=${config.API_KEY}`).then(res => res.json());
            return articles;
        } catch (error) {
            return {
                message: "Error",
                status: "error"
            }
        }
    }
}
