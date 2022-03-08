export interface ITableColumn {
  /// Column data key.
  /// Usually used in `item[keyPart1]..[keyPartN]` as default of [content].
  key: string;

  /// Column header title.
  header?: string;

  /// Enable/disable sorting on the column.
  sortable?: boolean;

  /// Additional css class name(s) to add to the column cells.
  /// Predefined: .hinted, .min-width, .max-width, .align-right, .align-left, .align-center, .emphasize
  cssClass?: string;

  /// Optional key that specify different sort attribute name from the column content key.
  sortKey?: string;

  /// Optional component factory to render.
  /// It is delivered to <component :is="content" />
  /// https://vuejs.org/guide/essentials/component-basics.html#dynamic-components
  /// If not set, `item[keyPart1]..[keyPartN]` value will be used.
  content?: unknown; //ComponentFactory;
}
