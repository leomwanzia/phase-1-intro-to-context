// Your code here

    function createEmployeeRecord(array){
        return{
            firstName:array[0],
            familyName:array[1],
            title:array[2],
            payPerHour:array[3],
            timeInEvents:[],
            timeOutEvents:[]
        }
    }


    function createEmployeeRecords(data){
        return data.map(array => createEmployeeRecord(array))
    }

    function createTimeInEvent(employeeRecord, dateStamp){
        const [date, hour] = dateStamp.split(' ')
        employeeRecord.timeInEvents.push({
            type: 'TimeIn',
            hour: parseInt(hour, 10),
            date,
        })

        return employeeRecord;
    }


    function createTimeOutEvent(employeeRecord, dateStamp){
        const [date, hour] = dateStamp.split(' ')
        employeeRecord.timeOutEvents.push({
            type: 'TimeOut',
            hour: parseInt(hour, 10),
            date,
        })

        return employeeRecord;
    }


    function hoursWorkedOnDate(employeeRecord, givenDate){

        const timeIn = employeeRecord.timeInEvents.find(occurence => occurence.date === givenDate)
        const timeOut = employeeRecord.timeOutEvents.find(occurence => occurence.date === givenDate)
        return (timeOut.hour - timeIn.hour) / 100;

    }


    function wagesEarnedOnDate(employeeRecord, givenDate){
        const wage = hoursWorkedOnDate (employeeRecord, givenDate) * employeeRecord.payPerHour
        return parseInt(wage);
    }


    function allWagesFor(employeeRecord){
        const availableDates = employeeRecord.timeInEvents.map(occurence => occurence.date)
        const pay = availableDates.reduce((acc, d) => acc + wagesEarnedOnDate(employeeRecord, d), 0)
        return pay;
    }


    function calculatePayroll(employeesArray){
        return employeesArray.reduce((acc, rec) => acc + allWagesFor(rec), 0)

}