import AppLoader from './appLoader';
import { SourcesResponse, NewsResponse, ApiCallback } from '../../types/news';

class AppController extends AppLoader {
    public getSources(callback: ApiCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: ApiCallback<NewsResponse>): void {
        let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;

        const newsContainer: HTMLElement | null = e.currentTarget instanceof HTMLElement ? e.currentTarget : null;

        if (!newsContainer) {
            return;
        }

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;
