# courses-app
To aplikacja, promująca nauke zdalną w postaci wideo kursów online.
___
## Przygotowanie środowiska

1. Do pracy na systemie Windows z aplikacją będzie nam potrzebny __*WSL*__
    1. Otwieramy okno Powershell-a jako administrator i wklejamy tam poniższą komendę
        ```powershell
        dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart 
        ```
    2. Wersja systemu, Windows to minimum __1903__. Aby sprawdzić wersje naszego systemu używamy skótu klawiszowego __Windows logo key + R__ i wpisujemy "__winver__"
    3. ### Aktywacja wirtualizacji,
        Jako administrator otwieramy Powershel-a i wklejamy następującą komendę
        ```powershell
        dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
        ```
    4. Pobieramy i instalujemy aktualizacje [WSL](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
    5. Ustawiamy WSL 2 jako naszą domyślną wersje.
        ```powershell
        wsl --set-default-version 2
        ```
    6. Ostatnim krokiem jest instalacja maszyny wirtualnej do wsl.
        Zalecana to [Ubuntu 20.04 LTS](https://www.microsoft.com/store/apps/9n6svws3rx71)
2. Zalecane środowisko do pracy z aplikacją to [Visual Studio Code](https://code.visualstudio.com/).
3. Zalecane dodatki do instalacji to:
    <br><p style="color:red">__dodatki przeklejamy do powershella i zatwierdzamy enterem.__</p>
    ```
        code --install-extension dsznajder.es7-react-js-snippets
        code --install-extension eamodio.gitlens
        code --install-extension esbenp.prettier-vscode
        code --install-extension Gruntfuggly.todo-tree
        code --install-extension jpoissonnier.vscode-styled-components
        code --install-extension ms-vsliveshare.vsliveshare
    ```
___
## Uruchomienie aplikacji
1. Aby uruchomić aplikację należy ją pobrać.
    ``` 
        git pull https://github.com/Mateusz966/courses-app.git
    ```
2. Przełączamy się na branch dev, ponieważ jest do gałaź developerska na której powinny być wszystkie najnowsze zmiany aplikacji.
    ```
        git checkout dev
    ```
3. W głównym folderze aplikacji uruchamiamy komendę
    ```
        docker-compose up -d
    ```
4. Czekamy aż nasze dockery zostaną zbudowane i  na sam koniec upewniamy się czy wszystko wstało i nie wywaliło żadnego błedu.
5. Wszystko wstało i świeci się na zielono to znak, że możesz zabierać się do pracy.
___
## Docker przydane komendy
 ```docker-compose up -d``` -> Buduje dockery i automatycznie je uruchamia

 ```docker-compose build``` -> buduje na nowo dockera (nie uruchamia go)