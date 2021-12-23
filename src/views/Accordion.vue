<template>
  <div>Accordion</div>
  <AbritesGrid>
    <div class="col-lg-6">
      <h2 class="component-title" id="accordion-selector">
        <router-link :to="`${Config.componentsUrl}/lib/accordion/Accordion.vue`"
          >AbritesAccordion</router-link
        >
        <span>{{'<AbritesAccordion></AbritesAccordion>'}}</span>
      </h2>

      <p>This is the main wrapper accordion component.</p>
      <p>
        Expects
        <code>{{'<AbritesAccordion></AbritesAccordion>'}}</code>
        children with <code>withAccordeonController</code> attribute.
      </p>

      <h3 class="section-title" id="accordion-inputs">Inputs</h3>
      <ul>
        <li>
          <strong>multiple</strong> <code>boolean</code>
          <p>
            Whether the accordion should allow expanding more than one panel
            (default to <code>false</code>).
          </p>
        </li>
        <li>
          <strong>stepped</strong> <code>boolean</code>
          <p>
            Disable all panels after the current active one and allow expanding
            only the panels before it. <br />
            The following helper public methods could be used:
            <code>nextStep()</code>, <code>prevStep()</code> and
            <code>activateStep(int index)</code>
          </p>
        </li>
      </ul>

      <h3 class="section-title" id="accordion-events">Events</h3>
      <ul>
        <li>
          <strong>change</strong> <code>{{ "number[]" }}</code>
          <p>
            Fired after one of the accordion panel child collapsed/expanded.
            Receives a list with the currently expanded panel indexes.
          </p>
        </li>
      </ul>

      <h3 class="section-title" id="accordion-styling">Styling</h3>
      <p>
        The following attributes and/or classes could be used to customize the
        accordion style:
      </p>
      <ul>
        <li><code>[spaced]</code>, <code>.spaced</code></li>
      </ul>
    </div>
    <div class="col-lg-6">
      <h2 class="component-title" id="accordion-panel-selector">
        <router-link
          :to="`${Config.componentsUrl}/lib/accordion-panel/AccordionPanel.vue`"
          >AbritesAccordionPanel</router-link
        >
        <span>{{`<AbritesAccordion></AbritesAccordion>`}}</span>
      </h2>

      <p>
        Represents single accordion panel. Could be used as standalone component
        or combined with {{`<AbritesAccordion></AbritesAccordion>`}} for parent.
      </p>

      <h3 class="section-title" id="accordion-panel-inputs">Inputs</h3>
      <ul>
        <li>
          <strong>label</strong> <code>string</code>
          <p>Primary label of the panel (displayed in the panel header).</p>
        </li>
        <li>
          <strong>hint</strong> <code>string</code>
          <p>
            Secondary label of the panel (displayed in the panel header below
            <code>label</code>).
          </p>
        </li>
        <li>
          <strong>collapseIcon</strong> <code>string</code>
          <p>
            Name of the icon ligature for the collapsed panel state (default to
            'keyboard_arrow_up'). See
            <router-link to="/icon"> Icon </router-link> for list with all
            icons.
          </p>
        </li>
        <li>
          <strong>expandIcon</strong> <code>string</code>
          <p>
            Name of the icon ligature for the expanded panel state (default to
            'keyboard_arrow_down'). See
            <router-link to="/icon"> Icon </router-link> for list with all
            icons.
          </p>
        </li>
        <li>
          <strong>disabled</strong> <code>boolean</code>
          <p>
            Mark the panel as disabled. This will disable also all pointer
            events (default to <code>false</code>)
          </p>
        </li>
        <li>
          <strong>noninteractive</strong> <code>boolean</code>
          <p>
            Disable user interactivity and allow only programatically to change
            the panel visibility (default to <code>false</code>).
          </p>
        </li>
        <li>
          <strong>scrollIntoView</strong> <code>boolean</code>
          <p>
            Whether to scroll to the expanded panel content if it's not within
            the visible viewport (default to <code>true</code>).
          </p>
        </li>
        <li>
          <strong>expanded</strong> <code>boolean</code>
          <p>Show the panel content (default to <code>false</code>).</p>
        </li>
        <li>
          <strong>animation</strong> <code>number</code>
          <p>
            Interval in ms for the expand/collapse animation (default to
            <code>200</code>).
          </p>
        </li>
        <li>
          <strong>withAccordeonController</strong> <code>boolean</code>
          <p>
            Weather the element is nested in {{`<AbritesAccordion
            ></AbritesAccordion>`}} (default to <code>false</code>).
          </p>
        </li>
      </ul>

      <h3 class="section-title" id="accordion-panel-events">Events</h3>
      <ul>
        <li>
          <strong>change</strong> <code>{{ "boollean" }}</code>
          <p>
            Fired on panel expand/collapse (before <code>animationEnd</code>).
            Receives the new state as an argument.
          </p>
        </li>
        <li>
          <strong>animationEnd</strong> <code>{{ "boollean" }}</code>
          <p>
            Fired on panel expand/collapse animation end (after
            <code>change</code>). Receives the new state as an argument.
          </p>
        </li>
        <li>
          <strong>beforeExpand</strong>
          <p>Fired before expanding the panel content.</p>
        </li>
        <li>
          <strong>beforeCollapse</strong>
          <p>Fired before collapsing the panel content.</p>
        </li>
      </ul>

      <h3 class="section-title" id="accordion-panel-slots">Slots</h3>
      <p>The following slots (aka. <code>v-slot</code>) are available:</p>
      <ul>
        <li>
          <code>v-slot:prefix</code>
          <p>Content that is displayed before the panel header main content.</p>
        </li>
        <li>
          <code>v-slot:suffix</code>
          <p>
            Content that is displayed after the panel header main content and
            before the collapse/expand icon.
          </p>
        </li>
        <li>
          <strong>no selector (v-slot:default)</strong>
          <p>Content that is displayed only when the panel is expanded.</p>
        </li>
      </ul>
      <p>
        Additionally you could also use
        <code
          >{{`
          <div class="panel-footer">...</div>
          `}}</code
        >
        to wrap panel controls (eg. buttons) at the bottom of the expanded
        content.
      </p>

      <h3 class="section-title" id="accordion-panel-styling">Styling</h3>
      <p>
        The following attributes and/or classes could be used to customize the
        panel style:
      </p>
      <ul>
        <li><code>[light]</code>, <code>.light</code></li>
        <li><code>[dark]</code>, <code>.dark</code></li>
        <li><code>[flat]</code>, <code>.flat</code></li>
        <li><code>[noshadow]</code>, <code>.noshadow</code></li>
        <li><code>[nopadding]</code>, <code>.nopadding</code></li>
        <li><code>[spaced]</code>, <code>.spaced</code></li>
      </ul>
    </div>
  </AbritesGrid>

  <Preview title="Panel styling" :htmlExample="themesExample" />

  <Preview title="Slots" :htmlExample="slotsExample" />

  <Preview
    title="Accordion - single"
    :htmlExample="htmlSimpleAccordionExample"
  />
  <Preview
    title="Accordion - multiple"
    :htmlExample="htmlMultipleAccordionExample"
  />
  <Preview
    title="Accordion - stepped"
    :htmlExample="htmlSteppedAccordionExample"
  />
</template>

<script lang="ts" setup>
import Preview from "./shared/Preview.vue";
import Config from "../utils/app-config";

const themesExample = `
  <AbritesAccordionPanel label="Default">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel label="Different collapse/expand icons" collapseIcon="remove" expandIcon="add">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel light label="Light">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel dark label="Dark">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel noshadow dark label="No shadow">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel nopadding dark label="No content padding">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel disabled label="Disabled">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel expanded noninteractive :scrollIntoView="false" label="Noninteractive and expanded by default">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel spaced light label="Additional expansion spacing">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel flat light label="Flat light">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  <AbritesAccordionPanel flat dark label="Flat dark">
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
`;

const slotsExample = `
  <AbritesAccordionPanel label="Panel with header prefix">
  <template v-slot:prefix>
    <div>PREFIX</div>
  </template>
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  
  <AbritesAccordionPanel label="Panel with header suffix">
    <template v-slot:suffix>
      <div>SUFFIX</div>
    </template>
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
  
  <AbritesAccordionPanel label="Panel with header prefix + suffix">
    <template v-slot:prefix>
      <div>PREFIX</div>
    </template>
    <template v-slot:suffix>
      <div>SUFFIX</div>
    </template>
    <p>Lorem ipsum dolor sit amet...</p>
  </AbritesAccordionPanel>
`;

const htmlSimpleAccordionExample = `
  <AbritesAccordion>
    <AbritesAccordionPanel withAccordeonController label="Default Panel 1">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
    <AbritesAccordionPanel withAccordeonController label="Default Panel 2">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
    <AbritesAccordionPanel withAccordeonController label="Default Panel 3">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
  </AbritesAccordion>

  <AbritesAccordion>
    <AbritesAccordionPanel withAccordeonController flat label="Flat Panel 1">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
    <AbritesAccordionPanel withAccordeonController flat label="Flat Panel 2">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
    <AbritesAccordionPanel withAccordeonController flat label="Flat Panel 3">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
  </AbritesAccordion>
  `;

const htmlMultipleAccordionExample = `
  <AbritesAccordion multiple>
    <AbritesAccordionPanel withAccordeonController label="Default Panel 1">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
    <AbritesAccordionPanel withAccordeonController label="Default Panel 2">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
    <AbritesAccordionPanel withAccordeonController label="Default Panel 3">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
  </AbritesAccordion>

  <AbritesAccordion multiple>
    <AbritesAccordionPanel withAccordeonController flat label="Flat Panel 1">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
    <AbritesAccordionPanel withAccordeonController flat label="Flat Panel 2">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
    <AbritesAccordionPanel withAccordeonController flat label="Flat Panel 3">
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAccordionPanel>
  </AbritesAccordion>
`;

const htmlSteppedAccordionExample = `
  <AbritesAccordion ref="steppedAccordion" stepped>
    <AbritesAccordionPanel withAccordeonController label="Step 1">
      <p>Lorem ipsum dolor sit amet...</p>

      <div class="panel-footer">
        <AbritesButton accent @trigger="$refs.steppedAccordion.nextStep">Next step</AbritesButton>
      </div>
    </AbritesAccordionPanel>

    <AbritesAccordionPanel withAccordeonController label="Step 2">
      <p>Lorem ipsum dolor sit amet...</p>

      <div class="panel-footer">
        <AbritesButton @trigger="$refs.steppedAccordion.prevStep">Prev step</AbritesButton>
        <AbritesButton accent @trigger="$refs.steppedAccordion.nextStep">Next step</AbritesButton>
      </div>
    </AbritesAccordionPanel>

    <AbritesAccordionPanel withAccordeonController label="Step 3">
      <p>Lorem ipsum dolor sit amet...</p>
      <div class="panel-footer">
        <AbritesButton @trigger="$refs.steppedAccordion.prevStep">Prev step</AbritesButton>
      </div>
    </AbritesAccordionPanel>
  </AbritesAccordion>
`;
</script>
