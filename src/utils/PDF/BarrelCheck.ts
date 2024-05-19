import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {rejects} from "assert";
import {IItem} from "../../types/Item";
import dayjs from "dayjs";

const barrelCheck = async (sortedArray: any) => {

    try {
        const currentDate = dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm")

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: 'a4'
        });


        const pageHeight = doc.internal.pageSize.height;

        const startH = 20;

        const lineHeight = 5;


        let StartPointIndex = 20;
        let StartPointBatch = 170;
        let StartPointStatus = 245;
        let StartPointRemarks = 300;

        let y = 50;

        // Установка цвета текста на серый (градация серого от 0 до 255)
        doc.setTextColor(128);
        doc.setFontSize(10);
        doc.text(`Check List on: ${currentDate} for Barrels on stock`, 20, 35);


        sortedArray.forEach((item: IItem, index: number) => {
            const boxHeight = 20;

            const startY = y + (startH + boxHeight + lineHeight);

            console.log(item);

            // Если содержимое не помещается на текущую страницу, создаем новую страницу
            if (startY  > pageHeight) {
                doc.addPage();
                y = 20;
            }

            doc.setTextColor(0);
            doc.setFontSize(12);

            // Рисуем рамку
            doc.rect(StartPointIndex, y, 150, boxHeight);
            doc.rect(StartPointBatch, y, 75, boxHeight);
            doc.rect(StartPointStatus, y, 50, boxHeight);
            doc.rect(StartPointRemarks, y, 125, boxHeight);

            //Добавляем текст
            doc.text(`${item.index}`, StartPointIndex + 5, y + 13.5);


            // Рисуем Batch
            doc.rect(175, y + 5, 10, 10);
            doc.text(`${item.batchNumber}`, 190, y + 13.5);

            // Рисуем status
            doc.text(`${item.status}`, 250, y + 13.5);

            // Рисуем Remarks
            doc.text(`${item.remarks}`, 305, y + 13.5);

            // Обновляем y для следующего элемента
            y += boxHeight + lineHeight;
        });

        doc.save(currentDate + '.pdf');
    } catch (error) {
        console.log(error)
    }
};

export default barrelCheck;
