import FormPage from "views/FormPage";
import PreviewPage from "views/PreviewPage";

const menu = [
    {
        title: 'Форма',
        key: 'form',
        component: <FormPage/>
    },
    {
        title: 'Превью',
        key: 'preview',
        component: <PreviewPage/>
    },
]

export default menu