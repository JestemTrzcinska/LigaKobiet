import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Schedule = ({ getGame, game }) => {
  return (
    <div className='beginning'>
      <h4>Schedule</h4>Schedule
    </div>
  );
};

Schedule.propTypes = {
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Schedule);

// import React from 'react';
// import { Col } from 'react-bootstrap';
// import Calendar from './Calendar';
// import Legend from './Legend';

// const Schedule = () => {
//   return (
//     <div className='logowanie1'>
//       <div className='logowanie2'>
//         <div className='logowanie3'>
//           <Col>
//             <Calendar />
//           </Col>
//           <Col className='topp'>
//             <Legend />
//           </Col>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;
