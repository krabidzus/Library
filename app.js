/***************************
 * BOOK CONTROLLER
 **************************/

var bookController = (function() {

    var Book = function(title, author, pages, status, finishedPages, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.finishedPages = finishedPages;
        this.status = status;
        this.id = id
    };

    var allBooks = [];

    return {
        addItem: function(tit, aut, pag, sta, fp ) {
            var newBook;

            // Create new ID
            if (allBooks.length > 0) {
                ID = allBooks[allBooks.length -1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item
            newBook = new Book(tit, aut, pag, sta, fp, ID);

            // Push it into our data structure
            allBooks.push(newBook);

            // Return the new element
            return newBook;
        },

        deleteItem: function(id) {
            var ids, index;

            ids = allBooks.map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                allBooks.splice(index, 1);
            }
        },
        
        testing: function() {
            console.log(allBooks);
        }
    };

})();

/***************************
 * UI CONTROLLER
 **************************/

var UIController = (function() {

    var DOMstrings = {
        inputTitle: '#add-title',
        inputAuthor: '#add-author',
        inputPages: '#add-pages',
        inputStatus: '#add-status',
        inputBtn: '.btn-add',
        bookContainer: '.book-table',
        deleteBtn: '.btn-delete',
        deleteID: '#xxx',
        changeFinishedPages: '#finished-pages',
        pagesLeft1: '#pages-left',
        totalPages: '#pages1',
        daysLeft: "#days-end",
        averageP: '#average'
       
    };

    return {
        getInput: function() {
            return {
                title: document.querySelector(DOMstrings.inputTitle).value,
                author: document.querySelector(DOMstrings.inputAuthor).value,
                pages: parseFloat(document.querySelector(DOMstrings.inputPages).value),
                status: document.querySelector(DOMstrings.inputStatus).value
            };
        },

        addBookItem: function(obj) {
            var html, newHtml, element, date, dateFirst, dateSecond, timeDiff, diffDays, pagesPerDay, averagePages, pagesLeft;

            // Time difference
            date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
    
            dateFirst = new Date(obj.status);
            dateSecond = new Date(date);
            
            timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());
            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            // Pages per day
            pagesLeft = obj.pages;

            pagesPerDay = pagesLeft / diffDays;
            averagePages = pagesPerDay.toFixed(2)

            // Create HTML string with placeholder text
            element = DOMstrings.bookContainer;
            html = '<tbody><tr id="%id%"><td>%title%</td><td>%author%</td><td type="number" id="pages1">%pages%</td><td>%status%</td><td id="days-end">%diffDays%</td><td id="average">%averagePages%</td><td><input type="number" id="finished-pages" placeholder="0" ></td>   <td id="pages-left">%pagesLeft%</td>     <td><button class="btn-delete" id="xxx">delete</button></td><td><label class="switch"><input type="checkbox"><span class="slider round"></span></label></td></tr></tbody>';

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%title%', obj.title);
            newHtml = newHtml.replace('%author%', obj.author);
            newHtml = newHtml.replace('%pages%', obj.pages);
            newHtml = newHtml.replace('%status%', obj.status);
            newHtml = newHtml.replace('%id%', obj.id);
            newHtml = newHtml.replace('%diffDays%', diffDays);
            newHtml = newHtml.replace('%averagePages%', averagePages)
            newHtml = newHtml.replace('%pagesLeft%', pagesLeft)

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        changeFinishedPages: function(selectorID) {
            var changeFinishedPages2, pagesA, element, el, totalPages2, x;

            // Selectors
            el = document.getElementById(selectorID);

            pagesA = el.parentNode.querySelector(DOMstrings.changeFinishedPages).value;
            totalPages2 = el.parentNode.querySelector(DOMstrings.totalPages).innerText;

            x = totalPages2 - pagesA;

            if (x < 0) {

                // Cannot finish more pages than total
                element2 = DOMstrings.changeFinishedPages;
                el.parentNode.querySelector(element2).value = totalPages2;
                alert('Warning you finished the book.')

            } else if (pagesA < 0) {
                // Cannot finish less than 0 pages
                element2 = DOMstrings.changeFinishedPages;
                el.parentNode.querySelector(element2).value = 0;
                alert('Warning cannot finish less than 0 pages.')

            } else {
                // Change pages left
                changeFinishedPages2 = totalPages2 - pagesA;
                // Change HTML
                element = DOMstrings.pagesLeft1;
                el.parentNode.querySelector(element).innerHTML = changeFinishedPages2;
            }
        },

        changePagesPerDay: function(selectorID) {
            var pagesLeft, pagesPerDay, averagePages;

            // Selectors
            el = document.getElementById(selectorID);

            pagesLeft = el.parentNode.querySelector(DOMstrings.pagesLeft1).innerText;
            diffDays = el.parentNode.querySelector(DOMstrings.daysLeft).innerText;

            // Change pages per day
            pagesPerDay = pagesLeft / diffDays;
            averagePages = pagesPerDay.toFixed(2)

            // Change HTML
            element = DOMstrings.averageP;
            el.parentNode.querySelector(element).innerHTML = averagePages;
        },

        deleteListItem: function(selectorID) {

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputTitle + ', ' + DOMstrings.inputAuthor + ', ' + DOMstrings.inputPages + ', ' + DOMstrings.inputStatus);
            
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current) {
                current.value = "";
            });
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


/***************************
 * GLOBAL APP CONTROLLER
 **************************/

var controller = (function(bookCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {
    
            if (e.keyCode === 13) {
                ctrlAddItem();
            }
        });

      document.querySelector(DOM.bookContainer).addEventListener('click', ctrlDeleteItem);  
      document.querySelector(DOM.bookContainer).addEventListener('click', ctrlChangePages);  
    };

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the filed input data
        input = UIController.getInput();

        if (input.title !== "" && input.author !== "" && input.status !== "" && !isNaN(input.pages) && input.pages > 0) {
            // 2. Add the item to the budget controller
            newItem = bookCtrl.addItem(input.title, input.author, input.pages, input.status);

            // 3. Add the item to the UI
            UIController.addBookItem(newItem)

            // 4. Clear the fields
            UICtrl.clearFields();
        }
    };

    var ctrlChangePages = function(e) {

        if (e.target.id === 'finished-pages') {
            var itemID;

            itemID = e.target.parentNode.parentNode.id;

            if (itemID) {    
                // pridat podminku, ze nelze jit do minusu


                // Calll method which changes pages left
                  UIController.changeFinishedPages(itemID);
        
                // Call method which changes pages per day 
                  UIController.changePagesPerDay(itemID);
            }
        }
    };

    var ctrlDeleteItem = function(e) {
       
        if (e.target.id === 'xxx') {
            var itemID, ID;

            itemID = e.target.parentNode.parentNode.id;
    
            if (itemID) {
    
                ID = parseInt(itemID[1]);
    
                // 1. Delete the item from the data structure
                bookCtrl.deleteItem(ID);
    
                // 2. Delete the item from the UI
                UICtrl.deleteListItem(itemID);
            }
        }
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };

})(bookController, UIController);

controller.init();



