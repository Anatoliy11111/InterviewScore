import {Rate, Typography} from 'antd';
import {useInterviewStore} from '../store/useInterviewStore';
import type {Question} from '../data/questions';
import {SampleAnswerPanel} from "./SampleAnswerPanel.tsx";

interface Props {
    category: string;
    question: Question;
    index: number;
}

export const QuestionItem = ({category, question, index}: Props) => {
    const rating = useInterviewStore(state => state.ratings[category]?.[index] || 0);
    const setRating = useInterviewStore(state => state.setRating);

    return (
        <div style={{marginBottom: 24, padding: '12px', border: '1px solid #f0f0f0', borderRadius: 8}}>
            <Typography.Paragraph strong>{question.text}</Typography.Paragraph>
            <Rate value={rating} onChange={value => setRating(category, index, value!)}/>
            <SampleAnswerPanel
                answer={question.sampleAnswer}
                subAnswers={question.subQuestions}
            />
        </div>
    );
}