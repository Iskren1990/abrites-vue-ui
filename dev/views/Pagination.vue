<script lang="ts" setup>
import { Preview } from "./shared";
import * as Config from "../utils/app-config";
import { PaginationData } from "@/components/pagination/pagination-data";
import { ref } from "vue";
import { useUrlSync } from "@/entry.esm";

const imports = ["import { ref } from 'vue';"];

const htmlAlighmentsExample = `
  <AbritesPagination 
    left 
    v-model:pagination-data="pageDataLeft" 
    :totalItems="100" 
  />
  
  <AbritesPagination 
    center 
    v-model:pagination-data="pageDataCenter" 
    :totalItems="70" 
    :pageSizeOptions="pageSizeOptions" 
  />
  
  <AbritesPagination 
    right 
    v-model:pagination-data="pageDataRight" 
    :totalItems="100" 
  />
`;

const htmlSynchronizedExample = `
  <AbritesPagination
    left
    urlSync
    v-model:pagination-data="paginationData"
    :totalItems="100"
  />
`;
const setup = () => {
  const pageDataLeft = ref(new PaginationData(1, 30));
  const pageDataCenter = ref(new PaginationData(1, 10));
  const pageSizeOptions = [10, 20, 30];
  const pageDataRight = ref(new PaginationData(1, 30));
  const { paginationData } = useUrlSync({
    data: new PaginationData(1, 30),
  });
  return {
    pageDataLeft,
    pageDataCenter,
    pageSizeOptions,
    pageDataRight,
    paginationData,
  };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/pagination/Pagination.vue`"
      target="_blank"
      rel="noopener"
      >AbritesPagination</a
    >
    <span> &lt;AbritesPagination&gt;&lt;/AbritesPagination&gt; </span>
  </h2>
  <p>
    Pagination component that suports <code>v-model</code> and URL
    synchronization via
    <code>
      useUrlSync({ urlSyncParam = "page" }: IURLSync): PaginationData </code
    >.
  </p>
  <p>
    <code>
      interface IURLSync { urlSyncParam?: string; data: PaginationData; }
    </code>
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>paginationData</strong> <code>PaginationData</code>
      <p><code>v-model:pagination-data="data"</code></p>
      <p>
        <code>
          <a
            :href="`${Config.componentsUrl}/lib/pagination/pagination-data.ts`"
            target="_blank"
            rel="noopener"
            >PaginationData</a
          >
        </code>
        instance to load into the component.
      </p>
    </li>
    <li>
      <strong>totalItems?</strong> <code>number</code>
      <p>Total available items count (default to <code>0</code>).</p>
    </li>
    <li>
      <strong>pageSizeOptions?</strong> <code>number[]</code>
      <p>Page size select options (defaut to <code>[15, 30, 50]</code>).</p>
    </li>
    <li>
      <strong>perPageText?</strong> <code>string</code>
      <p>
        Page size selection label (default to <code>'Items per page'</code>).
      </p>
    </li>
    <li>
      <strong>ofTotalText?</strong> <code>string</code>
      <p>
        Separator label between the current page and
        <code>totalItems</code> (default to <code>'of'</code>).
      </p>
    </li>
    <li>
      <strong>urlSyncParam?</strong> <code>string</code>
      <p>
        The name of the query parameter to sync (default to
        <code>'page'</code>).
      </p>
      <p>Search value.</p>
    </li>
    <li>
      <strong>disabled?</strong> <code>boolean</code>
      <p>Disable the pagination controls (default to <code>false</code>).</p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong><code>@update:pagination-data</code></strong>
      <p>
        Fired when the pagination data (current page and/or page size) changes
        with <code>PaginationData</code> as argument.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[left]</code>, <code>.left</code></li>
    <li><code>[right]</code>, <code>.right</code></li>
    <li><code>[center]</code>, <code>.center</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Alignments"
    :htmlExample="htmlAlighmentsExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
  <Preview
    title="Url synchronization"
    :htmlExample="htmlSynchronizedExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
</template>
