/* Leander de Kraker, 10423354*/
window.onload = function() {
 	changeColor("gr", '#00ff00'); /*Greece */
	changeColor("nl", '#6666ff'); /*Netherlands */
	changeColor("sk", '#AAAAAA'); /*Slovakia */
	changeColor("no", '#666666'); /*Norway */
	
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
        document.getElementById(id).style.fill = color;
}