export default {
  install(app, options) {
    class HTMLWidgetElement extends HTMLElement {
      constructor() {
        const element = super();
        app._props["offerHash"] = element.getAttribute("offers-hash");
        window.App = app.mount(element);
      }
    }
    window.customElements.define(options.offerHash, HTMLWidgetElement);
  },
};
