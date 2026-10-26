---
translationKey: "asteroid-sizes-for-kids"
locale: "fr"
slug: "taille-asteroides-enfants"
title: "Quelle taille font les astéroïdes ? Comparaisons pour enfants"
description: "Comparez le diamètre d'un astéroïde à un bus et à un terrain de football, puis découvrez les huit catégories animales de Rockimals."
category: "learn-space"
published: "2026-10-26T11:26:12Z"
updated: "2026-10-26T11:26:12Z"
draft: false
image: "/assets/rockimals-blog/asteroid-sizes-for-kids/cover-v2.jpg"
imageAlt: "Niko, Kito, Ciko et Enoli, personnages officiels de Rockimals, devant la Terre et l'espace ; image non à l'échelle"
author:
  id: "duniaops-team"
  name: "DuniaOps Team"
relatedPosts: ["what-is-an-asteroid-for-kids", "asteroid-meteor-comet-for-kids"]
cta:
  id: "app-store"
  label: "Comparer la taille d'un visiteur dans Rockimals"
productGuide: true
reviewedAppVersion: "1.5.1"
---

**Les astéroïdes ont des tailles très différentes.** Certains mesurent quelques mètres de large, d'autres des centaines de kilomètres. Leur « taille » désigne généralement leur **diamètre**, c'est-à-dire leur largeur approximative, et non leur distance à la Terre. Comme beaucoup ne sont pas parfaitement sphériques, un seul diamètre reste une approximation.

## Comparer des longueurs familières

Imaginons un astéroïde *fictif* de 12 mètres de diamètre à côté d'un bus d'environ 12 mètres. Un astéroïde de 100 mètres aurait à peu près la longueur d'un terrain de football : un terrain pour match international mesure généralement 100 à 110 mètres de long. Un kilomètre correspond à 1 000 mètres, soit environ dix terrains de 100 mètres bout à bout. Tous les bus et terrains n'ont pas exactement les mêmes dimensions.

Sur une feuille, tracez une ligne en choisissant **1 centimètre pour 10 mètres**. L'exemple de 12 mètres demande 1,2 centimètre ; celui de 100 mètres, 10 centimètres. Pour un kilomètre, il faudrait un mètre de papier. Un écran de téléphone ne peut guère montrer les trois à une même échelle fidèle.

## Pourquoi parle-t-on d'estimation ?

Certains astéroïdes ont été mesurés plus directement, mais beaucoup de diamètres sont **estimés**. Les astronomes utilisent leur luminosité et une hypothèse sur la quantité de lumière réfléchie par leur surface. Un gros corps sombre et un petit corps clair peuvent paraître aussi lumineux. L'outil de la NASA/JPL indique donc une plage de tailles plutôt qu'une largeur garantie. De nouvelles observations peuvent modifier l'estimation.

## Les catégories ludiques de Rockimals

Dans le code 1.5.1 examiné, le jeu détermine la catégorie physique et l'animal par défaut selon **la borne haute du diamètre estimé**. Une valeur exactement égale à la limite passe dans la catégorie suivante : pour un visiteur sans personnage attribué, à 8 mètres c'est Tavi, pas Niko. Un personnage d'histoire attribué peut afficher un autre animal sans changer la catégorie de taille réelle.

| Diamètre estimé utilisé par le jeu | Animal | Étiquette ludique |
| --- | --- | --- |
| Moins de 8 m | Niko la souris | Voiture |
| 8 à moins de 20 m | Tavi le lapin | Bus |
| 20 à moins de 50 m | Barney le renard | Maison |
| 50 à moins de 120 m | Kito le tigre | Avion |
| 120 à moins de 300 m | Pofi l'ours | Terrain de football |
| 300 à moins de 800 m | Bobo l'éléphant | Stade |
| 800 à moins de 2 000 m | Ciko le dino | Gratte-ciel |
| 2 000 m ou plus | Enoli la baleine | Montagne |

Ces étiquettes sont des **catégories**, pas les dimensions exactes d'une voiture ou d'une montagne. Dans le langage courant, 100 mètres rappellent un terrain de football ; dans le jeu, l'animal par défaut pour 100 mètres est pourtant **Kito**, et non Pofi. Les animaux de la couverture ne sont pas dessinés à l'échelle.

Lisez le diamètre estimé sur la fiche d'un visiteur dans le **Radar**, puis comparez les animaux dans la **Tour des tailles**. « Quelle est sa largeur ? » et « À quelle distance de la Terre passera-t-il ? » sont deux questions distinctes. Rockimals associe des données réelles sur les visiteurs proches de la Terre à des animaux et histoires fictifs ; l'application est indépendante, sans affiliation ni approbation de la NASA. Cette correspondance a été vérifiée dans le code iOS 1.5.1 le 23 octobre 2026 ; la version Android publique n'a pas été confirmée indépendamment.

Envie de découvrir l'univers de Rockimals ? [Regardez la vidéo de présentation en français de 30 secondes sur YouTube](https://www.youtube.com/watch?v=KSlFR-_xREU). Cette animation n'est ni un diagramme d'astéroïdes à l'échelle ni une capture du jeu.

## Sources

- [NASA Science : Asteroid Facts](https://science.nasa.gov/solar-system/asteroids/facts/) — tailles et formes irrégulières ; consulté le 23 octobre 2026.
- [NASA/JPL CNEOS : Asteroid Size Estimator](https://cneos.jpl.nasa.gov/tools/ast_size_est.html) — luminosité, réflectivité et incertitude ; même date.
- [IFAB, Loi 1 : terrain de jeu](https://www.theifab.com/laws/latest/the-field-of-play/) — longueur d'un terrain international ; même date.
