<template>
  <div class="preview-host">
    <header class="preview-header">
      <h5 class="title">{{ title }}</h5>
      <div class="flex-fill"></div>
      <AbritesButton small @trigger="previewPopup.open()">
        <abrites-icon icon="code"></abrites-icon>
        <span class="txt">View code</span>
      </AbritesButton>
    </header>

    <div class="preview-content">
      <component :is="{ template: htmlExample, setup: setupFn }"></component>
    </div>

    <AbritesPopup ref="previewPopup" popupClass="large">
      <div class="popup-header">{{ title }}</div>
      <div class="popup-content">
        <AbritesTabs stretched @change="onTabChange">
          <AbritesTabPanel label="HTML" active>
            <pre class="javascript" v-highlightjs>
              <code class="javascript"> 
                {{ htmlExample }}
              </code>
            </pre>
          </AbritesTabPanel>

          <AbritesTabPanel label="VUE">
            <pre class="javascript" v-highlightjs>
              <code class="javascript"> 
                {{ templateRef }}
              </code>
            </pre>
          </AbritesTabPanel>
        </AbritesTabs>
      </div>
    </AbritesPopup>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, reactive, ref } from "vue";

interface TemplateParts {
  html: string;
  code: string;
  imports: string;
  setupFn: (() => Record<string, unknown> | undefined) | undefined;
}
const Preview = defineComponent({
  name: "Preview",
  props: {
    title: {
      type: String,
    },
    htmlExample: {
      type: String,
      default: "",
    },
    scriptExample: {
      type: String,
      default: "",
    },
    imports: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    setupFn: {
      type: Function as PropType<() => Record<string, unknown> | undefined>,
    },
  },
  setup(props) {
    const previewPopup = ref();
    const templateRef = ref("");
    const templateParts = reactive<TemplateParts>({
      html: props.htmlExample,
      code: props.scriptExample,
      imports: props.imports.join("\n"),
      setupFn: props.setupFn,
    });

    onBeforeMount(() => {
      templateRef.value = vueExampleGenerator(templateParts);
    });

    const onTabChange = () => {
      return;
    };
    return {
      templateRef,
      previewPopup,
      onTabChange,
    };
  },
});

function vueExampleGenerator(templateParts: TemplateParts): string {
  return `
<template>
  ${templateParts.html}
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  ${templateParts.imports}
  export default defineComponent({ name: "YourComponent", ${templateParts.code}});
< /script>;

<style> </style>
`;
}

export default Preview;
export { Preview };
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../../assets/global";

.preview-host {
  @include normalize-host();
  display: block;
  width: 100%;
  margin: 0 0 $base-spacing;
}

.preview-header {
  @include children-spacing();
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 8px;

  .title {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: $txt-bold;
  }
}

.preview-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: auto;
  padding: (math.div($base-spacing, 2)) - 5px;
  background: darken($base-color, 2%);
  border-radius: $border-radius;
  ::v-deep() > * {
    margin: 5px;
  }

  .preview-host[top] &,
  .preview-host.top & {
    align-items: flex-start;
  }

  .preview-host[bottom] &,
  .preview-host.bottom & {
    align-items: flex-end;
  }
}
</style>
