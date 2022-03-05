import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IntroPage from "../views/IntroPage.vue";
import AccordionPage from "../views/AccordionPage.vue";
import AlertPage from "../views/AlertPage.vue";
import AnimatedIfPage from "../views/AnimatedIfPage.vue";
import ButtonPage from "../views/ButtonPage.vue";
import ChartPage from "../views/ChartPage.vue";
import CheckboxPage from "../views/CheckboxPage.vue";
import ComposablesPage from "../views/ComposablesPage.vue";
import ConfirmationPage from "../views/ConfirmationPage.vue";
import DatepickerPage from "../views/DatepickerPage.vue";
import DatepickerInputPage from "../views/DatepickerInputPage.vue";
import DatepickerSliderPage from "../views/DatepickerSliderPage.vue";
import DNDPage from "../views/DNDPage.vue";
import DrawerPage from "../views/DrawerPage.vue";
import DropdownPage from "../views/DropdownPage.vue";
import GridPage from "../views/GridPage.vue";
import IconPage from "../views/IconPage.vue";
import InfoPage from "../views/InfoPage.vue";
import InputPage from "../views/InputPage.vue";
import LazyForPage from "../views/LazyForPage.vue";
import ListItemPage from "../views/ListItemPage.vue";
import LoaderPage from "../views/LoaderPage.vue";
import MapPage from "../views/MapPage.vue";
import MenuPage from "../views/MenuPage.vue";
import OutsideClickPage from "../views/OutsideClickPage.vue";
import PaginationPage from "../views/PaginationPage.vue";
import PopupPage from "../views/PopupPage.vue";
import RadioListPage from "../views/RadioListPage.vue";
import SearchPage from "../views/SearchPage.vue";
import SelectPage from "../views/SelectPage.vue";
import SnackbarPage from "../views/SnackbarPage.vue";
import TablePage from "../views/TablePage.vue";
import TabsPage from "../views/TabsPage.vue";
import TagPage from "../views/TagPage.vue";
import TooltipsPage from "../views/TooltipsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/intro",
    name: "Intro",
    component: IntroPage,
    meta: {
      title: "Abrites UI",
    },
  },
  {
    path: "/accordion",
    name: "Accordion",
    component: AccordionPage,
    meta: {
      title: "Accordion",
      inMenu: true,
    },
  },
  {
    path: "/alert",
    name: "Alert",
    component: AlertPage,
    meta: {
      title: "Alert",
      inMenu: true,
    },
  },
  {
    path: "/animated-if",
    name: "AnimatedIf",
    component: AnimatedIfPage,
    meta: {
      title: "Animated If",
      inMenu: true,
    },
  },
  {
    path: "/button",
    name: "Button",
    component: ButtonPage,
    meta: {
      title: "Button",
      inMenu: true,
    },
  },
  {
    path: "/chart",
    name: "Chart",
    component: ChartPage,
    meta: {
      title: "Chart",
      inMenu: true,
    },
  },
  {
    path: "/checkbox",
    name: "Checkbox",
    component: CheckboxPage,
    meta: {
      title: "Checkbox",
      inMenu: true,
    },
  },
  {
    path: "/composables",
    name: "Composables",
    component: ComposablesPage,
    meta: {
      title: "Composables",
      inMenu: true,
    },
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: ConfirmationPage,
    meta: {
      title: "Confirmation",
      inMenu: true,
    },
  },
  {
    path: "/datepicker",
    name: "Datepicker",
    component: DatepickerPage,
    meta: {
      title: "Datepicker",
      inMenu: true,
    },
  },
  {
    path: "/datepicker-input",
    name: "DatepickerInput",
    component: DatepickerInputPage,
    meta: {
      title: "Datepicker Input",
      inMenu: true,
    },
  },
  {
    path: "/datepicker-slider",
    name: "DatepickerSlider",
    component: DatepickerSliderPage,
    meta: {
      title: "Datepicker Slider",
      inMenu: true,
    },
  },
  {
    path: "/dnd",
    name: "DND",
    component: DNDPage,
    meta: {
      title: "Drag & Drop",
      inMenu: true,
    },
  },
  {
    path: "/drawer",
    name: "Drawer",
    component: DrawerPage,
    meta: {
      title: "Drawer",
      inMenu: true,
    },
  },
  {
    path: "/dropdown",
    name: "Dropdown",
    component: DropdownPage,
    meta: {
      title: "Dropdown",
      inMenu: true,
    },
  },
  {
    path: "/grid",
    name: "Grid",
    component: GridPage,
    meta: {
      title: "Grid",
      inMenu: true,
    },
  },
  {
    path: "/icon",
    name: "Icon",
    component: IconPage,
    meta: {
      title: "Icon",
      inMenu: true,
    },
  },
  {
    path: "/info",
    name: "Info",
    component: InfoPage,
    meta: {
      title: "Info",
      inMenu: true,
    },
  },
  {
    path: "/input",
    name: "Input",
    component: InputPage,
    meta: {
      title: "Input",
      inMenu: true,
    },
  },
  {
    path: "/lazy-for",
    name: "LazyFor",
    component: LazyForPage,
    meta: {
      title: "Lazy-For",
      inMenu: true,
    },
  },
  {
    path: "/list-item",
    name: "ListItem",
    component: ListItemPage,
    meta: {
      title: "List Item",
      inMenu: true,
    },
  },
  {
    path: "/loader",
    name: "Loader",
    component: LoaderPage,
    meta: {
      title: "Loader",
      inMenu: true,
    },
  },
  {
    path: "/map",
    name: "Map",
    component: MapPage,
    meta: {
      title: "Map",
      inMenu: true,
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: MenuPage,
    meta: {
      title: "Menu",
      inMenu: true,
    },
  },
  {
    path: "/cutsideclick",
    name: "OutsideClick",
    component: OutsideClickPage,
    meta: {
      title: "Outside Click",
      inMenu: true,
    },
  },
  {
    path: "/pagination",
    name: "Pagination",
    component: PaginationPage,
    meta: {
      title: "Pagination",
      inMenu: true,
    },
  },
  {
    path: "/popup",
    name: "Popup",
    component: PopupPage,
    meta: {
      title: "Popup",
      inMenu: true,
    },
  },
  {
    path: "/radio-list",
    name: "RadioList",
    component: RadioListPage,
    meta: {
      title: "Radio List",
      inMenu: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: SearchPage,
    meta: {
      title: "Search",
      inMenu: true,
    },
  },
  {
    path: "/select",
    name: "Select",
    component: SelectPage,
    meta: {
      title: "Select",
      inMenu: true,
    },
  },
  {
    path: "/snackbar",
    name: "Snackbar",
    component: SnackbarPage,
    meta: {
      title: "Snackbar",
      inMenu: true,
    },
  },
  {
    path: "/table",
    name: "Table",
    component: TablePage,
    meta: {
      title: "Table",
      inMenu: true,
    },
  },
  {
    path: "/tabs",
    name: "Tabs",
    component: TabsPage,
    meta: {
      title: "Tabs",
      inMenu: true,
    },
  },
  {
    path: "/tag",
    name: "Tag",
    component: TagPage,
    meta: {
      title: "Tag",
      inMenu: true,
    },
  },
  {
    path: "/tooltips",
    name: "Tooltips",
    component: TooltipsPage,
    meta: {
      title: "Tooltips",
      inMenu: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export { router as default, routes };
