import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import CONFIG from "../../CONFIG";

const CACHE_TIME_MS = CONFIG.cacheExpiration * 60 * 1000;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: CACHE_TIME_MS,
			gcTime: CACHE_TIME_MS,
		},
	},
});

export const queryPersister = createSyncStoragePersister({
	storage: window.localStorage,
	key: "aria_query_cache",
});

export const persistOptions = {
	persister: queryPersister,
	maxAge: CACHE_TIME_MS,
};
