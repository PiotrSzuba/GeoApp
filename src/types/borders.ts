export interface IProperty {
    GID_0: string;
    COUNTRY: string;
}

export interface IGeometry {
    type: string;
    coordinates: number[][][][];
}

export interface IGeoFeature {
    properties: IProperty;
    geometry: IGeometry;
    type: string;
}

export interface IGeoData {
    features: IGeoFeature[];
    name: string;
    type: string;
}

// eslint-disable-next-line no-shadow
export enum BorderType {
    None,
    EuropeanUnion,
    World,
    NorthAmerica,
    SouthAmerica,
}
