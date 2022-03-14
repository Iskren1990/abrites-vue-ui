<script lang="ts" setup>
import * as Config from "../utils/app-config";
</script>

<template>
  <h1 class="component-title" id="selector">AbritesVueUi Composables</h1>

  <p>Set of composables are available:</p>

  <ul>
    <li>
      <strong>useEventListener</strong> - simple wrapper over native event
      listeners.
    </li>
    <li>
      <strong>useIsSlotInited</strong> - convenient tool to assure slot
      initialization.
    </li>
    <li>
      <strong>useStorageState</strong> - wraper over browsers Local Storage API.
    </li>
    <li>
      <strong>useUrlSync</strong> - synchtonyzes browsers URL with component
      state.
    </li>
  </ul>
  <p class="section-title"></p>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/composables/useEventListener.ts`"
      target="_blank"
      rel="noopener"
      >useEventListener</a
    >
  </h2>
  <p>
    Wrapper over browsers <strong>addEventListener(...)</strong> and
    <strong>removeEventListener(...)</strong>. Event listener is removed on
    components unmount lifecycle hook.
  </p>
  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>element </strong>
      <code
        >MaybeRef&lt;null | undefined | EventSource | Document | Window&gt; |
        undefined</code
      >
      <p>
        Whether to activate the spinning animation or not (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>event </strong> <code>string</code>
      <p>
        Whether to activate the spinning animation or not (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>listener </strong>
      <code
        >( this: MaybeRef&lt;null | undefined | EventSource&gt;, ev: Event ) =>
        unknown,</code
      >
      <p>
        Whether to activate the spinning animation or not (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>options? </strong> <code>boolean | AddEventListenerOptions</code>
      <p>
        Whether to activate the spinning animation or not (default to
        <code>false</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="inputs">Returns</h3>
  <ul>
    <li>
      <strong>registerListener </strong>
      <code>(): void</code>
      <p>Registers the listener.</p>
    </li>
    <li>
      <strong>removeListener </strong> <code>(): void</code>
      <p>Disposes the listener.</p>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <a
    :href="`${Config.componentsUrl}/components/datepicker-slider/DatepickerSlider.vue#L125`"
    target="_blank"
    rel="noopener"
    >DatepickerSlider.vue</a
  >

  <br />
  <br />

  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/composables/useIsSlotInited.ts`"
      target="_blank"
      rel="noopener"
      >useIsSlotInited</a
    >
  </h2>
  <p>Checks weather the passed slot is inited.</p>
  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>slot </strong>
      <code>Slot | undefined</code>
      <p>Slot reference.</p>
    </li>
  </ul>

  <h3 class="section-title" id="inputs">Returns</h3>
  <ul>
    <li>
      <strong>isInited </strong>
      <code> ComputedRef&lt;boolean | undefined&gt;</code>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <a
    :href="`${Config.componentsUrl}/components/input/Input.vue#L59`"
    target="_blank"
    rel="noopener"
    >DatepickerSlider.vue</a
  >

  <br />
  <br />

  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/composables/useStorageState.ts`"
      target="_blank"
      rel="noopener"
      >useStorageState</a
    >
  </h2>
  <p>Convenient way to control the visibility of component</p>
  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>name </strong>
      <code>string</code>
      <p>Storage key value (fefaults to <strong>_storage</strong>)</p>
    </li>
  </ul>

  <h3 class="section-title" id="inputs">Returns</h3>
  <ul>
    <li>
      <strong>isHidden </strong>
      <code> ComputedRef&lt;boolean | undefined&gt;</code>
    </li>
    <li>
      <strong>updateStorageState </strong>
      <code>(newState: boolean): void</code>
    </li>
  </ul>

  <br />
  <br />

  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/composables/useUrlSync.ts`"
      target="_blank"
      rel="noopener"
      >useUrlSync</a
    >
  </h2>
  <p>Composable used to sync pagination data with URL</p>
  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>{ data, urlSyncParam? = "page" }</strong>
      <code>{ PaginationData, string; }</code>
      <p>Storage key value (fefaults to <strong>_storage</strong>)</p>
    </li>
  </ul>

  <h3 class="section-title" id="inputs">Returns</h3>
  <ul>
    <li>
      <strong>paginationData </strong>
      <code>Ref&lt;PaginationData&gt;</code>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Reference</h3>
  <a
    :href="`${Config.componentsUrl}/components/pagination/pagination-data.ts`"
    target="_blank"
    rel="noopener"
    >pagination-data.ts</a
  >

  <br />
  <br />
</template>
