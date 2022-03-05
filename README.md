<h1 align="center" href="https://torrentee.cf">Abrites Vue UI</h1>





[![Alt][screenshot](https://gitlab.abrites.tld/npm-stuffs/abrites-vue-ui/-/blob/master/public/images/screenshot.png)](https://torrentee.cf)

## About The Project

   Custom Vue components, directives, composables and style library intended to be used within Abrites Ltd.
Besides the common UI library components it provides conveninet wrappers over leaflet map, ChartJS charts and SortableJS.

#### Currently hosted on [TO BE HOSTED](https://torrentee.cf) 


### Built With

* [vite](https://vitejs.dev/)
* [Chart.js](https://www.chartjs.org/)
* [Leaflet](https://leafletjs.com/)
* [SortableJS](https://sortablejs.github.io/Sortable/)
* [Flatpickr](https://flatpickr.js.org/)


## Usage


To get a local copy up and running follow these simple example steps.


Install the library in new or existing project:

  
    npm install abrites-vue-ui

Register the library globaly in your app.js/server.ts


    import { createApp } from "vue";
    import App from "./App.vue";
    import ui from "abrites-vue-ui";

    createApp(App).use(ui).mount("#app");
 
Or import only the needed components in your view.


Use the components:

    <template>
    
      <AbritesButton large>
        <span class="txt">Large</span>
        <AbritesIcon icon="arrow_forward"></AbritesIcon>
      </AbritesButton>

    </template>

    <script lang="ts" setup>
      //your logic...
    </script>;

    <style>
      //your styles...
    </style>


For detailed explanation and examples check out the awesome [DOCUMENTATION TO BE HOSTED](https://torrentee.cf) 

## Roadmap

See the [open issues](https://github.com/Iskren1990/abrites-vue-ui/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Contact

Open a issue with request.

[screenshot]: ./public/screenshot.png


## Prerequisites

* [Vue](https://vuejs.org/)
* [Chart.js](https://www.chartjs.org/) for Chart components
* [Leaflet](https://leafletjs.com/) for Map component
* [SortableJS](https://sortablejs.github.io/Sortable/) Drag and Drop component
* [Flatpickr](https://flatpickr.js.org/) for Datepicker and DatepickerInput components


## Working with the library


### To build the documentation

    npm run build-docs

### To build the library

    npm run build

### To run locally the documentation page

    npm run dev
