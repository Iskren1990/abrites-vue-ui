<script lang="ts" setup>
import * as Config from "../utils/app-config";
import { Preview } from "./shared";
import { Map, Marker, DivIcon, LatLng, Circle, LatLngBounds } from "leaflet";

const template = "<AbritesMap class='map' @init='onMapInit' />";

const setup = () => {
  const onMapInit = (map: Map) => {
    const marker = new Marker(new LatLng(42.6978634, 23.3221789), {
      icon: new DivIcon({ className: "abrites-marker accent" }),
    });
    marker.addTo(map);

    const circle = new Circle(new LatLng(43.2069025, 27.9150855), {
      radius: 10000,
      className: "abrites-shape success",
    });
    circle.addTo(map);

    map.fitBounds(new LatLngBounds(marker.getLatLng(), circle.getLatLng()));
  };

  return { onMapInit };
};

const imports = [
  "import { Map, Marker, DivIcon, LatLng, Circle, LatLngBounds } from 'leaflet';",
];

const style = `::v-deep(.map) {
  height: 700px;
}`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/map/Map.vue`"
      target="_blank"
      rel="noopener"
      >AbritesMap</a
    >
    <span>&lt;AbritesMap&gt;&lt;/AbritesMap&gt;</span>
  </h2>

  <p>Basic leaflet map component with initialization retry guards.</p>

  <AbritesAlert warning>
    This component depends on
    <a href="https://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>
    to be loaded in the <code>head</code> section of your html template.
  </AbritesAlert>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>options?</strong> <code>MapOptions</code>
      <p>
        Optionl map options. Default to
        <code>MapOptions(zoomControl: false, attributionControl: false)</code>.
      </p>
    </li>
    <li>
      <strong>layerOptions?</strong> <code>TileLayerOptions</code>
      <p>
        Optional tile layer options. Default to
        <code>TileLayerOptions(minZoom: 3, maxZoom: 20)</code>.
      </p>
    </li>
    <li>
      <strong>center?</strong> <code>LatLng</code>
      <p>
        Map center. Default to
        <code>LatLng(42.6978634, 23.3221789)</code>.
      </p>
    </li>
    <li>
      <strong>tileUrl?</strong> <code>string</code>
      <p>
        Url of the main tile layer. Default to
        <code>
          'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.svg' </code
        >.
      </p>
    </li>
    <li>
      <strong>width?</strong> <code>number</code>
      <p>Width in px of the map container (default to <code>100%</code>).</p>
    </li>
    <li>
      <strong>height?</strong> <code>number</code>
      <p>Height in px of the map container (default to <code>100%</code>).</p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>@init</strong> <code>L.Map</code>
      <p>
        Fired after map initialization. Receives the inited map instance as an
        argument.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The component comes with predefined classes for markers
    (<code>.abrites-marker</code>) and geometry shapes
    (<code>.abrites-shape</code>). Additionally, you could customize their color
    appearance by combining them with the following classes:
  </p>
  <ul>
    <li><code>.accent</code></li>
    <li><code>.danger</code></li>
    <li><code>.warning</code></li>
    <li><code>.success</code></li>
    <li><code>.light</code></li>
    <li><code>.dark</code></li>
  </ul>
  <p>
    By default <code>.abrites-marker</code> has pulse animation. To disable it
    add <code>.noanimation</code> class.
  </p>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Map"
    :htmlExample="template"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
    :style="style"
  />
</template>

<style lang="scss" scoped>
::v-deep(.map) {
  height: 700px;
}
</style>
