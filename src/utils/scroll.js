import { ref, computed } from 'vue'

// 无限滚动
const total = ref(20)

const count = ref(6) // 初始数量
const loading = ref(false)
const noMore = computed(() => count.value >= total.value)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
    loading.value = true

    setTimeout(() => {
        count.value += 4 // 每次加载的数量
        loading.value = false
    }, 1000)
}

const getTotal = (num) => {
    total.value = num.value
}

export { count, loading, noMore, disabled, load, getTotal }