import { DirectiveBinding } from "vue";
import Sortable, { SortableEvent, SortableOptions } from "sortablejs";

// workaround for pointer style
const setDragCursor = (value: boolean) => {
  const html = document.getElementsByTagName("html").item(0);
  html?.classList.toggle("grabbing", value);
};

// IIFE
export default (function AbritesDnD() {
  /// Example
  /// ```html
  /// <div v-abrites-dnd="itemList">
  ///   <div v-for="(item, ind) in itemList" :key="ind">{{item.content}}</div>
  /// </div>
  /// ```

  function mounted(
    el: HTMLElement,
    binding: DirectiveBinding<IDnDProps>
  ): void {
    if (!binding.value.itemsList)
      return console.error("itemsList property is required directive input");

    const options: SortableOptions = {
      forceFallback: true,
      animation: 150,
      onUpdate: function (e: SortableEvent) {
        console.log(e.oldIndex, e.newIndex);

        const itemsList = binding.value.itemsList;

        if (
          typeof e.oldIndex != "number" ||
          typeof e.newIndex != "number" ||
          isNaN(e.oldIndex) ||
          isNaN(e.newIndex)
        )
          return;
        const target = itemsList[e.oldIndex];
        itemsList.splice(e.oldIndex, 1);
        itemsList.splice(e.newIndex, 0, target);
      },

      onChoose(e: SortableEvent) {
        setDragCursor(true);
      },
      onEnd(e: SortableEvent) {
        setDragCursor(false);
      },
      ...binding.value.options,
    };
    Sortable.create(el, options);
  }

  return {
    name: "abrites-dnd",
    directive: {
      mounted,
    },
  };
})();

interface IDnDProps {
  itemsList: Array<unknown>;
  options?: SortableOptions;
}
