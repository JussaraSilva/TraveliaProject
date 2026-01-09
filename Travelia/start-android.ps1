# 1. Configura o ambiente
$env:JAVA_HOME="C:\OpenJDK17U-jdk_x64_windows_hotspot_17.0.17_10\jdk-17.0.17+10"
$env:PATH="$env:JAVA_HOME\bin;$env:PATH"

# 2. Verifica se o Java está ok
java -version

# 3. Limpa o build anterior (Usando o nome completo do comando)
Set-Location -Path android
.\gradlew clean
Set-Location -Path ..

# 4. Executa o build local e instala no celular
npx expo run:android
