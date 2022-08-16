import { createRouter, createWebHistory } from 'vue-router'

import Elements from '../views/Elements.vue';
import ArchiveElements from '../views/ArchiveElements.vue';
import ComponentsReference from '../views/ComponentsReference.vue';
import GroupsReference from '../views/GroupsReference.vue';
import CategoriesReference from '../views/CategoriesReference.vue';
import TempRangeReference from '../views/TempRangeReference.vue';
import ManufacturersReference from '../views/ManufacturersReference.vue';
import PartStatusesReference from '../views/PartStatusesReference.vue';
import LibraryRefsReference from '../views/LibraryRefsReference.vue';
import FootprintsReference from '../views/FootprintsReference.vue';
import History from '../views/History.vue';
import Page404 from '../views/Page404.vue';

const routes = [
	{
		name: 'home',
		path: '/',
		component: Elements
	},
	{
		name: 'archive_elements',
		path: '/archive_elements',
		component: ArchiveElements
	},
	{
		name: 'components',
		path: '/components',
		component: ComponentsReference
	},
	{
		name: 'groups',
		path: '/groups',
		component: GroupsReference
	},
	{
		name: 'categories',
		path: '/categories',
		component: CategoriesReference
	},
	{
		name: 'temp_ranges',
		path: '/temp_ranges',
		component: TempRangeReference
	},
	{
		name: 'manufacturers',
		path: '/manufacturers',
		component: ManufacturersReference
	},
	{
		name: 'part_statuses',
		path: '/part_statuses',
		component: PartStatusesReference
	},
	{
		name: 'library_refs',
		path: '/library_refs',
		component: LibraryRefsReference
	},
	{
		name: 'footprints',
		path: '/footprints',
		component: FootprintsReference
	},
	{
		name: 'history',
		path: '/history',
		component: History
	},
	{
		path: '/:any(.*)',
		component: Page404
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "active"
});

export default router;
