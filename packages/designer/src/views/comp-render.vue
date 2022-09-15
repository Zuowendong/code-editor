<template>
	<component
		:is="compItem.type"
		:comp-uuid="compItem.uuid"
		:comp-type="compItem.type"
		v-bind="{ ...formatProps(compItem.props) }"
	>
		<template v-if="compItem.children">
			<component
				v-for="childItem in compItem.children"
				:key="childItem.uuid"
				:is="childItem.type"
				:comp-uuid="childItem.uuid"
				:comp-type="childItem.type"
				v-bind="{ ...formatProps(childItem.props) }"
				@click.stop.prevent="handleSwitchComp(childItem)"
			></component>
		</template>
	</component>
</template>

<script setup>
import { useCompStore } from "../store/component";
import { formatStyle, formatProps } from "../utils/formatComp";

const props = defineProps({
	compItem: {
		type: Object,
		default: () => {
			return {};
		},
	},
});
let { compItem } = toRefs(props);

const compStore = useCompStore();
const handleSwitchComp = (compData) => {
	compStore.setCurrComp(compData);
};
</script>

<style lang="scss" scoped></style>
