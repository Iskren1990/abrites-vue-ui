import { computed, Ref, ref } from "vue";

type InputError = string | string[] | undefined;

const useErrorFormating = (
  error: InputError
): Record<string, Ref<string | boolean>> => {
  const errors = ref<string[]>([]);
  const hasError = computed<boolean>(() => errors.value.join("\n").length > 0);

  if (error != undefined) {
    typeof error === "string"
      ? errors.value.push(error)
      : errors.value.concat(error);
  }

  return { errors: ref(errors.value.join("\n")), hasError };
};

export default useErrorFormating;
