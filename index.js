const express = require("express");
const req = require("express/lib/request");
const { google } = require("googleapis");
const {promisify} = require('util')


const app = express();
 app.use(express.json());

 const cors = require('cors');
 app.use(cors({
     origin: '*'
 }));

async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

const client = await auth.getClient();

const googleSheets = google.sheets({
  version: "v4",
  auth: client,
});
//severino
// const spreadsheetId = "1xKalGnp_xFBLLxI7JrexKEr-uU-BkJkx1N4mcwP6ziA";
//curuça
const spreadsheetId = "1-InAzDRBGKH5LL_zff_Vaqb5Wc9f_AeSbs0bFytQbOg";

return {
  auth,
  client,
  googleSheets,
  spreadsheetId,
};

}

// app.get("/metadata", async (req, res) => {
//     const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
  
//     const metadata = await googleSheets.spreadsheets.get({
//       auth,
//       spreadsheetId,
//     });
  
//     res.send(metadata.data);
//   });

//   app.get("/getRows", async (req, res) => {
//     const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
  
//     const getRows = await googleSheets.spreadsheets.values.get({
//       auth,
//       spreadsheetId,
//       range: "Plateia",
//       valueRenderOption: "UNFORMATTED_VALUE",
//       dateTimeRenderOption: "FORMATTED_STRING",
//     });
  
  //   res.send(getRows.data);
  // });
  app.post("/addRow", async (req, res) => {
 
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    const { nome, email, telefone } = req.body;

    // if (!nome || !email || !telefone) {
    //   throw new Error("Campos obrigatórios não foram preenchidos.");
    // }
  
    const row = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Página1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[nome, email, telefone]],
      },
    });
  
    try {
      res.send(row.data);
      console.log('sucesso');
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

// app.get("/getRowsTest", async (req, res) => {
 
    
  
//     const { googleSheets, auth, spreadsheetId } = await getAuthSheets();


    
//     const getRows = await googleSheets.spreadsheets.values.get({
//       auth,
//       spreadsheetId,
//       range: 'Página1',
//       valueRenderOption: "UNFORMATTED_VALUE",
//       dateTimeRenderOption: "FORMATTED_STRING",
//     });
//     const { acento } = req.body;
//     let rangeRow;
//     let indexFinal;
//     const values = getRows.data.values
//    for(let index = 0; index < values.length; index++){
//     const row = values[index];
//     const columnIndex = row.indexOf(acento);
//     if (columnIndex !== -1) {
//       indexFinal = index;
//       rangeRow =`Página1!B${index + 1}`
//       console.log(`Valor encontrado na linha ${index + 1}, coluna ${columnIndex + 1}`);
//      // return;  Encerra o loop assim que o valor for encontrado
//     }
   
//   }
//   if(getRows.data.values[indexFinal][1] === false){
//    const updateRow = await googleSheets.spreadsheets.values.update({
//     auth,
//     spreadsheetId,
//     range: rangeRow,
//     valueInputOption: 'RAW',
//     resource: {
//       values: [[true]]
//     }
//   });
//    res.send("opa");
// }else{
//   res.send("Lugar ja reservado");
// }
//   });


  // app.post("/updateValue", async (req, res) => {
  //   const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
  
  //   const { acento } = req.body;
  //   const { values } = req.body;
  //   const updateValue = await googleSheets.spreadsheets.values.update({
  //     spreadsheetId,
  //     range: acento,
  //     valueInputOption: "USER_ENTERED",
  //     resource: {
  //       values: values,
  //     },
  //   });
  
  //   res.send(updateValue.data);
  // });
  

app.listen(3009, () => console.log("Rodando na porta 3009"));