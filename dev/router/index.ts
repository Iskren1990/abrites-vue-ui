import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Intro from "../views/Intro.vue";
import Accordion from "../views/Accordion.vue";
import Alert from "../views/Alert.vue";
import AnimatedIf from "../views/AnimatedIf.vue";
import Button from "../views/Button.vue";
import Chart from "../views/Chart.vue";
import Checkbox from "../views/Checkbox.vue";
import Confirmation from "../views/Confirmation.vue";
import Datepicker from "../views/Datepicker.vue";
import DatepickerInput from "../views/DatepickerInput.vue";
import DatepickerSlider from "../views/DatepickerSlider.vue";
import Deffered from "../views/Deffered.vue";
import DND from "../views/DND.vue";
import Drawer from "../views/Drawer.vue";
import Dropdown from "../views/Dropdown.vue";
import Grid from "../views/Grid.vue";
import Icon from "../views/Icon.vue";
import Info from "../views/Info.vue";
import Input from "../views/Input.vue";
import LazyFor from "../views/LazyFor.vue";
import ListItem from "../views/ListItem.vue";
import Loader from "../views/Loader.vue";
import Map from "../views/Map.vue";
import Menu from "../views/Menu.vue";
import OutsideClick from "../views/OutsideClick.vue";
import Pagination from "../views/Pagination.vue";
import Popup from "../views/Popup.vue";
import RadioList from "../views/RadioList.vue";
import Search from "../views/Search.vue";
import Select from "../views/Select.vue";
import Snackbar from "../views/Snackbar.vue";
import Table from "../views/Table.vue";
import Tabs from "../views/Tabs.vue";
import Tag from "../views/Tag.vue";
import Tooltips from "../views/Tooltips.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/intro",
    name: "Intro",
    component: Intro,
    meta: {
      title: "Abrites UI",
    },
  },
  {
    path: "/accordion",
    name: "Accordion",
    component: Accordion,
    meta: {
      title: "Accordion",
      inMenu: true,
    },
  },
  {
    path: "/alert",
    name: "Alert",
    component: Alert,
    meta: {
      title: "Alert",
      inMenu: true,
    },
  },
  {
    path: "/animated-if",
    name: "AnimatedIf",
    component: AnimatedIf,
    meta: {
      title: "Animated If",
      inMenu: true,
    },
  },
  {
    path: "/button",
    name: "Button",
    component: Button,
    meta: {
      title: "Button",
      inMenu: true,
    },
  },
  {
    path: "/chart",
    name: "Chart",
    component: Chart,
    meta: {
      title: "Chart",
      inMenu: true,
    },
  },
  {
    path: "/checkbox",
    name: "Checkbox",
    component: Checkbox,
    meta: {
      title: "Checkbox",
      inMenu: true,
    },
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: Confirmation,
    meta: {
      title: "Confirmation",
      inMenu: true,
    },
  },
  {
    path: "/datepicker",
    name: "Datepicker",
    component: Datepicker,
    meta: {
      title: "Datepicker",
      inMenu: true,
    },
  },
  {
    path: "/datepicker-input",
    name: "DatepickerInput",
    component: DatepickerInput,
    meta: {
      title: "Datepicker Input",
      inMenu: true,
    },
  },
  {
    path: "/datepicker-slider",
    name: "DatepickerSlider",
    component: DatepickerSlider,
    meta: {
      title: "Datepicker Slider",
      inMenu: true,
    },
  },
  {
    path: "/deffered",
    name: "Deffered",
    component: Deffered,
    meta: {
      title: "Deffered",
      inMenu: true,
    },
  },
  {
    path: "/dnd",
    name: "DND",
    component: DND,
    meta: {
      title: "Drag & Drop",
      inMenu: true,
    },
  },
  {
    path: "/drawer",
    name: "Drawer",
    component: Drawer,
    meta: {
      title: "Drawer",
      inMenu: true,
    },
  },
  {
    path: "/dropdown",
    name: "Dropdown",
    component: Dropdown,
    meta: {
      title: "Dropdown",
      inMenu: true,
    },
  },
  {
    path: "/grid",
    name: "Grid",
    component: Grid,
    meta: {
      title: "Grid",
      inMenu: true,
    },
  },
  {
    path: "/icon",
    name: "Icon",
    component: Icon,
    meta: {
      title: "Icon",
      inMenu: true,
    },
  },
  {
    path: "/info",
    name: "Info",
    component: Info,
    meta: {
      title: "Info",
      inMenu: true,
    },
  },
  {
    path: "/input",
    name: "Input",
    component: Input,
    meta: {
      title: "Input",
      inMenu: true,
    },
  },
  {
    path: "/lazy-for",
    name: "LazyFor",
    component: LazyFor,
    meta: {
      title: "Lazy-For",
      inMenu: true,
    },
  },
  {
    path: "/list-item",
    name: "ListItem",
    component: ListItem,
    meta: {
      title: "List Item",
      inMenu: true,
    },
  },
  {
    path: "/loader",
    name: "Loader",
    component: Loader,
    meta: {
      title: "Loader",
      inMenu: true,
    },
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
    meta: {
      title: "Map",
      inMenu: true,
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
    meta: {
      title: "Menu",
      inMenu: true,
    },
  },
  {
    path: "/cutsideclick",
    name: "OutsideClick",
    component: OutsideClick,
    meta: {
      title: "Outside Click",
      inMenu: true,
    },
  },
  {
    path: "/pagination",
    name: "Pagination",
    component: Pagination,
    meta: {
      title: "Pagination",
      inMenu: true,
    },
  },
  {
    path: "/popup",
    name: "Popup",
    component: Popup,
    meta: {
      title: "Popup",
      inMenu: true,
    },
  },
  {
    path: "/radio-list",
    name: "RadioList",
    component: RadioList,
    meta: {
      title: "Radio List",
      inMenu: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      title: "Search",
      inMenu: true,
    },
  },
  {
    path: "/select",
    name: "Select",
    component: Select,
    meta: {
      title: "Select",
      inMenu: true,
    },
  },
  {
    path: "/snackbar",
    name: "Snackbar",
    component: Snackbar,
    meta: {
      title: "Snackbar",
      inMenu: true,
    },
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
    meta: {
      title: "Table",
      inMenu: true,
    },
  },
  {
    path: "/tabs",
    name: "Tabs",
    component: Tabs,
    meta: {
      title: "Tabs",
      inMenu: true,
    },
  },
  {
    path: "/tag",
    name: "Tag",
    component: Tag,
    meta: {
      title: "Tag",
      inMenu: true,
    },
  },
  {
    path: "/tooltips",
    name: "Tooltips",
    component: Tooltips,
    meta: {
      title: "Tooltips",
      inMenu: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { router as default, routes };
