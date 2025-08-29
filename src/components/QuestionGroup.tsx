import { Collapse, Progress, Typography, Rate } from 'antd';
import {QuestionItem} from './QuestionItem'; // ✅ Без фигурных скобок!
import { useInterviewStore } from '../store/useInterviewStore';
import type { QuestionCategory } from '../data/questions';


const { Panel } = Collapse;
const { Text } = Typography;

interface Props {
    group: QuestionCategory;
}

export const QuestionGroup = ({ group }: Props) => {
    const ratings = useInterviewStore(state => state.ratings?.[group.category]) ?? {};
    const earned = Object.values(ratings).reduce((sum, r) => sum + r, 0);
    const totalMax = group.questions.length * 5;
    const progress = totalMax > 0 ? (earned / totalMax) * 100 : 0;

    return (
        <Collapse accordion style={{ marginBottom: 16 }}>
            <Panel
                header={<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <span>{group.category}</span>
                    <Text type="secondary">{earned} / {totalMax}</Text>
                </div>}
                extra={<Rate disabled value={Math.round(progress / 20)}/>} key={''}            >
                {group.questions.map((q, idx) => (
                    <QuestionItem key={idx} category={group.category} question={q} index={idx} />
                ))}
                <div style={{ marginTop: 16 }}>
                    <Typography.Text>Прогресс: </Typography.Text>
                    <Progress percent={progress} status="active" />
                </div>
            </Panel>
        </Collapse>
    );
};