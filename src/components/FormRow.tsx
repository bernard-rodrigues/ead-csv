import { useState } from "react";
import { useFields } from "../contexts/Fields";

interface FormRowProps{
    fieldName: string
}

export const FormRow = (props: FormRowProps) => {
    const {fields, addField, removeField, updateField} = useFields();

    const [isDefined, setIsDefined] = useState(false);

    const toggleFullName = () => {
        if(Object.keys(fields).includes("firstname")){
            addField("fullname");
        }else{
            addField("firstname");
        }
    }

    const toggleIsDefined = () => {
        updateField(props.fieldName);
        setIsDefined(!isDefined);
    }
    
    return(
        <div className="
            my-2 flex justify-between items-center
            [&>input]:border [&>input]:p-1
        ">
            <span
                className="border px-2 py-1 bg-gradient-to-r from-zinc-200 to-zinc-100"
                style={
                    props.fieldName === "username" ||
                    props.fieldName === "dfnd_username" ||
                    props.fieldName === "firstname" || 
                    props.fieldName === "lastname" || 
                    props.fieldName === "fullname" ||
                    props.fieldName.includes("course") ||
                    props.fieldName.includes("role") ? {width: "10rem"} : {width: "19rem"}}
            >
                {props.fieldName}<span className="text-red-500">{props.fieldName.includes('group') ? '' : '*'}</span>
            </span>

            {props.fieldName === "username" || props.fieldName === "dfnd_username" ?
            <button 
                className="w-36 py-2 border text-xs hover:brightness-95"
                type="button"
                style={props.fieldName === "dfnd_username" ? {backgroundColor: "#f98012", color: "rgb(244 244 245 / var(--tw-text-opacity))"} : {backgroundColor: "#cccccc"}}
                onClick={toggleIsDefined}
            >
                Remover . e -
            </button>

            :

            props.fieldName === "firstname" || props.fieldName === "lastname" ? 
            <button 
                className="w-36 bg-black py-2 border text-zinc-100 text-xs hover:brightness-95"
                type="button"
                onClick={toggleFullName}
            >
                Usar nome completo
            </button>
            
            :

            props.fieldName === "fullname" ?
            <button 
                className="w-36 bg-black py-2 border text-zinc-100 text-xs hover:brightness-95"
                type="button"
                onClick={toggleFullName}
            >
                Primeiro e último
            </button>
            :

            props.fieldName.includes("course") ?
            <button
                className="w-36 py-2 border hover:brightness-95 text-xs"
                style={props.fieldName.includes("dfnd_course") ? {backgroundColor: "#f98012", color: "rgb(244 244 245 / var(--tw-text-opacity))"}:{backgroundColor: "#cccccc"}}
                type="button"
                onClick={toggleIsDefined}
            >
                Definir curso
            </button>
            :

            props.fieldName.includes("role") ?
            <button
                className="w-36 py-2 border text-xs hover:brightness-95"
                style={props.fieldName.includes("dfnd_role") ? {backgroundColor: "#f98012", color: "rgb(244 244 245 / var(--tw-text-opacity))"} : {backgroundColor: "#cccccc"}}
                type="button"
                onClick={toggleIsDefined}
            >
                Definir papel
            </button>
            :
            <></>
            }
            
            <label 
                className="mx-3" 
                htmlFor={props.fieldName + "-column"}
            >
                {
                    props.fieldName.includes("dfnd_course") ? "Qual o nome breve do curso?" : 
                    props.fieldName.includes("dfnd_role") ? "Qual o nome do papel global?":
                    "Qual coluna contém os dados?"
                }
            </label>
            <input
                className="w-36 text-center"
                id={props.fieldName + "-column"}
                name="column" 
                type="text" 
                value={fields[props.fieldName]}
                onChange={e => addField(props.fieldName, e.target.value)}
                maxLength={isDefined ? 50 : 2}
                placeholder={
                    props.fieldName.includes("dfnd_course") ? "Ex.: MAT144" :
                    props.fieldName.includes("dfnd_role") ? "Ex.: student" :
                    props.fieldName.includes('group') ? 'opcional (Ex.: G)' : 'Ex.: G'
                }
                required={props.fieldName.includes('group') ? false : true}
            />
            <button 
                type="button"
                className="text-white bg-red-500 py-1 px-3 ml-2" 
                style={props.fieldName.includes("profile_field_") ? {} : {display: "none"}}
                onClick={() => removeField(props.fieldName)}
            >
                x
            </button>
        </div>
    )
}