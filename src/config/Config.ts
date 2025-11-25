import { HUGGINGFACE_API_KEY, GEMINI_API_KEY } from '@env';

class Config {
    private static instance: Config;

    private readonly _hfApiKey: string;
    private readonly _geminiApiKey: string;

    public readonly API_URL = 'https://router.huggingface.co/hf-inference/models/';

    public readonly SENTIMENT_MODEL = 'savasy/bert-base-turkish-sentiment-cased';
    public readonly SUGGESTION_MODEL = 'gemini-2.5-flash';

    public readonly API_TIMEOUT = 30000;
    public readonly MAX_RETRIES = 3;

    private constructor() {
        console.log('--- CONFIG INITIALIZATION ---');
        console.log('Raw HUGGINGFACE_API_KEY:', HUGGINGFACE_API_KEY ? 'Present' : 'Missing');
        console.log('Raw GEMINI_API_KEY:', GEMINI_API_KEY ? 'Present' : 'Missing');

        this._hfApiKey = HUGGINGFACE_API_KEY || '';
        this._geminiApiKey = GEMINI_API_KEY || '';

        console.log('Loaded _hfApiKey length:', this._hfApiKey.length);
        console.log('Loaded _geminiApiKey length:', this._geminiApiKey.length);

        this.validateConfig();
    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    public get hfApiKey(): string {
        return this._hfApiKey;
    }

    public get hasApiKey(): boolean {
        return this._hfApiKey.length > 0;
    }

    public get geminiApiKey(): string {
        return this._geminiApiKey;
    }

    public get hasGeminiKey(): boolean {
        return this._geminiApiKey.length > 0;
    }

    private validateConfig(): void {
        if (!this.hasApiKey) {
            console.warn(
                'HUGGINGFACE_API_KEY is not set. Please add it to your .env file.\n' +
                'Get your free API key from: https://huggingface.co/settings/tokens'
            );
        }
        if (!this.hasGeminiKey) {
            console.warn(
                'GEMINI_API_KEY is not set. Please add it to your .env file.'
            );
        }
    }

    public getModelUrl(model: string): string {
        return `${this.API_URL}${model}`;
    }

    public get sentimentModelUrl(): string {
        return this.getModelUrl(this.SENTIMENT_MODEL);
    }
}

export default Config.getInstance();
