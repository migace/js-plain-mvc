import "bulma/css/bulma.css";
import "./styles.css";

import Controller from "./Controller";
import Model from "./Model";
import View from "./View";

new Controller(new Model(), new View("#app"));
