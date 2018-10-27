// import 'bootstrap';
import diagram from './jquery.circle-diagram';
diagram();
import jqMin from './jquery-1.11.1.min';
jqMin();
import main from './main';
main();

(function() {
    var slider = document.querySelector('.range');
    var button = document.querySelector('.range__button');

    button.onmousedown = function(evt) {
        var buttonCoords = getCoords(button);
        var shiftX = evt.pageX - buttonCoords.left;
        var sliderCoords = getCoords(slider);
        console.log('Drag started');

        document.onmousemove = function(evt) {
            var left = evt.pageX - shiftX - sliderCoords.left;

            if (left < 0) {
                left = 0;
            }
            var right = slider.offsetWidth - button.offsetWidth;

            if (left > right) {
                left = right;
            }

            button.style.left = left + 'px';
        }

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            console.log('Drag eneded');
        };

        return false;
    };

    // Disable hthml5 drag and drop
    button.ondragstart = function() {
        return false;
    };

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}());
