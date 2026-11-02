import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        const baseUrl: string | undefined = process.env.API_URL;
        const apiKey: string | undefined = process.env.API_KEY;

        if (!baseUrl || !apiKey) {
            throw new Error('API_URL or API_KEY is missing');
        }

        super(baseUrl, {
            apiKey,
        });
    }
}

export default AppLoader;
