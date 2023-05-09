import { devMapBoxToken } from "./secrets";

export const environment = {
    devMode:  true,
    // urlAPI: 'http://127.0.0.1:5000/api/',
    urlAPI: 'http://127.0.0.1:3000/',

    // default public
    mapboxToken: devMapBoxToken,
    
};
