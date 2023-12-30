import { ref, computed} from 'vue'

// 无限滚动
const count = ref(6);
const loading = ref(false);
const noMore = computed(() => count.value >= 30);
const disabled = computed(() => loading.value || noMore.value);
const load = () => {
    loading.value = true;
    setTimeout(() => {
        count.value += 5;
        loading.value = false;
    }, 1000);
}

export { count, loading, noMore, disabled, load }