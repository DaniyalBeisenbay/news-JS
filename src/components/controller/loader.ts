type RequestMethod = 'GET' | 'POST';

type RequestOptions = Record<string, string | number | boolean>;

interface LoaderConfig {
    endpoint: string;
    options?: RequestOptions;
}

type ResponseCallback<T> = (data: T) => void;

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<RequestOptions>;

    public constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: LoaderConfig,
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const params = new URLSearchParams();

        Object.entries(urlOptions).forEach(([key, value]) => {
            params.append(key, String(value));
        });

        return `${this.baseLink}${endpoint}?${params.toString()}`;
    }

    private load<T>(
        method: RequestMethod,
        endpoint: string,
        callback: ResponseCallback<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
