# EasyCrea

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/EasyCrea/Easy_Crea)

## Description
**EasyCrea** est une application web React permettant aux utilisateurs connectés de créer leur propre carte de jeu. Vous contribuez ainsi à un deck thématique unique (par exemple, Agriculture/élevage) en imaginant des événements et des choix. Une fois complet, ce deck sera jouable sur l'application mobile **DeckOuverte**.

---

## Fonctionnalités principales
- **Création de cartes** : Les utilisateurs peuvent ajouter une carte unique à chaque deck.
- **Deck thématique** : Chaque deck possède un thème spécifique, inspirant les utilisateurs à créer des événements originaux.
- **Impact sur les indicateurs** : Chaque choix influe sur deux indicateurs clés : 
  - **Population** : Moral, satisfaction, bien-être.
  - **Finances** : Budget, revenus, dépenses.
- **PWA (Progressive Web App)** : EasyCrea peut être installée sur votre appareil pour une utilisation hors ligne rapide et fluide.

---

## Comment créer une carte ?
1. **Choisissez un contexte** : Chaque deck a un thème spécifique (par exemple : "Maire d'un village médiéval", "Dirigeant d'une startup", "Explorateur polaire").
2. **Imaginez un événement** : Proposez une situation qui pourrait survenir dans ce contexte.
3. **Définissez deux choix opposés** : Imaginez deux actions possibles face à cet événement.
4. **Déterminez les conséquences** : Indiquez l'impact de chaque choix sur les indicateurs Population et Finances (de -10 à +10).

---

## Conseils pour les scores
### Population
- **+10** : Très positif, grande satisfaction.
- **0** : Impact neutre.
- **-10** : Très négatif, mécontentement général.

### Finances
- **+10** : Gain financier significatif.
- **0** : Stabilité économique.
- **-10** : Perte financière importante.

> **L'équilibre est crucial : évitez les choix trop extrêmes !**

---

## Exemple de Carte
- **Thème** : Maire d'un village médiéval.
- **Événement** : Un marchand étranger propose de construire une route commerciale.

**Choix 1** : Accepter la construction.
- Population : +3 (opportunités commerciales).
- Finances : +5 (revenus du péage).

**Choix 2** : Refuser la construction.
- Population : +2 (préservation des traditions).
- Finances : -3 (manque à gagner).

---

## Installation et exécution
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/EasyCrea/Easy_Crea.git
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez l'application :
   ```bash
   npm run dev
   ```

---

## Installation de la PWA
EasyCrea est une Progressive Web App (PWA). Vous pouvez l'installer sur votre appareil pour une utilisation simplifiée et hors ligne.

### Étapes d'installation
1. **Sur un ordinateur** :
   - Ouvrez l'application dans votre navigateur (Google Chrome, Edge, etc.).
   - Cliquez sur l'icône "Installer" dans la barre d'adresse ou dans le menu du navigateur.

2. **Sur un appareil mobile** :
   - Accédez à l'application via votre navigateur (par exemple, Chrome sur Android ou Safari sur iOS).
   - Ajoutez l'application à l'écran d'accueil :
     - Sur Android : Cliquez sur les trois points dans le coin supérieur droit et sélectionnez "Ajouter à l'écran d'accueil".
     - Sur iOS : Cliquez sur l'icône de partage en bas, puis sélectionnez "Ajouter à l'écran d'accueil".

---

## Contribution
1. Forkez le projet.
2. Créez une nouvelle branche :
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```
3. Faites vos modifications et committez-les :
   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```
4. Poussez les modifications :
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```
5. Ouvrez une Pull Request sur GitHub.

---

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Contact
Pour toute question ou suggestion, veuillez ouvrir une [issue](https://github.com/EasyCrea/Easy_Crea/issues) sur le dépôt.

