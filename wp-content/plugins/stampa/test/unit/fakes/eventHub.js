export default {
  data() {
    return {
      onEvent: false,
      onEventAction: null,
      onEventData: null,
      modals: {},
    };
  },
  // Just to avoid the warning Failed to mount component: template or render function not defined.
  render() {},
  methods: {
    spy(action, data) {
      this.onEvent = true;
      this.onEventAction = action;
      this.onEventData = data;
    },
  },
  mounted() {
    this.$on('ajax', this.spy);

    // Allows external script to do something when the ajax request starts.
    // As the ajax event can be triggered by any component / custom script.
    this.$on('ajax', (name, values) => {
      this.$emit(`ajax-start-${name}`, values);
    });

    this.$on('modal-clicked', (name, value) => {
      this.modals[name] = value;

      this.$emit(`modal-clicked-${name}`, value);
    });
  },
};
