# Football Tactical Manager — projeto Android

Este pacote contém o código enviado pelo usuário preparado para ser empacotado como aplicativo Android usando Capacitor.

## Gerar o APK

1. Instale Node.js LTS e Android Studio em um computador.
2. Abra um terminal nesta pasta.
3. Execute:

```bash
npm install
npm run build
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

No Windows, use `gradlew.bat assembleDebug`.

O APK de teste será gerado em:

`android/app/build/outputs/apk/debug/app-debug.apk`

## APK de lançamento

Depois de configurar uma chave de assinatura no Android Studio, use `assembleRelease` para gerar o APK de lançamento assinado.

## Identidade do app

- Nome: Football Tactical Manager
- Package ID: com.footballtacticalmanager.app
