import { Ref, onUnmounted, unref } from "vue";

type MaybeRef<T> = T | Ref<T>;

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 * Returns registerListener and removeListener methods
 *
 * @param element
 * @param event
 * @param listener
 * @param options
 */

const useEventListener = (
  element:
    | MaybeRef<null | undefined | EventSource | Document | Window>
    | undefined,
  event: string,
  listener: (
    this: MaybeRef<null | undefined | EventSource>,
    ev: Event
  ) => unknown,
  options?: boolean | AddEventListenerOptions
) => {
  const el = unref(element);
  const registerListener = () => el.addEventListener(event, listener, options);
  const removeListener = () => el.removeEventListener(event, listener);

  onUnmounted(removeListener);

  return { registerListener, removeListener };
};

export default useEventListener;
