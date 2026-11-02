import './sources.css';
import type { Source } from '../../../types/news';

class Sources {
    public draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();

        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error('Sources template not found');
            return;
        }

        data.forEach((item: Source): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');

            if (sourceName) {
                sourceName.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');

            if (sourceItem && item.id !== null) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.appendChild(sourceClone);
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (sourcesContainer) {
            sourcesContainer.appendChild(fragment);
        }
    }
}

export default Sources;
