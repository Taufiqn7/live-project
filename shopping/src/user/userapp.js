import { HashRouter, Routes, Route, Link } from "react-router-dom";
import MyHome from "./home";
import MyFooter from "./footer";
import Myheader from "./userheader";
import Mycart from "./cart";
import Mylogin from "./login";
import CreateAccount from "./signup";

const UserModule = () =>{
    return(
        <HashRouter>
            <Myheader/>

            <Routes>
                <Route exact path="/" element={<MyHome/>}/>
                <Route exact path="/cart"element={<Mycart/>}/>
                <Route exact path="/login"element={<Mylogin/>}/>
                <Route exact path="/signup"element={<CreateAccount/>}/>
            </Routes>


            <MyFooter/>
        </HashRouter>
    )
}

export default UserModule;