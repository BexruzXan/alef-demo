import menu from "../config/menu";

export const getPageComponent = key => {
    try {
        return menu.find(item => item.key === key).component
    } catch (e) {
        return "Cannot load page component"
    }
}