interface IRoute {
    name: string;
    path: string;
    basePath?: string;
}

export const homeRoute: IRoute = {
    name: 'Home',
    path: '/'
};

// Account/:accountId
