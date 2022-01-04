<template>
  <!-- <Preview
    title="Random"
    :htmlExample="chartOne"
    :setupFn="setupFn"
    :scriptExample="script"
  />
  <Preview
    title="Random"
    :htmlExample="chartTwo"
    :setupFn="setupFn"
    :scriptExample="`${setupFn}`"
  /> -->

  <AbritesChart :data="chartData" nocontrols></AbritesChart>
</template>

<script lang="ts" setup>
import ColorHelper from "@/abrites-vue-ui/utils/color-helper";
import generateValues, {
  IPointData,
} from "@/composables/useGeneratedChartValues";
import { computed } from "@vue/reactivity";
import Preview from "./shared/Preview.vue";
const chartOne = `
<AbritesChart :data="chartData"></AbritesChart>
`;
const chartTwo = `
<AbritesChart :data="chartData" nocontrols></AbritesChart>
`;
let datasetData: IPointData[][] = generateValues({ seriesCount: 2 });

// [
//   {
//     x: "2019-01-01 00:01:38",
//     y: "12.0",
//   },
// ];

const chartData = {
  datasets: [
    {
      label: "My First Dataset",
      data: datasetData[0],
    },
    {
      label: "My Second Dataset",
      data: datasetData[1],
    },
  ],
};
setInterval(() => {
  console.log("datasetData");

  datasetData[0].push(...generateValues({ seriesCount: 1, points: 1 })[0]);
  datasetData[1].push(...generateValues({ seriesCount: 1, points: 1 })[0]);
}, 3000);
// const setupFn = () => {
//   datasetData = generateValues({ seriesCount: 2 });

//   // [
//   //   {
//   //     x: "2019-01-01 00:01:38",
//   //     y: "12.0",
//   //   },
//   // ];

//   const chartData = {
//     datasets: [
//       {
//         label: "My First Dataset",
//         data: datasetData[0],
//       },
//       {
//         label: "My Second Dataset",
//         data: datasetData[1],
//       },
//     ],
//   };
//   return { chartData };
// };

// const script = `${setupFn}`;
</script>

<style></style>
