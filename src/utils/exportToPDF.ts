// src/utils/exportToPDF.ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportToPDFParams {
    candidateName: string;
}

export const exportToPDF = async ({ candidateName }: ExportToPDFParams) => {
    const input = document.getElementById('pdf-export');
    if (!input) {
        alert('Элемент для экспорта не найден');
        return;
    }

    try {
        // Настройка: максимальная высота одной страницы
        const PAGE_HEIGHT_MM = 280; // в мм
        const MM_TO_PX = 3.78; // приблизительно: 1mm ≈ 3.78px при 96dpi
        const pageHeightPx = PAGE_HEIGHT_MM * MM_TO_PX;

        // Получаем полный контент
        const totalHeight = input.scrollHeight;

        const canvasPromises = [];
        let currentY = 0;

        // Разбиваем на части
        while (currentY < totalHeight) {
            const height = Math.min(pageHeightPx, totalHeight - currentY);

            canvasPromises.push(
                html2canvas(input, {
                    scale: 2,
                    useCORS: true,
                    scrollY: -currentY, // прокручиваем виртуально
                    windowHeight: height,
                    height: Math.ceil(height),
                    y: currentY,
                    backgroundColor: '#ffffff',
                    logging: false,
                })
            );

            currentY += height;
        }

        const canvases = await Promise.all(canvasPromises);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const imgWidth = width;
        let isFirstPage = true;

        for (const canvas of canvases) {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (!isFirstPage) {
                pdf.addPage();
            } else {
                pdf.setProperties({
                    title: 'Отчёт по собеседованию',
                    subject: 'Оценка frontend-кандидата',
                    author: 'Interview System',
                    creator: 'Vite + React + Ant Design',
                });
                isFirstPage = false;
            }

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }

        // Чистое имя файла
        const safeName = (candidateName || 'candidate')
            .trim()
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9а-яА-Я_]/g, '');

        const fileName = `interview_${safeName}.pdf`;
        pdf.save(fileName);
    } catch (err) {
        console.error('PDF generation failed:', err);
        alert('Не удалось сгенерировать PDF. Проверьте консоль.');
    }
};