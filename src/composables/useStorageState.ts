import { computed, ref } from "vue";

export default function useStorageState(name: string) {
  const isHidden = ref(false);

  const storageKey = computed(() => `${name}_drawer`);

  (function setStateFromStorage() {
    if (window.localStorage.getItem(storageKey.value) == null) {
      return; // no stored state
    }

    isHidden.value = window.localStorage[storageKey.value] === "hidden";
  })();

  function updateStorageState(newState: boolean) {
    isHidden.value = newState;

    window.localStorage[storageKey.value] = newState ? "hidden" : "visible";
  }

  return { isHidden, updateStorageState };
}
