import { Route, Router, Routes } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";

const App = lazy(() => import("./App"));
const About = lazy(() => import("./About"));
const Vox = lazy(() => import("./Vox"));

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={App}/>
        <Route path="/about" component={About}/>
        <Route path="/:id" component={App}/>
        <Route path="/search/:title" component={App}/>
        <Route path="/:id/:voxid" component={Vox}/>
      </Routes>
    </Router>
  ),
  document.getElementById('root')
);
