# AI Günlük Asistanım

React Native CLI ile geliştirilmiş, yapay zeka destekli bir günlük uygulaması. Kullanıcılar günlük düşüncelerini yazabilir, AI ile duygu analizi yapabilir ve haftalık istatistiklerini görüntüleyebilir

## Proje Yapısı

TestProjesi/
├── src/
│   ├── components/             # UI bileşenleri
│   │   ├── EntryCard.tsx      # Günlük kayıt kartı
│   │   ├── SentimentCard.tsx  # Duygu analizi sonuç kartı
│   │   └── LoadingOverlay.tsx # Yükleme ekranı
│   ├── config/                 # Uygulama konfigürasyonu
│   │   └── Config.ts          # API keys, model settings
│   ├── constants/              # Sabitler
│   │   ├── theme.ts           # Renk, spacing, typography sabitleri
│   │   └── messages.ts        # Türkçe kullanıcı mesajları
│   ├── context/                # React Context
│   │   └── EntriesContext.tsx # Günlük kayıtları state yönetimi
│   ├── screens/                # Ekranlar
│   │   ├── HomeScreen.tsx     # Ana ekran 
│   │   ├── HistoryScreen.tsx  # Geçmiş kayıtlar
│   │   └── WeeklySummaryScreen.tsx # Haftalık istatistikler
│   ├── services/               # Servis katmanı
│   │   ├── AIService.ts       # AI API entegrasyonu
│   │   └── StorageService.ts  # AsyncStorage yönetimi
│   ├── types/                  # TypeScript tip tanımları
│   │   ├── index.ts           # Ana tipler
│   └── utils/                  # Yardımcı fonksiyonlar
│       ├── sentimentUtils.ts  # Duygu renk/emoji/label fonksiyonları
│       └── dateUtils.ts       # Tarih formatlama fonksiyonları
├── .env                        # Environment değişkenleri 
├── .env.example               # Environment şablonu
└── App.tsx                    # Ana uygulama bileşeni
```

### Kullanılan Model

**Model:** [savasy/bert-base-turkish-sentiment-cased](https://huggingface.co/savasy/bert-base-turkish-sentiment-cased)

## Bu model, Türkçe metinler için özel olarak eğitilmiş bir BERT tabanlı duygu analizi modelidir. Model, metinleri şu kategorilere ayırır:
- **Pozitif**: Mutlu, umutlu, heyecanlı duygular
- **Negatif**: Üzgün, kızgın, stresli duygular
- **Nötr**: Dengeli, sakin duygular


## Uygulama, Hugging Face Inference API'sini kullanır:
- **Endpoint**: `https://api-inference.huggingface.co/models/savasy/bert-base-turkish-sentiment-cased`
- **Kimlik Doğrulama**: Bearer token (API key)
- **Timeout**: 30 saniye
- **Retry Logic**: 3 deneme 
- **Caching**: Aynı metin için tekrar API çağrısı yapılmaz

## Akıllı Tavsiye Sistemi

Uygulamamız, yazdıklarınızı anlayan akıllı bir asistana sahiptir. **Google Gemini 2.5 Flash** teknolojisi ile güçlendirilmiş bu asistan:

* Günlük yazılarınızın içeriğini ve ruh halinizi analiz eder.
* Size özel, motive edici ve farkındalık yaratıcı kısa notlar iletir.
* Eski modellere göre çok daha hızlı ve akıcı yanıtlar üretir.

**Kullanılan Altyapı:** Google Generative AI (Gemini 2.5 Flash)

## Kullanılan AI Kod Asistanları:
-Antigravity (Gemini 3 ve Claude 3.5)


## Kurulum ve Çalıştırma
Gereksinimler: Node.js, JDK, Android Studio (Android için) veya Xcode (iOS için) kurulu olmalıdır.
Bağımlılıkları Yükle:
   ```bash
   npm install
   ```
 Ortam Değişkenleri: `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli API anahtarlarını ekleyin.
 Uygulamayı Başlat:
   - Android: `npm run android`
   - iOS: `npm run ios`


