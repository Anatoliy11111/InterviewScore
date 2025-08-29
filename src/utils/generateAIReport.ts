// src/api/generateReport.ts

import {useInterviewStore} from '../store/useInterviewStore';

interface GenerateReportParams {
    totalScore: number;
    apiKey: string;
    folderId: string; // ID каталога из Yandex Cloud
    onSuccess: (report: string) => void;
    onError: (error: string) => void;
    onLoading: (loading: boolean) => void;
}

export const generateReportWithYandex = ({
                                             totalScore,
                                             apiKey,
                                             folderId,
                                             onSuccess,
                                             onError,
                                             onLoading,
                                         }: GenerateReportParams) => {
    onLoading(true);

    const ratings = useInterviewStore.getState().ratings;

    const prompt = `
Ты — технический рекрутер. Проанализируй результаты собеседования frontend-разработчика.

Оценки по категориям:
${JSON.stringify(ratings, null, 2)}

Итоговый балл: ${totalScore} из 100.

Напиши заключение на русском языке:
- Уровень: junior/middle/senior
- Сильные стороны
- Слабые стороны
- Рекомендации (принять, доработать, не брать)

Пиши кратко, по пунктам, без вводных фраз.
  `.trim();

    const body = JSON.stringify({
        modelUri: `gpt://${folderId}/yandexgpt-lite/latest`,
        messages: [
            {role: 'user', text: prompt}
        ],
        temperature: 0.7,
        maxTokens: '500'
    });

    fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Api-Key ${apiKey}`,
        },
        body,
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error?.message || `Ошибка ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.result?.alternatives?.[0]?.message?.text) {
                onSuccess(data.result.alternatives[0].message.text.trim());
            } else {
                onError('Ответ пустой или не содержит текста.');
            }
        })
        .catch(error => {
            console.error('Yandex GPT error:', error);
            onError(
                error instanceof Error
                    ? error.message
                    : 'Ошибка сети или API. Проверь ключ и Folder ID.'
            );
        })
        .finally(() => {
            onLoading(false);
        });
};