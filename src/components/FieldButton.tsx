import { useState } from "react"
import { useFields } from "../contexts/Fields";

interface FieldButtonProps{
    value: string
}

export const FieldButton = (props: FieldButtonProps) => {
    const [active, setActive] = useState(false);
    const {addField, removeField} = useFields()
    
    const toggleActive = () => {
        active ? removeField(props.value) : addField(props.value)
        setActive(!active);
    }
    
    return(
        <button 
            className="p-2 border transition-all duration-150 hover:brightness-95"
            onClick={toggleActive}
            style={active ? {backgroundColor: "#f98012", color: "rgb(244 244 245 / var(--tw-text-opacity))"} : {backgroundColor: "#cccccc"}}
        >
            {props.value}
        </button>
    )
}
