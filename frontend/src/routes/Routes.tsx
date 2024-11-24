import {
  BrowserRouter as Router,
  Route,
  Routes as ImportedRoute,
} from "react-router-dom";
import { Error, TodoList } from "../pages";

const RoutesComponent = () => {
  return (
    <Router>
      <ImportedRoute>
        <Route path="/" element={<TodoList />} />
        <Route path="/error" element={<Error />} />
      </ImportedRoute>
    </Router>
  );
};

export default RoutesComponent;
