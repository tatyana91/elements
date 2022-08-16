import { createStore } from 'vuex'

import components from './components';
import tempRanges from './tempRanges';
import manufacturers from './manufacturers';
import partStatuses from './partStatuses';
import libraryRefs from './libraryRefs';
import footprints from './footprints';

export default createStore({
	modules: {
		components,
		tempRanges,
		manufacturers,
		partStatuses,
		libraryRefs,
		footprints
	},
	strict: process.env.NODE_ENV !== 'production'
})
