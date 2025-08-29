import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportToPDF = async (candidateName: string) => {
    const input = document.getElementById('pdf-export');
    if (!input) return;

    try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        pdf.setProperties({
            title: 'Отчёт по собеседованию',
            subject: 'Оценка frontend-кандидата',
            author: 'Interview System',
            creator: 'Vite + React + Ant Design',
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);

        // Чистое имя
        const safeName = (candidateName || 'candidate')
            .trim()
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9а-яА-Я_]/g, '');
        const fileName = `interview_${safeName}.pdf`;

        pdf.save(fileName);
    } catch (err) {
        console.error('PDF generation failed:', err);
        alert('Ошибка при генерации PDF');
    }
};