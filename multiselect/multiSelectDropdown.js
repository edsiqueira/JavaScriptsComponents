var multiSelectDropdown = (function (_element, attr) {

    function multiSelectDropdown(element, attr) {
        this.CreateInput(element, attr);
    }

    multiSelectDropdown.prototype.Properties = function (attr) {

        var attr = attr || {};
        attr.width = attr.width || 280;
        attr.maxHeight = attr.maxHeight || 300;
        attr.maxList = attr.maxList || 3;
        attr.filterText = attr.filterText || "Filtros ativados...";

        return attr
    }

    multiSelectDropdown.prototype.CreateInput = function (element, attr) {
        var attributes = this.Properties(attr);

        var elmt = $('#' + element)

        dropdownDiv = {
            tag: 'div',
            class: 'dropdown-multiple',
            id: element +'_dropdown-multiple',
            width: attributes.width + 'px',
            inputDiv: {
                tag: 'input',
                id: 'filters',
                type: 'text',
                width: (attributes.width-30)+'px',
                readOnly: 'true',
                span: {
                    tag: 'span',
                    caret: 'caret'
                }
            }
        }
        var appendElementDiv = document.createElement(dropdownDiv.tag);
        appendElementDiv.classList.add(dropdownDiv.class);
        appendElementDiv.style.width = dropdownDiv.width;
        appendElementDiv.id = dropdownDiv.id;

        var appendElementInput = document.createElement(dropdownDiv.inputDiv.tag);
        appendElementInput.id = dropdownDiv.inputDiv.id;
        appendElementInput.type = dropdownDiv.inputDiv.type;
        appendElementInput.readOnly = dropdownDiv.inputDiv.readOnly;
        appendElementInput.style.width = dropdownDiv.inputDiv.width;

        var appendElementSpan = document.createElement(dropdownDiv.inputDiv.span.tag);
        appendElementSpan.classList.add(dropdownDiv.inputDiv.span.caret);

        $(elmt).append(appendElementDiv);
        $(appendElementDiv).append(appendElementInput);
        $(appendElementDiv).append(appendElementSpan);

        this.createDropdown(element, attributes)
    }

    multiSelectDropdown.prototype.createDropdown = function (element, attr) {
        dropdownDiv = {
            tag: 'div',
            class: 'list',
            maxHeight: attr.maxHeight + 'px',
            element: element,
            inputDiv: {
                tag: 'input',
                id: element + '_search',
                class: 'search',
                placeholder: 'Pesquise aqui...',
            },
            ul: {
                tag: 'ul',
                class: 'ul-list'
            }
        }
        var elmt = $('#' + element)
        var appendElementDiv = document.createElement(dropdownDiv.tag);
        appendElementDiv.classList.add(dropdownDiv.class);
        appendElementDiv.style.maxHeight = dropdownDiv.maxHeight;

        var appendElementInput = document.createElement(dropdownDiv.inputDiv.tag);
        appendElementInput.id = dropdownDiv.inputDiv.id;
        appendElementInput.classList.add(dropdownDiv.inputDiv.class);
        appendElementInput.placeholder = dropdownDiv.inputDiv.placeholder;

        var appendElementUl = document.createElement(dropdownDiv.ul.tag);
        appendElementUl.classList.add(dropdownDiv.ul.class);

        $(elmt).append(appendElementDiv);
        $(appendElementDiv).append(appendElementInput);
        $(appendElementDiv).append(appendElementUl);

        this.CreateList(dropdownDiv, attr)
    }


    multiSelectDropdown.prototype.CreateList = function (elmt, attr) {

        var data = this.getData();
        separator = {
            tag: 'li',
            class: 'group-separator',
            id: elmt.element+'_separator',
            span: {
                tag: 'span'
            }
        }

        item = {
            tag: 'li',
            class: 'list-item',
            id: elmt.element + '_item',
            input: {
                tag: 'input',
                type: 'checkbox'
            }
        }

        label = {
            tag: 'label'
        }

        for (var i = 0; i < data.length; i++) {

            var appendElementSeparator = document.createElement(separator.tag);
            appendElementSeparator.classList.add(separator.class);
            appendElementSeparator.id = separator.id;

            var appendElementSpan = document.createElement(separator.span.tag);
            appendElementSpan.innerText = data[i].obj1;

            var ul = $('#' + elmt.element).find('ul')
            $(ul).append(appendElementSeparator)

            $(appendElementSeparator).append(appendElementSpan)

            for (var k = 0; k < data[i].langs.length; k++) {

                var appendElementItem = document.createElement(item.tag);
                appendElementItem.classList.add(item.class);

                var appendElementInput = document.createElement(item.input.tag);
                appendElementInput.type = item.input.type;

                var appendElementLabel = document.createElement(label.tag);

                appendElementLabel.innerText = data[i].langs[k];
                appendElementInput.value = data[i].langs[k];


                $(ul).append(appendElementItem);
                $(appendElementItem).append(appendElementInput)
                $(appendElementItem).append(appendElementLabel)
            }
        }


        this.MultipleDropdown(elmt, attr)
    }

    multiSelectDropdown.prototype.MultipleDropdown = function (element, object) {
        var elemArr = [];
        $('.list-item').click(function (e) {

            var elementList = $(this);
            var input = $(this).find('[type=checkbox]');

            $(elementList).toggleClass('selected')

            if ($(elementList).hasClass('selected')) {
                $(input).prop('checked', true)
                elemArr.push($(input).val());
            }
            else {
                $(input).prop('checked', false)
                elemArr = jQuery.grep(elemArr, function (value) {
                    return value != $(input).val();
                });
            }

            $('.list-item').css('display', 'block');

            $('#filters').val(translateArray(elemArr))
            $('#search').val('')
        })

        function translateArray(arrayString) {
            var text = "";

            if (arrayString.length < object.maxList) {
                $(arrayString).each(function (i) {
                    text += arrayString[i];

                    text += ', ';

                })
                text = text.substring(0, text.lastIndexOf(','));
            }

            else {
                text = object.filterText;
            }

            return text;
        }
        $("#" + element.element + "_search").keyup(function () {

            var list = $('.list-item').find('[type=checkbox]');
            var text = $(this).val();


            $(list).each(function (i) {

                var res = text.substring(0, $(list[i]).val().length - 1)
                var mtc = $(list[i]).val().indexOf(res) !== -1

                if (mtc != false) {
                    $(list[i]).parent().css('display', 'block');
                }

                else {
                    $(list[i]).parent().css('display', 'none');
                }

            })
        })


        $("#" + element.element + "_dropdown-multiple").on("click", function (e) {
            var dropdown = $(this).next('.list');
            $(dropdown).toggle();
        });
    }

    multiSelectDropdown.prototype.getData = function () {
        var data = [{
            obj1: 'Front-End',
            langs: [
                '0007',
                '0035',
                '0047'
            ]
        },
        {
            obj1: 'Back-End',
            langs: [
                '0054',
                '0024',
                '0015',
                '0048'
            ]
        }]
        return data;
    }

    return multiSelectDropdown;
})()

function create(element, attr) {

    new multiSelectDropdown(element, attr);

}