import { LazyModule } from '../LazyModule';
import { LazyPanels } from '@/router/panels';
import { LazyLayouts } from '@/router/layouts/lazy';
import { LazySVGResources } from '@/root/components';



export const modules = {
    i18n: new LazyModule('i18n', async () => {
        const { initI18n } = await import('@/features');

        await initI18n();
    }),

    fakeServer: new LazyModule('fakeServer', async () => {
        const { fakeServer } = await import('@/fakeServer');

        await fakeServer.init();
    }),

    components: new LazyModule('components', async () => {
        await Promise.all([
            LazyPanels.trigger(),
            LazyLayouts.trigger(),
            LazySVGResources.trigger(),
        ]);
    }),
} satisfies Record<string, LazyModule<unknown>>;