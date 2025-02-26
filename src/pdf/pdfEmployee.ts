import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";


// nome
// função
// data de admissao
// data de demissao
// nome razao empresa

// Recebi da Empresa "nome razao" (CNPJ),
// para meu uso obrigatório os EPI's
// (Equipamento de proteção Individual)
//  constante nesta ficha, o qual obrigo-me a utiliza-los
// corretamente durante o tempo que permanecer ao meu dispor,
// observando as medidas gerais de desciplina e uso que integram
// a NR-06 - Equipamento de Proteção Individual - EPI's -
// da portaria n.° 3.214 de 08/jun/1970. Declaro saber também que terei que
// devolvê-los no ato de meu desligamento da empresa.

// asssinatura funcionário

// data | tam | descrição equip | N° do CA | Assinatura

export class PdfEmployee {
  static async toTitleCase(str: string) {
    return str.toLowerCase().replace(/\b(\w)/g, (match) => match.toUpperCase());
  }

  static async createPdfEmployee(dados: {
    nameLowerCase: string;
    job_positionLowerCase: string;
    start_date: string;
    date_layoff: string;
    social_name: string;
    cnpj: string;
    cpf: string;
  }) {
    const {
      nameLowerCase,
      job_positionLowerCase,
      start_date,
      date_layoff,
      social_name,
      cnpj,
      cpf,
    } = dados;

    const nameTitleCase = await this.toTitleCase(nameLowerCase);
    const jobPositionTitleCase = await this.toTitleCase(job_positionLowerCase);
    const socialNameTitleCase = await this.toTitleCase(social_name);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 11;

    let startY = 550;
    const startX = 50;

    // 🔹 Título Centralizado
    page.drawText(
      "FICHA DE FORNECIMENTO DE EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL (EPI)",
      {
        x: 90,
        y: startY,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      }
    );

    startY -= 24;
    page.drawLine({
      start: { x: startX, y: startY },
      end: { x: 780, y: startY },
      thickness: 2,
    });

    // 🔹 Informações do funcionário e empresa
    startY -= 22;
    const info = [
      [`EMPRESA: ${socialNameTitleCase}`, `CNPJ: ${cnpj}`],
      [`FUNCIONÁRIO: ${nameTitleCase}`, `CPF: ${cpf}`],
      [`CARGO: ${jobPositionTitleCase}`, `SETOR: TESTE`],
      [
        `ADMISSÃO: ${start_date}`,
        `DEMISSÃO: ${date_layoff === null ? "" : date_layoff}`,
      ],
    ];

    info.forEach(([leftText, rightText]) => {
      page.drawText(leftText, { x: startX, y: startY, size: fontSize + 1, font });
      page.drawText(rightText, { x: 450, y: startY, size: fontSize + 1, font });
      startY -= 22;
    });

    page.drawLine({
      start: { x: startX, y: startY },
      end: { x: 780, y: startY },
      thickness: 2,
    });

    // 🔹 Termo de responsabilidade
    startY -= 18;
    const termo = [
      `Recebi da Empresa "${socialNameTitleCase}", para meu uso obrigatório os EPI's (Equipamento de Proteção Individual)`,
      ` constantes nesta ficha, os quais obrigo-me utilizá-los corretamente durante o tempo que permanecer ao meu dispor, observando as `,
      `medidas gerais de disciplina e uso que integram a NR-06  - Equipamento de Proteção Individual - EPI's - da portaria nº 3.214 de 08/jun/1970.`,
      ` Declaro saber também que terei que devolvê-los no ato de meu desligamento da empresa.`,
    ];

    termo.forEach((line) => {
      page.drawText(line, { x: startX, y: startY, size: fontSize, font });
      startY -= 20;
    });

    // 🔹 Assinatura do Colaborador
    startY -= 10;
    page.drawText("ASSINATURA COLABORADOR:", {
      x: startX,
      y: startY,
      size: fontSize,
      font,
    });
    page.drawLine({
      start: { x: 230, y: startY - 5 },
      end: { x: 650, y: startY - 5 },
      thickness: 1,
    });

    startY -= 16;
    page.drawLine({
      start: { x: startX, y: startY },
      end: { x: 780, y: startY },
      thickness: 2,
    });
    // 🔹 Cabeçalho da tabela
    startY -= 36;
    const colWidths = [100, 240, 80, 70, 100, 180];
    const headers = [
      "DATA",
      "EQUIPAMENTO",
      "COR",
      "TAMANHO",
      "N° do CA",
      "ASSINATURA",
    ];

    let cellX = startX;
    headers.forEach((header, i) => {
      page.drawRectangle({
        x: cellX,
        y: startY,
        width: colWidths[i],
        height: 25,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      page.drawText(header, {
        x: cellX + 10,
        y: startY + 7,
        size: fontSize,
        font,
      });
      cellX += colWidths[i];
    });


    const pdfBytes = await pdfDoc.save();
    const pdfDir = path.resolve(__dirname, "../uploads");
    const filename = `${nameLowerCase.replace(/\s+/g, "_")}_${cpf}.pdf`;
    const pdfPath = path.join(pdfDir, filename);

    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    fs.writeFileSync(pdfPath, pdfBytes);

    return filename;
  }


  // ____________________________________________________________________


    static async updatePdfEmployee(
      pdfFileEmployee: { content_pdf: string },
      dados: {
        employeeName: string;
        employeeJobPosition: string;
        employeeStartDate: string;
        employeeDateLayoff: string | null;
        social_name: string;
        cnpj: string;
        employeeCpf: string;
      }, epis: {rows_epi: string ,date_delivery: string, name_epi: string; color: string; size: string}[]
    ) {
      const {
        employeeName,
        employeeJobPosition,
        employeeStartDate,
        employeeDateLayoff,
        social_name,
        cnpj,
        employeeCpf,
      } = dados;


      const nameTitleCase = await this.toTitleCase(employeeName)
      const jobPositionTitleCase = await this.toTitleCase(employeeJobPosition)
      const socialNameTitleCase = await this.toTitleCase(social_name)
      const dateLayOff = employeeDateLayoff == null ? "" : employeeDateLayoff
  
      const { content_pdf } = pdfFileEmployee;

      const newFileName = `${employeeName.replace(/\s+/g, "_")}_${employeeCpf}.pdf`;
      const currentFilePath = path.resolve(__dirname, "../uploads", content_pdf);
      const newFilePath = path.resolve(__dirname, "../uploads", newFileName);
  

      const updateFile = fs.readFileSync(currentFilePath);
      let pdfDoc = await PDFDocument.load(updateFile);
      let page = pdfDoc.getPage(0);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontSize = 11;

      page.drawRectangle({
        x: 0,
        y: 0,
        width: 842,
        height: 545,
        color: rgb(1, 1, 1)
      });
  
      let startY = 550;
      const startX = 50;
  
      page.drawText(
        "FICHA DE FORNECIMENTO DE EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL (EPI)",
        {
          x: 90,
          y: startY,
          size: 14,
          font,
          color: rgb(0, 0, 0),
        }
      );
  
      startY -= 24;
      page.drawLine({
        start: { x: startX, y: startY },
        end: { x: 780, y: startY },
        thickness: 2,
      });

    
  
      startY -= 22;
      const info = [
        [`EMPRESA: ${socialNameTitleCase}`, `CNPJ: ${cnpj}`],
        [`FUNCIONÁRIO: ${nameTitleCase}`, `CPF: ${employeeCpf}`],
        [`CARGO: ${jobPositionTitleCase}`, `SETOR: TESTE`],
        [`ADMISSÃO: ${employeeStartDate}`, `DEMISSÃO: ${dateLayOff}`],
      ];
  
      info.forEach(([leftText, rightText]) => {
        page.drawText(leftText, { x: startX, y: startY, size: fontSize + 1, font });
        page.drawText(rightText, { x: 450, y: startY, size: fontSize + 1, font });
        startY -= 22;
      });
  
      page.drawLine({
        start: { x: startX, y: startY },
        end: { x: 780, y: startY },
        thickness: 2,
      });
  
      startY -= 18;
      const termo = [
        `Recebi da Empresa "${social_name.toUpperCase()}", para meu uso obrigatório os EPI's (Equipamento de Proteção Individual)`,
        `constantes nesta ficha, os quais obrigo-me utilizá-los corretamente durante o tempo que permanecer ao meu dispor, observando as`,
        `medidas gerais de disciplina e uso que integram a NR-06 - Equipamento de Proteção Individual - EPI's - da portaria nº 3.214 de 08/jun/1970.`,
        `Declaro saber também que terei que devolvê-los no ato de meu desligamento da empresa.`,
      ];
  
      termo.forEach((line) => {
        page.drawText(line, { x: startX, y: startY, size: fontSize, font });
        startY -= 20;
      });
  
      startY -= 10;
      page.drawText("ASSINATURA COLABORADOR:", {
        x: startX,
        y: startY,
        size: fontSize,
        font,
      });
      page.drawLine({
        start: { x: 230, y: startY - 5 },
        end: { x: 650, y: startY - 5 },
        thickness: 1,
      });
  
      startY -= 16;
      page.drawLine({
        start: { x: startX, y: startY },
        end: { x: 780, y: startY },
        thickness: 2,
      });
  
      startY -= 36;
      const colWidths = [26, 100, 220, 70, 70, 90, 170];
      const headers = [
        " ",
        "DATA",
        "EQUIPAMENTO",
        "COR",
        "TAMANHO",
        "N° do CA",
        "ASSINATURA",
      ];
  
      let cellX = startX;
      headers.forEach((header, i) => {
        page.drawRectangle({
          x: cellX,
          y: startY,
          width: colWidths[i],
          height: 25,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
        page.drawText(header, {
          x: cellX + 10,
          y: startY + 7,
          size: fontSize,
          font,
        });
        cellX += colWidths[i];
      });

      startY -= 30;

      const minY = 50;
      const pageHeight = page.getHeight();


      epis.forEach(({rows_epi, date_delivery, name_epi, color, size }) => {
        if (startY < minY) {
          page = pdfDoc.addPage([842, pageHeight]);
          page.setFont(font);
          startY = pageHeight - 50
        }
        const dateDeliveryFormat = format(date_delivery, "dd/MM/yyyy")
        console.log(date_delivery)
        console.log(dateDeliveryFormat)
  
        let colX = startX;

        const nameUppercase = name_epi.toUpperCase()
        const nameColor = color.toUpperCase()
        const nameSize = size.toUpperCase()
        const rows = rows_epi

        const rowData = [rows, dateDeliveryFormat, nameUppercase, nameColor, nameSize, "XXXXX", "_______________________"];
  
        rowData.forEach((data, i) => {
          page.drawRectangle({
            x: colX,
            y: startY,
            width: colWidths[i],
            height: 30,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
          });
  
          page.drawText(data, { x: colX + 10, y: startY + 7, size: fontSize, font });
          colX += colWidths[i];
        });
  
        startY -= 30;
      });
  
      const updatedFilePdf = await pdfDoc.save();
  
      if (currentFilePath !== newFilePath) {
        fs.renameSync(currentFilePath, newFilePath);
      }
  
      fs.writeFileSync(newFilePath, updatedFilePdf);
  
      return newFileName;
    }

  }