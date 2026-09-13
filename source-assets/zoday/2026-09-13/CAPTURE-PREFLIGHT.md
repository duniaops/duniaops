# Android capture preflight

**Status:** All eight slots are visually verified in Turkish, English, German,
Spanish and Brazilian Portuguese; final capture remains blocked on the exact
signed candidate.

## Purpose and build truth

These forty images prove that the complete eight-screen narrative can be
captured from the current source in all five app languages at the required
1080×1920 portrait size. They are review previews only. They must not be copied
into `uploads/`, shown to qualitative participants as the final deck or
published to Play.

The source is commit `53b8bbfe2f7b7209ec3530cb8ffccc193a44a29f`, whose
Expo app version is 1.3.3. The locally installed development client reports
Android `versionName 1.3.1` and `versionCode 1`, so it does not satisfy the exact
candidate requirement. Distribution was a local Expo development client served
by Metro, not a Play-signed artifact.

## Capture environment and fixture

- AVD: `Zoday_Debug`, Pixel 8 hardware profile
- Device model: `sdk_gphone64_arm64`
- OS: Android 15, API 35
- Capture size: 1080×1920 portrait
- App languages: Turkish, English, German, Spanish and Brazilian Portuguese
- Fixture: isolated emulator demo profile showing Taurus, with no birth time;
  one fictional 13 September 2026 check-in uses mood level 4, energy level 3
  and self focus, without a note. No account or production identifier appears.
- Output: RGB PNG, no alpha, less than 8 MB; dimensions, bytes and SHA-256 are
  recorded in `ASSET-MANIFEST.json`

Local development warnings from RevenueCat billing availability and the Expo
notifications sound check were dismissed before capture. Their presence is a
development-client limitation and another reason these files are not final
release evidence.

## Narrative findings

1. `01-today` uses a deliberate scrolled Today position. It keeps the current
   Moon phase and cycle, next personal lunar return, personal calendar action and
   dated daily-horoscope action together in one legible frame.
2. `02-daily-horoscope` shows sign/date context, the current shared daily
   horoscope, the move and focus of the day, and the NASA source line.
3. `03-personal-lunar-return` shows the upcoming date, the relationship to birth
   time precision and an honest not-yet-open reading state. It does not promise
   a prediction or imply that a Moon phase is a personal return.
4. `04-personal-reading` uses the real traditional-readings hub and its honest
   selection and access states instead of fabricating completed content.
5. `05-moon-calendar` uses the month view, real phase dates, the current daily
   reading and the fictional journal marker without conflating global phases
   with personal lunar returns.
6. `06-new-check-in` is captured before save in creation mode, with mood,
   energy and focus controls visible.
7. `07-journal-history` shows one fictional record and one personal cycle in the
   30-day timeline. No private note text or unsupported pattern insight appears.
8. `08-reminders` shows the optional lunar-return and daily check-in settings
   with their real controls and no claim that notifications are mandatory.

All five languages were reviewed at contact-sheet scale and individually where
framing required adjustment. Text remains inside its component boundaries; the
German, Spanish and Brazilian Portuguese long strings remain legible.

The final signed candidate must reproduce these states with the intended Android
version code, the same documented fictional fixture and no development overlays.
After replacement, move the signed raw files into `captures/<app-locale>/`, create
separate `uploads/<console-locale>/` compositions, update the final `assets`
array, then begin the 5–8 qualitative sessions.
