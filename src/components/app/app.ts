import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (!sourcesContainer) {
            console.error('Sources container not found');
            return;
        }

        sourcesContainer.addEventListener('click', (e: MouseEvent): void => {
            this.controller.getNews(e, (data) => this.view.drawNews(data));
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
