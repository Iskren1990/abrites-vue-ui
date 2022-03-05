<script lang="ts" setup>
import { Ref, ref } from "vue";
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";

const imports = ['import { Ref, ref } from "vue";\n'];
const setup = () => {
  const message = ref<string | undefined>("");
  const open: Ref<boolean> = ref<boolean>(false);
  const chosedAnswer = ref<Event | undefined>();

  const ask = () => {
    open.value = true;
    message.value = "Are you sure?";
  };

  const answer = (answer: Event) => {
    chosedAnswer.value = answer;
    open.value = false;
  };

  return { message, open, ask, answer, chosedAnswer };
};

const htmlExample = `
  <div>
    <AbritesConfirmation :open="open" :message="message" @answer="answer" />
    <AbritesButton @trigger="ask">Confirm</AbritesButton>
    <br>
    <br>
    <div>
      <span>Answer: </span>
      <strong>{{chosedAnswer}}</strong>
    </div>
  </div>
`;
</script>

<template>
  <AbritesGrid>
    <div class="col-lg-12">
      <h2 class="component-title" id="selector">
        <a
          :href="`${Config.componentsUrl}/components/confirmation/Confirmation.vue`"
          target="_blank"
          rel="noopener"
          >AbritesConfirmation</a
        >
        <span>&lt;AbritesConfirmation&gt;&lt;/AbritesConfirmation&gt;</span>
      </h2>

      <p>This component takes care for displaying the confirmation message.</p>

      <h3 class="section-title" id="inputs">Inputs</h3>
      <ul>
        <li>
          <strong>message</strong> <code>string</code>
          <p>Message to display.</p>
        </li>
        <li>
          <strong>open?</strong> <code>boolean</code>
          <p>
            Controls the state of the popup. (default to <code>false</code>).
          </p>
        </li>
        <li>
          <strong>teleportTo?</strong> <code>string</code>
          <p>Vue &lt;teleport&gt; component in use.</p>
          <p>
            CSS selector to which the element should be attached. (default to
            <code>body</code>).
          </p>
        </li>
        <li>
          <strong>yesButtonText?</strong> <code>string</code>
          <p>Yes button text (default to <code>'Yes'</code>).</p>
        </li>
        <li>
          <strong>noButtonText?</strong> <code>string</code>
          <p>No button text (default to <code>'No'</code>).</p>
        </li>
      </ul>

      <h3 class="section-title" id="events">Events</h3>
      <ul>
        <li>
          <strong>answer</strong> <code>boolean</code>
          <p>Fired once the option is choosed.</p>
        </li>
      </ul>
    </div>
  </AbritesGrid>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Default"
    :htmlExample="htmlExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
</template>
