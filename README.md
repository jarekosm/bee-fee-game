# Pobranie projektu

Repozytorium: [https://github.com/jarekosm/bee-fee-game](https://github.com/jarekosm/bee-fee-game)

`git clone git@github.com:jarekosm/bee-fee-game.git`

Gra została stworzona w celach rekrutacji do firmy BEE-FEE i jej kod może być używany jedynie w tym celu.

# Uwagi

- To moja pierwsza gra w życiu. Także pierwsze spotkanie z biblioteką `PixiJS`. Wierzę, że wraz z doświadczeniem kod, struktura, itd. byłyby sporo lepsze. Przez brak doświadczenia w grach zgadywałem też trochę jak dobrze skalować sceny/obiekty i przeliczać na ekran. Są to rzeczy, które pewnie szybko bym zrozumiał działając na realnym projekcie.
- Zgodnie z ustaleniami mailowymi, zrobiłem odstępstwo od specyfikacji używając najnowszej wersji `Node` LTS oraz najnowszej biblioteki `PixiJS`. Aktualna wersja node potrzebna do uruchomienia projektu zdefiniowana jest w pliku `package.json`. W tym samym pliku dostępna jest konfiguracja dla `volta`, która automatycznie uruchamia odpowiednią wersję `node` w terminalu (w przypadku niekorzystania z tego narzędzia, wersję `node` trzeba włączyć ręcznie).
- W przeciwieństwie do dokumentacji (gdzie instalacja zależności jest wymagana przez `npm install`), zalecam instalowanie zależności przez `npm ci`, które weźmie pod uwagę dokładne wersje paczek zdefiniowane w pliku `package-lock.json`, z którymi tworzyłem i testowałem grę. Jednak przy tak krótkim czasie życia aplikacji z `npm install` też nie powinno być problemów.
- Struktura projektu na GIT jest uproszczona. W zespole użyłbym branchy, robiłbym Pull Requesty i skupiał się bardziej na nazewnictwie commitów. Tutaj zakładam, że bardziej liczy się efekt końcowy, więc nie skupiałem się na działaniu na GIT.

# Rozwój projektu (techniczny)

- Podłączenie projektu pod narzędzie typu `SonarQube`.
- Skonfigurowanie i dodanie testów (nie mam doświadczenia w testowaniu tego typu biblioteki, ale mam doświadczenie w innego rodzaju testach [np. jednostkowych, które też by się tutaj przydały]).
- W przypadku rozrastającego się projektu lepiej przemyślałbym strukturę aplikacji (na taką prostą grę wydaje mi się jednak wystarczająco).
- Anchor obiektów - nie mam doświadczenia i nie byłem pewien jak to uspójnić, dlatego w tej chwili raczej nie jest spójne podejście między elementami.
- W celu łatwiejszego sterowania interfejsem dodałbym React (menu, komunikaty, zarządzanie stanami [np. ustawienie włączenia efektów dźwiękowych]) - nie chciałem komplikować tak prostego projektu, więc go nie dociągałem.
- Katalog `worldItems` zawiera jednocześnie elementy gry jak i elementy interfejsu użytkownika. Przy większym projekcie warto byłoby to rozdzielić.

# Rozwój projektu (gra)

- Dodanie drugiego gracza.
- Ulepszenia po zebraniu przedmiotu specjalnego (np. szybszy bieg, czy większa postać lub zwolnienie czasu [szybkości spadania] przez 10s; dodanie drugiej postaci, która będzie poruszała się w odbiciu lustrzanym; powiększone jedzonko).
- Rozróżnić punktowo różne rodzaje jedzenia.
- Zarządzanie efektami dźwiękowymi - możliwość wyłączenia.
- Wyregulowanie trudności (np. prędkość wzrastania szybkości spadającego jedzenia).
- W tej chwili jedzenie odradza się w momencie zebrania. Warto wdrożyć jakiś losowy algorytm.
- Dodanie nowocześniejszej grafiki.
- Po zmianie spritów i dodaniu poruszania się tła można zrobić na tym silniku samochodzik omijający przeszkody (lub je zbierający - jak teraz).
- Przyśpieszenie na rządanie (np. po naciśnięciu przycisku do góry - podobnie jak przyśpieszenie klocka w Tetrisie).
- Zapamiętanie rekordu punktowego lub tabela wyników z możliwością wpisania nicka.
- I wiele innych, których nie wypisuję, bo w obecnych czasach Chaty SI są nieskończoną studnią pomysłów.

# Assety

- Postać: [https://lionheart963.itch.io/4-directional-character](https://lionheart963.itch.io/4-directional-character)
- Jedzenie: [https://henrysoftware.itch.io/pixel-food](https://henrysoftware.itch.io/pixel-food)
- Tło: cegła z Mini Dungeon/Castle Pixel Art Asset Pack, @nikllamadev, CC BY 4.0. [https://nikllamadev.itch.io/dungeon-castle-pixel-art-asset-pack-free](https://nikllamadev.itch.io/dungeon-castle-pixel-art-asset-pack-free)

# Uruchomienie projektu

Wersja `node` zdefiniowana jest w pliku `package.json`. W przypadku użycia `volta` wersja w terminalu ustawi się automatycznie. W przeciwnym przypadku należy wybrać odpowiednią wersję ręcznie.

## Instalacja zależności

Preferowane jest użycie `npm ci` ze względu na to, że w projekcie umieściłem plik `package-lock.json` z dokładnymi wersjami użytych bibliotek. To ważne uruchamiając przede wszystkim projekt po dłuższym czasie. Gra powinna uruchomić się jednak także po zainstalowaniu zależności przez `npm install` zgodnie ze specyfikacją projektu.

## Start

Polecenie `npm start` uruchamia serwer i otwiera grę w przeglądarce automatycznie. Gdyby jednak tak się nie stało, w terminalu wyświetlony jest adres, pod którym dostępna jest gra.

## Sterowanie grą

Do sterowania rycerzem służą klawisze `A` / strzałka w lewo oraz `D` / strzałka w prawo. Ruch w którąkolwiek stronę rozpoczyna grę, a po jej zakończeniu uruchamia ją od nowa. Jednoczesne wciśnięcie lewo i prawo zatrzymuje postać.
