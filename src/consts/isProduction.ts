export const isProduction = import.meta.env.PROD;

export const isStage =
	import.meta.env.VITE_PRODUCTION_URL === 'stage.ddfilms.online';
