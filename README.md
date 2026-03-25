# To Do OTO

# Documentation OTO

## Simulateur

### Contrôles
Deux profils de contrôle : manette + volant (défaut) ou manette seule
Dans le menu d'accueil du simulateur, choisir le profil en haut à gauche "OTO manette" ou "OTO pédales".

### Scénarios
Différents exercices sont accessibles en cliquant sur "test oto" dans le menu du simulateur.

3 exercices permettant de démarrer à un endroit différent de la carte : ville, route ou autoroute.

1 exercice paramétrable sur autoroute : “Distracteurs Vitesse”

--> 

### Données envoyées par le simulateur en OSC
5 Informations envoyées par le simulateur à chaque frame avec le préfixe “/oto_in” : 
- /speed_limit : limite de vitesse enregistrée dans le simulateur
    - autoroute, dépend de la voie : 130|110|90
    - échangeur : 70
    - ville : 50
    - route autre : 90
    
    ATTENTION Les paramètres de “Distracteurs Vitesse” ne changent pas la limite de vitesse envoyée par le simulateur

- /pause : vaut 1 que quand le simulateur est en pause, sinon vaut 0
- /forward_speed : vitesse du véhicule (km/h)
- /forward_acceleration : accélération de face du véhicule  (m/s^2)
- /lateral_acceleration : accélération latérale du véhicule (m/s^2)

Pour paramétrer l'adresse ip et le port vers lequel les données sont envoyées, modifier le fichier config_ip.nml sur le bureau avant de lancer le simulateur.

Notre version du simulateur n’est pas la version client standard


## Moteur Sonore

Après avoir branché le casque et les périphériques de contrôles (manette / volant / pédalier) lancer le fichier OTO_BVM_simulateur.maxpat qui se trouve sur le bureau. Sélectionner la sortie son et allumer l'audio. 

### Gestion des limites de vitesses hors simulateur.
En activant "limite de vitesse sans simulateur", un panneau de vitesse s'affiche en haut à droite de l'écran. Ici deux possibilités : 
- Contrôle par un scénario décrit dans speed-scenario.txt où chaque ligne correspond à un changement de limite après un certain temps. Exemple: “15, 90;” ⇒ passage au panneau 90 dans 15 secondes, le scénario finit par un stop qui met la limite à 0, affiche le panneau stop et arrête le scénario.
- Contrôle par les flèches haut et bas du clavier pour passer les limites de vitesse

