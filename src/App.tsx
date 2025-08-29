import {useState, useMemo} from 'react';
import { Typography, Input } from 'antd';
import {QuestionGroup} from './components/QuestionGroup';
import {AIReport} from './components/AIReport';
import {PDFExport} from './components/PDFExport';
import {questions} from './data/questions';
import {useInterviewStore} from './store/useInterviewStore';
import {RatingScale} from "./components/RatingScale.tsx";
import {InterviewActions} from "./components/InterviewActions.tsx";
import {generateReportWithYandex} from "./utils/generateAIReport.ts";

const { Title } = Typography;

export const App = ()=> {
    const [loading, setLoading] = useState(false);
    // ✅ Обязательно деструктурируем `ratings`
    const { candidateName, setCandidateName, aiReport, setAIReport, ratings } = useInterviewStore();
    // ✅ Рассчитываем общий балл, зависит ТОЛЬКО от `ratings`

    const totalScore = useMemo(() => {
        let score = 0;
        questions.forEach((cat) => {
            const catRatings = ratings[cat.category] || {};
            const max = cat.questions.length * 5;
            const earned = Object.values(catRatings).reduce((sum, r) => sum + r, 0);
            if (max > 0) {
                score += (earned / max) * cat.weight;
            }
        });
        return Math.round(score * 100) / 100;
    }, [JSON.stringify(ratings)]); // ✅ Зависимость — только от ratings
    // ✅ Генерация мок-заключения


    const generateAIReport = () => {
        const API_KEY = '';

        generateReportWithYandex({
            totalScore,
            folderId: '',
            apiKey: API_KEY,
            onSuccess: (report) => setAIReport(report),
            onError: (error) => setAIReport(`❌ ${error}`),
            onLoading: setLoading,
        });
    };



    return (
        <div style={{ padding: 24 }}>
            <Title>Оценка кандидата на должность frontend разработчика</Title>
            <Input
                placeholder="Имя кандидата"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                style={{ width: 300 }}
            />
            <RatingScale />

            {questions.map((group) => (
                <QuestionGroup key={group.category} group={group} />
            ))}

            <InterviewActions
                totalScore={totalScore}
                onGenerateReport={generateAIReport}
                loading={loading}
            />

            {aiReport && <AIReport report={aiReport} />}

            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <PDFExport id="pdf-export" />
            </div>
        </div>
    );
}
