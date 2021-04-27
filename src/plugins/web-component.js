export default {
  install(app, options) {
    class HTMLWidgetElement extends HTMLElement {
      constructor() {
        const element = super();
        app._props["offerId"] = element.getAttribute("offers-id");
        window.App = app.mount(element);
      }
    }

    window.customElements.define(options.offerId, HTMLWidgetElement);
  },
};
