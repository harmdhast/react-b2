---

kanban-plugin: basic

---

## À faire

- [ ] **Afficher un loader pendant le chargement des notes**<br>Créer un composant `<Loader />` réutilisable partout (au chargement de la liste, au chargement d’une note, à la modification d’une note…)
- [ ] **Ajouter un libellé "Enregistré" après la modification d'une note**<br>- Ne pas afficher le libellé au chargement d’une note<br>- Après l’enregistrement d’une modification, l’afficher<br>- Lorsque le titre ou le contenu est à nouveau modifié, ne plus l’afficher
- [ ] **Recherche par titre et contenu**<br>Une barre de recherche permet de filtrer en temps réel les notes par titre et contenu
- [ ] **Afficher les messages d'erreur**<br>Erreurs potentielles :<br><br><br>\- au chargement des notes<br>\- à la création d’une note<br>\- à la modification<br>\- à la suppression
- [ ] **Enregistrer automatiquement les modifications d'une note**<br>Utiliser un hook personnalisé :<br><br>```javascript<br>export const useDebouncedEffect = (effect, deps, delay) => {<br>  useEffect(() => {<br>    const handler = setTimeout(() => effect(), delay);<br><br>    return () => clearTimeout(handler);<br>    // eslint-disable-next-line react-hooks/exhaustive-deps<br>  }, [...(deps || []), delay]);<br>};<br>```
- [ ] Épingler une note
- [ ] **Bouton pour changer de thème (jour-nuit)**<br>Bouton soleil-lune (passer de l’un à l’autre ou en afficher un creux et l’autre plein)
- [ ] Marquer une note comme faite (`checked`)
- [ ] **Afficher un panneau de rendu Markdown**<br>Rend le contenu de la note au format Markdown visuellement.<br><br>Voir [https://simplenote.com/](https://simplenote.com/ "smartCard-inline").
- [ ] **Afficher le nom de l'utilisateur dans une barre de statut**<br>Dans une barre de statut générale, afficher le nom de l’utilisateur (`GET http://localhost:4000/profile`).
- [ ] Pagination
- [ ] Afficher les étiquettes à côté du titre des notes dans la liste
- [ ] Ajouter des étiquettes à une note


## En cours

- [ ] Rediriger vers la note nouvellement créée
- [ ] **Afficher les notes les plus récemment modifiées en premier**<br>Enregistrer la date de dernière modification `dateOfLastUpdate` dans la note.<br><br>Soit faire le tri côté client, soit côté serveur ([https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server "‌")).
- [ ] **Refactoriser les appels réseau**<br>Extraire les appels à `fetch` et `json` dans une fonction réutilisable.


## Done

- [ ] Afficher le contenu d'une note
- [ ] Supprimer une note
- [ ] **Mettre en surbrillance la note sélectionnée dans la liste**<br>Utiliser l’ID présente dans l’URL pour déterminer si chaque note de la liste est sélectionnée ou non.
- [ ] Au clic sur le bouton Supprimer, demander la confirmation dans une modale
- [ ] **Modifier une note**<br>- Titre modifiable<br>- Contenu modifiable<br><br>Lorsque la note est modifiée, son titre dans la navigation doit l'être aussi.




%% kanban:settings
```
{"kanban-plugin":"basic"}
```
%%