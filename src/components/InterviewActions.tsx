import {Button, Divider} from 'antd';
import {Summary} from './Summary';
import {useInterviewStore} from '../store/useInterviewStore';
import {exportToPDF} from "../utils/exportToPDF.ts";

interface Props {
    totalScore: number;
    onGenerateReport: () => void;
    loading: boolean;
}

export const InterviewActions = ({
                                     totalScore,
                                 }: Props) => {
    const {candidateName, reset} = useInterviewStore();

    return (
        <>
            <Divider/>

            <Summary totalScore={totalScore}/>

            <Button
                type="default"
                onClick={() => exportToPDF({candidateName})}
                style={{marginRight: 8}}
            >
                Сформировать PDF (A4)
            </Button>

            <Button danger onClick={reset}>
                Сбросить всё
            </Button>
        </>
    );
};