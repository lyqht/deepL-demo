<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Supabase

[Supabase](https://supabase.com) jest alternatywą open source dla Firebase. Budujemy funkcje Firebase używając narzędzi open source klasy korporacyjnej.

- hostowana baza danych Postgres [x] [Docs](https://supabase.com/docs/guides/database)
- [Uwierzytelnianie i autoryzacja. [Docs](https://supabase.com/docs/guides/auth)
- [x] Automatycznie generowane interfejsy API.
  - rEST [x]. [Docs](https://supabase.com/docs/guides/database/api#rest-api)
  - [x] GraphQL. [Docs](https://supabase.com/docs/guides/database/api#graphql-api)
  - [x] Subskrypcje w czasie rzeczywistym. [Docs](https://supabase.com/docs/guides/database/api#realtime-api)
- [x] Funkcje.
  - [x] Funkcje bazodanowe. [Docs](https://supabase.com/docs/guides/database/functions)
  - [x] Funkcje krawędziowe [Docs](https://supabase.com/docs/guides/functions)
- [x] Przechowywanie plików. [Docs](https://supabase.com/docs/guides/storage)
- dashboard [x]

![Supabase Dashboard](https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/images/github/supabase-dashboard.png)

## Dokumentacja

Pełna dokumentacja znajduje się na stronie [supabase.com/docs](https://supabase.com/docs)

Aby zobaczyć jak wnieść swój wkład, odwiedź [Getting Started](./DEVELOPERS.md)

## Społeczność i wsparcie

- [Forum społeczności](https://github.com/supabase/supabase/discussions). Najlepsze dla: pomocy w budowaniu, dyskusji o najlepszych praktykach baz danych.
- [GitHub Issues](https://github.com/supabase/supabase/issues). Najlepsze dla: błędów i pomyłek, które napotkasz używając Supabase.
- [Email Support](https://supabase.com/docs/support#business-support). Najlepsze dla: problemów z bazą danych lub infrastrukturą.
- [Discord](https://discord.supabase.com). Najlepszy do: dzielenia się swoimi aplikacjami i spędzania czasu ze społecznością.

## Status

- alfa [x]: Testujemy Supabase z zamkniętym zbiorem klientów
- [x] Public Alpha: Każdy może zarejestrować się na stronie [app.supabase.com](https://app.supabase.com). Ale nie przejmuj się nami, jest kilka błędów
- [Publiczna Beta: Wystarczająco stabilny dla większości przypadków użycia poza przedsiębiorstwem
- [Public: Ogólna dostępność [[status](https://supabase.com/docs/guides/getting-started/features#feature-status)]

Obecnie jesteśmy w Public Beta. Obserwuj "wydania" tego repo, aby otrzymywać powiadomienia o głównych aktualizacjach.

<kbd><img src="https://raw.githubusercontent.com/supabase/supabase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Obserwuj to repo"/></kbd>

---

## Jak to działa

Supabase to połączenie narzędzi open source. Budujemy funkcje Firebase używając produktów open source klasy korporacyjnej. Jeśli narzędzia i społeczności istnieją, z licencją MIT, Apache 2 lub równoważną otwartą, będziemy używać i wspierać to narzędzie. Jeśli narzędzie nie istnieje, sami je zbudujemy i udostępnimy. Supabase nie jest odwzorowaniem 1 do 1 Firebase. Naszym celem jest zapewnienie deweloperom doświadczenia podobnego do Firebase przy użyciu narzędzi open source.

**Architektura**

Supabase jest [platformą hostowaną](https://app.supabase.com). Możesz zarejestrować się i zacząć używać Supabase bez instalowania czegokolwiek.
Można również [hostować samodzielnie](https://supabase.com/docs/guides/hosting/overview) i [rozwijać lokalnie](https://supabase.com/docs/guides/local-development).

![Architektura](https://github.com/supabase/supabase/blob/master/apps/docs/public/img/supabase-architecture.png)

- [PostgreSQL](https://www.postgresql.org/) jest obiektowo-relacyjnym systemem bazodanowym z ponad 30 latami aktywnego rozwoju, dzięki czemu zyskał reputację niezawodnego, odpornego na funkcje i wydajnego.
- [Realtime](https://github.com/supabase/realtime) to serwer Elixir, który umożliwia nasłuchiwanie wstawek, aktualizacji i usuwania danych PostgreSQL za pomocą websockets. Realtime sprawdza wbudowane w Postgres funkcje replikacji w poszukiwaniu zmian w bazie danych, konwertuje zmiany na JSON, a następnie wysyła JSON przez websockets do autoryzowanych klientów.
- [PostgREST](http://postgrest.org/) to serwer internetowy, który zmienia bazę danych PostgreSQL bezpośrednio w RESTful API
- [pg_graphql](http://github.com/supabase/pg_graphql/) rozszerzenie PostgreSQL, które udostępnia API GraphQL
- [Storage](https://github.com/supabase/storage-api) zapewnia interfejs RESTful do zarządzania Plikami przechowywanymi w S3, używając Postgres do zarządzania uprawnieniami.
- [Postgres-meta](https://github.com/supabase/postgres-meta) to RESTful API do zarządzania Postgresem, pozwalające na pobieranie tabel, dodawanie ról, uruchamianie zapytań itp.
- [GoTrue](https://github.com/netlify/gotrue) to API oparte na SWT do zarządzania użytkownikami i wydawania tokenów SWT.
- [Kong](https://github.com/Kong/kong) to chmurowa brama API.

#### Biblioteki klienckie

Nasze podejście do bibliotek klienckich jest modułowe. Każda podbiblioteka jest samodzielną implementacją dla pojedynczego systemu zewnętrznego. Jest to jeden ze sposobów, w jaki wspieramy istniejące narzędzia.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Język</th>
    <th>Klient</th>
    <th colspan="5">Feature-Clients (dołączony do klienta Supabase)</th>
  </tr>
  <tr>
    <th></th>
    <th>Supabase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/supabase/gotrue" target="_blank" rel="noopener noreferrer">GoTrue</a></th>
    <th><a href="https://github.com/supabase/realtime" target="_blank" rel="noopener noreferrer">Realtime</a></th>
    <th><a href="https://github.com/supabase/storage-api" target="_blank" rel="noopener noreferrer">Storage</a></th>
    <th>Funkcje</th>
  </tr>
  <!-- SZABLON DLA NOWEGO WIERSZA -->
  <!-- START ROW
  <tr>
    <td>lang</td>
    <td><a href="https://github.com/supabase-community/supabase-lang" target="_blank" rel="noopener noreferrer">supabase-lang</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-lang" target="_blank" rel="noopener noreferrer">postgrest-lang</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-lang" target="_blank" rel="noopener noreferrer">gotrue-lang</a></td>
    <td><a href="https://github.com/supabase-community/realtime-lang" target="_blank" rel="noopener noreferrer">realtime-lang</a></td>
    <td><a href="https://github.com/supabase-community/storage-lang" target="_blank" rel="noopener noreferrer">storage-lang</a></td>
  </tr>
  END ROW -->
  <th colspan="7">⚡️ Oficjalny ⚡️</th>
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/supabase/supabase-js" target="_blank" rel="noopener noreferrer">supabase-js</a></td>
    <td><a href="https://github.com/supabase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/supabase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/supabase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/supabase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
    <td><a href="https://github.com/supabase/functions-js" target="_blank" rel="noopener noreferrer">functions-js</a></td>
  </tr>
    <tr>
    <td>Flutter</td>
    <td><a href="https://github.com/supabase/supabase-flutter" target="_blank" rel="noopener noreferrer">supabase-flutter</a></td>
    <td><a href="https://github.com/supabase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/supabase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/supabase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/supabase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
    <td><a href="https://github.com/supabase/functions-dart" target="_blank" rel="noopener noreferrer">functions-dart</a></td>
  </tr>
  <th colspan="7">💚 Społeczność 💚</th>
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/supabase-community/supabase-csharp" target="_blank" rel="noopener noreferrer">supabase-csharp</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">gotrue-csharp</a></td>
    <td><a href="https://github.com/supabase-community/realtime-csharp" target="_blank" rel="noopener noreferrer">realtime-csharp</a></td>
    <td><a href="https://github.com/supabase-community/storage-csharp" target="_blank" rel="noopener noreferrer">storage-csharp</a></td>
    <td><a href="https://github.com/supabase-community/functions-csharp" target="_blank" rel="noopener noreferrer">funkcje-csharp</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-go" target="_blank" rel="noopener noreferrer">gotrue-go</a></td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/storage-go" target="_blank" rel="noopener noreferrer">storage-go</a></td>
    <td><a href="https://github.com/supabase-community/functions-go" target="_blank" rel="noopener noreferrer">funkcje-go</a></td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/storage-java" target="_blank" rel="noopener noreferrer">storage-java</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Kotlin</td>
    <td><a href="https://github.com/supabase-community/supabase-kt" target="_blank" rel="noopener noreferrer">supabase-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/Postgrest" target="_blank" rel="noopener noreferrer">postgrest-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/GoTrue" target="_blank" rel="noopener noreferrer">gotrue-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/Realtime" target="_blank" rel="noopener noreferrer">realtime-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/Storage" target="_blank" rel="noopener noreferrer">storage-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/Functions" target="_blank" rel="noopener noreferrer">funkcje-kt</a></td>
  </tr>
  <tr>
    <td>Python</td>
    <td><a href="https://github.com/supabase-community/supabase-py" target="_blank" rel="noopener noreferrer">supabase-py</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-py" target="_blank" rel="noopener noreferrer">gotrue-py</a></td>
    <td><a href="https://github.com/supabase-community/realtime-py" target="_blank" rel="noopener noreferrer">realtime-py</a></td>
    <td><a href="https://github.com/supabase-community/storage-py" target="_blank" rel="noopener noreferrer">storage-py</a></td>
    <td><a href="https://github.com/supabase-community/functions-py" target="_blank" rel="noopener noreferrer">functions-py</a></td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td><a href="https://github.com/supabase-community/supabase-rb" target="_blank" rel="noopener noreferrer">supabase-rb</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Rust</td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/postgrest-rs" target="_blank" rel="noopener noreferrer">postgrest-rs</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Swift</td>
    <td><a href="https://github.com/supabase-community/supabase-swift" target="_blank" rel="noopener noreferrer">supabase-swift</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-swift" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-swift" target="_blank" rel="noopener noreferrer">gotrue-swift</a></td>
    <td><a href="https://github.com/supabase-community/realtime-swift" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/supabase-community/storage-swift" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
    <td><a href="https://github.com/supabase-community/functions-swift" target="_blank" rel="noopener noreferrer">funkcje-swift</a></td>
  </tr>
  <tr>
    <td>Godot Engine (GDScript)</td>
    <td><a href="https://github.com/supabase-community/godot-engine.supabase" target="_blank" rel="noopener noreferrer">supabase-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-gdscript" target="_blank" rel="noopener noreferrer">postgrest-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-gdscript" target="_blank" rel="noopener noreferrer">gotrue-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/realtime-gdscript" target="_blank" rel="noopener noreferrer">realtime-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/storage-gdscript" target="_blank" rel="noopener noreferrer">storage-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/functions-gdscript" target="_blank" rel="noopener noreferrer">functions-gdscript</a></td>
  </tr>
</table>

<!--- Usuń tę listę, jeśli tłumaczysz na inny język, trudno jest aktualizować wiele plików-->
<!--- Zachowaj tylko link do listy plików tłumaczeniowych-->

## Tłumaczenia

- [Arabski | العربية](/i18n/README.ar.md)
- [Albański / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [bułgarski / Български](/i18n/README.bg.md)
- [Kataloński / Català](/i18n/README.ca.md)
- [Duński / Dansk](/i18n/README.da.md)
- [Holenderski / Nederlands](/i18n/README.nl.md)
- [Angielski](https://github.com/supabase/supabase)
- [Fiński / Suomalainen](/i18n/README.fi.md)
- [Francuski / Français](/i18n/README.fr.md)
- [German / Deutsch](/i18n/README.de.md)
- [Grecki / Ελληνικά](/i18n/README.gr.md)
- [Hebrajski / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Węgierski / Magyar](/i18n/README.hu.md)
- [Nepali / नेपाली](/i18n/README.ne.md)
- [Indonezja / Bahasa Indonesia](/i18n/README.id.md)
- [Włoski / Italiano](/i18n/README.it.md)
- [Japoński / 日本語](/i18n/README.jp.md)
- [Koreański / 한국어](/i18n/README.ko.md)
- [Malajski / Bahasa Malaysia](/i18n/README.ms.md)
- [Norweski (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Perski / فارسی](/i18n/README.fa.md)
- [Polski / Polski](/i18n/README.pl.md)
- [Portugalski / Português](/i18n/README.pt.md)
- [Portugalski (brazylijski) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumuński / Română](/i18n/README.ro.md)
- [Rosyjski / Pусский](/i18n/README.ru.md)
- [Serbski / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Hiszpański / Español](/i18n/README.es.md)
- [Chiński uproszczony / 简体中文](/i18n/README.zh-cn.md)
- [Szwedzki / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Traditional Chinese / 繁体中文](/i18n/README.zh-tw.md)
- [Turecki / Türkçe](/i18n/README.tr.md)
- [Ukraiński / Українська](/i18n/README.uk.md)
- [Wietnamski / Tiếng Việt](/i18n/README.vi-vn.md)
- [Lista tłumaczeń](/i18n/languages.md) <!--- Zachowaj tylko to -->

---

## Sponsorzy

[![Nowy Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/supabase)