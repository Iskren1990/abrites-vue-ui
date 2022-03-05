import { PaginationData } from "@/components/pagination/pagination-data";
import { onMounted, ref, Ref, watch } from "vue";
import { useRouter } from "vue-router";

export interface IURLSync {
  data: PaginationData;
  urlSyncParam?: string;
}
const useUrlSync = ({ data, urlSyncParam = "page" }: IURLSync) => {
  const paginationData = ref(data);
  const router = useRouter();

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
    const currentRouteName = router.currentRoute.value.name;
    const query = router.currentRoute.value.query;
    const currentHash = router.currentRoute.value.hash;

    function toObj(key, value) {
      const obj = {};
      obj[key] = value;
      return obj;
    }

    router.push({
      name: currentRouteName,
      query: {
        ...query,
        ...toObj(urlSyncParam, paginationData.value.toString()),
      },
      hash: currentHash,
    });
  };

  return { paginationData };
};

export default useUrlSync;
