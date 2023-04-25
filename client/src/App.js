import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CreateForm from "./components/CreateFrom/CreateFrom";
import Detail from "./components/Detail/Detail";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Routes>
        {/* <Route path='/' element={<NavBar/>}/> */}
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/createForm" element={<CreateForm />} />
      </Routes>
    </div>
  );
}

export default App;
