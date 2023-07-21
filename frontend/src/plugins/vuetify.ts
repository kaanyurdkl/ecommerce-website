// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  ssr: true,
  components,
  directives,
});
