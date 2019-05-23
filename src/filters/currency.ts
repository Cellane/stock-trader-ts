import { Vue } from "vue-property-decorator"

Vue.filter("currency", (value: number) => "$" + value.toLocaleString())
