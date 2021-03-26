<template>
  <div :style="{display: isLoading ? displayStyleLoader : displayStyleTarget}">
    <div
      ref="loaderSlot"
      v-if="isLoading"
      :style="{display: displayStyleLoader}"
    >
      <slot
        v-if="isLoading"
        name="loader">
        Loading...
      </slot>
    </div>
    <div
      ref="targetSlot"
      :style="{display: isLoading ? 'none' : displayStyleTarget}">
      <slot
        ref="targetSlot"
        name="target"
        v-bind="{showLoader}">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueRealLazy',
  data() {
    return {
      isLoading: true,
      displayStyleTarget: '',
      displayStyleLoader: '',
      oldInnerHtml: '',
    };
  },
  created() {
    this.showLoader = this.showLoader.bind(this);
  },
  updated() {
    // reset isLoading if innerHtml has changed
    if (this.$refs.targetSlot.innerHTML !== this.oldInnerHtml) {
      this.oldInnerHtml = this.$refs.targetSlot.innerHTML;
      this.isLoading = true;
    }
  },
  mounted() {
    const loaderNode = this.$refs.loaderSlot.childNodes[0];
    const targetNode = this.$refs.targetSlot.childNodes[0];

    // get display attribute for loader and target from slot
    this.displayStyleLoader = loaderNode.nodeType === 1 ? getComputedStyle(loaderNode).display : 'inline-block';
    this.displayStyleTarget = targetNode.nodeType === 1 ? getComputedStyle(targetNode).display : 'inline-block';
    this.oldInnerHtml = targetNode.innerHTML;
  },
  methods: {
    showLoader(state) {
      this.isLoading = state;
    },
  },
};
</script>
