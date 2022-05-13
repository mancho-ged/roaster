export default class HomeView {
    PROJECT_DIRECTORY = '/roaster/';
    app = document.getElementById("app");
    pagination = document.getElementById("pagination");
    grid = document.createElement("div");
    pageSize = 3;
    activePage = 1;

    table = document.createElement("table");
    tableHeader = document.createElement("thead");
    tableBody = document.createElement("tbody");
    
    createTableHeader = function (data) {
        const headerRow = document.createElement("tr");
        const headers = Object.keys(data[0]);
        headers.push("actions");

        headers.forEach((headerText) => {
            const tableHeaderCell = document.createElement("th");
            tableHeaderCell.textContent = headerText.toUpperCase();
            headerRow.appendChild(tableHeaderCell);
        });

        this.tableHeader.appendChild(headerRow);
    }

    createTableBody(data) {
        const firstEntry = (this.activePage - 1) * this.pageSize;
        data = data.slice(firstEntry, firstEntry + this.pageSize);
        data.map((dataItem) => {
            const row = document.createElement("tr");
            const entries = Object.values(dataItem);

            for (let entry of entries) {
                const tableCell = document.createElement("td");
                tableCell.textContent = entry;
                row.appendChild(tableCell);
            }
            const actionsCell = document.createElement("td");
            const actionsCellTemplate = `<button class="btn btn-delete">delete</button><button class="btn btn-edit">edit</button><a href="details.html?id=${dataItem.id}" class="btn btn-view">view</a>`;
            actionsCell.innerHTML = actionsCellTemplate;
            row.appendChild(actionsCell);
            this.tableBody.appendChild(row);
        });
    }

    renderGrid(data) {
        this.grid.id = "grid";
        this.table.classList.add("table", "table-striped");

        this.createTableHeader(data);
        this.createTableBody(data);

        this.table.appendChild(this.tableHeader);
        this.table.appendChild(this.tableBody);
        this.grid.appendChild(this.table);

        app.appendChild(this.grid);

        this.renderPagination(data);
    }

    reRenderGrid(data) {

        while (this.tableBody.firstChild) {
            this.tableBody.firstChild.remove()
        }

        this.createTableBody(data);
    }

    renderPagination(data) {
        const pagesNumber = data.length / this.pageSize;
        if(data.length > this.pageSize) {
            for(let i = 0; i < pagesNumber; i++) {
                this.createPaginationItem(i + 1, data);
            }
        }
    }

    createPaginationItem(number, data) {
        const li = document.createElement("li");
        li.textContent = number;
        li.addEventListener("click", (e) => {
            this.activePage = Number(e.target.textContent);
            console.log(this.activePage);
            this.reRenderGrid(data)
        })
        this.pagination.appendChild(li);
    }
    
    getView() {
        let displayTeam = () => {
            fetch(this.PROJECT_DIRECTORY + "team.json")
                .then((response) => response.json())
                .then((data) => this.renderGrid(data));
        };

        displayTeam();
    }
}
