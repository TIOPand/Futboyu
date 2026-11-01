# Football Tactical Manager — gerar APK pelo celular

A forma mais fácil no celular é usar o GitHub Actions. Você não precisa instalar Android Studio.

## 1. Crie um repositório no GitHub

- Entre no GitHub pelo navegador.
- Crie um repositório novo, por exemplo `football-tactical-manager`.
- Envie TODOS os arquivos desta pasta para o repositório, mantendo as pastas.

## 2. Inicie a compilação

Depois de enviar os arquivos:

- Abra a aba **Actions** do repositório.
- Se aparecer uma confirmação para permitir workflows, confirme.
- Abra **Build APK**.
- Toque em **Run workflow**.
- Aguarde a compilação terminar.

## 3. Baixe o APK

Quando aparecer um check verde:

- Abra a execução concluída.
- Role até **Artifacts**.
- Baixe `Football-Tactical-Manager-debug-apk`.
- Dentro do ZIP estará o arquivo `app-debug.apk`.

Esse APK é de teste/debug e pode ser instalado diretamente no Android. O Android pode pedir autorização para instalar apps de fontes desconhecidas.

## Observação

O workflow instala as dependências e o Android SDK no servidor do GitHub. Por isso, o celular não precisa ter Android Studio, Gradle ou Android SDK.
