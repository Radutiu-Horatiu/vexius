import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';

import * as models from './models';

const loadingPlugin = createLoadingPlugin({ type: 'full' });

const store = init({ models, plugins: [loadingPlugin] });

export default store;
