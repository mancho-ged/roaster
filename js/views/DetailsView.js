export default class DetailsView {
    app = document.getElementById("app");
    employeeInfo = document.getElementById("employee-info");

    params = new URLSearchParams(window.location.search);
    id = this.params.get("id"); 

    getView() {
        let employee = null;

        let displayEmployee = () => {
            fetch("./team.json")
                .then((response) => response.json())
                .then((data) => this.renderPage(data));
            console.log(employee);
        };

        displayEmployee();

        console.log(this.id);
        
    }

    renderPage(data) {
        const employee = data.find(item => item.id === Number(this.id));

        const template = `<h1>${employee.name} ${employee.surname}</h1>
        <h2>${ employee.position }</h2>
        <p>${employee.expertize}</p>
        `;

        this.employeeInfo.innerHTML = template;
    }
}