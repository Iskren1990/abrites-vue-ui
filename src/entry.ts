// iife/cjs usage extends esm default export - so import it all
import plugin, * as components from "./entry.esm";

// Attach named exports directly to plugin. IIFE/CJS will
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)
type NamedExports = Exclude<typeof components, "default">;
type ExtendedPlugin = typeof plugin & NamedExports;
Object.entries(components).forEach(([componentName, component]) => {
  if (componentName !== "default") {
    const key = componentName as Exclude<keyof NamedExports, "default">;
    const val = component as Exclude<ExtendedPlugin, typeof plugin>;
    (plugin as ExtendedPlugin)[key] = val;
  }
});

export default plugin;

export * from "./composables/index";
export {
  MenuItemModel,
  ChartController,
  chartSynchronyser,
  ColorHelper,
  DropdownController,
  PaginationData,
  SelectOption,
} from "./components/helpers";
export type {
  IAccordionPanelState,
  IAccordionParentController,
  IDatepickerPreset,
  NamedParams,
  ISortData,
  ITableAction,
  ITableColumn,
  SortDirection,
} from "./components/helpers";
export * from "./components/index";
