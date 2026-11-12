# Lernplaner

Tagesplan mit Timern, Vorlagen und Ordnern. Läuft im Browser (Mac, iPad, iPhone), synchronisiert über ein privates GitHub-Gist.

## Plan importieren

Ein Tagesplan kann per Link oder JSON eingefügt werden (Sync-Dialog → „Plan importieren“):

`https://<user>.github.io/lernplaner/#import=<base64url(JSON)>`

```json
{"date":"2026-11-13","start":"14:30","items":[
  {"title":"Analysis Übungsserie","folder":"an1","dur":210},
  {"title":"Pause","pause":true,"dur":30}
]}
```
