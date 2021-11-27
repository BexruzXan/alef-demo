export const formControl = (config, validation, initial='') => {
    return {
        ...config,
        validation,
        valid: validate(initial, validation),
        touched: false,
        value: initial,
    }
}

export function validate(value, validation = null) {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}

export function validateForm(formControls) {
    let isFormValid = true

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control) && !Array.isArray(formControls[control])) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }
    formControls.children?.forEach(item => {
        isFormValid = item.name.valid && isFormValid
        isFormValid = item.age.valid && isFormValid
    })

    return isFormValid
}