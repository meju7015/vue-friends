<template>
	<select 
		class="select"
		:name="name" 
		:id="id" 
		:value="value" 
		@change="updateInput"
	>
		<option
			v-for="(option, i) in options" :key="i" 
			:value="option.value"
		>{{option.text}}</option>
	</select>
</template>
<script>
	export default {
		name: 'SelectStyle',
		props: {
			value: {
				typs: String
			}, 
			name: {
				typs: String
			}, 
			id: {
				typs: String
			}, 
			options: {
				typs: String
			}
		},
		methods: {
			updateInput: function (e) {
				this.$emit('input', e.target.value)
			}
		}
	}
</script>
<style lang="scss" scoped>
.select {
	width:auto;
	height:20px;
	line-height:20px;
	padding:0 15px 0 5px;
	color: #222;
	border:0;
	//border-bottom:1px solid #ddd;
	background:transparent;
	font-size:13px;
	margin-top:3px;
}
</style>