// Teams
const teams = [
  { id: 1, name: "Reactjs" },
  { id: 2, name: "Expressjs" },
  { id: 3, name: "Nestjs" },
];

// Employees
const employees = [
  { id: 1, name: "Nguyen Minh Viet", teamId: 1 },
  { id: 2, name: "Tran Thuy Quynh", teamId: 2 },
  { id: 3, name: "Tran Cong Tin", teamId: 1 },
  { id: 4, name: "Nguyen Nam Tao", teamId: 2 },
  { id: 5, name: "Bui Kong Minh", teamId: 3 },
];

// Absence Times
const absences = [
  { id: 1, employeeId: 1, date: "mon", time: "8:00-9:00" },
  { id: 2, employeeId: 1, date: "tue", time: "16:00-17:00" },
  { id: 3, employeeId: 3, date: "thu", time: "11:00-12:00" },
  { id: 4, employeeId: 2, date: "wed", time: "11:00-12:00" },
  { id: 5, employeeId: 5, date: "fri", time: "9:00-11:00" },
  { id: 6, employeeId: 3, date: "mon", time: "8:00-9:00" },
];

const objEmployees = [];

const arrayDays = ["mon", "tue", "wed", "thu", "fri"];

const teamsObj = {};
teams.forEach((team) => {
  teamsObj[team.id] = team.name;
});
console.log(teamsObj);

const addToEmployee = () => {
  let countId = 1;

  employees.forEach((employee) => {
    let employeeObj = {};
    // add id
    employeeObj.id = countId;
    // add name
    employeeObj.name = employee.name;
    // add team
    employeeObj.team = teamsObj[employee.teamId];

    // filter employee absence through employeeId
    let absencesThoughId = absences.filter(
      (absence) => absence.employeeId === employee.id
    );
    // console.log(absencesThoughId);

    // to obj absences

    let absencesObj = {
      mon: "Full Day",
      tue: "Full Day",
      wed: "Full Day",
      thu: "Full Day",
      fri: "Full Day",
    };
    absencesThoughId.forEach((abs) => {
      absencesObj[abs.date] = abs.time;
    });
    // console.log(absencesObj);

    employeeObj.schedule = absencesObj;

    objEmployees.push(employeeObj);
    countId++;
  });
};

addToEmployee();
console.log(objEmployees);

// render to UI

const render = (objEmployees, arrayDays) => {
  const tbodyE = document.querySelector(".tbody");
  tbodyE.innerHTML = "";
  objEmployees.forEach((objE) => {
    // create tr
    const trE = document.createElement("tr");
    // create tdName
    const tdName = document.createElement("td");
    tdName.innerText = objE.name;
    // create tdTeam
    const tdTeam = document.createElement("td");
    tdTeam.innerText = objE.team;

    trE.append(tdName, tdTeam);
    // create tdSchedule
    const schedules = objE.schedule;
    // create and add all schedule each employee
    arrayDays.forEach((day) => {
      let tdDay = document.createElement("td");
      tdDay.innerText = schedules[day];
      tdDay.classList.add("mdi");

      if (tdDay.innerText === "Full Day") {
        tdDay.classList.add("mdi-office-building");
      } else tdDay.classList.add("mdi-calendar-remove");
      trE.appendChild(tdDay);
    });

    // add tr to tbody
    tbodyE.append(trE);
  });
};

render(objEmployees, arrayDays);
console.log(objEmployees);

// Search through employee name
const searchEmployee = (objEmployees) => {
  const inputSearch = document.querySelector("input[name='search'");
  inputSearch.addEventListener("input", (e) => {
    const nameInput = e.target.value;
    let objEmployeesSearch = [];
    const objElpFilter = objEmployees.filter((employee) =>
      employee.name.toLowerCase().includes(nameInput.toLowerCase())
    );
    console.log(objElpFilter);
    render(objElpFilter, arrayDays);
  });
};
searchEmployee(objEmployees);

// Select team to search

const selectEmployee = (objEmployees) => {
  const selectE = document.querySelector("#teamSelect");
  console.log(selectE);
  selectE.addEventListener("click", (e) => {
    if (e.target.value === "all") render(objEmployees, arrayDays);
    else {
      console.log(e.target.value);
      let objSelectTeams = [...objEmployees];
      objSelectTeams = objSelectTeams.filter(
        (objETeam) => objETeam.team === e.target.value
      );
      console.log(objSelectTeams);
      render(objSelectTeams, arrayDays);
    }
  });
};

selectEmployee(objEmployees);
