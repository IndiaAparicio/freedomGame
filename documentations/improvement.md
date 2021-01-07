# Documentation of improvement

### Steps // 7. Januar

##### Fehler und Herausforderungen und Stand

> ##### AKTUELLER STAND: 
> Ich habe die Basics nun fertiggestellt. Heißt ich habe:
> * das Setup
> * GitHub Repo
> * Player Movement
> * Mich mit der p5.play library auseinandersetzen
> * Virtual Camera mit unterschiedlichen Limitations für Player und Camera. Hier bin ich besonders stolz, weil ich nur mit dem Reference von molleindustria gearbeitet habe und sehr viel selbst ausgedacht habe mit SCENE_W und EDGE_W etc. 
> * Simple Collisions mit Platformen 
![](/media.january7.mov)
> ##### BUGS:
> * Die virtual Camera hinzubekommen war sehr schwer, da ich herausfinden musste wie die Größe der Scene mit der Größe des Viewports zusammenhängt und wie ich darin die Objekte richtig platziere und so viele relativen Zahlen statt absoluten Zahlen zu verwenden, sodass das Spiel responsive ist. 
> * Das Player Movement einzuschränken, sodass der Player nicht aus dem Spielfeld kann war ebenfalls eine Herausforderung 
> * Es ist sehr schwer möglichst nur die Funktionen der play-library zu verwenden, da Collisions etc. schwerer umsetzbar werden, wenn nicht alle Objekte beispielsweise diesen "sprite" haben.


> ##### NÄCHSTE SCHRITTE
> Ich versuche nun die Funktionalitäten der Interaktionen nacheinander zu coden.
> ##### BUGS
> * Für die "distancing" Funktion habe ich eine gute Referenz für den "Schwarm" gefunden, jedoch funktioniert eine der p5.play Funktionen nicht. Folgende: `.attractionPoint`. Die Objekte rotieren nur zum attraction point und bewegen sich nicht, wie in der Referenz.