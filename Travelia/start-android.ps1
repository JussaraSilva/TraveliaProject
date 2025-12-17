$env:JAVA_HOME="C:\OpenJDK17U-jdk_x64_windows_hotspot_17.0.17_10\jdk-17.0.17+10"
$env:PATH="$env:JAVA_HOME\bin;$env:PATH"

java -version
npx expo run:android
