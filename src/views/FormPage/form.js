import {formControl} from "../../utils/form";
import _ from 'lodash'

export const childFormControl = ({name, age}) => {
    return {
        name: formControl(
            {label: "Имя", type: "text", errorMessage: "Заполните поле Имя"},
            {required: true}, name
        ),
        age: formControl(
            {label: "Возраст", type: "number", errorMessage: "Заполните поле Возраст"},
            {required: true}, age
        )
    }
}
export const formControls = initial => {
    return {
        name: formControl(
            {label: "Имя", type: "text", errorMessage: "Заполните поле Имя"},
            {required: true}, _.get(initial, 'name')
        ),
        age: formControl(
            {label: "Возраст", type: "number", errorMessage: "Заполните поле Возраст"},
            {required: true}, _.get(initial, 'age')
        ),
        children: initial.children.map(({name, age}) => childFormControl({name, age})) ?? []
    }
}
