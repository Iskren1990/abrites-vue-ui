import { computed, ref } from "vue";

const useStorageState = (name: string) => {
  const isHidden = ref(false);

  const storageKey = computed(() => `${name}_storage`);

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
};

export { useStorageState };
