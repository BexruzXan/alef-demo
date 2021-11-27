import {useContext, useState} from "react";
import {AppContext} from "contexts/AppContext";
import Input from "components/Input";
import {validate, validateForm} from "utils/form";
import {childFormControl, formControls} from "./form";
import plusIcon from 'assets/plus.svg'
import _ from 'lodash'

// todo pull out logic from component

const FormPage = () => {
    const {formValues, saveData} = useContext(AppContext)
    const [form, setForm] = useState({formControls: formControls(formValues), isFormValid: false})

    const submitHandler = () => {
        const values = {...form.formControls}
        values.name.touched = true
        values.age.touched = true
        values.children = values.children.map(item => {
            const children = item
            children.name.touched = true
            children.age.touched = true
            return children
        })
        setForm(state => ({...state, formControls: values, isFormValid: validateForm(values)}))
        if (form.isFormValid) saveData({
            name: values.name.value,
            age: values.age.value,
            children: values.children.map(({name, age}) => (
                {name: name.value, age: age.value}
            ))
        })
    }
    const changeHandler = (value, controlName) => {
        const formControls = {...form.formControls}
        const control = {..._.get(form.formControls, controlName)}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        _.set(formControls, controlName, control)

        setForm({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }
    const getFieldProps = name => {
        try {
            const {type, label, value, valid, validation, touched, errorMessage} = _.get(form.formControls, name)
            return {
                type,
                label,
                value,
                valid,
                shouldValidate: !!validation,
                touched,
                errorMessage,
                onChange: event => changeHandler(event.target.value, name),
            }
        } catch (e) {
            return {}
        }
    }
    const onChildrenAdd = () => {
        if (form.formControls.children?.length === 5) return false
        setForm(state => ({
            ...state,
            formControls: {
                ...state.formControls,
                children: [...state.formControls.children, childFormControl(Math.random())]
            }
        }))
    }
    const onChildrenDelete = (key) => {
        setForm(state => ({
            ...state,
            formControls: {
                ...state.formControls,
                children: state.formControls.children.filter((_, index) => index !== key)
            }
        }))
    }
    return (
        <>
            <div>
                <p className="form-personal-label">Персональные данные</p>
                <Input {...getFieldProps('name')} className="mb-10"/>
                <Input {...getFieldProps('age')} className="mb-10"/>
            </div>
            <div className="children">
                <div className="children-header">
                    <p className="form-children-label">Дети (макс. 5)</p>
                    {form.formControls.children?.length !== 5 &&
                        <button className="form-children-add" onClick={onChildrenAdd}>
                            <img src={plusIcon} alt="" className="no-selection"/>
                            <span className="form-children-button-text no-selection">Добавить ребенка</span>
                        </button>
                    }
                </div>
                <div className="children-body">
                    {form.formControls.children.map((item, index) => {
                        return (
                            <div className="children-item mb-10" key={`children[${index}].name`}>
                                <Input {...getFieldProps(`children[${index}].name`)} className="children-name"/>
                                <Input {...getFieldProps(`children[${index}].age`)} className="children-age"/>
                                <span onClick={() => onChildrenDelete(index)} className="no-selection">Удалить</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <button className="save-button no-selection" onClick={submitHandler}>Сохранить</button>
        </>
    )
}

export default FormPage