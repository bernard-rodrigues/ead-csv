import * as XLSX from 'xlsx';
import { Fields } from '../types/types';

export async function generateCSV(excelfile: File, startRow: number, fields: Fields): Promise<Blob>{
    const letterToNumber = (letters: string) => {
        return letters.split('').reduce((acc, letter) => {
          const charCode = letter.charCodeAt(0) - 'A'.charCodeAt(0);
          return acc * 26 + charCode;
        }, 0);
      };
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try{
                const data = e.target?.result as ArrayBuffer;
                const workbook = XLSX.read(data, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {header: 1, range: startRow - 1});
                let isFullName = false;
                let flaggedIndexes: number[] = []

                // Criação do header
                const csvData: string[] = [Object.keys(fields).map((field, index) => {
                    if(field === "fullname"){
                        isFullName = true;
                        return ["firstname", "lastname"].join(',');
                    }else if(field.includes("course") || field.includes("role")){
                        flaggedIndexes.push(index);
                        return field;
                    }else if(fields[field] !== ""){
                        return field;
                    }
                }).filter(Boolean).join(',')];
                
                jsonData.filter(subArray => subArray.length > 0).map((row: string[]) => {
                    const rowValues = Object.values(fields).filter(subArray => subArray.length > 0).map((column, index) => {
                        if(column){
                            const data = row[letterToNumber(column.toLocaleUpperCase())];
                            if(isFullName && index === Object.keys(fields).indexOf("fullname") && data){
                                const nameParts = data.split(" ");
                                const firstname = nameParts[0];
                                const lastname = nameParts.slice(1).join(" ");
                                return [firstname, lastname].join(',');
                            }else if(flaggedIndexes.includes(index) && fields[Object.keys(fields)[index]].length > 2){
                                return fields[Object.keys(fields)[index]]
                            }
                            return data;
                        }
                    });
                    csvData.push(rowValues.filter(Boolean).join(','));
                });

                const csvString = csvData.join('\n');

                const blob = new Blob([csvString], {type: 'text/csv;charset=utf-8'});

                resolve(blob);
            }catch(error){
                reject(error);
            }
        }

        reader.readAsArrayBuffer(excelfile);
    });
}