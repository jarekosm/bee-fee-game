# Uwagi

- To moja pierwsza gra w życiu. Także pierwsze spotkanie z biblioteką `PixiJS`. Wierzę, że wraz z doświadczeniem kod, struktura, itd. byłyby sporo lepsze. Przez brak doświadczenia w grach zgadywałem też trochę jak dobrze skalować sceny/obiekty i przeliczać na ekran. Są to rzeczy, które pewnie szybko bym zrozumiał działając na realnym projekcie.
- Zgodnie z ustaleniami mailowymi, zrobiłem odstępstwo od specyfikacji używając najnowszej wersji `Node` LTS oraz najnowszej biblioteki `PixiJS`. Aktualna wersja node potrzebna do uruchomienia projektu zdefiniowana jest w pliku `package.json`. W tym samym pliku dostępna jest konfiguracja dla `volta`, która automatycznie uruchamia odpowiednią wersję `node` w terminalu (w przypadku niekorzystania z tego narzędzia, wersję `node` trzeba włączyć ręczenie)
- W przeciwieństwie do dokumentacji (gdzie intalacja zależności jest wymagana przez `npm install`), zalecam instalowanie zależności przez `npm ci`, które weźmie pod uwagę dokładne wersje paczek zdefiniowane w pliku `package-lock.json`, z którymi tworzyłem i testowałem grę. Jednak przy tak krótkim czasie życia aplikacji z `npm install` też nie powinno być problemów.
- Struktura projektu na GIT jest uproszczona. W zespole użyłbym branchy, robiłbym Pull Requesty i skupiał się bardziej na nazewnictwie commitów. Tutaj zakładam, że bardziej liczy się efekt końcowy, więc nie skupiałem się na działaniu na GIT.

# Rozwój projektu (techniczny)

- Podłączenie projektu pod narzędzie typu `SonarQube`.
- Skonfigurowanie i dodanie testów (nie mam doświadczenia w testowaniu tego typu biblioteki, ale mam doświadczenie w innego rodzaju testach [np. jednostkowych, które też by się tutaj przydały]).
- W przypadku rozrastającego się projektu lepiej przemyślałbym strukturę aplikacji.

# Rozwój projektu (gra)

To są rzeczy, których nie zdążyłem ogarnąć lub stwierdziłem, że wymagają zbyt dużo czasu na ten etap.

- ...na razie wszystko jednak robię na bieżąco.
