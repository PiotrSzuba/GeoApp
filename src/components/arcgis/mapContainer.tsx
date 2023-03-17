import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { useMapContextData, useMapContextActions } from 'src/contexts';

export const MapContainer: React.FC = () => {
  const { mapView } = useMapContextData();
  const { setMapView, onCountryClicked } = useMapContextActions();
  const ref = useRef<HTMLDivElement>(null);

  const createMap = (mapRef: React.RefObject<HTMLDivElement>): void => {
      if (!mapRef.current) return;

      const map = new Map({ basemap: 'satellite' });
      const view = new MapView({
          map: map,
          zoom: 5,
          center: [21.017532, 52.237049],
          constraints: { maxZoom: 3, minZoom: 6 }
      });

      view.container = mapRef.current;

      setMapView(view);
  };

  const mapClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>): Promise<void> => {
    if(!mapView) return;

    const screenPoint = {
      x: event.pageX,
      y: event.pageY
    };

    const hitTestResult = await mapView.hitTest(screenPoint);

    if (!hitTestResult.results.length) return;
    const viewHit = hitTestResult.results[0];
    const graphicHit = viewHit as __esri.GraphicHit;
    if (!graphicHit || !graphicHit.graphic) return;

    const countryName = graphicHit.graphic.attributes as string;

    if (!countryName) return;
    onCountryClicked(countryName);
  };

  useEffect(() => {
    createMap(ref);

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, []);

  return <div ref={ref} onClick={(event): Promise<void> => mapClick(event)}className='h-screen'/>;
};
