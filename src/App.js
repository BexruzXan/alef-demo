import {AppProvider} from "./contexts/AppContext";
import Views from "./views";
import Loading from "./components/Loading";
import 'assets/style.css'
const App = () => {
    return (
        <div className="App">
            <AppProvider spinner={<Loading/>}>
                <Views/>
            </AppProvider>
        </div>
    )
}

export default App