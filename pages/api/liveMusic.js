export default (req, res) => {
  res.statusCode = 200;
  res.json({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.41953280752264, 37.776889463715875] },
        properties: {
          title: "Omar's House",
          cluster: false,
          venue: "blackcat",
          event_count: 5,
        },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.40765233230061,37.803324517771756] },
        properties: {
          title: "Omar's House",
          cluster: false,
          venue: "blackcat",
          event_count: 20,
        },
      },
    ],
  });
};

