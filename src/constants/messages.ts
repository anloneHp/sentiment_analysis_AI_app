export const Messages = {
    success: {
        entrySaved: 'Günlük kaydedildi!',
        analysisComplete: 'Analiz tamamlandı!',
    },

    error: {
        generic: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        networkError: 'İnternet bağlantınızı kontrol edin.',
        apiError: 'AI servisi şu anda kullanılamıyor.',
        invalidInput: 'Lütfen geçerli bir metin girin.',
        emptyInput: 'Lütfen bir şeyler yazın.',
        apiKeyMissing: 'API anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin.',
    },

    empty: {
        noEntries: 'Henüz bir kayıt yok.',
        noEntriesDescription: 'İlk günlük kaydınızı oluşturmak için ana sayfaya gidin.',
        noWeeklyData: 'Bu hafta için veri bulunamadı.',
    },

    loading: {
        analyzing: 'Analiz ediliyor...',
        loading: 'Yükleniyor...',
        savingEntry: 'Kaydediliyor...',
    },

    placeholder: {
        entryInput: 'Bugün nasıl hissediyorsun? Düşüncelerini yaz...',
    },

    button: {
        analyze: 'Analiz Et',
        save: 'Kaydet',
        cancel: 'İptal',
        delete: 'Sil',
        viewHistory: 'Geçmişi Gör',
        viewWeeklySummary: 'Haftalık Özet',
        retry: 'Tekrar Dene',
    },

    screen: {
        home: 'AI Günlük Asistanım',
        history: 'Geçmiş',
        weeklySummary: 'Haftalık Özet',
    },

    label: {
        sentiment: 'Duygu',
        summary: 'Özet',
        suggestion: 'Öneri',
        date: 'Tarih',
        entry: 'Kayıt',
        totalEntries: 'Toplam Kayıt',
        weeklyStats: 'Haftalık İstatistikler',
    },
};
