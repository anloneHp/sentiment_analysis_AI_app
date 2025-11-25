# AI Günlük Asistanım

React Native CLI ile geliştirilmiş, yapay zeka destekli bir günlük uygulaması. Kullanıcılar günlük düşüncelerini yazabilir, AI ile duygu analizi yapabilir ve haftalık istatistiklerini görüntüleyebilir.

## Demo ve Görseller

Uygulamanın çalışır halini aşağıdaki videodan izleyebilirsiniz:

https://www.youtube.com/watch?v=SPEohoSh7q8

### Ekran Görüntüleri
<img width="502" height="1011" alt="Ekran görüntüsü 2025-11-25 212228" src="https://github.com/user-attachments/assets/f4840758-1ab1-436f-b073-b378b24f1862" />

<img width="482" height="1002" alt="Ekran görüntüsü 2025-11-25 212207" src="https://github.com/user-attachments/assets/42506402-4f3a-4bb7-935e-eff3081abe55" />

---

## Proje Yapısı

TestProjesi/
├── src/
│   ├── components/        # UI bileşenleri (EntryCard, SentimentCard vb.)
│   ├── config/            # Uygulama konfigürasyonu (API keys, settings)
│   ├── constants/         # Sabitler (Tema, Mesajlar)
│   ├── context/           # React Context (EntriesContext)
│   ├── screens/           # Ekranlar (Home, History, WeeklySummary)
│   ├── services/          # Servis katmanı (AIService, StorageService)
│   ├── types/             # TypeScript tip tanımları
│   └── utils/             # Yardımcı fonksiyonlar (Date, Sentiment)
├── .env                   # Environment değişkenleri
└── App.tsx                # Ana uygulama bileşeni

# Yapay Zeka Altyapısı
Bu proje iki temel yapay zeka modelini entegre eder:

1. Duygu Analizi (Sentiment Analysis)
Türkçe metinler için özel olarak eğitilmiş BERT tabanlı bir model kullanır.

Model: savasy/bert-base-turkish-sentiment-cased

API Sağlayıcı: Hugging Face Inference API

Sınıflandırma:

Pozitif: Mutlu, umutlu, heyecanlı

Negatif: Üzgün, kızgın, stresli

Nötr: Dengeli, sakin

Teknik Detaylar:

Timeout: 30 saniye

Retry Logic: 3 deneme

Caching: Aynı metin için tekrar API çağrısı yapılmaz.

2. Akıllı Tavsiye Sistemi
Kullanıcının yazdıklarını analiz eden ve geri bildirim veren asistan.

Altyapı: Google Generative AI (Gemini 2.5 Flash)

İşlev: İçeriği ve ruh halini analiz eder; motive edici ve farkındalık yaratıcı kısa notlar iletir.

Performans: Hızlı ve akıcı yanıt süresi sunar.

Geliştirme Araçları
Platform: React Native CLI

Dil: TypeScript

AI Yardımcıları: Antigravity (Gemini 3 ve Claude 3.5)

Kurulum ve Çalıştırma
Gereksinimler
Node.js, JDK, Android Studio (Android için) veya Xcode (iOS için) sisteminizde kurulu olmalıdır.

1. Bağımlılıkları Yükleyin
Proje dizininde terminali açın ve komutu çalıştırın:

Bash

npm install
2. Ortam Değişkenlerini Ayarlayın
.env.example dosyasının adını .env olarak değiştirin ve içerisine API anahtarlarınızı ekleyin (Hugging Face ve Gemini API Key).

3. Uygulamayı Başlatın
Android:

Bash

npm run android
iOS:

Bash

npm run ios


