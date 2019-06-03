'use strict';

const PrescriptionsService = {
  getUserPrescriptions(db, id) {
    return db('users')
      .where({ 'users.id': id })
      .join('prescriptions', 'users.id', '=', 'prescriptions.user_id')
      .select('prescriptions.rx_name')
      .join('schedules', 'schedules.prescription_id', '=', 'prescriptions.id')
      .select('schedules.*');
  },

  addUserPrescriptions(db, data) {
    const { rx_name, days, times, user_id } = data;

    return db('prescriptions')
      .insert({ rx_name, user_id })
      .into('prescriptions')
      .returning('*')
      .then(rx => {
        const newSchedule = this.prescriptionsSpreader(
          days.concat(times).concat([{ prescription_id: rx[0].id }])
        );
        return newSchedule;
      })
      .then(newSchedule => db('schedules').insert(newSchedule));
  },

  prescriptionsSpreader(schedule) {
    let newSchedule = schedule.reduce(function(accumulator, currentValue) {
      return Object.assign(accumulator, currentValue);
    }, {});
    return newSchedule;
  }
};
module.exports = PrescriptionsService;
