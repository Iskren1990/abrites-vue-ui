import { computed, ref } from "vue";

export type InputError = string | string[] | undefined;

const useErrorFormating = (error: InputError) => {
  const errors = ref<string[]>([]);
  const hasError = computed<boolean>(() => errors.value.join("\n").length > 0);

  if (error != undefined) {
    typeof error === "string"
      ? errors.value.push(error)
      : errors.value.concat(error);
  }

  return { errors: ref(errors.value.join("\n")), hasError };
};

export { useErrorFormating };
