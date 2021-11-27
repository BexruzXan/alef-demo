import {useContext} from "react";
import {AppContext} from "contexts/AppContext";

const PreviewPage = () => {
    const {formValues: {age, name, children}} = useContext(AppContext)
    return (
        <>
            <div>
                <p className="preview-label">Персональные данные</p>
                <p className="preview-personal-details">{name}, {age} лет</p>
            </div>
            {children?.length !== 0 &&
                <div className="preview-children">
                    <p className="preview-label">Дети</p>
                    <div>
                        {children.map(({age, name}, index) => {
                            return (
                                <div className="preview-children-item" key={index}>
                                    {name}, {age} лет
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
}

export default PreviewPage