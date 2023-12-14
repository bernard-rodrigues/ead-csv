import { ReactNode, createContext, useContext, useState } from "react"
import { Fields } from "../types/types"

interface FieldsProps{
    fields: Fields

    addField: (fieldToAdd: string, fieldValue?: string) => void
    removeField: (fieldToRemove: string) => void,
    updateField: (fieldToUpdate: string) => void
}

export const FieldsContext = createContext({} as FieldsProps)

interface FieldsContextProviderProps{
    children: ReactNode
}

export const FieldsProvider = (props: FieldsContextProviderProps) => {
    const [fields, setFields] = useState<Fields>({
        username: "", 
        firstname: "", 
        lastname: "", 
        email: "", 
        course1: "", 
        role1: "", 
        group1: ""
    });

    const addField = (fieldToAdd: string, fieldValue: string = "") => {
        let updatedFields: Record<string, string>;
        if(fieldToAdd === "fullname"){
            const {firstname, lastname, ...restFields} = fields;
            updatedFields = {
                username: fields.username,
                [fieldToAdd]: "",
                ...restFields
            }
        }else if(fieldToAdd === "firstname"){
            const {fullname, ...restFields} = fields;
            updatedFields = {
                username: fields.username,
                [fieldToAdd]: "",
                lastname: "",
                ...restFields
            }
        }else if(fieldToAdd.includes("course")){
            // MEXER AQUI PARA IMPEDIR QUE MUDAR VALOR DE CURSO MUDE O VALOR DO RESTO
            updatedFields = {
                ...fields, 
                [fieldToAdd]: fieldValue, 
                ["role" + fieldToAdd.replace("course", '')]: fieldValue,
                ["group" + fieldToAdd.replace("course", '')]: fieldValue,
            }
        }else{
            updatedFields = {...fields, [fieldToAdd]: fieldValue}
        }
        setFields(updatedFields);
    }

    const removeField = (fieldToRemove: string) => {
        let updatedFields: Record<string, string>;
        if(fieldToRemove.includes("course")){
            let course: string;
            let role: string;
            
            if(Object.keys(fields).includes("dfnd_" + fieldToRemove)){
                course = "dfnd_" + fieldToRemove;
            }else{
                course = fieldToRemove;
            }

            if(Object.keys(fields).includes("dfnd_" + fieldToRemove.replace("course", "role"))){
                role = "dfnd_" + fieldToRemove.replace("course", "role");
            }else{
                role = fieldToRemove.replace("course", "role");
            }

            const {
                [course]: fieldToRemoveValue, 
                [role]: roleValue, 
                [fieldToRemove.replace("course", "group")]: groupValue, 
                ...restFields 
            } = fields;
            updatedFields = {...restFields};      
        }else{
            const { [fieldToRemove]: _, ...restFields } = fields;
            updatedFields = {...restFields};
        }
        setFields(updatedFields);
    };

    const updateField = (fieldToUpdate: string) => {
        let updatedFields: Record<string, string>;
        const {[fieldToUpdate]: _, ...restFields} = fields;

        if(
            fieldToUpdate === "username" || 
            fieldToUpdate === "dfnd_username"
            ){
                if(fieldToUpdate.includes("dfnd_")){
                    updatedFields = {
                    [fieldToUpdate.replace("dfnd_", "")]: '',
                    ...restFields
                }
            }else{
                updatedFields = {
                    ["dfnd_" + fieldToUpdate]: '',
                    ...restFields
                }
            }
        }else{
            if(fieldToUpdate.includes("dfnd_")){
                updatedFields = {
                    ...restFields,
                    [fieldToUpdate.replace("dfnd_", "")]: ''
                }
            }else{
                updatedFields = {
                    ...restFields,
                    ["dfnd_" + fieldToUpdate]: ''
                }
            }
        }
        setFields(updatedFields);
    }

    return(
        <FieldsContext.Provider 
            value={
                {
                    fields,
                    addField,
                    removeField,
                    updateField
                }
            }
        >
            {props.children}
        </FieldsContext.Provider>
    )
}

export const useFields = () => {
    return useContext(FieldsContext)
}