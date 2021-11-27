import './style.css'
import logo from 'assets/logo.svg'
import PropTypes from 'prop-types';
import {useContext} from "react";
import {AppContext} from "contexts/AppContext";

const Header = ({menu}) => {
    const {page, setPage} = useContext(AppContext)
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <div className="menu">
                {menu.map(item => <span
                                     className={['menu-item', page === item.key && 'active'].join(" ")}
                                     onClick={() => setPage(item.key)}
                                     key={item.key}>{item.title}</span>)}
            </div>
        </div>
    )
}
Header.propTypes = {
    menu: PropTypes.array,
}

export default Header