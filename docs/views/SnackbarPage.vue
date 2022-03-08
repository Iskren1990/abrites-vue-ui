<script lang="ts" setup>
import { ref } from "vue";
import { Preview } from "./shared";
import * as Config from "../utils/app-config";
import {
  SnackbarAction,
  SnackbarMessageModelProps,
} from "../../src/composables/useSnackbarMessageQueue";

const imports = ['import { ref } from "vue";'];

const setup = () => {
  const errSnack = ref<SnackbarMessageModelProps>();
  const successSnack = ref<SnackbarMessageModelProps>();
  const warningSnack = ref<SnackbarMessageModelProps>();
  const infoSnack = ref<SnackbarMessageModelProps>();

  // to display more than one message of a type
  let counter = 0;

  const action: SnackbarAction = {
    label: "Click me",
    callback: (message) => window.alert("Action button clicked!"),
  };

  const triggerInfo = () => {
    infoSnack.value = {
      text: `Ran info String ${counter++}`,
    };
  };

  const triggerSuccess = () => {
    successSnack.value = {
      text: `Ran success String ${counter++}`,
      action,
    };
  };

  const triggerError = () => {
    errSnack.value = {
      text: `Ran error String ${counter++}`,
      action,
    };
  };

  const triggerWarning = () => {
    warningSnack.value = {
      text: `Ran warning String ${counter++}`,
    };
  };

  return {
    errSnack,
    successSnack,
    warningSnack,
    infoSnack,
    triggerInfo,
    triggerSuccess,
    triggerError,
    triggerWarning,
  };
};

const htmlExample = `
   <AbritesButton @trigger="triggerInfo">Add info message</AbritesButton>
    <AbritesButton success @trigger="triggerSuccess"
      >Add success message</AbritesButton
    >
    <AbritesButton danger @trigger="triggerError"
      >Add error message</AbritesButton
    >
    <AbritesButton warning @trigger="triggerWarning"
      >Add warning message</AbritesButton
    >
    <AbritesSnackbar
      :error="errSnack"
      :success="successSnack"
      :warning="warningSnack"
      :info="infoSnack"
      top-left
    />
    <AbritesSnackbar
      :error="errSnack"
      :success="successSnack"
      :warning="warningSnack"
      :info="infoSnack"
      top-center
    />
    <AbritesSnackbar
      :error="errSnack"
      :success="successSnack"
      :warning="warningSnack"
      :info="infoSnack"
      top-right
    />
    <AbritesSnackbar
      :error="errSnack"
      :success="successSnack"
      :warning="warningSnack"
      :info="infoSnack"
      bottom-right
    />
    <AbritesSnackbar
      :error="errSnack"
      :success="successSnack"
      :warning="warningSnack"
      :info="infoSnack"
      bottom-center
    />
    <AbritesSnackbar
      :error="errSnack"
      :success="successSnack"
      :warning="warningSnack"
      :info="infoSnack"
      bottom-left
    />
`;
</script>

<template>
  <AbritesGrid>
    <div class="col-lg-6">
      <h2 class="component-title" id="selector">
        <a
          :href="`${Config.componentsUrl}/composables/useSnackbarMessageQueue.ts`"
          target="_blank"
          rel="noopener"
          >AbritesSnackbar</a
        >
        <span>&lt;AbritesSnackbar&gt;&lt;/AbritesSnackbar&gt;</span>
      </h2>

      <p>
        This component takes care for displaying the snackbar/toast messages.
      </p>
      <h3 class="section-title" id="styling">Inputs</h3>
      <p>
        The following attributes and/or classes could be used to change the
        position of the component:
      </p>
      <ul>
        <li>
          <strong>error? </strong><code>SnackbarMessageModelProps</code>
          <p>Error message to display.</p>
        </li>
        <li>
          <strong>info? </strong><code>SnackbarMessageModelProps</code>
          <p>Info message to display.</p>
        </li>
        <li>
          <strong>warning? </strong><code>SnackbarMessageModelProps</code>
          <p>Warning message to display.</p>
        </li>
        <li>
          <strong>success? </strong><code>SnackbarMessageModelProps</code>
          <p>Success message to display.</p>
        </li>
        <li>
          <strong>teleportTo? </strong><code>string</code>
          <p>Vue &lt;teleport&gt; component in use.</p>
          <p>
            CSS selector to which the element should be attached. (default to
            <code>body</code>).
          </p>
        </li>
      </ul>

      <h3 class="section-title" id="styling">Styling</h3>
      <p>
        The following attributes and/or classes could be used to change the
        position of the component:
      </p>
      <ul>
        <li>
          <code>[top]</code>, <code>[top-center]</code>, <code>.top</code>,
          <code>.top-center</code>
        </li>
        <li><code>[top-right]</code>, <code>.top-right</code></li>
        <li><code>[top-left]</code>, <code>.top-left</code></li>
        <li>
          <code>[bottom]</code>, <code>[bottom-center]</code>,
          <code>.bottom</code>, <code>.bottom-center</code>
        </li>
        <li><code>[bottom-right]</code>, <code>.bottom-right</code></li>
        <li><code>[bottom-left]</code>, <code>.bottom-left</code> (default)</li>
      </ul>
    </div>
    <div class="col-lg-6">
      <h2 class="component-title">
        <a
          :href="`${Config.componentsUrl}/composables/useSnackbarMessageQueue.ts#L3`"
          target="_blank"
          rel="noopener"
          >SnackbarMessageModelProps</a
        >
      </h2>

      <p>Interface facilitating the interaction with the component.</p>

      <h5><strong>SnackbarMessageModelProps</strong> <code>interface</code></h5>
      <ul>
        <li>
          <strong>text </strong><code>string</code>
          <p>Message text to display.</p>
        </li>
        <li>
          <strong>id? </strong><code>string</code>
          <p>
            Unique ID for the message, if ommited text prop is used as an ID.
          </p>
        </li>
        <li>
          <strong>action? </strong><code>SnackbarAction</code>
          <p>Additional actions available to the client.</p>
        </li>
        <li>
          <strong>duration? </strong><code>number</code>
          <p>Duration for which the message should be displayed.</p>
        </li>
      </ul>

      <h3 class="section-title" id="styling">SnackbarAction</h3>

      <p>Interface facilitating the interaction with the component.</p>

      <h5><strong>SnackbarAction</strong> <code>interface</code></h5>
      <ul>
        <li>
          <strong>label </strong><code>string</code>
          <p>Label for the action button.</p>
        </li>
        <li>
          <strong>callback</strong
          ><code>(message: SnackbarMessageModel) => void</code>
          <p>Callback to execute.</p>
        </li>
      </ul>
    </div>
  </AbritesGrid>
  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Message types"
    :htmlExample="htmlExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
  <div></div>
</template>
