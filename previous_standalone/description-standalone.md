OTO : Comportements sonores 
Roland Cahen (1er août 2025)
Révision 5 janvier 2026

Objectif : modéliser un dispositif sonore permettant de réduire les comportements de conduites dangereux, notamment le dépassement des limites de vitesse. Dans un premier temps il s’agit de montrer expérimentalement sur simulateur qu’avec un dispositif sonore bien designé et facilement appropriable, il est possible de moins regarder le compteur de vitesse et de moins dépasser les limites que dans la situation actuelle. 

Présentation pour WAC 2025 expliquant les principes du projet
Actuellement le dispositif sonore est programmé dans MaxMSP et fonctionne soit de manière autonome avec un controleur d’accélération, soit communique avec un simulateur via OSC
Une version antérieure a été réalisée pour Vivatech 2025 en html,CSS, js sur tablette.

Abréviation et items générique
ViV : Vitesse Idéale du Véhicule : (courbe de contrôle et de prudence idéale (éco drive / safe drive) 
VrV : Vitesse Réelle du Véhicule : (courbe de vitesse / profil mesurée en conduite)
LV : Limite de vitesse : seuil de transition (vitesse) ou point de passage à la limite de vitesse (position du panneau ou de la limitation de vitesse)
LV+ ou LV- : Changement de Limite de Vitesse croissant ou décroissant
VV : Vitesse du Véhicule
∆LV : différence entre la Vitesse du Véhicule et la Limite de Vitesse VV-LV
∆LV+ : delta si la vitesse du véhicule (VrV) est supérieure à la limite de vitesse (LV)
∆LV- : delta si la vitesse du véhicule (VrV) est inférieure à la limite de vitesse (LV)

BVM : Bruit Virtualisé du Moteur : pseudo moteur informatif généré par OTO offrant un feedback sonore amélioré, notamment du point de vue de la sécurité pour le conducteur, les passagers et les autres usagers de la route par rapport à l’existant.
( ou VM pour Virtual Motor) 

Awakeness
Veille : si aucun événement saillant ne se produit, soit un changement sur la route (EvtRout), soit une action du conducteur (EvtCond), le volume du BVM s’atténue lentement. Au premier événement saillant, le volume remonte. Soit à une valeur nominale, soit dynamiquement en fonction du nombre et de l'importance des événements.
EvtCond : Évènement de Conduite : tout changement significatif remettant en route le son d’OTO lorsqu’il s’est tu.
EvtRout : Évènement de la Route : notification, changement de limite de vitesse …

Comportements détectés : Comportements de conduite sonifiés : patterns dynamiques 
ALV- : Approche Limite de Vitesse décroissante : Réduction de la LV. Valeur de 0. à 1. entre l’annonce de la LV- (visible ou annoncée à une distance parcourable < 10 sec.) et la LV.
DLV : Dépassement de la Limite de Vitesse : ∆LV positif > marge de 2 ou 3 km/h (réglable ?)
ZCS : Zone de Confort Sonore : plage d'équilibre de la VV : vitesse stable juste en dessous de la limite à l’intérieure d’une marge de tolérance e.g. [-5, +2 km/h]. 
Veille : Comportement dynamique avec une atténuation si aucun nouvel événement n’est détecté.
DCLV : Dépassement en Continu de la Limite de Vitesse : (insistance à dépasser la limite)

Comportement déclenchés au delà d’un seuil
ACC : Accélération (forte : > 0,3 G)
DEC : Décélération (forte : < -0,3 G)
FB : Freinage (brusque < -0.5 G)

Comportements  sonores 
ZCS : Zone de Confort Sonore
Description sonore : son rond équilibré et stable (interférences stabilisées)
Comportement dynamique : s’établit en temps réel (somme des composantes du BVM). Si la vitesse reste constante dans les marges, le son s’atténue. Le volume remonte dès qu’un événement Evt se produit (dépassement de seuil d’accélération, freinage, LV+ (probablement pas LV- car ALV)…).

! attention : bien différencier le changement de limite de vitesse venant de la route du changement de vitesse décidé par le conducteur

DLV : sur tronçon à LV fixe : contrairement à l’ALV-, c’est l’action du conducteur qui produit le dépassement. Le comportement sonore est différent. (Endogène, comportemental)
Description sonore : bruit évoquant la vitesse, souffle de vent ou modification du BVM qui devient agressif et donne l’impression de mise en danger (battement de cœur…)
Comportement dynamique : Crescendo entre 0.x et 1., atténuation rapide après LV

ALV- : Approche Limite de Vitesse décroissante : le changement vient de la route et oblige le conducteur à adapter sa vitesse. (Exogène, environnemental)
Description sonore : BRV 
Comportement dynamique : Crescendo entre 0.x et 1., atténuation rapide après LV

BRV : Bandes rugueuses virtuelles : activé si ALV- 
Description sonore : bruit itératif crénelé : somme bruit + crénelage (variation du mix en fonction du niveau de bruit ???)
Comportement dynamique : Intensité variant en fonction de ∆L et de l’imminence d’une réduction de LV-
Vitesse des itérations = VV

Modélisation du BVM

Le BVM est constitué d’un accord de 4x4 notes (soit en tout 16 notes) + deux basses.

Accord principal dépendant de la Vitesse réelle du Véhicule et de la Limite de Vitesse. Cet accord renseigne sur la vitesse du véhicule par rapport à la Limite de Vitesse.
On commence par générer les 4 notes principales de l’accord : composé d’une fréquence de référence (f0) (tonique de l’accord) et de 3 autres composantes
LV fixe la fréquence de référence (tonique de l'accord)
VrV donne l'intervalle (incrément) déterminant la fréquence des 3 autres composantes de l'accord.

Chaque note composant l'accord est elle-même composée de 4 sous-notes. l’accord de ces 4 notes renseigne sur la proximité cible entre la VrV et la LV. L’ensemble devient consonnant quand les 4 sous-notes sont accordées en phase. C’est ce qu’on appelle la Zone de Confort Sonore (ZCS). 
Ces 4 sous-notes espacées de façon dynamique selon ∆LV (LV-VrV) de façon à ce que chaque composante soit accordée en phase lorsque ∆LV=0 et se désaccorde quand ∆LV est > ou < 0.

Lorsque on s’établit dans la ZCS, c’est à dire que ∆LV < +- 3km/h, la basse vient renforcer l’accord. Elle est constituée de 2 son sinusoïdaux dont la fréquence f = ½ f0

Questions à travailler : 
Rendu sonore de la vitesse absolue ?
Interpellation / entête : click centré autour de <4kHz.>
Variabilité du BVM : même modèle mais gradable en complexité (polyphonie /2, 4, 8)
Fusion (convolution) du son d’air avec le BVM ??? 
Autres modèles : 
Consigne continue, VrV composé d’itérations jusqu’à l’unisson (vitesse d’itérations variable). (A entendre dans la modulation du BVM, pas dans des trains de sons ou de bips)
Simplifié : ne se met en route qu’à l’approche de LV si DLV- < 5 km/h


! Asymétrie de la courbe ∆LV+- :  la courbe en cloche n’est probablement pas la plus appropriée, une courbe asymétrique le serait davantage. La courbe actuelle répond bien dans les valeurs de ∆LV négative (∆LV-) mais pas positive (LV+) où le son du BVM doit être très différent, donner l’impression de s’emballer plutôt que de simplement produire la modulation symétrique de la négative.

Commandes simplifiées : 
Coach sonore d’adaptation de vitesse : système plus simple avec deux commandes élémentaires : 
vite ! tu peux accélérer (sauf cas de force majeure)
vite ! tu dois ralentir !

A)	TicToc (interval) 4te+ (ralentis !) et Toc…Tic (plus lent) (accélère !)
B)	Glissé/ répété 2-3 fois
	Glissé\ “
	     
C)	Clicks itératif accélère : modèle de rebond (6-10 tics)
	Clicks itératifs ralentis : inertie vers l'arrêt
• • • •   (accélère !)/ ••  •  • (ralentis !)
D) 	Zen dong (ohm) : gong grave ou son résonance ronde grave
	Zen ding (ting) : clochette aiguë

E)	Rappel effet de proximité de la limite (radar de recul)


	
! Question de fond : jauger la nuisance produite par rapport à la liberté de conduire. Ici plus spécifiquement de rester à proximité de la limite de vitesse. => trouver les bons réglage de la courbe en vasque pour que le creux de la ZCS soit assez large pour qu’on se sente bien sur la route autour de la bonne vitesse. La courbe est peut être différente et pas en vasque. Mais pour l’instant il s’agit déjà de démontrer qu’on peut moins regarder le compteur et moins dépasser la limite de vitesse avec OTO que sans OTO. 

! Attention : les LV annoncées ne sont possibles que lorsqu’il n’y a aucune intersection entre le changement de limite et le véhicule, à moins que l’itinéraire ait été programmé à l’avance. Dans le cas contraire, par exemple si il y a une intersection ou que la voiture change de route, le changement de limite et les effets sonores qui lui sont liés se produiront instantanément au passage du panneau ou au point de changement de LV. Prévoir ce comportement sonore afin qu’il n’effraie pas le conducteur.



