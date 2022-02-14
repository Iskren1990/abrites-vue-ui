<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/list-item/ListItem.vue`"
      target="_blank"
      rel="noopener"
      >AbritesListItem</a
    >
    <span>&lt;AbritesListItem&gt;&lt;/AbritesListItem&gt;</span>
  </h2>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>label</strong> <code>string</code>
      <p>The primary text of the list item.</p>
    </li>
    <li>
      <strong>hint?</strong> <code>string</code>
      <p>The secondary text of the list item.</p>
    </li>
    <li>
      <strong>animate?</strong> <code>boolean</code>
      <p>
        Enable css entrance (on dom insert) animation (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>active?</strong> <code>boolean</code>
      <p>
        Mark the list item as active/selected (default to <code>false</code>).
      </p>
    </li>
    <li>
      <strong>disabled?</strong> <code>boolean</code>
      <p>
        Mark the list item as disabled. This will disable also all pointer
        events (default to <code>false</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>trigger</strong>
      <p>
        Fired when the list item is activated via click, tap, enter/space key
        press. This is ignored if <code>disabled</code> is set.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="slots">Slots</h3>
  <p>The following slots (aka. <code>slot</code>) are available:</p>
  <ul>
    <li>
      <code>v-slot:beforeContent || #beforeContent</code>
      <p>
        Content that is displayed before the main content (label and hint) of
        the list item.
      </p>
    </li>
    <li>
      <code>v-slot:afterContent || #afterContent</code>
      <p>
        Content that is displayed after the main content (label and hint) of the
        list item.
      </p>
    </li>
    <li>
      <strong>no selector (default)</strong>
      <p>
        Content that is aligned to the most right side of the list item, after
        <code>v-slot:default || #default</code>. Usually used for buttons and
        other control elements.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[large]</code>, <code>.large</code></li>
    <li><code>[spaced]</code>, <code>.spaced</code></li>
    <li><code>[shadowized]</code>, <code>.shadowized</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview title="Simple" :htmlExample="htmlSimpleExample" />

  <Preview title="Slots" :htmlExample="htmlSlotsExample" />

  <Preview title="With buttons" :htmlExample="htmlButtonsExample" />
</template>

<script lang="ts" setup>
import { Preview } from "./shared";
import * as Config from "../utils/app-config";

const htmlSimpleExample = `
<AbritesListItem label="Simple list item 1"></AbritesListItem>

<AbritesListItem label="Simple list item 2"></AbritesListItem>

<AbritesListItem spaced label="Spaced list item 1"></AbritesListItem>

<AbritesListItem spaced label="Spaced list item 2"></AbritesListItem>

<AbritesListItem shadowized label="Shadowized list item"></AbritesListItem>

<AbritesListItem active label="Active list item"></AbritesListItem>

<AbritesListItem disabled label="Disabled list item"></AbritesListItem>

<AbritesListItem label="List item with hint" hint="Some hint"></AbritesListItem>

<AbritesListItem large label="Large list item"></AbritesListItem>
`;

const htmlSlotsExample = `
  <AbritesListItem label="Before content example">
    <template v-slot:beforeContent> BEFORE... </template>
  </AbritesListItem>

  <AbritesListItem label="After content example">
    <template v-slot:afterContent> AFTER... </template>
  </AbritesListItem>

  <AbritesListItem label="No selector example">
    SOMETHING...
  </AbritesListItem>

  <AbritesListItem label="All slots + hint example" hint="Some hint">
    <template v-slot:beforeContent> BEFORE... </template>
    <template v-slot:afterContent> AFTER... </template>
    SOMETHING...
  </AbritesListItem>
`;

const htmlButtonsExample = `
<AbritesListItem label="Regular list item with button controls">
  <AbritesButton small round flat>
    <AbritesIcon icon="attach_file"></AbritesIcon>
  </AbritesButton>
  <AbritesButton small round flat>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
</AbritesListItem>

<AbritesListItem large label="Large list item with button controls">
  <AbritesButton round flat>
    <AbritesIcon icon="attach_file"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round flat>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
</AbritesListItem>
`;
</script>
