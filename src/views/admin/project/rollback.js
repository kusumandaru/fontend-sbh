import router from '@/router'

export default function useHistoriesList() {
  const refetchData = () => {
    router.go()
  }

  return {
    refetchData,
  }
}
