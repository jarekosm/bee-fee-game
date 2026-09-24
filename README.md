# Uwagi

- To moja pierwsza gra w życiu. Także pierwsze spotkanie z biblioteką `PixiJS`. Wierzę, że wraz z doświadczeniem kod, struktura, itd. byłyby sporo lepsze.
- Zgodnie z ustaleniami mailowymi, zrobiłem odstępstwo od specyfikacji używając najnowszej wersji `Node` LTS oraz najnowszej biblioteki `PixiJS`. Aktualna wersja node potrzebna do uruchomienia projektu zdefiniowana jest w pliku `package.json`. W tym samym pliku dostępna jest konfiguracja dla `volta`, która automatycznie uruchamia odpowiednią wersję `node` w terminalu (w przypadku niekorzystania z tego narzędzia, wersję `node` trzeba włączyć ręczenie)
- W przeciwieństwie do dokumentacji (gdzie intalacja zależności jest wymagana przez `npm install`), zalecam instalowanie zależności przez `npm ci`, które weźmie pod uwagę dokładne wersje paczek zdefiniowane w pliku `package-lock.json`, z którymi tworzyłem i testowałem grę. Jednak przy tak krótkim czasie życia aplikacji z `npm install` też nie powinno być problemów.
