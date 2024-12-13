export function initializeMap(mapboxgl, map) {
  map.on("click", "unclustered-point", function (e) {
    // Extract coordinates and properties from the clicked feature
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;

    // Ensure coordinates remain accurate across the antimeridian
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Create dynamic popup content using feature properties
    const popupContent = `
      <h3>${properties.title}</h3>
      <p><strong>Venue:</strong> ${properties.venue}</p>
      <p><strong>Event Count:</strong> ${properties.event_count}</p>
    `;

    // Add the popup to the map
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(map);
  });

  // Add geolocation control to the map
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  // Change the cursor to a pointer when hovering over features in the "data" layer
  map.on("mouseenter", "data", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "data", function () {
    map.getCanvas().style.cursor = "";
  });
}
