/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, Ref, ref } from "vue";

type InputError = Ref<string | string[] | undefined>;

const useBaseErrorValidation = (
  error: InputError
): Record<string, Ref<string | boolean>> => {
  const errors: Ref<string[]> = ref<string[]>([]);
  const hasError: Ref<boolean> = computed<boolean>(
    () => errors.value.length > 0
  );

  if (error.value != undefined) {
    typeof error.value === "string"
      ? errors.value.push(error.value)
      : errors.value.push(...error.value);
  }

  return { errors: ref(errors.value.join("\n")), hasError };
};

export default useBaseErrorValidation;
