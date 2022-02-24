<script lang="ts" setup>
import { defineProps, defineEmits, onMounted, ref, PropType } from "vue";
import L, { LatLng, MapOptions, TileLayerOptions } from "leaflet";

const props = defineProps({
  options: {
    type: Object as PropType<MapOptions>,
    require: true,
    default: () => {
      return {
        zoomControl: false,
        attributionControl: false,
      };
    },
  },
  layerOptions: {
    type: Object as PropType<TileLayerOptions>,
    require: true,
    default: () => {
      return {
        minZoom: 3,
        maxZoom: 20,
      };
    },
  },
  center: {
    type: Object as PropType<LatLng>,
    require: true,
    default: () => new LatLng(42.6978634, 23.3221789),
  },
  tileUrl: {
    type: String,
    require: true,
    // default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    default: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  },
});

const emit = defineEmits<{
  (event: "init", map: L.Map): void;
}>();
const uniqueId = performance.now().toString() + Math.random();
const mapEl = ref<HTMLCanvasElement>();
const map = ref<L.Map>();

const destroy = () => map.value?.remove();
const resize = () => map.value.invalidateSize();

const init = () => {
  destroy();
  map.value = L.map(mapEl.value, props.options).setView(props.center, 13);
  L.tileLayer(props.tileUrl, props.layerOptions).addTo(map.value);
  resize();
  emit("init", map.value);
};

onMounted(init);
</script>

<template>
  <div class="map-host">
    <div ref="mapEl" id="map" class="map-container"></div>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";
@import "../../../node_modules/leaflet/dist/leaflet.css";

@mixin abrites-marker-theme($name, $color) {
  $animation-name: abrites-marker-#{$name}-pulse;

  &.#{$name} {
    background: $color;
    color: contrast-color($color);
    border-color: $color;
    animation-name: $animation-name;
    @include box-shadow-pulse-animation($animation-name, $color);
  }
}

@mixin abrites-shape-theme($name, $color) {
  &.#{$name} {
    fill: $color;
    stroke: $color;
  }
}

.map-host {
  @include normalize-host();
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  background: $panel-color;
  border-radius: $border-radius;
  animation: map-init $transition-speed;

  ::v-deep(.map-ctrls) {
    $spacing: math.div($base-spacing, 2);
    position: absolute;
    z-index: 9;
    top: $spacing;
    right: $spacing;
    bottom: auto;
    left: auto;
    &.top-left {
      top: $spacing;
      right: auto;
      bottom: auto;
      left: $spacing;
    }
    &.bottom-left {
      top: auto;
      right: auto;
      bottom: $spacing;
      left: $spacing;
    }
    &.bottom-right {
      top: auto;
      right: $spacing;
      bottom: $spacing;
      left: auto;
    }
  }
}

.map-container {
  display: block;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-width: 150px;
  min-height: 150px;
  background: inherit;
  border-radius: inherit;
  [afterLayout] :host & {
    box-shadow: inset 2px 0px 12px 0px rgba(0, 0, 0, 0.35);
  }
}

::v-deep(.map-container) {
  // marker
  .abrites-marker {
    @include shadowize-floated();
    border-radius: 50%;
    text-align: center;
    background: #fff;
    color: contrast-color(#fff);
    box-shadow: 0px 0px 10px 0px rgb(#000, 0.8);
    animation: abrites-marker-pulse 2.5s linear infinite;

    // animations
    @include abrites-marker-theme("accent", $accent-color);
    @include abrites-marker-theme("danger", $danger-color);
    @include abrites-marker-theme("success", $success-color);
    @include abrites-marker-theme("warning", $warning-color);
    @include abrites-marker-theme("light", $txt-secondary-color);
    @include abrites-marker-theme("dark", $base-color);

    &.noanimation {
      animation: none !important;
    }
    &.nointeractive {
      pointer-events: none;
    }
    .icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: inherit;
      font-family: "Material Icons";
      font-weight: normal;
      font-style: normal;
      font-size: 1em;
      line-height: 1;
      text-align: center;
      pointer-events: none;
      box-shadow: 0px 0px 0px 1px $base-color;
    }
  }

  // lines, polygon, etc.
  .abrites-shape {
    fill: $field-border-color;
    stroke: $field-border-color;

    @include abrites-shape-theme("accent", $accent-color);
    @include abrites-shape-theme("danger", $danger-color);
    @include abrites-shape-theme("success", $success-color);
    @include abrites-shape-theme("warning", $warning-color);
    @include abrites-shape-theme("light", $txt-secondary-color);
    @include abrites-shape-theme("dark", $base-color);

    // draggable indicator
    @include abrites-shape-theme("leaflet-path-draggable", $accent-color);
  }

  // editable polygon current dragged path
  path[stroke="#3388ff"][stroke-dasharray]:not(.abrites-shape) {
    stroke: $accent-color;
  }

  // generic
  .leaflet-tile-container img {
    -webkit-filter: opacity(0.5) invert(1) sepia(1) grayscale(1) brightness(1.7);
    filter: opacity(0.5) invert(1) sepia(1) grayscale(1) brightness(1.7);
  }
  .leaflet-vertex-icon,
  .leaflet-middle-icon {
    $vertexSize: 120%;
    border: 0;
    border-radius: 50%;
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      background: #fff;
      width: $vertexSize;
      height: $vertexSize;
      transform: translate(-50%, -50%);
      transition: transform $transition-speed, opacity $transition-speed;
    }
    &:hover:before {
      transform: translate(-50%, -50%) scale(1.3);
    }
  }
}

@include box-shadow-pulse-animation("abrites-marker-pulse", #fff, 0.3);

@keyframes map-init {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
