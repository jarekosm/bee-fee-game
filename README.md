# Uwagi

- To moja pierwsza gra w życiu. Także pierwsze spotkanie z biblioteką `PixiJS`. Wierzę, że wraz z doświadczeniem kod, struktura, itd. byłyby sporo lepsze. Przez brak doświadczenia w grach zgadywałem też trochę jak dobrze skalować sceny/obiekty i przeliczać na ekran. Są to rzeczy, które pewnie szybko bym zrozumiał działając na realnym projekcie.
- Zgodnie z ustaleniami mailowymi, zrobiłem odstępstwo od specyfikacji używając najnowszej wersji `Node` LTS oraz najnowszej biblioteki `PixiJS`. Aktualna wersja node potrzebna do uruchomienia projektu zdefiniowana jest w pliku `package.json`. W tym samym pliku dostępna jest konfiguracja dla `volta`, która automatycznie uruchamia odpowiednią wersję `node` w terminalu (w przypadku niekorzystania z tego narzędzia, wersję `node` trzeba włączyć ręczenie)
- W przeciwieństwie do dokumentacji (gdzie intalacja zależności jest wymagana przez `npm install`), zalecam instalowanie zależności przez `npm ci`, które weźmie pod uwagę dokładne wersje paczek zdefiniowane w pliku `package-lock.json`, z którymi tworzyłem i testowałem grę. Jednak przy tak krótkim czasie życia aplikacji z `npm install` też nie powinno być problemów.
- Struktura projektu na GIT jest uproszczona. W zespole użyłbym branchy, robiłbym Pull Requesty i skupiał się bardziej na nazewnictwie commitów. Tutaj zakładam, że bardziej liczy się efekt końcowy, więc nie skupiałem się na działaniu na GIT.

# Rozwój projektu (techniczny)

- Podłączenie projektu pod narzędzie typu `SonarQube`.
- Skonfigurowanie i dodanie testów (nie mam doświadczenia w testowaniu tego typu biblioteki, ale mam doświadczenie w innego rodzaju testach [np. jednostkowych, które też by się tutaj przydały]).
- W przypadku rozrastającego się projektu lepiej przemyślałbym strukturę aplikacji.
- Anchor obiektów - nie mam doświadczenia i nie byłem pewien jak to uspójnić, dlatego w tej chwili raczej nie jest spójne podejście między elementami.

# Rozwój projektu (gra)

To są rzeczy, których nie zdążyłem ogarnąć lub stwierdziłem, że wymagają zbyt dużo czasu na ten etap.

- Można dodać drugiego gracza.
- Ulepszenia po zebraniu przedmiotu specjalnego (np. szybszy bieg, czy większa postać lub zwolnienie czasu [szybkości spadania] przez 10s; dodanie drugiej postaci, która będzie poruszała się w odbiciu lustrzanym; powiększone jedzonko).
- Rozróżnić punktowo różne rodzaje jedzenia.

# Assety

- Postać: https://lionheart963.itch.io/4-directional-character
- Jedzenie: https://henrysoftware.itch.io/pixel-food
- Tło: cegła z Mini Dungeon/Castle Pixel Art Asset Pack, @nikllamadev, CC BY 4.0. https://nikllamadev.itch.io/dungeon-castle-pixel-art-asset-pack-free
