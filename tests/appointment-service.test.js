
const fs   = require('fs');

//jest.mock('../problem-repository');


beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  //ProblemRepository.mockClear();

});

function AppointmentManager( appoinmentList ) {
  this.appoinmentList = appoinmentList;
}

it('appoinment', () => {

  let serviceAppointment = {
    'service' : 'serviceId',
    'date' : '2019-10-10',
    'startTime' :'13:10',
    'duration' : '20'
  }
  let appointmentList = [serviceAppointment];

  let appointmentManager = new AppointmentManager( appointmentList );

});
