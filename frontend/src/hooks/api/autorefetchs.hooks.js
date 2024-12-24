import { onUnmounted } from "vue";

export function useAutoRefetch(refetch, intervalTime = 20000) {
  const intervalId = setInterval(() => {
    refetch();
  }, intervalTime);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
}
