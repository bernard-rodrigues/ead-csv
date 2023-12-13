import { FormRow } from "./components/FormRow"
import { Header } from "./components/Header"
import { FieldButton } from "./components/FieldButton";
import { useFields } from "./contexts/Fields";
import { ChangeEvent, useEffect, useState } from "react";
import { Card } from "./components/Card";
import { generateCSV } from "./utils/ExcelToCSVConverter";
import { descriptions } from "./utils/descriptions";
import { Footer } from "./components/Footer";

const optionalFields = ["password", "country", "lang", "idnumber", "phone1", "phone2", "institution", "department", "address", "city", "auth"]

export const App = () => {
  const {fields, addField, removeField} = useFields();

  const [additionalField, setAdditionalField] = useState("");
  const [startRow, setStartRow] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [cursos, setCursos] = useState(1);

  useEffect(() => {
    if(!Object.keys(fields).includes('course' + cursos)){
      addField("course" + cursos);
    }else if(cursos >= 1){
      removeField("course" + (cursos+1));
    }
  }, [cursos])
  
  const handleAddField = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addField("profile_field_" + additionalField);
    setAdditionalField("");
  }

  const handleAddCourse = async () => {
    setCursos(cursos + 1);
  }

  const handleRemoveCourse = async () => {
    if(cursos > 1){
      setCursos(cursos - 1);
    }
  }

  const handleRow = (rowNumber: string) => {
    const isValidNumber = /^$|^\d+$/.test(rowNumber);

    if (isValidNumber) {
      setStartRow(rowNumber)
    }
  }

  const handleCsvCreation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(excelFile && startRow){
      generateCSV(excelFile, Number(startRow), fields)
        .then((csvContent) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(csvContent);
          link.download = excelFile.name.replace('.xlsx', '.csv').replace('.xls', '.csv');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error converting Excel file to CSV:', error);
        }
      )
    }else{
      alert('É obrigatório inserir um arquivo Excel e definir uma linha inicial.')
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if(selectedFile){
      setExcelFile(selectedFile);
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-5 mt-8">
        
        <Card title="Arquivo Excel" show={true} description={descriptions.excelfile}>
          <div className="p-3 text-center">
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" required />
          </div>
        </Card>

        <Card title="Linha inicial" show={excelFile ? true : false} description={descriptions.startRow}>
          <div className="p-3 text-center">
            <label htmlFor="startRow">A partir de que linha constam os dados do arquivo?</label>
            <input 
              className="ml-3 border p-1 w-16 text-center" 
              id="startRow" 
              type="text"
              value={startRow}
              onChange={e => handleRow(e.target.value)}
            />
          </div>
        </Card>

        <Card title="Campos opcionais" show={excelFile && startRow ? true : false} description={descriptions.optionalFields}>
          <div className="p-3 grid grid-cols-4 gap-3">
            {optionalFields.map(field => (
              <FieldButton value={field} key={field}/>
            ))}
          </div>
        </Card>
        
        <Card 
          title="Campos adicionais" 
          show={excelFile && startRow ? true : false}
          description={descriptions.additionalFields}
        >
          <form className="p-3 flex items-center justify-center gap-3" onSubmit={handleAddField}>
            <label htmlFor="additionalField">Nome do campo</label>
            <input 
              id="additionalField" 
              className="border p-1" 
              type="text" 
              value={additionalField} 
              onChange={e => setAdditionalField(e.target.value)}
            />
            <button 
              className="py-1 px-3 hover:brightness-95" 
              type="submit"
              disabled={additionalField ? false : true}
              style={additionalField ? {backgroundColor: "#f", color: "rgb(244 244 245 / var(--tw-text-opacity))"} : {backgroundColor: "#cccccc"}}
            >
              Adicionar
            </button>
          </form>
        </Card>

        <Card 
          title="Preenchimento dos dados" 
          show={excelFile && startRow ? true : false} 
          description={descriptions.fields}
        >
          <form className="p-3" onSubmit={handleCsvCreation}>
            {Object.keys(fields).map(key => (
              <FormRow fieldName={key} key={key}/>
            ))}
            <div className="text-center flex justify-center gap-4 mt-4">
              <button
                type="button"
                className="bg-orange-moodle text-zinc-100 px-5 py-2 shadow hover:brightness-95 transition-all"
                onClick={handleAddCourse}
              >
                Adicionar curso
              </button>
              <button
                type="button"
                className="bg-orange-moodle px-5 py-2 shadow hover:brightness-95 transition-all"
                onClick={handleRemoveCourse}
                disabled={cursos === 1 ? true : false}
                style={cursos === 1 ? {backgroundColor: "#cccccc"} : {backgroundColor: "#f98012", color: "rgb(244 244 245 / var(--tw-text-opacity))"}}
              >
                Remover curso
              </button>
              <button
                type="submit"
                className="bg-black text-zinc-100 px-5 py-2 shadow hover:brightness-95 transition-all"
              >
                Criar CSV
              </button>
            </div>
          </form>
        </Card>
      </main>
      <Footer />
    </>
  )
}