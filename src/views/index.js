import Header from "../components/layout-components/Header";
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import menu from "../config/menu";
import {getPageComponent} from "../utils";
import Footer from "../components/layout-components/Footer";


const Views = () => {
    const {page} = useContext(AppContext)

    return (
        <div>
            <Header menu={menu}/>
            <div className="page-content">
                {getPageComponent(page)}
            </div>
            <Footer/>
        </div>
    )
}

export default Views