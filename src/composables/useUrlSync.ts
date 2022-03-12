import { PaginationData } from "../components/pagination/pagination-data";
import { onMounted, ref, watch } from "vue";
import { Router, useRouter } from "vue-router";

export interface IURLSync {
  router: Router;
  data: PaginationData;
  urlSyncParam?: string;
}

function toObj(key, value) {
  const obj = {};
  obj[key] = value;
  return obj;
}

const useUrlSync = ({ router, data, urlSyncParam = "page" }: IURLSync) => {
  const paginationData = ref(data);

  const _syncComponentWithUrl = () => {
    const params = router.currentRoute.value.query;
    const syncParams = params[urlSyncParam] as string;

    if (!syncParams?.length) {
      return;
    }
    const tempData = PaginationData.fromString(syncParams ?? urlSyncParam);
  };

  onMounted(_syncComponentWithUrl);
  watch(
    () => paginationData.value,
    () => _syncUrlWithComponent()
  );

  const _syncUrlWithComponent = () => {
    if (router == undefined) {
      console.log(`Router is not defined ${paginationData.value} ${router}`);
    } else {
      const currentRouteName = router.currentRoute.value.name;
      const query = router.currentRoute.value.query;
      const currentHash = router.currentRoute.value.hash;

      router.push({
        name: currentRouteName,
        query: {
          ...query,
          ...toObj(urlSyncParam, paginationData.value.toString()),
        },
        hash: currentHash,
      });
    }
  };

  return { paginationData };
};

export { useUrlSync };
