import {useState, useMemo} from 'react';
import {Typography, Input, Button, Modal} from 'antd';
import {QuestionGroup} from './components/QuestionGroup';
import {AIReport} from './components/AIReport';
import {PDFExport} from './components/PDFExport';
import {questions} from './data/questions';
import {useInterviewStore} from './store/useInterviewStore';
import {RatingScale} from "./components/RatingScale.tsx";
import {InterviewActions} from "./components/InterviewActions.tsx";
import {InterviewCheatSheet} from "./components/InterviewCheatSheet.tsx";
import {CodingTaskPanel} from "./components/CodingTaskPanel.tsx";

const {Title} = Typography;

export const App = () => {
    const [cheatsheetOpen, setCheatsheetOpen] = useState(false);
    // ✅ Обязательно деструктурируем `ratings`
    const {candidateName, setCandidateName, aiReport, ratings} = useInterviewStore();
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

    return (
        <div style={{padding: 24}}>
            <Title>Оценка кандидата на должность frontend разработчика</Title>
            <Input
                placeholder="Имя кандидата"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                style={{width: 300}}
            />

            <Modal
                open={cheatsheetOpen}
                footer={null}
                onCancel={() => setCheatsheetOpen(false)}
                width="90%"
                style={{top: 20}}
            >
                <InterviewCheatSheet/>
            </Modal>
            <div>
                <Button style={{padding: '8px', fontSize: 13, fontWeight: 500, color: '#1890ff'}} type="link"
                        onClick={() => setCheatsheetOpen(true)}>
                    📘 Открыть теорию
                </Button>
                <RatingScale/>
            </div>

            {questions.map((group) => (
                <QuestionGroup key={group.category} group={group}/>
            ))}
            <CodingTaskPanel />

            <InterviewActions
                totalScore={totalScore}
            />

            {aiReport && <AIReport report={aiReport}/>}

            <div style={{position: 'absolute', left: '-9999px', top: '-9999px'}}>
                <PDFExport id="pdf-export"/>
            </div>
        </div>
    );
}
