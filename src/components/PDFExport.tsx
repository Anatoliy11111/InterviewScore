import {useInterviewStore} from '../store/useInterviewStore';
import {questions} from '../data/questions';

interface Props {
    id: string;
}

export const PDFExport = ({id}: Props) => {
    const {candidateName, ratings, aiReport} = useInterviewStore();

    // Расчёт баллов
    const {total: totalScore, details: categoryScores} = (() => {
        const details: Record<string, number> = {};
        let totalScore = 0;

        questions.forEach((cat) => {
            const catRatings = ratings[cat.category] || {};
            const max = cat.questions.length * 5;
            const earned = Object.values(catRatings).reduce((sum, r) => sum + r, 0);
            const categoryScore = max > 0 ? (earned / max) * cat.weight : 0;
            totalScore += categoryScore;
            details[cat.category] = earned;
        });

        return {
            total: Math.round(totalScore * 100) / 100,
            details,
        };
    })();

    const level = totalScore >= 80 ? 'Senior' : totalScore >= 60 ? 'Middle' : 'Junior';

    // === СТИЛИ ===
    const styles = {
        page: {
            width: '210mm',
            minHeight: '297mm',
            padding: '20mm 25mm',
            margin: 'auto',
            backgroundColor: 'white',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            lineHeight: 1.6,
            color: '#262626',
            boxSizing: 'border-box' as const,
        },
        header: {
            textAlign: 'center' as const,
            marginBottom: '30px',
        },
        title: {
            fontSize: '28px',
            fontWeight: 'bold' as const,
            color: '#1890ff',
            margin: '0 0 8px 0',
            borderBottom: '3px solid #1890ff',
            paddingBottom: '8px',
        },
        subtitle: {
            fontSize: '16px',
            margin: '4px 0',
            color: '#595959',
        },
        infoGrid: {
            display: 'grid' as const,
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '30px',
            fontSize: '14px',
        },
        sectionTitle: {
            fontSize: '20px',
            color: '#1f1f1f',
            borderBottom: '1px solid #d9d9d9',
            paddingBottom: '6px',
            marginBottom: '16px',
        },
        categoryCard: {
            marginBottom: '20px',
            padding: '12px 16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e8e8e8',
        },
        categoryHeader: {
            display: 'flex' as const,
            justifyContent: 'space-between' as const,
            alignItems: 'center' as const,
        },
        categoryName: {
            fontSize: '15px',
            fontWeight: 'bold' as const,
        },
        categoryScore: (color: string) => ({
            fontSize: '14px',
            fontWeight: 'bold' as const,
            color,
        }),
        progressBarContainer: {
            height: '6px',
            backgroundColor: '#e8e8e8',
            borderRadius: '3px',
            overflow: 'hidden' as const,
            marginTop: '8px',
        },
        progressBar: (width: number, color: string) => ({
            height: '100%',
            width: `${width}%`,
            backgroundColor: color,
            transition: 'width 0.3s ease',
        }),
        categoryWeight: {
            fontSize: '12px',
            color: '#8c8c8c',
            marginTop: '4px',
        },
        conclusionContainer: {
            marginTop: '50px',
            textAlign: 'right' as const,
            fontSize: '14px',
            color: '#8c8c8c',
        },
        conclusionText: {
            marginTop: '30px',
            textAlign: 'right' as const,
            fontSize: '14px',
            color: '#8c8c8c',
        },
    };

    // Цвета для прогресса
    const getProgressColor = (progress: number) => {
        if (progress >= 80) return '#52c41a';  // зелёный
        if (progress >= 60) return '#faad14';  // оранжевый
        return '#ff4d4f';                      // красный
    };

    return (
        <div id={id} style={styles.page}>
            {/* Заголовок */}
            <div style={styles.header}>
                <h1 style={styles.title}>Отчёт по техническому собеседованию</h1>
                <p style={styles.subtitle}>Frontend-разработчик</p>
            </div>

            {/* Информация о кандидате */}
            <div style={styles.infoGrid}>
                <p><strong>Кандидат:</strong> {candidateName || 'Не указан'}</p>
                <p><strong>Дата:</strong> {new Date().toLocaleDateString('ru-RU')}</p>
                <p>
                    <strong>Итоговый балл:</strong>{' '}
                    <strong style={{color: '#1890ff'}}>{totalScore} / 100</strong>
                </p>
                <p>
                    <strong>Уровень:</strong>{' '}
                    <strong style={{color: '#52c41a'}}>{level}</strong>
                </p>
            </div>

            {/* Оценка по категориям */}
            <h2 style={styles.sectionTitle}>📊 Оценка по категориям</h2>

            {questions.map((cat) => {
                const earned = categoryScores[cat.category] || 0;
                const max = cat.questions.length * 5;
                const progress = max > 0 ? (earned / max) * 100 : 0;
                const color = getProgressColor(progress);

                return (
                    <div key={cat.category} style={styles.categoryCard}>
                        <div style={styles.categoryHeader}>
                            <strong style={styles.categoryName}>{cat.category}</strong>
                            <span style={styles.categoryScore(color)}>
                {earned} / {max}
              </span>
                        </div>

                        <div style={styles.progressBarContainer}>
                            <div style={styles.progressBar(progress, color)}/>
                        </div>

                        <div style={styles.categoryWeight}>Вес: {cat.weight}% от общего балла</div>
                    </div>
                );
            })}

            {/* Заключение */}
            {aiReport && (
                <>
                    <h2 style={styles.sectionTitle}>📝 Заключение</h2>
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#f9f0ff',
                            borderRadius: '8px',
                            border: '1px solid #d3adf7',
                            fontSize: '14px',
                            lineHeight: 1.6,
                            whiteSpace: 'pre-line' as const,
                        }}
                    >
                        {aiReport}
                    </div>
                </>
            )}

            {/* Подпись */}
            <div style={styles.conclusionText}>
                <p>— Оценка завершена</p>
            </div>
        </div>
    );
};