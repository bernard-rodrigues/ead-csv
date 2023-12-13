import { ReactNode, createContext, useContext, useState } from "react"
import { Fields } from "../types/types"

interface FieldsProps{
    fields: Fields

    addField: (fieldToAdd: string, fieldValue?: string) => void
    removeField: (fieldToRemove: string) => void
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
        if(
            fieldToAdd === "fullname" || 
            fieldToAdd === "firstname" ||
            fieldToAdd.includes("course")
        ){
            if(
                fieldToAdd === "fullname" && 
                !Object.keys(fields).includes(fieldToAdd)
            ){
                const {firstname, lastname, ...restFields} = fields;
                updatedFields = {
                    username: fields.username,
                    fullname: fieldValue,
                    ...restFields
                };
            }else if(
                fieldToAdd === "firstname" && 
                !Object.keys(fields).includes(fieldToAdd)
            ){
                const {fullname, ...restFields} = fields;
                updatedFields = {
                    username: fields.username,
                    firstname: fieldValue,
                    lastname: fieldValue,
                    ...restFields
                };
            }else if( 
                fieldToAdd.includes("course") && 
                !Object.keys(fields).includes(fieldToAdd)
            ){
                updatedFields = {
                    ...fields, 
                    [fieldToAdd]: fieldValue, 
                    ["role" + fieldToAdd.replace("course", '')]: fieldValue,
                    ["group" + fieldToAdd.replace("course", '')]: fieldValue,
                }
            }else{
                updatedFields = {...fields, [fieldToAdd]: fieldValue}    
            }
        }else{
            updatedFields = {...fields, [fieldToAdd]: fieldValue}
        }
        setFields(updatedFields);
    }

    const removeField = (fieldToRemove: string) => {
        let updatedFields: Record<string, string>;

        if(fieldToRemove.includes("course")){
            const { [fieldToRemove]: fieldToRemoveValue, ["role" + fieldToRemove.replace("course", "")]: roleValue, ["group" + fieldToRemove.replace("course", "")]: groupValue, ...restFields } = fields;
            updatedFields = {...restFields}            
        }else{
            const { [fieldToRemove]: _, ...restFields } = fields;
            updatedFields = {...restFields}
        }
        setFields(updatedFields);
    };

    return(
        <FieldsContext.Provider 
            value={
                {
                    fields,
                    addField,
                    removeField
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