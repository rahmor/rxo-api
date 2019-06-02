'use strict';

const PrescritionsService = {
  getUserPrescriptions(db, id) {
    return db('users')
      .where({ 'users.id': id })
      .join('prescriptions', 'users.id', '=', 'prescriptions.user_id')
      .select('prescriptions.rx_name')
      .join('schedules', 'schedules.prescription_id', '=', 'prescriptions.id')
      .select('schedules.*');
  }
};
module.exports = PrescritionsService;
