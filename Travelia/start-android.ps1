# 1. Configura o ambiente
$env:JAVA_HOME="C:\OpenJDK17U-jdk_x64_windows_hotspot_17.0.17_10\jdk-17.0.17+10"
# Garante que o Android SDK também seja mapeado na sessão (ajuste o caminho se necessário)
$env:ANDROID_HOME="C:\Users\LABIII01\AppData\Local\AndroidStudio\android-studio-portable\data\sdk"
$env:PATH="$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:PATH"

# 2. Verifica se o Java está ok
java -version

# 3. Forçar a limpeza do cache nativo (O segredo para o erro de CMake)
# Isso remove apenas os arquivos temporários de compilação C++, sem apagar bibliotecas
if (Test-Path "android\app\.cxx") {
    Remove-Item -Recurse -Force "android\app\.cxx"
}

# 4. Limpa o build anterior
Set-Location -Path android
.\gradlew clean
Set-Location -Path ..

# 5. Executa o build
npx expo run:android