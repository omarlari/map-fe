import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { addDataLayer } from "../map/addDataLayer";
import { initializeMap } from "../map/initializeMap";
import { fetcher } from "../utilities/fetcher";
import styles from "../styles/Home.module.css";


const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  //const { data, error } = useSWR("/api/liveMusic", fetcher);
  //const { data, error } = useSWR("https://nextjs-map-production.up.railway.app/map", fetcher);
  const { data, error } = useSWR("https://nextjs-map-production.up.railway.app/georead", fetcher);
  if (error) {
    console.error(error);
  }

  console.log(data)
  
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.433247, 37.742646],
      zoom: 13,
      pitch: 45,
    });

    initializeMap(mapboxgl, map);
    setMap(map);
  }, []);

  useEffect(() => {
    if (pageIsMounted && data) {
      Map.on("load", function () {
        addDataLayer(Map, data);
      });
    }
  }, [pageIsMounted, setMap, data, Map]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div id="my-map" style={{ height: 750, width: 1000 }} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
