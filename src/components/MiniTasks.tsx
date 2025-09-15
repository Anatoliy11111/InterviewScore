import {useState} from 'react';
import {Button, Space} from "antd";
import {MiniTaskModal} from "./MiniTaskModal.tsx";
import {Categories} from "../data/questions.ts";

export const MiniTasks = ({category}: {category: Categories}) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
            <Space style={{marginTop: 8}}>
                <Button
                    style={{marginBottom: '14px'}}
                    type="primary"
                    size="small"
                    onClick={() => setModalOpen(true)}
                >
                    💡 Показать задачи
                </Button>
            </Space>
            <MiniTaskModal
                categoryId={category}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    )
};