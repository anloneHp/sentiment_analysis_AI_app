import axios, { AxiosError } from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Config from '../config/Config';
import { Messages } from '../constants/messages';

export interface AIResponse {
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    summary: string;
    suggestion: string;
}

class AIService {
    private static instance: AIService;
    private requestCache: Map<string, AIResponse> = new Map();
    private genAI: GoogleGenerativeAI;

    private constructor() {
        this.genAI = new GoogleGenerativeAI(Config.geminiApiKey);
    }

    public static getInstance(): AIService {
        if (!AIService.instance) {
            AIService.instance = new AIService();
        }
        return AIService.instance;
    }

    private async getSentiment(text: string, retryCount = 0): Promise<'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'> {
        try {
            if (!Config.hasApiKey) {
                console.warn(Messages.error.apiKeyMissing);
                return 'NEUTRAL';
            }
            const response = await axios.post(
                Config.sentimentModelUrl,
                { inputs: text },
                {
                    headers: {
                        Authorization: `Bearer ${Config.hfApiKey}`,
                        'Content-Type': 'application/json',
                    },
                    timeout: Config.API_TIMEOUT,
                }
            );
            if (response.data) {
                let scores = response.data;
                if (Array.isArray(scores) && Array.isArray(scores[0])) scores = scores[0];
                if (Array.isArray(scores) && scores.length > 0) {
                    const sorted = [...scores].sort((a: any, b: any) => b.score - a.score);
                    const topLabel = sorted[0].label.toLowerCase();
                    if (topLabel.includes('label_1') || topLabel.includes('positive') || topLabel.includes('pozitif')) return 'POSITIVE';
                    if (topLabel.includes('label_0') || topLabel.includes('negative') || topLabel.includes('negatif')) return 'NEGATIVE';
                }
            }
            return 'NEUTRAL';
        } catch (error) {
            return 'NEUTRAL';
        }
    }

    private async getSuggestion(text: string, sentiment: string): Promise<string> {
        try {
            if (!Config.geminiApiKey) {
                console.warn('Gemini API Key missing!');
                return 'API anahtarı eksik.';
            }

            const model = this.genAI.getGenerativeModel({ model: Config.SUGGESTION_MODEL });

            const prompt = `Sen yardımsever bir günlük asistanısın. Kullanıcı günlüğüne şunu yazdı: "${text}"
            Duygu durumu: ${sentiment}
            Buna göre kullanıcıya kısa, samimi ve motive edici tek bir cümlelik bir tavsiye veya yorum yaz. Sadece tavsiyeyi yaz, başka bir şey yazma.`;

            console.log('--- GEMINI API İSTEĞİ BAŞLIYOR ---');

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const responseText = response.text();

            console.log('Gemini Cevabı:', responseText);

            if (responseText) {
                return responseText.trim();
            }

            return '';
        } catch (error: any) {
            console.error('Gemini Suggestion Error:', error);
            return '';
        }
    }

    private async generateResponse(sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL', text: string): Promise<{ summary: string; suggestion: string }> {
        const responses = {
            POSITIVE: { summaries: ['Harika bir gün!', 'Süper hissediyorsun.'] },
            NEGATIVE: { summaries: ['Zor bir gün.', 'Biraz dinlenmelisin.'] },
            NEUTRAL: { summaries: ['Sakin bir gün.', 'Her şey yolunda.'] },
        };

        const sentimentResponses = responses[sentiment] || responses.NEUTRAL;
        const randomSummary = sentimentResponses.summaries[Math.floor(Math.random() * sentimentResponses.summaries.length)];

        let suggestion = await this.getSuggestion(text, sentiment);

        if (!suggestion) {
            console.log('AI Suggestion failed.');
            suggestion = 'Yapay zeka önerisi şu an oluşturulamadı.';
        }

        return {
            summary: randomSummary,
            suggestion: suggestion,
        };
    }

    public async analyzeEntry(text: string): Promise<AIResponse> {
        const cacheKey = text.trim().toLowerCase();
        if (this.requestCache.has(cacheKey)) return this.requestCache.get(cacheKey)!;

        const sentiment = await this.getSentiment(text);
        const { summary, suggestion } = await this.generateResponse(sentiment, text);

        const result: AIResponse = { sentiment, summary, suggestion };
        this.requestCache.set(cacheKey, result);
        return result;
    }

    public clearCache(): void {
        this.requestCache.clear();
    }
}

export default AIService.getInstance();